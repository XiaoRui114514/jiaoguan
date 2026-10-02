/* Static release whitelist: private references and workbench can never enter dist. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Invalid output path');
const definitions = { characters: {}, assets: {} };
const sandbox = { window: {}, monogatari: {
  characters(value) { definitions.characters = value; },
  assets(type, value) { definitions.assets[type] = value; }
} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/resources.js'), 'utf8'), sandbox);
const files = new Set(['index.html', 'tokens.css', 'favicon.ico', 'css/game.css', 'assets/audio/CREDITS.md',
  ...fs.readdirSync(path.join(root, 'js')).filter(n => n.endsWith('.js')).map(n => 'js/' + n),
  'vendor/monogatari/monogatari.js', 'vendor/monogatari/monogatari.css', 'vendor/monogatari/LICENSE']);
for (const c of Object.values(definitions.characters)) {
  for (const sprite of Object.values(c.sprites || {})) files.add(`assets/characters/${c.directory}/${sprite}`);
}
for (const [type, assets] of Object.entries(definitions.assets)) {
  const folder = ['images','gallery'].includes(type) ? 'cg' : type === 'scenes' ? 'backgrounds' : ['music','sounds'].includes(type) ? 'audio' : type;
  for (const file of Object.values(assets)) files.add(`assets/${folder}/${file}`);
}
for (const cg of sandbox.window.JiaoguanGallery) files.add('assets/thumbnails/' + cg.thumb);
const forbidden = /(^|\/)(reference|private|workbench|素材)(\/|$)|\.(psd|kra|jpg|jpeg)$/i;
for (const file of files) {
  if (forbidden.test(file) || !fs.existsSync(path.join(root, file)) || !fs.statSync(path.join(root, file)).size) throw new Error('Missing or forbidden release file: ' + file);
}
const artReview = JSON.parse(fs.readFileSync(path.join(root, 'assets/art-review-v4.json'), 'utf8'));
for (const file of files) {
  if (!/\.(webp|png|avif|svg)$/i.test(file)) continue;
  const review = artReview.files.find(entry => entry.path === file);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  if (!review || review.sha256 !== hash || review.schoolIdentity !== 'clear' || review.originalPhoto !== false) throw new Error('Artwork requires current privacy review: ' + file);
}
// Rebuild only the fixed project/dist directory, after every required file was checked.
fs.rmSync(output, { recursive: true, force: true });
const manifest = [];
for (const file of [...files].sort()) {
  const target = path.join(output, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, file), target);
  const content = fs.readFileSync(target);
  manifest.push({ path: file, bytes: content.length, sha256: crypto.createHash('sha256').update(content).digest('hex') });
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
fs.writeFileSync(path.join(output, 'release-manifest.json'), JSON.stringify({ version: '4.2.1', files: manifest }, null, 2));
console.log(JSON.stringify({ version: '4.2.1', files: files.size, bytes: manifest.reduce((n, f) => n + f.bytes, 0), output }, null, 2));
