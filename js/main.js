'use strict';
(function () {
  const engine = monogatari;
  let timer = null, epoch = 0, mode = 'off', busy = false;
  const playback = {
    get mode() { return mode; },
    stop() {
      mode = 'off'; epoch++;
      clearTimeout(timer); timer = null;
      engine.autoPlay(false); engine.skip(false);
      window.JiaoguanUI?.updatePlayback();
    },
    set(next) {
      this.stop();
      if (next === 'off' || !engine.global('playing') || document.querySelector('choice-container') || window.JiaoguanUI?.isOpen) return;
      mode = next; const token = epoch;
      window.JiaoguanUI?.updatePlayback();
      const tick = async () => {
        if (token !== epoch || mode === 'off') return;
        if (!engine.global('playing') || window.JiaoguanUI?.isOpen || document.querySelector('choice-container')) { this.stop(); return; }
        if (busy || (!engine.global('finished_typing') && mode === 'auto')) { timer = setTimeout(tick, 40); return; }
        busy = true;
        try { await engine.proceed({ userInitiated: false, skip: mode === 'skip', autoPlay: mode === 'auto' }); }
        catch (_) { /* Type animation, waits and choices deliberately block advancement. */ }
        finally { busy = false; }
        if (token === epoch && mode !== 'off') {
          const delay = mode === 'skip' ? 110 : Math.max(700, Number(engine.preference('AutoPlaySpeed') || 3) * 1000);
          timer = setTimeout(tick, delay);
        }
      };
      timer = setTimeout(tick, mode === 'skip' ? 110 : Number(engine.preference('AutoPlaySpeed') || 3) * 1000);
    },
    toggle(next) { this.set(mode === next ? 'off' : next); }
  };
  const snapshot = () => {
    const state = engine.state(), data = engine.storage();
    return {
      scene: state.label, line: state.step, bond: Number(data.bond || 0), flags: data.flags || {},
      bgm: (state.music || []).map((s) => s.statement?.split(' ')[2]).filter(Boolean),
      characters: [...document.querySelectorAll('game-screen [data-character]')].map((el) => ({ id: el.dataset.character, pose: el.dataset.sprite, position: el.dataset.position })),
      playback: mode, timers: timer ? 1 : 0
    };
  };
  window.Jiaoguan = { playback, snapshot, version: '3.0.0' };
  const gameVisible = () => document.querySelector('game-screen')?.classList.contains('active');
  let advanceBusy = false;
  async function advance() {
    if (advanceBusy || !gameVisible() || window.JiaoguanUI?.isOpen || document.querySelector('choice-container')) return;
    playback.stop(); advanceBusy = true;
    try { await engine.proceed({ userInitiated: true }); } catch (_) {}
    finally { advanceBusy = false; }
  }
  window.Jiaoguan.advance = advance;
  function installInput() {
    window.addEventListener('keydown', (event) => {
      const target = event.target;
      if (/INPUT|SELECT|TEXTAREA/.test(target?.tagName) && event.key !== 'Escape') return;
      if (window.JiaoguanUI?.isOpen) {
        if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); window.JiaoguanUI.close(); }
        else if (['ArrowLeft','ArrowRight'].includes(event.key) && window.JiaoguanUI.view === 'gallery-view') { event.preventDefault(); event.stopImmediatePropagation(); window.JiaoguanUI.galleryStep(event.key === 'ArrowRight' ? 1 : -1); }
        else if ([' ','Enter','ArrowRight','s','a','h','l'].includes(event.key)) event.stopImmediatePropagation();
        return;
      }
      if (document.querySelector('dialog-log.active')) {
        if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); engine.runListener('dialog-log'); }
        else event.stopImmediatePropagation();
        return;
      }
      if (!gameVisible()) return;
      const key = event.key.toLowerCase();
      if (event.repeat) { if (key === ' ' || key === 'enter') { event.preventDefault(); event.stopImmediatePropagation(); } return; }
      if (key === 'escape') { event.preventDefault(); event.stopImmediatePropagation(); window.JiaoguanUI.open('menu'); }
      else if (key === ' ' || key === 'enter' || key === 'arrowright') {
        // Let focused choice/control buttons use their native keyboard activation.
        if (target?.closest('button, choice-container')) return;
        event.preventDefault(); event.stopImmediatePropagation(); advance();
      } else if (event.shiftKey && key === 's') { event.preventDefault(); event.stopImmediatePropagation(); window.JiaoguanUI.open('save'); }
      else if (event.shiftKey && key === 'l') { event.preventDefault(); event.stopImmediatePropagation(); window.JiaoguanUI.open('load'); }
      else if (key === 'a') { event.preventDefault(); event.stopImmediatePropagation(); playback.toggle('auto'); }
      else if (key === 's') { event.preventDefault(); event.stopImmediatePropagation(); playback.toggle('skip'); }
      else if (key === 'l') { event.preventDefault(); event.stopImmediatePropagation(); playback.stop(); engine.runListener('dialog-log'); }
      else if (key === 'h') { event.preventDefault(); event.stopImmediatePropagation(); playback.stop(); engine.distractionFree(); }
    }, true);
    document.addEventListener('visibilitychange', () => { if (document.hidden) playback.stop(); });
    document.querySelector('game-screen').addEventListener('pointerdown', (event) => {
      if (!event.target.closest('button, quick-menu, dialog-log')) playback.stop();
    }, true);
  }
  Monogatari.$_ready(async () => {
    await engine.init('#monogatari');
    engine.configuration('main-menu', { buttons: [
      { string: 'Start', data: { action: 'start' } },
      { string: 'Continue', data: { action: 'jg-continue' } },
      { string: 'Load', data: { action: 'jg-panel', panel: 'load' } },
      { string: 'Gallery', data: { action: 'jg-panel', panel: 'gallery' } },
      { string: 'Settings', data: { action: 'jg-panel', panel: 'settings' } }
    ] });
    await engine.component('main-menu').onConfigurationUpdate();
    // Replace the engine's default start listener only after init has registered it.
    engine.registerListener('start', { callback: async () => {
      playback.stop();
      if (engine.global('playing')) await engine.resetGame();
      engine.global('playing', true);
      await engine.showScreen('game');
      const story = engine.script('Start');
      if (Array.isArray(story) && story.length) await engine.run(story[0]);
    } }, true);
    engine.configuration('quick-menu', { buttons: [
      { string: 'Log', icon: 'fas fa-list', data: { action: 'jg-log' } },
      { string: 'AutoPlay', icon: 'fas fa-play-circle', data: { action: 'jg-auto' } },
      { string: 'Skip', icon: 'fas fa-fast-forward', data: { action: 'jg-skip' } },
      { string: 'Save', icon: 'fas fa-save', data: { action: 'jg-panel', panel: 'save' } },
      { string: 'GameMenu', icon: 'fas fa-bars', data: { action: 'jg-panel', panel: 'menu' } }
    ] });
    await engine.component('quick-menu').onConfigurationUpdate();
    document.querySelectorAll('quick-menu button').forEach((button) => {
      const label = button.querySelector('[data-string]')?.textContent || '';
      button.title = label; button.setAttribute('aria-label', label);
    });

    engine.registerListener('jg-panel', { callback: (_event, element) => window.JiaoguanUI.open(element.data('panel')) });
    engine.registerListener('jg-continue', { callback: () => window.JiaoguanUI.continueGame() });
    engine.registerListener('jg-auto', { callback: () => playback.toggle('auto') });
    engine.registerListener('jg-skip', { callback: () => playback.toggle('skip') });
    engine.registerListener('jg-log', { callback: () => { playback.stop(); return engine.runListener('dialog-log'); } });
    window.JiaoguanUI.init();
    installInput();
    const root = document.getElementById('monogatari');
    let autoTimer, lastAuto = '', saving = false;
    const saveAutomatic = async () => {
      if (saving || !gameVisible() || !engine.global('playing') || document.querySelector('centered-dialog') || engine.global('_engine_block')) return;
      const state = engine.state();
      const stamp = state.label + ':' + state.step;
      if (stamp === lastAuto) return;
      saving = true;
      try { await window.JiaoguanUI.saveTo(1, true); lastAuto = stamp; } finally { saving = false; }
    };
    root.addEventListener('didRunAction', (event) => {
      window.JiaoguanUI.refreshRuntime();
      if (event.detail?.action?.constructor?.id === 'Choice') playback.stop();
      if (['Dialog','Choice'].includes(event.detail?.action?.constructor?.id)) {
        clearTimeout(autoTimer); autoTimer = setTimeout(saveAutomatic, 250);
      }
      if (!engine.global('playing')) { playback.stop(); clearTimeout(autoTimer); lastAuto = ''; window.JiaoguanUI.refreshTitle(); }
    });
    root.addEventListener('didLoadGame', () => {
      playback.stop(); lastAuto = ''; window.JiaoguanUI.refreshRuntime();
    });
    root.addEventListener('didFinishTyping', () => { clearTimeout(autoTimer); autoTimer = setTimeout(saveAutomatic, 120); });
    window.addEventListener('pagehide', () => { playback.stop(); clearTimeout(autoTimer); });
    // A hidden tab must never keep advancing or accumulate auto/skip timers.
    window.Jiaoguan.ready = true;
  });
})();





