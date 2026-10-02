'use strict';
/* Lightweight commands built on the engine's own actions/state serialization. */
(function () {
  const f = (apply, revert) => ({ Function: { Apply: apply, ...(revert ? { Revert: revert } : {}) } });
  async function action(engine, statement) {
    const instance = engine.prepareAction(statement, { cycle: 'Application' });
    if (!instance) throw new Error('Unknown stage command: ' + statement);
    await instance.willApply();
    await instance.apply();
    await instance.didApply();
  }
  const showCharacter = (id, pose = 'normal', position = 'mid-right', motion = 'enter') => `show character ${id} ${pose} at ${position}${motion === 'none' ? ' transition 220ms' : ` with ${motion} duration 220ms`}`;
  const hideCharacter = (id, motion = 'exit') => f(async function () {
    if ((this.state('characters') || []).some((s) => s.split(' ')[2] === id)) await action(this, `hide character ${id} with ${motion} duration 220ms`);
  });
  const moveCharacter = (id, position, pose = 'normal') => showCharacter(id, pose, position, 'none');
  const approachDesk = (id, pose) => [moveCharacter(id, 'desk-near', pose), 'wait 220', moveCharacter(id, 'close-right', pose)];
  const changeExpression = (id, pose) => f(async function () {
    const previous = (this.state('characters') || []).find((s) => s.split(' ')[2] === id);
    if (previous) {
      const position = previous.match(/at\s+(\S+)/)?.[1] || 'mid-right';
      await action(this, showCharacter(id, pose, position, 'none'));
    }
  });
  const playBgm = (id) => f(async function () {
    this.storage({ bgmId: id });
    const current = (this.state('music') || []).map((s) => s.statement?.split(' ')[2]).filter(Boolean);
    if (current.length === 1 && current[0] === id) return;
    // The bundled 2.8 parser treats "with" as a media ID without an explicit ID.
    // Name each track so stopping its player also removes its serialized state.
    let incoming;
    if (id && !current.includes(id)) {
      await action(this, `play music ${id} loop`);
      incoming = this.mediaPlayer('music', id);
      incoming.volume = 0;
      incoming.output.gain.linearRampToValueAtTime(this.preference('Volume').Music, incoming.audioContext.currentTime + .65);
    }
    const fades = [...new Set(current)].filter(track => track !== id).map(async track => {
      const player = this.mediaPlayer('music', track);
      if (player) player.volume = this.preference('Volume').Music;
      await action(this, `stop music ${track} with fade 0.75`);
    });
    if (incoming) fades.push(new Promise(resolve => setTimeout(resolve, 650)));
    await Promise.all(fades);
    if (incoming && this.mediaPlayer('music', id) === incoming) incoming.volume = this.preference('Volume').Music;
  });
  const playSe = (id) => f(async function () {
    if (['classroom','playground'].includes(id)) {
      window.JiaoguanAudio?.scene(this.storage('backgroundId') || (id === 'playground' ? 'military' : 'classroom'));
      return;
    }
    await action(this, 'stop sound');
    await action(this, `play sound ${id}`);
  });
  const wait = (ms) => `wait ${Math.max(0, Number(ms) || 0)}`;
  const changeBackground = (id) => `show scene ${id} with fadeIn duration 260ms`;
  const clearCharacters = () => f(async function () {
    const ids = [...new Set((this.state('characters') || []).map((s) => s.split(' ')[2]).filter(Boolean))];
    for (const id of ids) await action(this, `hide character ${id} with fade_out duration 140ms`);
  });
  const scene = (id, bgm, chapter) => [
    clearCharacters(),
    f(async function () {
      for (const entry of [...(this.state('images') || [])]) {
        const image = typeof entry === 'string' ? entry.split(' ')[2] : entry.statement?.split(' ')[2];
        if (image) await action(this, `hide image ${image}`);
      }
    }),
    f(function () {
      this.storage({ backgroundId: id, chapter, bgmId: bgm });
      window.JiaoguanAudio?.scene(id);
      window.JiaoguanUI?.setChapter(chapter);
    }),
    'stop sound', changeBackground(id), playBgm(bgm)
  ];
  const unlockCG = (id) => f(async function () {
    const gallery = await this.Storage.get('gallery').catch(() => ({ unlocked: [] }));
    if (!(gallery.unlocked || []).includes(id)) await action(this, 'gallery unlock ' + id);
  });
  const showCG = (id) => [unlockCG(id), `show image ${id} at center with fade_in duration 260ms`];
  const hideCG = (id) => `hide image ${id} with fade_out duration 220ms`;
  const bond = (amount, flag) => f(function () {
    const data = this.storage();
    const flags = { ...(data.flags || {}) };
    if (flag) flags[flag] = true;
    this.storage({ bond: Math.max(0, Number(data.bond || 0) + amount), flags });
  });
  const pausePlayback = () => f(function () { window.Jiaoguan?.playback.stop(); this.autoPlay(false); this.skip(false); });
  const branchText = (threshold, key, high, low) => f(function () {
    this.storage({ [key]: Number(this.storage('bond') || 0) >= threshold ? high : low });
  });
  const shakeScreen = () => f(async function () {
    const stage = document.querySelector('[data-content="visuals"]');
    if (!stage || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    await stage.animate([{ translate: '0 0' }, { translate: '2px 0' }, { translate: '-2px 0' }, { translate: '0 0' }], { duration: 160 }).finished;
  });
  const fadeScreen = () => f(async function () {
    const stage = document.querySelector('[data-content="visuals"]');
    if (stage && !matchMedia('(prefers-reduced-motion: reduce)').matches) await stage.animate([{ opacity: .65 }, { opacity: 1 }], { duration: 240 }).finished;
  });
  const finish = () => f(async function () {
    this.autoPlay(false); this.skip(false);
    window.Jiaoguan?.playback.stop();
    const data = this.storage();
    const label = this.state('label');
    const events = { ...(data.events || {}), [label]: { chapter: data.chapter, timestamp: new Date().toISOString() } };
    this.storage({ events });
    await this.Storage.set('completion', { date: new Date().toISOString(), version: '4.2.1', bond: data.bond, flags: data.flags, events, choices: data.choices || [] });
    await this.Storage.remove('JiaoguanAuto_1');
  });
  const reset = () => f(function () {
    this.autoPlay(false); this.skip(false);
    this.storage({ schema: 4, version: '4.2.1', bond: 0, flags: {}, chapter: '九月 · 军训', backgroundId: 'military', bgmId: 'military', act7_open: '', act7_tail: '' });
  });
  monogatari.storage({ schema: 4, version: '4.2.1', bond: 0, flags: {}, chapter: '九月 · 军训', backgroundId: 'military', bgmId: 'military', act7_open: '', act7_tail: '' });
  window.JiaoguanStage = { f, action, scene, clearCharacters, showCharacter, hideCharacter, moveCharacter, approachDesk, changeExpression, changeBackground, playBgm, playSe, showCG, hideCG, shakeScreen, fadeScreen, wait, bond, branchText, pausePlayback, finish, reset };
})();






