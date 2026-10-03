'use strict';
(function () {
  const engine = monogatari;
  let timer = null, epoch = 0, mode = 'off', busy = false;
  let checkpoint = null, checkpointReason = '', automaticTimer = null, lastAutomatic = '';
  let selectedChoice = '';
  const clone = (value) => JSON.parse(JSON.stringify(value));
  function captureSave() {
    const game = clone(engine.object());
    game.storage.schema = JiaoguanStorage.schema;
    game.storage.version = JiaoguanStorage.version;
    Object.assign(game.storage, JiaoguanStorage.journal(game.storage));
    const state = game.state, data = game.storage;
    const background = data.backgroundId || (state.scene || state.background || '').split(' ')[2] || '';
    const text = document.querySelector('[data-ui="say"]')?.getAttribute('string') || document.querySelector('[data-ui="say"]')?.textContent || '';
    return {
      version: JiaoguanStorage.version, sceneId: state.label, lineIndex: state.step,
      bond: Number(data.bond || 0), flags: clone(data.flags || {}), events: clone(data.events), choices: clone(data.choices),
      characterStates: clone(state.characters || []), background, bgm: clone(state.music || []),
      unlockedCG: clone(JiaoguanStorage.read('gallery')?.unlocked || []), timestamp: new Date().toISOString(), game,
      meta: { version: JiaoguanStorage.version, chapter: data.chapter || state.label, background, text }
    };
  }
  const resetCheckpoint = () => { checkpoint = null; checkpointReason = ''; selectedChoice = ''; lastAutomatic = ''; clearTimeout(automaticTimer); };
  function completeEvent(sceneId = engine.state('label'), chapter = engine.storage('chapter')) {
    if (!sceneId) return;
    const data = engine.storage();
    Object.assign(data, JiaoguanStorage.journal(data));
    if (!data.events[sceneId]) data.events[sceneId] = { chapter, timestamp: new Date().toISOString() };
  }
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
      if (next === 'off' || !engine.global('playing') || document.hidden || document.querySelector('choice-container') || document.querySelector('dialog-log.modal--active') || window.JiaoguanUI?.isOpen || window.JiaoguanUI?.isLoading) return;
      mode = next; const token = epoch;
      window.JiaoguanUI?.updatePlayback();
      const tick = async () => {
        if (token !== epoch || mode === 'off') return;
        if (!engine.global('playing') || document.hidden || window.JiaoguanUI?.isOpen || window.JiaoguanUI?.isLoading || document.querySelector('choice-container') || document.querySelector('dialog-log.modal--active')) { this.stop(); return; }
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
      scene: state.label, line: state.step, bond: Number(data.bond || 0), flags: data.flags || {}, events: data.events || {}, choices: data.choices || [],
      bgm: (state.music || []).map((s) => s.statement?.split(' ')[2]).filter(Boolean),
      characters: [...document.querySelectorAll('game-screen [data-character]')].map((el) => ({ id: el.dataset.character, pose: el.dataset.sprite, position: el.dataset.position })),
      playback: mode, timers: timer ? 1 : 0,
      background: data.backgroundId || '', autoSave: JiaoguanStorage.read('JiaoguanAuto_1')?.meta?.chapter || '', unlockedCG: JiaoguanStorage.read('gallery')?.unlocked || []
    };
  };
  window.Jiaoguan = { playback, snapshot, captureSave, resetCheckpoint, recordEvent: completeEvent, version: JiaoguanStorage.version,
    get checkpoint() { return checkpoint ? clone(checkpoint) : null; }, get advancing() { return busy; } };
  const gameVisible = () => document.querySelector('game-screen')?.classList.contains('active');
  async function advance() {
    playback.stop();
    if (busy || !gameVisible() || window.JiaoguanUI?.isOpen || window.JiaoguanUI?.isLoading || document.querySelector('choice-container') || document.querySelector('dialog-log.modal--active')) return;
    busy = true;
    try { await engine.proceed({ userInitiated: true }); }
    catch (error) {
      // The first click completes the native typewriter and deliberately rejects
      // advancement; a second click then moves to the next line.
      if (error?.message !== 'TypeWriter effect has not finished.') {
        console.error('Story advance failed', engine.state('label'), engine.state('step'), error);
        window.JiaoguanUI?.toast('这一步未能继续，请读档或重新开始。');
      }
    }
    finally { busy = false; }
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
      if (document.querySelector('dialog-log.modal--active')) {
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
    document.querySelector('game-screen').addEventListener('pointerdown', (event) => {
      if (!event.target.closest('button, quick-menu, dialog-log')) playback.stop();
    }, true);
    document.querySelector('game-screen').addEventListener('click', (event) => {
      if (event.target.closest('button, quick-menu, dialog-log, choice-container, [data-action]')) return;
      event.preventDefault(); event.stopImmediatePropagation(); advance();
    }, true);
  }
  Monogatari.$_ready(async () => {
    await engine.init('#monogatari');
    engine.configuration('main-menu', { buttons: [
      { string: 'Start', data: { action: 'start' } },
      { string: 'Continue', data: { action: 'jg-continue' } },
      { string: 'Load', data: { action: 'jg-panel', panel: 'load' } },
      { string: 'Gallery', data: { action: 'jg-panel', panel: 'gallery' } },
      { string: 'Settings', data: { action: 'jg-panel', panel: 'settings' } },
      { string: 'About', data: { action: 'jg-panel', panel: 'about' } }
    ] });
    await engine.component('main-menu').onConfigurationUpdate();
    // Replace the engine's default start listener only after init has registered it.
    engine.registerListener('start', { callback: async () => {
      if (busy) return;
      busy = true;
      playback.stop(); resetCheckpoint();
      window.JiaoguanUI.hideBondChange();
      try {
        if (engine.global('playing')) await engine.resetGame();
        // A new playthrough starts a fresh journal even after END returned to title.
        Object.assign(engine.storage(), { events: {}, choices: [] });
        engine.global('playing', true);
        await engine.showScreen('game');
        const story = engine.script('Start');
        if (Array.isArray(story) && story.length) await engine.run(story[0]);
      } finally { busy = false; }
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
    const root = engine.element(true);
    const saveAutomatic = (reason = 'periodic') => {
      if (!checkpoint || !engine.global('playing')) return false;
      const stamp = JSON.stringify([checkpoint.sceneId, checkpoint.lineIndex, checkpoint.bond, checkpoint.flags, checkpoint.events, checkpoint.choices, checkpoint.background, checkpoint.bgm, checkpoint.characterStates, checkpoint.unlockedCG]);
      if (stamp === lastAutomatic && JiaoguanStorage.read('JiaoguanAuto_1')) return false;
      const saved = clone(checkpoint);
      saved.timestamp = new Date().toISOString(); saved.meta.reason = reason;
      // Storage writes synchronously before its Promise resolves, including pagehide.
      window.JiaoguanUI.saveTo(1, true, saved);
      lastAutomatic = stamp; return true;
    };
    const queueAutomatic = (reason) => {
      clearTimeout(automaticTimer);
      automaticTimer = setTimeout(() => saveAutomatic(reason), 220);
    };
    window.Jiaoguan.saveAutomatic = saveAutomatic;
    // Choice's installed engine handler uses these same rendered data-choice keys.
    // Capture before that handler runs its branch so the next dialogue includes it.
    root.addEventListener('click', (event) => {
      const button = event.target.closest('choice-container button[data-choice]:not([disabled])');
      if (!button || !engine.global('playing') || window.JiaoguanUI?.isLoading) return;
      const state = engine.state(), choiceKey = button.dataset.choice;
      const choice = engine.script(state.label)?.[state.step]?.Choice?.[choiceKey];
      const stamp = state.label + ':' + state.step;
      if (!choice || choice.Do === null || button.dataset.do === 'null' || selectedChoice === stamp) return;
      selectedChoice = stamp;
      const data = engine.storage();
      Object.assign(data, JiaoguanStorage.journal(data));
      data.choices.push({ sceneId: state.label, lineIndex: state.step, choiceKey, label: button.textContent.trim(), timestamp: new Date().toISOString() });
      checkpointReason = 'choice-complete';
    }, true);
    root.addEventListener('didRunAction', (event) => {
      window.JiaoguanUI.refreshRuntime();
      const action = event.detail?.action?.constructor?.id;
      if (action === 'Choice') { playback.stop(); checkpointReason = 'choice'; }
      if (['Dialog', 'Choice'].includes(action)) {
        if (checkpoint && checkpoint.sceneId !== engine.state('label')) completeEvent(checkpoint.sceneId, checkpoint.meta.chapter);
        const next = captureSave();
        if (next.sceneId !== checkpoint?.sceneId || next.meta.chapter !== checkpoint?.meta.chapter) checkpointReason = 'act';
        else if (next.bond !== checkpoint.bond || JSON.stringify(next.flags) !== JSON.stringify(checkpoint.flags)) checkpointReason = 'variables';
        else if (JSON.stringify(next.choices) !== JSON.stringify(checkpoint.choices)) checkpointReason = 'choice-complete';
        else if (JSON.stringify(next.events) !== JSON.stringify(checkpoint.events)) checkpointReason = 'event-complete';
        else if (next.background !== checkpoint.background || JSON.stringify(next.unlockedCG) !== JSON.stringify(checkpoint.unlockedCG)) checkpointReason = 'story-node';
        else if (document.querySelector('choice-container')) checkpointReason = 'choice';
        else if (checkpoint?.game && typeof engine.script(checkpoint.sceneId)?.[checkpoint.lineIndex] === 'object' && engine.script(checkpoint.sceneId)[checkpoint.lineIndex]?.Choice) checkpointReason = 'choice-complete';
        checkpoint = next;
        if (action !== 'Choice') selectedChoice = '';
        if (checkpointReason) { queueAutomatic(checkpointReason); checkpointReason = ''; }
      }
      if (!engine.global('playing')) { playback.stop(); resetCheckpoint(); window.JiaoguanUI.refreshTitle(); }
    });
    root.addEventListener('didLoadGame', () => {
      playback.stop(); resetCheckpoint(); window.JiaoguanUI.hideBondChange(); window.JiaoguanUI.refreshRuntime();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { playback.stop(); clearTimeout(automaticTimer); saveAutomatic('hidden'); }
    });
    window.addEventListener('pagehide', () => { playback.stop(); clearTimeout(automaticTimer); saveAutomatic('pagehide'); });
    setInterval(() => { if (!document.hidden) saveAutomatic('periodic'); }, 20000);
    // A hidden tab must never keep advancing or accumulate auto/skip timers.
    window.Jiaoguan.ready = true;
  });
})();





