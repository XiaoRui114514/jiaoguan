'use strict';
(function () {
  const beds = new Set(), effects = new Map(), suspended = new Set();
  const files = { military: 'playground', military_rest: 'playground', military_afternoon: 'playground', rest: 'playground', pe: 'playground', night: 'night_ambience', empty: 'night_ambience', evening: 'night_ambience' };
  let current = null, timer = null, lastClick = 0;
  const soundVolume = () => Math.max(0, Math.min(1, Number(monogatari.preference('Volume')?.Sound) || 0));
  const source = id => 'assets/audio/' + monogatari.assets('sounds')[id];
  function dispose(entry) {
    entry.player.pause(); entry.player.removeAttribute('src'); entry.player.load(); beds.delete(entry);
    if (current === entry) current = null;
  }
  function volume() {
    const level = soundVolume();
    for (const entry of beds) entry.player.volume = level * .22 * entry.gain;
    for (const pool of effects.values()) for (const player of pool) player.volume = level * .65;
  }
  function fade(entry, target) {
    entry.from = entry.gain; entry.target = target; entry.start = performance.now();
    if (timer) return;
    timer = setInterval(() => {
      let pending = false;
      for (const bed of beds) {
        const progress = Math.min(1, (performance.now() - bed.start) / 650);
        bed.gain = bed.from + (bed.target - bed.from) * progress;
        if (progress < 1) pending = true;
        else if (!bed.target) dispose(bed);
      }
      volume();
      if (!pending) { clearInterval(timer); timer = null; }
    }, 30);
  }
  function stop() {
    clearInterval(timer); timer = null;
    for (const entry of [...beds]) dispose(entry);
    for (const pool of effects.values()) for (const player of pool) { player.pause(); player.currentTime = 0; }
    suspended.clear();
  }
  function scene(background) {
    const file = source(files[background] || 'classroom');
    if (current?.player.getAttribute('src') === file) { volume(); return; }
    for (const entry of beds) fade(entry, 0);
    const player = new Audio(file);
    player.loop = true; player.preload = 'none'; player.volume = 0;
    const entry = { player, gain: 0, from: 0, target: 1, start: performance.now() };
    beds.add(entry); current = entry; fade(entry, 1);
    if (!document.hidden) player.play().catch(() => dispose(entry));
  }
  function effect(id) {
    if (document.hidden || !soundVolume()) return;
    const pool = effects.get(id) || [];
    let player = pool.find(item => item.paused || item.ended);
    if (!player && pool.length < 3) { player = new Audio(source(id)); player.preload = 'none'; pool.push(player); effects.set(id, pool); }
    if (!player) return;
    player.currentTime = 0; player.volume = soundVolume() * .65; player.play().catch(() => {});
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.disabled || button.id === 'jg-next' || performance.now() - lastClick < 80) return;
    lastClick = performance.now(); effect(button.closest('choice-container') ? 'ui_confirm' : 'ui_click');
  }, true);
  document.addEventListener('input', event => { if (event.target.dataset.setting === 'Sound') volume(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      for (const player of [...monogatari.mediaPlayers('music'), ...monogatari.mediaPlayers('sound')]) {
        if (!player.paused && !player.ended) { suspended.add(player); player.pause(); }
      }
      for (const entry of beds) entry.player.pause();
      for (const pool of effects.values()) for (const player of pool) player.pause();
    } else {
      if (monogatari.global('playing')) {
        const players = [...monogatari.mediaPlayers('music'), ...monogatari.mediaPlayers('sound')];
        for (const player of suspended) if (players.includes(player) && !player.ended) player.play().catch(() => {});
        current?.player.play().catch(() => {});
      }
      suspended.clear();
    }
  });
  window.JiaoguanAudio = { scene, stop, volume, get current() { return current?.player.getAttribute('src')?.split('/').pop() || ''; } };
  document.addEventListener('didLoadGame', () => scene(monogatari.storage('backgroundId')), true);
  document.addEventListener('didRunAction', () => { if (!monogatari.global('playing')) stop(); }, true);
})();
