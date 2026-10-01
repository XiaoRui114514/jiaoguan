'use strict';
/* 《教官》：普通校园生活。“噗噗噗”没有解释；100%没有关系定义。 */
(function () {
  const S = JiaoguanStage;
  const C = S.showCharacter, X = S.hideCharacter, M = S.moveCharacter, E = S.changeExpression;
  const CG = S.showCG, HCG = S.hideCG, B = S.bond;
  const question = (dialog, choices) => [S.pausePlayback(), { Choice: { Dialog: dialog, ...Object.fromEntries(choices.map(([key, text, label]) => [key, { Text: text, Do: 'jump ' + label }])) } }];
  monogatari.script({
    Start: [
      S.reset(), ...S.scene('military', 'military', '九月 · 军训'),
      'n 高中第一天。', 'n 没有想象中的什么青春热血。', 'n 只有热。', 'n 特别热。',
      S.playSe('playground'), C('xiaoxu', 'holding_laugh', 'mid-left'), 'xiaoxu 我靠，这太阳是不是有病？',
      C('dazhang', 'military_smug', 'center-left'), 'dazhang 高中第一课，如何晒成碳。',
      X('dazhang'), C('xiaozhang', 'military_normal', 'center-left'), 'xiaozhang 别说话了，一会儿教官过来了。',
      'p 教官？', 'xiaozhang 军训教官啊。',
      C('military_instructor', 'normal', 'front-center'), 'military_instructor 全体注意。',
      'n 真正的军训教官站在队伍前方，清点完人数后看向操场。',
      C('liaosiyu', 'military_attention', 'far-right'), 'n 队伍另一边，有个人从刚才起就站得笔直。',
      'p ……你看那个人。', 'xiaoxu 谁？', 'p 那个。', E('xiaoxu', 'looking_at_liaosiyu'), 'xiaoxu 哦。',
      ...CG('cg_01'), 'xiaoxu 站得跟真的教官一样。', 'p 有点。', 'n 他没在开玩笑。他真的就是这么站着。',
      HCG('cg_01'), X('xiaozhang'), C('dazhang', 'military_asking_question', 'center-left'),
      'dazhang 他是不是很适合去当教官？', 'liaosiyu 怎么了？', 'p 没什么。',
      X('xiaoxu'), X('dazhang'), E('military_instructor', 'calling_student'),
      'military_instructor 有没有同学愿意出来示范？', 'n 没人动。', 'jump Act1'
    ],
    Act1: [
      ...S.scene('military', 'military', '军训 · 示范'),
      C('military_instructor', 'calling_student', 'instructor-front'),
      C('liaosiyu', 'military_command_response', 'far-right'), 'liaosiyu 我。', 'p ……',
      'military_instructor 好，往前来。', M('liaosiyu', 'demonstrator', 'military_attention'),
      'n 廖思宇从队伍里走出几步，停在军训教官右侧的空地上。',
      C('xiaoxu', 'looking_at_liaosiyu', 'training-left'), 'xiaoxu 他真去了。', C('dazhang', 'military_smug', 'training-left-near'), 'dazhang 勇士。',
      E('military_instructor', 'demonstrating'), 'military_instructor 看清摆臂，手和脚要配合。', E('military_instructor', 'military_instruction'),
      'military_instructor 齐步走！', M('liaosiyu', 'walking-path', 'walking'),
      'n 第一步正常。', M('liaosiyu', 'demonstrator', 'walking'), 'n 第二步开始出现顺拐。',
      E('military_instructor', 'slightly_confused'), 'military_instructor 立定。你自己觉得怎么样？', E('liaosiyu','military_rest'), 'liaosiyu 还可以。',
      'n 军训教官顿了一下，仍旧认真地指了指他的摆臂。',
      E('military_instructor', 'serious'), 'military_instructor 手脚再配合一下，回队以后继续练。',
      E('dazhang', 'military_laughing'), E('xiaoxu','holding_laugh'), 'dazhang 哈哈哈哈哈哈！', 'xiaoxu 顺拐了！',
      'p 这个人有点意思。', 'n 休息的时候，大家问出了他的名字。', 'liaosiyu 廖思宇。',
      'xiaoxu 行，教官。', 'liaosiyu ……', 'n 前面那位是军训教官；我们刚起的外号，叫的是廖思宇。', 'jump Act2'
    ],
    Act2: [
      ...S.scene('military', 'military', '军训 · 调整军姿'),
      C('military_instructor', 'normal', 'instructor-far'), C('xiaoxu', 'calling_jiaoguan', 'mid-left'), C('liaosiyu', 'military_rest', 'mid-right'),
      'military_instructor 原地休息，别跑远。', 'n 他走到前面检查下一排。', 'n 小徐朝身边的廖思宇一抬下巴。', 'xiaoxu 教官。', 'liaosiyu 嗯？', E('xiaoxu','teasing'), 'xiaoxu 调整军姿。',
      E('liaosiyu', 'military_attention'), 'n 廖思宇立即站直。', C('dazhang', 'military_asking_question', 'center-left'),
      ...CG('cg_02'), 'dazhang ……稍息。', 'liaosiyu 稍息。', 'dazhang 立正！', 'liaosiyu 立正。',
      'n 大张先没忍住，笑声一下传到了队伍后面。', HCG('cg_02'), E('dazhang','military_laughing'), E('military_instructor','looking_at_liaosiyu'),
      'p 教官，再来一个。', 'liaosiyu 什么？',
      ...question('p 那就……', [['A','教官，调整军姿。','Act2A'], ['B','好了好了，不逗你了。','Act2B'], ['C','报告教官，请稍息。','Act2C']])
    ],
    Act2A: ['p 教官，调整军姿。', E('liaosiyu','military_attention'), 'n 他又站直了。', 'liaosiyu 好了。', 'p ……还真调整。', B(2,'military_joke'), 'jump Act3'],
    Act2B: ['p 好了好了，不逗你了。', E('liaosiyu','military_rest'), 'liaosiyu 哦。', 'n 他放松下来，拿起了水杯。', B(0), 'jump Act3'],
    Act2C: ['p 报告教官，请稍息。', E('liaosiyu','military_rest'), 'liaosiyu ……好。', 'p 哈哈哈哈哈。', B(2,'military_joke'), 'jump Act3'],
    Act3: [
      ...S.scene('classroom','school','军训第三天 · 回教室休息'),
      'n 回教室休息的时候，我才发现，我们的座位隔着几排桌子。',
      C('liaosiyu','military_rest','desk-standing'), C('xiaosun','military_looking_up','desk-behind'),
      'n 廖思宇在靠窗的那边。小孙坐在他后面。我的座位在另一边。',
      'n 想跟他说话，得绕过中间那几张桌子。', 'n 这天下午，我从座位起来，经过他那边，看到他捂着嘴。',
      X('xiaosun'), ...S.approachDesk('liaosiyu','military_covering_mouth_pupu'), 'liaosiyu 噗噗噗……噗噗噗……',
      'p ？', 'p 你干嘛呢？', 'liaosiyu 没什么。', 'p 你是不是在笑？', 'liaosiyu 没有。',
      'liaosiyu 噗噗噗……噗噗噗……', 'p 你还没有？', E('liaosiyu','military_rest'), 'liaosiyu 没有。',
      'n 行。', 'n 这人确实挺怪。', S.playSe('bell'), 'jump Act4'
    ],
    Act4: [
      ...S.scene('military','military','军训第五天 · 已经很熟了'),
      C('liaosiyu','military_rest','mid-right'), C('xiaoxu','calling_jiaoguan','mid-left','move_in'),
      'n 军训第五天。', 'xiaoxu 教官，早。', 'liaosiyu 早。', X('xiaoxu','move_out'),
      'n 小徐接着往前走，已经叫得非常自然。',
      C('xiaochen','military_normal','center-left','move_in'), 'n 小陈突然凑过来，故意弯下腰，把两只手举起来，自己先笑了。',
      E('xiaochen','military_bending_forward'), 'xiaochen 嘿嘿嘿……教官，我是 gay。', 'liaosiyu ……', S.wait(350), 'liaosiyu 哦。', 'liaosiyu 那你先站好。',
      E('xiaochen','military_raising_hands'), 'xiaochen 好的教官！', E('xiaochen','military_raising_hands'), 'n 他没忍住，笑着自己把姿势收了回去。', E('xiaochen','military_walking_away'), X('xiaochen','move_out'),
      'n 廖思宇低头拧开水杯，继续喝水。',
      ...question('p 今天要不要再逗他一下？', [['A','继续军训梗','Act4A'], ['B','正常聊天','Act4B'], ['C','问问他听什么歌','Act4C']])
    ],
    Act4A: ['p 教官。','liaosiyu 嗯？','p 调整军姿。',E('liaosiyu','military_attention'),'n 廖思宇站直。','liaosiyu 还有吗？','p 没了。',B(1),'jump Act5'],
    Act4B: ['p 教官，你军训结束之后准备干嘛？','liaosiyu 回家。','p ……','liaosiyu 吃饭。','p 非常具体。','liaosiyu 嗯。',B(0),'jump Act5'],
    Act4C: [
      'p 教官，你平时听什么歌？','liaosiyu 歌？','p 对。','liaosiyu 我不知道现在有什么歌。',
      C('dazhang','military_smug','mid-left'),'dazhang 你平时不听歌？','liaosiyu 听。','p 那你听什么？',
      'liaosiyu 《东南苦山行》。','n 大张停了一下。','p ……什么？','dazhang 你说哪个？',
      'liaosiyu 《东南苦山行》。',E('dazhang','military_shocked'),C('xiaozhang','military_confused','center-left'),'xiaozhang 这什么年代的？',
      'liaosiyu 不知道。','p 你会唱吗？','liaosiyu 会一点。','p 唱。','liaosiyu 现在？','dazhang 唱！',
      S.playBgm(''), 'n 他清了清嗓子，真的很认真地唱了两句。', S.wait(650),
      'n 我们一时不知道该鼓掌，还是该接着笑。', S.playBgm('military'),
      'dazhang 教官。','liaosiyu 嗯？','dazhang 你是真不知道现在年轻人听什么歌啊？','liaosiyu 不知道。',
      'p 行。记住了。',B(2,'asked_music'),'jump Act5'
    ],
    Act5: [
      ...S.scene('lunch','lunch','开学第一周 · 午休'),
      'n 军训结束后，校园生活正式开始。', S.playSe('classroom'),
      'n 午休。有人吃盒饭，有人趴着，有人写作业。阳光从窗户进来。',
      C('liaosiyu','eating','desk-far'), C('xiaosun','writing','desk-behind'),
      'n 廖思宇还是坐在那边。小孙在他后面低头写东西。',
      'n 我把练习册合上。抬头的时候，他正把饭盒盖放到桌边。',
      ...question('p 要不要过去？', [['A','绕过几排桌子，去他那边','Act5A'], ['B','先把这道题写完','Act5B'], ['C','去找小孙借支笔','Act5C']])
    ],
    Act5A: ['n 我从自己的座位起来，绕过中间的桌子。',S.playSe('chair'),X('xiaosun'),...S.approachDesk('liaosiyu','eating'),'p 教官。','liaosiyu 嗯？','p 你今天又吃这个？','liaosiyu 嗯。',B(2,'visited_lunch'),'jump Act5Talk'],
    Act5B: ['n 我先写完了眼前那道题。','n 再抬头，大张已经往廖思宇那边去了。','n 我跟着过去，站在旁边听了一会儿。',X('xiaosun'),...S.approachDesk('liaosiyu','eating'),B(0),'jump Act5Talk'],
    Act5C: ['n 我拿着写不出字的笔，走到小孙那边。',M('xiaosun','desk-near','looking_up'),'p 借支笔。','xiaosun 这支。','p 谢了。','n 廖思宇刚好抬头。',X('xiaosun'),...S.approachDesk('liaosiyu','eating'),'liaosiyu 你坐这里吗？','p 坐一会儿。',B(1,'borrowed_pen'),'jump Act5Talk'],
    Act5Talk: [
      S.playSe('paper'),'n 我把旁边的椅子拉出来一点。',E('liaosiyu','reading'),'liaosiyu 我昨天看了一个慈禧的东西。','p 你又开始了。',
      C('xiaozhang','curious','mid-left'),'xiaozhang 我也不知道为什么要听，但是这个人讲得太奇怪，我想听完。',
      C('dazhang','asking_question','center-left'),'dazhang 等一下。','liaosiyu 怎么了？', ...CG('cg_03'),
      'dazhang 李世民有几个儿子？','liaosiyu ……','liaosiyu 很多。','dazhang 具体呢？','liaosiyu 我不知道。',
      'p 你不是刚才还在讲慈禧吗？','liaosiyu 不影响。',E('dazhang','seriously_talking_nonsense'),'dazhang 张作霖是不是会飞？','liaosiyu 不会。',
      'dazhang 为什么？','liaosiyu 因为他是人。','n 周围突然安静。','xiaozhang 有道理。',
      'p 哈哈哈哈哈。','liaosiyu 还有吗？','dazhang 没了。','liaosiyu 继续讲慈禧。', HCG('cg_03'),
      E('xiaozhang','laughing'),'n 我们谁也不是真的为了听历史才坐在这里。','n 但每次有人经过，都会停下来听两句。',
      X('dazhang'), X('xiaozhang'), B(1), 'jump Act6'
    ],
    Act6: [
      ...S.scene('afternoon','school','开学 · 课间'),
      C('liaosiyu','reading','desk-far'), C('xiaosun','writing','desk-behind'),
      'n 后来，课间总会听到有人喊他的名字。', C('xiaoxu','adjusting_glasses','mid-left'), E('liaosiyu','holding_book'),
      'xiaoxu 廖思宇，老师刚才说的是哪页？','liaosiyu 十二页。','xiaoxu 行。',X('xiaoxu'),
      'n “教官”也有人叫，只是没军训那会儿那么多了。',
      'p 教官！','liaosiyu 嗯？','p 没事，叫一下。','liaosiyu 哦。',
      ...S.scene('pe','school','开学 · 体育课'), C('liaosiyu','pe_normal','mid-right'), C('dazhang','asking_question','mid-left'),
      'n 体育课还是同一个操场。主席台前面，已经没有军训时排得那么齐的队伍。',
      'dazhang 教官，调整军姿。','liaosiyu 这里是体育课。','p 哈哈哈哈。',
      'dazhang 那廖思宇，借个球。','liaosiyu 给。',X('dazhang'),
      ...S.scene('afternoon','school','开学 · 数学课后'),
      C('liaosiyu','writing','desk-far'),C('xiaosun','writing','desk-behind'),
      S.playSe('paper'),'n 数学课后，我还对着最后一道题。',
      'liaosiyu 你作业写完了吗？','p 没有。','liaosiyu 哦。','p 你呢？','liaosiyu 写完了。',
      'p ……你为什么这么快？','liaosiyu 我先写的。','n 我低头看了一眼自己刚翻开的练习册。','p 行。',
      'n 午休的时候，我还是会绕过那几排桌子。','n 有时他吃饭。有时他看书。有时也没聊什么。','jump Act7'
    ],
    Act7: [
      ...S.scene('lunch','lunch','某天午休 · 今天不过去'),
      C('liaosiyu','reading','desk-far'), C('xiaosun','writing','desk-behind'),
      'n 有一天午休，我留在了自己的座位上。','n 饭盒放在桌边。练习册翻开一半。',
      'n 我没绕过那几排桌子。', ...CG('cg_04'),
      'n 过了一会儿，我抬头。廖思宇正在看这边。','n 我低头，再看，他还在看。', HCG('cg_04'),
      'n 第三次抬头的时候，他站起来了。', X('xiaosun'), S.playSe('chair'),
      M('liaosiyu','aisle-right','normal_standing'),'n 他绕过中间的桌子，走到我旁边。',...S.approachDesk('liaosiyu','normal_standing'),
      S.branchText(4,'act7_open','你今天不过来吗？','你今天在这里？'),
      S.branchText(4,'act7_tail','他居然发现了。','原来他也会往这边看。'),
      'liaosiyu {{act7_open}}','p 今天先写作业。','liaosiyu 哦。','n {{act7_tail}}',
      'p 教官，你写完了？','liaosiyu 嗯。','n 他看了眼我的练习册，又回到自己的座位。',
      M('liaosiyu','desk-far','reading'),'n 我写完那道题。铃声还没响。','jump Act8'
    ],
    Act8: [
      ...S.scene('night','evening','晚自习后 · 教室慢慢空下来'),
      C('liaosiyu','packing_bag','desk-standing'), C('xiaosun','packing_bag','desk-behind'),
      'n 晚自习结束了。', S.playSe('bell'), 'n 椅子一张一张推回桌下。',
      X('xiaosun'), C('xiaoxu','leaving','mid-left'), 'xiaoxu 走了。','p 嗯。',X('xiaoxu','move_out'),
      C('xiaozhang','normal','mid-left'),'xiaozhang 廖思宇，明天见。','liaosiyu 明天见。',X('xiaozhang','move_out'),
      C('dazhang','normal','center-left'),'dazhang 我的水杯呢？','p 你手上。','dazhang 哦。走了。',X('dazhang','move_out'),
      C('xiaosun','normal','desk-behind'),'xiaosun 我把后面的窗关了。','liaosiyu 好。',X('xiaosun','fade_out'),
      'n 教室渐渐安静。廖思宇还在整理东西。','n 我从自己的座位起来，走到他那边。',
      ...S.approachDesk('liaosiyu','packing_bag'),S.playSe('paper'),
      'p 教官。','liaosiyu 嗯？','p 问你一个问题。','liaosiyu 你说。','p 你说……','n 我停了一下。',
      'p 你对我的好感度是多少？',E('liaosiyu','thinking'),S.wait(550),
      ...CG('cg_05'),'n 他愣了一下，认真想了几秒。',S.wait(650),
      E('liaosiyu','calm_100_percent'),'liaosiyu 100%。','p ……这么高。','p 你为什么给我100%？','liaosiyu 不知道。','liaosiyu 就是100%。',
      'n 我没接上话。', HCG('cg_05'), E('liaosiyu','wearing_backpack'),
      'liaosiyu 走吗？','p ……走。','n 他把书包背好。',
      'p 教官。','liaosiyu 嗯？','p 没事。走吧。','liaosiyu 嗯。',X('liaosiyu','move_out'),
      ...S.scene('empty','ending','晚自习后 · 空教室'),
      'n 门轻轻带上。','n 桌上最后一张试卷没有再动。', S.finish(),
      'centered 100%。','centered END','end'
    ]
  });
})();

