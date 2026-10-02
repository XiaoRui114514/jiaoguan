const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
function walk(folder) {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(folder, e.name)) : [path.join(folder, e.name)]);
}
const originals = new Set(walk(path.join(root, '素材')).map(p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')));
const files = walk(path.join(root, 'dist'));
const failures = [];
const release = JSON.parse(fs.readFileSync(path.join(root, 'dist/release-manifest.json'), 'utf8'));
const declared = new Map(release.files.map(file => [file.path, file]));
const review = JSON.parse(fs.readFileSync(path.join(root, 'assets/art-review-v4.json'), 'utf8'));
if (release.version !== '4.2.0') failures.push('Incorrect release version');
for (const p of files) {
  const rel = path.relative(path.join(root, 'dist'), p).replaceAll('\\', '/');
  if (/(^|\/)(素材|reference|private|workbench)(\/|$)|\.(jpg|jpeg|psd|kra)$/i.test(rel)) failures.push(rel);
  if (originals.has(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'))) failures.push('Source-photo hash: ' + rel);
  const hash = crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  if (!['.nojekyll','release-manifest.json'].includes(rel)) {
    if (!declared.has(rel)) failures.push('Undeclared release file: ' + rel);
    else if (declared.get(rel).sha256 !== hash) failures.push('Release hash mismatch: ' + rel);
  }
  if (/\.(html|js|css|json|svg)$/i.test(rel) && !rel.startsWith('vendor/')) {
    const text = fs.readFileSync(p, 'utf8');
    const school = String.fromCharCode(0x884c,0x77e5,0x5b9e,0x9a8c,0x4e2d,0x5b66);
    if (text.includes(school)) failures.push('School identity in published text: ' + rel);
    if (/(?:reference|private|workbench|素材)[\\/]/.test(text)) failures.push('Private reference URL in release: ' + rel);
  }
  if (/\.(webp|png|avif|svg)$/i.test(rel)) {
    const item = review.files.find(entry => entry.path === rel);
    if (!item || item.sha256 !== hash || item.schoolIdentity !== 'clear' || item.originalPhoto !== false) failures.push('Missing artwork privacy review: ' + rel);
  }
}
for (const rel of declared.keys()) if (!fs.existsSync(path.join(root, 'dist', rel))) failures.push('Missing declared release file: ' + rel);
const oldWord = String.fromCharCode(0x5854).repeat(3);
const oldKey = ['ta', 'ta', 'ta'].join('');
for (const p of walk(root).filter(p => !/(?:^|[\\/])(?:vendor|\.git|素材)(?:[\\/]|$)/.test(p) && /\.(js|md|css|html|json|txt|tmp|py|ps1|cjs)$/.test(p))) {
  if (p.endsWith('check-release.cjs')) continue;
  const text = fs.readFileSync(p, 'utf8');
  if (text.includes(oldWord) || text.toLowerCase().includes(oldKey)) failures.push('Legacy action: ' + path.relative(root, p));
}
if (failures.length) { console.error(failures); process.exit(1); }
console.log(JSON.stringify({ release_files: files.length, source_photos_checked: originals.size, source_photo_leaks: 0, legacy_action_references: 0, version: release.version, artwork_privacy_reviews: review.files.length, undeclared_files: 0 }));
