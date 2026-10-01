'use strict';
monogatari.settings({
  Name: '教官', Version: '3.0.0', Label: 'Start', Slots: 6,
  MultiLanguage: false, LanguageSelectionScreen: false, MainScreenMusic: '',
  SaveLabel: 'JiaoguanSave', AutoSaveLabel: 'JiaoguanAuto', ShowMainScreen: true,
  Preload: false, AutoSave: 0, ServiceWorkers: false, AspectRatio: '16:9',
  ForceAspectRatio: 'None', TypeAnimation: true, InstantText: true,
  AllowRollback: false, Screenshots: false,
  Storage: { Adapter: 'LocalStorage', Store: 'JiaoguanGameData', Endpoint: '' },
  // 2.8.0 expects milliseconds, NOT {Enabled, AfterChoices}.
  Skip: 110,
  AssetsPath: { root: 'assets', characters: 'characters', scenes: 'scenes', images: 'cg', music: 'music', sounds: 'sounds', gallery: 'cg' }
});
monogatari.preferences({ Language: '简体中文', Volume: { Music: .32, Voice: 0, Sound: .38, Video: 0 }, TextSpeed: 26, AutoPlaySpeed: 3 });
monogatari.translation('简体中文', {
  Start: '开始游戏', Continue: '继续', Gallery: 'CG 鉴赏',
  Log: '历史', GameMenu: '菜单'
});
