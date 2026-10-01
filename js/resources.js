'use strict';
// Only generated, approved sprites are registered. Source photographs have no runtime URL.
const characterSprites = (states) => Object.fromEntries(states.map((state) => [state, state + '.webp']));
const JiaoguanCast = {
  liaosiyu: { name: '廖思宇', color: '#d4aa75', directory: 'liaosiyu', sprites: characterSprites(['normal_standing','military_attention','military_rest','military_command_response','walking','reading','covering_mouth_pupu','military_covering_mouth_pupu','wearing_backpack','eating','holding_book','packing_bag','calm_100_percent','writing','thinking','shy','pe_normal']) },
  xiaoxu: { name: '小徐', color: '#a8c5d0', directory: 'xiaoxu', sprites: characterSprites(['normal','laughing','mischievous','adjusting_glasses','leaving','calling_jiaoguan','teasing','holding_laugh','looking_at_liaosiyu']) },
  dazhang: { name: '大张', color: '#cdb898', directory: 'dazhang', sprites: characterSprites(['normal','asking_question','smug','laughing','seriously_talking_nonsense','shocked','military_smug','military_asking_question','military_laughing','military_shocked']) },
  xiaozhang: { name: '小张', color: '#b4c9bc', directory: 'xiaozhang', sprites: characterSprites(['normal','curious','confused','laughing','listening','military_normal','military_confused']) },
  xiaosun: { name: '小孙', color: '#b4c2d0', directory: 'xiaosun', sprites: characterSprites(['normal','writing','looking_up','holding_laugh','packing_bag','military_looking_up','military_writing']) },
  xiaochen: { name: '小陈', color: '#c5b6c1', directory: 'xiaochen', sprites: characterSprites(['normal','bending_forward','raising_hands','laughing','walking_away','military_normal','military_bending_forward','military_raising_hands','military_walking_away']) },
  military_instructor: { name: '军训教官', color: '#c5c1a0', directory: 'military_instructor', sprites: characterSprites(['normal','military_instruction','serious','calling_student','demonstrating','slightly_confused','looking_at_liaosiyu']) }
};
window.JiaoguanCast = JiaoguanCast;
monogatari.characters({ n: { name: '', color: '#d5dddb' }, p: { name: '我', color: '#c1d0cc' }, ...JiaoguanCast });
monogatari.assets('scenes', {
  military: 'military.webp', pe: 'military.webp', classroom: 'classroom_day.webp',
  lunch: 'classroom_day.webp', afternoon: 'classroom_day.webp',
  evening: 'classroom_night.webp', night: 'classroom_night.webp', empty: 'classroom_night.webp'
});
const JiaoguanGallery = [
  { id: 'cg_01', title: '第一次注意到', detail: '军训 · 九月的太阳', file: 'cg_military_first.webp', thumb: 'cg_military_first.webp' },
  { id: 'cg_02', title: '调整军姿', detail: '军训 · 他真的执行了', file: 'cg_military_posture.webp', thumb: 'cg_military_posture.webp' },
  { id: 'cg_03', title: '午休历史', detail: '教室 · 继续讲慈禧', file: 'cg_lunch_history.webp', thumb: 'cg_lunch_history.webp' },
  { id: 'cg_04', title: '今天不过去', detail: '午休 · 隔着几排座位', file: 'cg_lunch_no_visit.webp', thumb: 'cg_lunch_no_visit.webp' },
  { id: 'cg_05', title: '100%', detail: '晚自习后 · 留白', file: 'cg_100_percent.webp', thumb: 'cg_100_percent.webp' }
];
window.JiaoguanGallery = JiaoguanGallery;
monogatari.assets('images', Object.fromEntries(JiaoguanGallery.map((cg) => [cg.id, cg.file])));
monogatari.assets('gallery', Object.fromEntries(JiaoguanGallery.map((cg) => [cg.id, cg.file])));
monogatari.assets('music', { school: 'bgm_school.wav', military: 'bgm_military.wav', lunch: 'bgm_lunch.wav', evening: 'bgm_evening.wav', ending: 'bgm_ending.wav' });
monogatari.assets('sounds', { bell: 'se_bell.wav', paper: 'se_paper.wav', chair: 'se_paper.wav', classroom: 'se_paper.wav', playground: 'se_bell.wav' });
