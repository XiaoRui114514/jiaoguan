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
for (const p of files) {
  const rel = path.relative(path.join(root, 'dist'), p).replaceAll('\\', '/');
  if (/(^|\/)(素材|reference|private|workbench)(\/|$)|\.(jpg|jpeg|psd|kra)$/i.test(rel)) failures.push(rel);
  if (originals.has(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'))) failures.push('Source-photo hash: ' + rel);
}
const oldWord = String.fromCharCode(0x5854).repeat(3);
const oldKey = ['ta', 'ta', 'ta'].join('');
for (const p of walk(root).filter(p => !p.includes(path.sep + 'vendor' + path.sep) && /\.(js|md|css|html|json|txt|tmp|py|ps1|cjs)$/.test(p))) {
  if (p.endsWith('check-release.cjs')) continue;
  const text = fs.readFileSync(p, 'utf8');
  if (text.includes(oldWord) || text.toLowerCase().includes(oldKey)) failures.push('Legacy action: ' + path.relative(root, p));
}
if (failures.length) { console.error(failures); process.exit(1); }
console.log(JSON.stringify({ release_files: files.length, source_photos_checked: originals.size, source_photo_leaks: 0, legacy_action_references: 0 }));
