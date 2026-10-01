'use strict';
(function () {
  const engine = monogatari, store = JiaoguanStorage;
  const esc = (text) => String(text ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  let panel, content, title, view = '', previousFocus, galleryIndex = 0, toastTimer;
  let presentation = store.read('presentation') || { size: 'normal', motion: true };
  const titles = { menu: '暂停', save: '保存游戏', load: '读取存档', settings: '设置', gallery: 'CG 鉴赏', confirm: '返回标题' };
  const routeNames = { Start:'军训第一天', Act1:'示范', Act2:'调整军姿', Act3:'回教室休息', Act4:'军训第五天 · 休息', Act5:'开学第一周', Act5Talk:'午休历史', Act6:'开学日常', Act7:'今天不过去', Act8:'晚自习后' };
  const formatDate = (date) => { try { return new Intl.DateTimeFormat('zh-CN',{ month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }).format(new Date(date)); } catch (_) { return '时间未知'; } };
  const button = (text, action, attrs = '') => `<button type="button" data-ui-action="${action}" ${attrs}>${text}</button>`;
  function toast(text) {
    const el = document.getElementById('jg-toast');
    el.textContent = text; el.classList.add('visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 2400);
  }
  function applyPresentation() {
    document.documentElement.dataset.textSize = presentation.size;
    document.documentElement.dataset.reducedMotion = String(!presentation.motion || matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  async function refreshTitle() {
    const hasSave = (await store.saves()).length > 0;
    const continueButton = document.querySelector('main-menu [data-action="jg-continue"]');
    if (continueButton) { continueButton.disabled = !hasSave; continueButton.title = hasSave ? '继续最近的记录' : '还没有可读取的记录'; }
    const note = document.getElementById('jg-title-note');
    if (note) note.textContent = store.read('completion') ? '已通关 · CG 鉴赏已全部解锁' : '校园视觉小说 · DEMO 3.0';
  }
  function setChapter(chapter) {
    const el = document.getElementById('jg-chapter');
    if (el && el.textContent !== chapter) el.textContent = chapter;
  }
  function updatePlayback() {
    const mode = window.Jiaoguan?.playback.mode || 'off';
    for (const [action, expected, label] of [['jg-auto','auto','自动'],['jg-skip','skip','快进']]) {
      const el = document.querySelector(`quick-menu [data-action="${action}"]`);
      if (!el) continue;
      el.setAttribute('aria-pressed', String(mode === expected));
      const span = el.querySelector('[data-string]');
      if (span) span.textContent = mode === expected ? label + '中' : label;
    }
  }
  function refreshRuntime() {
    setChapter(engine.storage('chapter') || '九月'); updatePlayback();
    const debug = document.getElementById('jg-debug');
    if (debug) {
      const data = Jiaoguan.snapshot();
      for (const [key, value] of Object.entries(data)) {
        const el = debug.querySelector(`[data-debug="${key}"]`);
        if (el) el.textContent = typeof value === 'object' ? JSON.stringify(value) : String(value);
      }
    }
  }
  async function saveTo(slot, automatic = false) {
    if (!engine.global('playing')) return false;
    const label = automatic ? 'AutoSaveLabel' : 'SaveLabel';
    const key = (automatic ? 'JiaoguanAuto_' : 'JiaoguanSave_') + slot;
    try {
      await engine.saveTo(label, slot, automatic ? '自动记录' : `记录 ${String(slot).padStart(2,'0')}`);
      const data = await store.adapter.get(key);
      data.meta = {
        version: '3.0.0', chapter: engine.storage('chapter'), background: engine.storage('backgroundId'),
        text: document.querySelector('[data-ui="say"]')?.getAttribute('string') || document.querySelector('[data-ui="say"]')?.textContent || ''
      };
      await store.adapter.set(key, data);
      refreshTitle();
      if (!automatic) toast(store.persistent ? '记录已保存' : '仅保存在本次页面内：浏览器不允许写入本地存档');
      return true;
    } catch (error) { if (!automatic) toast('保存未成功，请重试。'); console.warn('Jiaoguan save failed:', error); return false; }
  }
  async function load(key) {
    Jiaoguan.playback.stop();
    const data = store.read(key);
    if (!store.validSave(data)) { toast('这份记录已损坏或版本不兼容，没有修改当前进度。'); return false; }
    if (engine.global('_engine_block')) { toast('正在切换场景，请稍候再读取。'); return false; }
    try {
      document.querySelectorAll('choice-container').forEach((el) => el.remove());
      const choice = engine.action('Choice'); if (choice) choice.blocking = false;
      await engine.loadFromSlot(key);
      await engine.run(engine.label()[engine.state('step')]);
      close(true); refreshRuntime(); return true;
    } catch (error) { console.warn('Jiaoguan load failed:', error); toast('读取未成功，记录仍保留。'); return false; }
  }
  async function continueGame() {
    const saves = await store.saves();
    if (saves.length) return load(saves[0].key);
    toast('还没有可以继续的记录。');
  }
  async function saveMarkup(reading) {
    const values = await store.adapter.getAll();
    const cards = [];
    for (let slot = 1; slot <= 6; slot++) {
      const key = 'JiaoguanSave_' + slot, data = values[key], valid = store.validSave(data);
      const scene = engine.assets('scenes')[data?.meta?.background || data?.image];
      const image = valid && scene ? `<img src="assets/scenes/${esc(scene)}" alt="" loading="lazy" decoding="async">` : '<div class="save-empty"><span>—</span></div>';
      const attrs = reading ? `data-key="${key}" ${!valid ? 'disabled' : ''}` : `data-slot="${slot}"`;
      cards.push(`<article class="save-card ${valid ? 'occupied' : 'empty'}">
        <button type="button" data-ui-action="${reading ? 'load-slot' : 'save-slot'}" ${attrs}>${image}
          <div class="save-card-copy"><span class="save-number">${String(slot).padStart(2,'0')}</span><strong>${valid ? esc(data.meta?.chapter || routeNames[data.game.state.label] || '剧情记录') : (data ? '记录损坏 / 版本不兼容' : '空白记录')}</strong>
          <small>${valid ? esc(formatDate(data.date)) : (reading ? '尚未保存' : '点击保存至此处')}</small><p>${valid ? esc(data.meta?.text || '') : ' '}</p></div>
        </button>${valid ? button('删除','delete-save',`data-key="${key}" class="slot-delete" aria-label="删除记录 ${slot}"`) : ''}</article>`);
    }
    const automatic = values.JiaoguanAuto_1;
    const auto = reading && store.validSave(automatic) ? `<div class="auto-save-row"><div><small>自动记录</small><strong>${esc(automatic.meta?.chapter || '最近进度')}</strong><span>${esc(formatDate(automatic.date))}</span></div>${button('继续这份记录','load-slot','data-key="JiaoguanAuto_1"')}</div>` : '';
    return `${auto}<div class="save-grid">${cards.join('')}</div>${store.legacyCount ? '<p class="panel-footnote">旧版记录已保留，与 3.0 独立。</p>' : ''}`;
  }
  function settingsMarkup() {
    const volume = engine.preference('Volume');
    return `<div class="settings-layout">
      <section><h3>声音</h3>
        <label class="range-setting"><span>背景音乐</span><output>${Math.round(volume.Music * 100)}%</output><input aria-label="背景音乐音量" data-setting="Music" type="range" min="0" max="1" step=".01" value="${volume.Music}"></label>
        <label class="range-setting"><span>环境与音效</span><output>${Math.round(volume.Sound * 100)}%</output><input aria-label="环境与音效音量" data-setting="Sound" type="range" min="0" max="1" step=".01" value="${volume.Sound}"></label>
      </section><section><h3>阅读</h3>
        <label class="range-setting"><span>逐字间隔</span><output>${engine.preference('TextSpeed')} ms</output><input aria-label="逐字间隔" data-setting="TextSpeed" type="range" min="0" max="70" step="2" value="${engine.preference('TextSpeed')}"></label>
        <label class="range-setting"><span>自动等待</span><output>${engine.preference('AutoPlaySpeed')} 秒</output><input aria-label="自动等待时间" data-setting="AutoPlaySpeed" type="range" min=".8" max="7" step=".1" value="${engine.preference('AutoPlaySpeed')}"></label>
        <label class="select-setting"><span>正文字号</span><select data-setting="size"><option value="normal" ${presentation.size === 'normal' ? 'selected' : ''}>标准</option><option value="large" ${presentation.size === 'large' ? 'selected' : ''}>较大</option></select></label>
        <label class="check-setting"><input type="checkbox" data-setting="motion" ${presentation.motion ? 'checked' : ''}>轻微进退场与转场动画</label>
      </section></div><div class="settings-bottom">${button('<span class="fas fa-expand" aria-hidden="true"></span>','fullscreen','aria-label="切换全屏" title="切换全屏"')}</div>`;
  }
  async function galleryMarkup() {
    const unlocked = store.read('gallery')?.unlocked || [];
    return `<p class="panel-intro">${unlocked.length} / 5 已解锁</p><div class="gallery-grid">${JiaoguanGallery.map((cg, i) => {
      const available = unlocked.includes(cg.id);
      return `<button type="button" class="gallery-card ${available ? '' : 'locked'}" data-ui-action="gallery-image" data-index="${i}" ${available ? '' : 'disabled'}>
        <div class="gallery-picture">${available ? `<img src="assets/thumbnails/${cg.thumb}" alt="${esc(cg.title)}" loading="lazy" decoding="async">` : '<span aria-label="尚未解锁">未解锁</span>'}</div>
        <div class="gallery-caption"><small>${String(i + 1).padStart(2,'0')}</small><strong>${esc(cg.title)}</strong><span>${available ? esc(cg.detail) : '在剧情中遇见这一刻'}</span></div></button>`;
    }).join('')}</div>`;
  }
  function menuMarkup() {
    return `<p class="pause-chapter">${esc(engine.storage('chapter') || '九月')}</p><nav class="pause-menu" aria-label="游戏菜单">
      ${button('继续','resume')}${button('存档','save')}${button('读档','load')}${button('历史','history')}
      ${button('自动','auto')}${button('快进','skip')}${button('设置','settings')}${button('标题','title')}
      </nav>`;
  }
  async function open(next) {
    Jiaoguan.playback.stop();
    if (!panel.open) previousFocus = document.activeElement;
    view = next; panel.dataset.view = next; title.textContent = titles[next] || 'CG 鉴赏';
    let html = '';
    if (next === 'menu') html = menuMarkup();
    else if (next === 'save' || next === 'load') html = await saveMarkup(next === 'load');
    else if (next === 'settings') html = settingsMarkup();
    else if (next === 'gallery') html = await galleryMarkup();
    else if (next === 'confirm') html = `<div class="confirm-copy"><p>返回标题吗？当前进度已经自动记录，手动存档不会被覆盖。</p>${button('返回标题','confirm-title')}${button('留在这里','resume')}</div>`;
    content.innerHTML = html;
    if (!panel.open) panel.showModal();
    panel.querySelector('[data-ui-action="close"]').focus({ preventScroll: true });
  }
  function close(force = false) {
    if (view === 'gallery-view' && !force) { open('gallery'); return; }
    view = ''; panel.close(); previousFocus?.focus?.({ preventScroll: true });
  }
  function showGallery(index) {
    const cg = JiaoguanGallery[index];
    if (!cg || !(store.read('gallery')?.unlocked || []).includes(cg.id)) return;
    galleryIndex = index; view = 'gallery-view'; panel.dataset.view = view; title.textContent = `${String(index + 1).padStart(2,'0')} / ${cg.title}`;
    content.innerHTML = `<figure class="gallery-view"><img src="assets/cg/${cg.file}" alt="${esc(cg.title)}" decoding="async"><figcaption>${esc(cg.detail)}</figcaption></figure><nav class="gallery-arrows" aria-label="CG 切换">${button('← 上一张','gallery-prev')}${button('返回鉴赏','gallery-back')}${button('下一张 →','gallery-next')}</nav>`;
  }
  function galleryStep(direction) {
    const available = JiaoguanGallery.map((cg,i) => (store.read('gallery')?.unlocked || []).includes(cg.id) ? i : -1).filter((i) => i >= 0);
    if (!available.length) return;
    const position = available.indexOf(galleryIndex);
    showGallery(available[(position + direction + available.length) % available.length]);
  }
  async function clickAction(event) {
    const el = event.target.closest('[data-ui-action]'); if (!el || el.disabled) return;
    const action = el.dataset.uiAction;
    if (action === 'close' || action === 'resume') return close(true);
    if (['save','load','settings','gallery'].includes(action)) return open(action);
    if (action === 'history') { close(true); return engine.runListener('dialog-log'); }
    if (action === 'auto' || action === 'skip') { close(true); Jiaoguan.playback.set(action); return; }
    if (action === 'title') return open('confirm');
    if (action === 'confirm-title') {
      await saveTo(1,true); close(true); document.querySelectorAll('choice-container').forEach((node) => node.remove());
      await engine.run('end'); refreshTitle(); return;
    }
    if (action === 'save-slot') {
      if (engine.global('_engine_block')) { toast('正在切换场景，请稍候再保存。'); return; }
      const slot = Number(el.dataset.slot), key = 'JiaoguanSave_' + slot;
      if (store.validSave(store.read(key)) && !el.dataset.confirmOverwrite) {
        el.dataset.confirmOverwrite = '1'; el.querySelector('small').textContent = '再次点击确认覆盖'; return;
      }
      el.disabled = true; await saveTo(slot); await open('save'); return;
    }
    if (action === 'load-slot') { el.disabled = true; await load(el.dataset.key); if (el.isConnected) el.disabled = false; return; }
    if (action === 'delete-save') {
      if (!el.dataset.confirmDelete) { el.dataset.confirmDelete = '1'; el.textContent = '确认删除'; return; }
      await store.adapter.remove(el.dataset.key); await open(view); refreshTitle(); return;
    }
    if (action === 'gallery-image') return showGallery(Number(el.dataset.index));
    if (action === 'gallery-prev' || action === 'gallery-next') return galleryStep(action === 'gallery-next' ? 1 : -1);
    if (action === 'gallery-back') return open('gallery');
    if (action === 'fullscreen') {
      try {
        if (document.fullscreenElement) { screen.orientation?.unlock?.(); await document.exitFullscreen(); }
        else {
          await document.documentElement.requestFullscreen();
          if (screen.orientation?.lock && matchMedia('(max-width: 850px)').matches) await screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (_) { toast('此浏览器无法进入全屏。'); } return;
    }
  }
  function installDebug() {
    if (new URLSearchParams(location.search).get('debug') !== '1') return;
    const el = document.createElement('aside'); el.id = 'jg-debug';
    el.innerHTML = `<details><summary>DEBUG · 开发信息</summary><dl>${['scene','line','bond','flags','bgm','characters','playback','timers'].map((name) => `<div><dt>${esc(({scene:'Scene',line:'Line',bond:'Bond',flags:'Flags',bgm:'Current BGM',characters:'Characters',playback:'Playback',timers:'Timers'})[name])}</dt><dd data-debug="${name}">—</dd></div>`).join('')}</dl><label>Bond <input id="jg-debug-bond" type="number" min="0" max="20" value="0"></label><select id="jg-debug-scene" aria-label="跳转场景">${Object.entries(routeNames).map(([id,name])=>`<option value="${id}">${id} · ${name}</option>`).join('')}</select><div>${button('跳转','debug-jump')}${button('解锁 CG','debug-gallery')}${button('清除本游戏记录','debug-clear')}</div></details>`;
    document.body.appendChild(el);
    el.querySelector('input').addEventListener('change', (event) => { engine.storage({ bond: Math.max(0,Math.min(20,Number(event.target.value) || 0)) }); refreshRuntime(); });
    el.addEventListener('click', async (event) => {
      const action = event.target.closest('[data-ui-action]')?.dataset.uiAction; if (!action) return;
      if (action === 'debug-jump') { Jiaoguan.playback.stop(); if (!engine.global('playing')) await engine.runListener('start'); await engine.run('jump ' + el.querySelector('select').value); }
      if (action === 'debug-gallery') { for (const cg of JiaoguanGallery) await JiaoguanStage.action(engine,'gallery unlock ' + cg.id); toast('5 张 CG 已解锁'); }
      if (action === 'debug-clear') { if (confirm('只清除《教官》新版的存档、设置与鉴赏记录？')) { store.resetAll(); location.reload(); } }
      refreshRuntime();
    });
  }
  function init() {
    applyPresentation();
    const main = document.querySelector('main-screen');
    main.insertAdjacentHTML('afterbegin','<div class="title-lockup"><p class="title-season">九月 / 上海</p><h1>教官<span class="title-dot">。</span></h1><p class="title-tagline">一开始，我只是觉得这个人很好玩。</p></div><img class="title-character" src="assets/characters/liaosiyu/wearing_backpack.webp" alt="廖思宇" decoding="async"><div class="title-colophon"><span id="jg-title-note">校园视觉小说 · DEMO 3.0</span><span>JI A O G U A N</span></div>');
    const game = document.querySelector('game-screen');
    game.insertAdjacentHTML('afterbegin','<div class="game-topline"><span id="jg-chapter">九月 · 军训</span><span class="topline-title">教官</span></div><button id="jg-next" type="button" data-action="jg-next" aria-label="下一句" title="下一句"><span class="fas fa-arrow-right" aria-hidden="true"></span></button>');
    engine.registerListener('jg-next',{callback:()=>Jiaoguan.advance()});
    document.getElementById('jg-shell').insertAdjacentHTML('beforeend','<dialog id="jg-panel" aria-labelledby="jg-panel-title"><header class="panel-header"><div><small>教官 / JIAOGUAN</small><h2 id="jg-panel-title"></h2></div><button type="button" data-ui-action="close" aria-label="返回游戏" title="返回游戏"><span class="fas fa-times" aria-hidden="true"></span></button></header><div id="jg-panel-content"></div></dialog><div id="jg-toast" role="status" aria-live="polite"></div>');
    panel=document.getElementById('jg-panel');content=document.getElementById('jg-panel-content');title=document.getElementById('jg-panel-title');
    panel.addEventListener('click',clickAction);
    panel.addEventListener('cancel',(event)=>{event.preventDefault();close();});
    panel.addEventListener('input',(event)=>{
      const el=event.target,key=el.dataset.setting;if(!key)return;
      if (key==='size'||key==='motion') { presentation[key]=key==='motion'?el.checked:el.value; store.adapter.set('presentation',presentation);applyPresentation();return; }
      const value=Number(el.value);const output=el.closest('label').querySelector('output');
      if (['Music','Sound'].includes(key)) {
        const volume={...engine.preference('Volume'),[key]:value};engine.preferences({Volume:volume},true);
        for (const player of engine.mediaPlayers(key.toLowerCase())) player.volume=value;
        output.textContent=Math.round(value*100)+'%';
      } else {engine.preference(key,value);output.textContent=value+(key==='TextSpeed'?' ms':' 秒');}
    });
    installDebug(); refreshTitle(); refreshRuntime();
    if (!store.persistent) toast('浏览器禁止本地存档，本次可继续游玩，但刷新后记录可能消失。');
  }
  window.JiaoguanUI={init,open,close,saveTo,load,continueGame,refreshRuntime,refreshTitle,setChapter,updatePlayback,galleryStep,toast,get isOpen(){return Boolean(panel?.open);},get view(){return view;}};
})();


