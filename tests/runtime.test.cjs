const assert = require('node:assert/strict');
const { test } = require('node:test');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');

test('leaving a choice and starting again does not block the new game', async (t) => {
  execFileSync(process.execPath, ['tools/build-release.cjs'], { cwd: root });
  const releaseRoot = path.join(root, 'dist');
  const server = http.createServer((request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const file = path.resolve(releaseRoot, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(releaseRoot + path.sep) || !fs.existsSync(file)) {
      response.writeHead(404).end(); return;
    }
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    } : {})
  });
  t.after(() => browser.close());
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.waitForFunction(() => window.Jiaoguan?.ready);
  await page.evaluate(() => {
    JiaoguanUI.close(true);
    monogatari.preference('TextSpeed', 0);
  });

  const choices = await page.evaluate(() => Object.entries(monogatari.script()).flatMap(([label, lines]) =>
    lines.flatMap((line, step) => line?.Choice ? [{ label, step }] : [])));
  assert.ok(choices.length > 0);
  for (const choice of choices) {
    await page.evaluate(async ({ label, step }) => {
      await monogatari.runListener('start');
      // Position at the real scripted choice without replaying the whole novel.
      monogatari.state({ label, step });
      await monogatari.run(monogatari.script(label)[step]);
    }, choice);
    await page.waitForSelector('choice-container button');
    // A live choice must still block ordinary progression.
    assert.equal(await page.evaluate(() => monogatari.action('Choice').blocking), true);
    await page.evaluate(() => JiaoguanUI.open('menu'));
    await page.click('[data-ui-action="title"]');
    await page.click('[data-ui-action="confirm-title"]');
    await page.waitForFunction(() => !monogatari.global('playing'));
    await page.evaluate(() => monogatari.runListener('start'));
    await page.waitForFunction(() => monogatari.global('finished_typing') && !monogatari.global('_engine_block'));
    const before = await page.evaluate(() => ({ label: monogatari.state('label'), step: monogatari.state('step') }));
    await page.click('#jg-next');
    await page.waitForFunction(({ step }) => monogatari.state('step') > step, before);
    assert.equal(await page.evaluate(() => monogatari.state('label')), 'Start', choice.label);
    await page.evaluate(() => monogatari.run('end'));
  }
  assert.deepEqual(errors, []);
});
