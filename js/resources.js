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
  xiaozhu: { name: '小朱', color: '#b8c8a9', directory: 'xiaozhu', sprites: characterSprites(['normal']) },
  military_instructor: { name: '军训教官', color: '#c5c1a0', directory: 'military_instructor', sprites: characterSprites(['normal','military_instruction','serious','calling_student','demonstrating','slightly_confused','looking_at_liaosiyu']) },
  ...Object.fromEntries([['xiaohua','小桦','#b7c8a2'],['xiaorui','小瑞','#a9c7d9'],['xiaoxi','小希','#dbb6aa'],['xiaoying','小颖','#c7bfd6'],['xiaoyu','小羽','#c1cfcb'],['meili_xiaoxu','美丽的小徐','#c8c7db'],['xiaojiang','小蒋','#cbbba6']].map(([id,name,color]) => [id, {name,color,directory:id,sprites:characterSprites(['normal','writing','eating','reading','thinking','wearing_backpack','military_attention','military_rest'])}]))
};
window.JiaoguanCast = JiaoguanCast;
JiaoguanCast.xiaoyu.sprites.filming = 'filming.webp';
JiaoguanCast.xiaorui.sprites.badminton = 'badminton.webp';
monogatari.characters({ n: { name: '', color: '#d5dddb' }, p: { name: '我', color: '#c1d0cc' }, ...JiaoguanCast });
monogatari.assets('scenes', {
  military: 'military.webp', military_rest: 'rest.webp', military_afternoon: 'military.webp',
  pe: 'pe.webp', hallway: 'hallway.webp', classroom: 'classroom.webp',
  lunch: 'lunch.webp', afternoon: 'afternoon.webp',
  evening: 'sunset.webp', sunset: 'sunset.webp', night: 'night.webp', empty: 'empty.webp', rainy: 'rainy.webp'
});
const JiaoguanGallery = [
  { id: 'cg_01', title: '第一次注意到', detail: '军训 · 九月的太阳', file: 'cg_military_first.webp', thumb: 'cg_military_first.webp' },
  { id: 'cg_02', title: '调整军姿', detail: '军训 · 他真的执行了', file: 'cg_military_posture.webp', thumb: 'cg_military_posture.webp' },
  { id: 'cg_03', title: '午休历史', detail: '教室 · 继续讲慈禧', file: 'cg_lunch_history.webp', thumb: 'cg_lunch_history.webp' },
  { id: 'cg_04', title: '今天不过去', detail: '午休 · 隔着几排座位', file: 'cg_lunch_no_visit.webp', thumb: 'cg_lunch_no_visit.webp' },
  { id: 'cg_05', title: '100%', detail: '晚自习后 · 留白', file: 'cg_100_percent.webp', thumb: 'cg_100_percent.webp' },
  { id: 'cg_06', title: '你先站好', detail: '军训休息 · 小陈的短客串', file: 'cg_chen.webp', thumb: 'cg_chen.webp' },
  { id: 'cg_07', title: '大家坐一会儿', detail: '午休 · 历史旁听', file: 'cg_group.webp', thumb: 'cg_group.webp' },
  { id: 'cg_08', title: '借个球', detail: '体育课 · 普通的一次传球', file: 'cg_pe.webp', thumb: 'cg_pe.webp' },
  { id: 'cg_09', title: '明天见', detail: '放学 · 走廊的夕阳', file: 'cg_departure.webp', thumb: 'cg_departure.webp' },
  { id: 'cg_10', title: '帽子在这边', detail: '军训回忆 · 不是叫你给她戴', file: 'cg_hat.webp', thumb: 'cg_hat.webp' },
  { id: 'cg_11', title: '镜头前的一句话', detail: '课间 · 小羽拍班级日常', file: 'cg_filming.webp', thumb: 'cg_filming.webp' },
  { id: 'cg_12', title: '先把球接起来', detail: '体育课 · 小瑞的羽毛球', file: 'cg_badminton.webp', thumb: 'cg_badminton.webp' },
  { id: 'cg_13', title: '纸离窗边远一点', detail: '雨天 · 教室里继续写', file: 'cg_rain.webp', thumb: 'cg_rain.webp' },
  { id: 'cg_14', title: '明天带两支笔', detail: '考前 · 没有谁全都复习完', file: 'cg_exam.webp', thumb: 'cg_exam.webp' },
  { id: 'cg_15', title: '各写各的那一页', detail: '晚自习 · 同桌与后排', file: 'cg_evening.webp', thumb: 'cg_evening.webp' }
];
window.JiaoguanGallery = JiaoguanGallery;
monogatari.assets('images', Object.fromEntries(JiaoguanGallery.map((cg) => [cg.id, cg.file])));
monogatari.assets('gallery', Object.fromEntries(JiaoguanGallery.map((cg) => [cg.id, cg.file])));
monogatari.assets('music', { school: 'bgm_school.mp3', military: 'bgm_military.mp3', lunch: 'bgm_lunch.mp3', daily: 'bgm_daily.mp3', evening: 'bgm_evening.mp3', ending: 'bgm_ending.mp3' });
monogatari.assets('sounds', { bell: 'se_bell.wav', paper: 'se_paper.wav', chair: 'se_chair.wav', classroom: 'ambient_classroom.mp3', playground: 'ambient_playground.mp3', night_ambience: 'ambient_night.mp3', ui_click: 'ui_click.wav', ui_confirm: 'ui_confirm.wav' });
