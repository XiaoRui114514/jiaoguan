'use strict';
/* Authored scene text; choices return to the same school-day chronology. */
(function () {
  const S = JiaoguanStage;
  const C = S.showCharacter, X = S.hideCharacter, M = S.moveCharacter, E = S.changeExpression;
  const CG = S.showCG, HCG = S.hideCG, B = S.bond;
  const L = (text) => text.trim().split('\n').map((line) => line.trim()).filter(Boolean);
  const question = (dialog, choices) => [S.pausePlayback(), { Choice: { Dialog: dialog, ...Object.fromEntries(choices.map(([key, text, label]) => [key, { Text: text, Do: 'jump ' + label }])) } }];
  monogatari.script({
    Start: [
      S.reset(), ...S.scene('military', 'military', '九月 · 第一天集合'), S.playSe('playground'),
      ...L(`
      n 高中第一天，我最先记住的不是教室，也不是哪个老师。
      n 是操场上晒得有点烫的地面，以及帽子里面完全不流动的空气。
      n 我低头看了一眼鞋尖。刚才才系好的鞋带，又松开了一边。
      p 我能不能先蹲一下？
      `), C('xiaoxu', 'holding_laugh', 'training-left'),
      ...L(`
      xiaoxu 你先看看前面。
      n 前面还没有人发口令。我赶紧系好，起身的时候差点撞到后面。
      p 不好意思。
      xiaorui 没事。你的水杯往里面放一点，等下别人会踩到。
      p 哦，好。
      n 队伍边上的几个杯子颜色相近，我们用鞋尖给它们划了一条看不见的边界。
      `), C('xiaorui', 'military_rest', 'training-left-near'), C('military_instructor', 'normal', 'instructor-front'),
      ...L(`
      military_instructor 全体注意。先按现在的位置站好，我清点一下人数。
      n 真正的军训教官站在队伍前方。他看过名单，确认没有人落下。
      military_instructor 帽子戴正，水杯统一放到队伍外侧。
      xiaoxu 我靠，这太阳是不是有病？
      p 你小声点。
      xiaoxu 我已经很小声了。
      n 他说完闭上嘴。隔壁队伍已经开始报数，我们这边还在往后调整距离。
      military_instructor 前后保持一臂距离。看前面，不要低头找影子。
      n 我本来确实在找影子，只好把头抬起来。
      xiaorui 这里没有影子。你找也没用。
      p 我看看它什么时候过来。
      xiaorui 那你可能要站到下午。
      n 靠边有两个同学换了位置。小颖把掉到地上的帽子捡起来，递回去。
      xiaoying 你名字还没写，先别跟别人的放一起。
      xiaoxi 我的笔在教室，等休息再写。
      xiaoying 我有。等下拿给你。
      n 我只记住了她们说的那支笔，还没把名字和脸完全对上。
      military_instructor 今天先练站姿和基本动作，不急着比谁做得快。
      military_instructor 觉得不舒服要报告，不要硬撑。听明白了吗？
      p 明白。
      n 周围的声音有早有晚，最后总算合成了一句。
      xiaoxu 这个回答都不整齐，感觉要出事。
      military_instructor 再说一遍，听明白了吗？
      n 这一次大家回答得整齐了一点。
      n 我把胳膊放到身体两侧，试着照他说的站好。
      n 汗从帽檐底下往下走。我不能擦，只能等它自己停下来。
      n 还没到上午的一半，我已经开始想中午的饭了。
      n 教官沿着队伍走了一圈，在前排停下，给一个同学调整手的位置。
      military_instructor 放自然一点，别把肩抬起来。
      xiaoxu 原来我刚才一直在耸肩。
      p 我也是。
      n 我们都悄悄放松了肩。就在这时，我看见队伍另一边有个人完全没动。
      `), 'jump FirstNotice'
    ],
    FirstNotice: [
      ...S.scene('military', 'military', '第一天 · 队伍另一边'),
      C('military_instructor', 'serious', 'instructor-far'), C('liaosiyu', 'military_attention', 'far-right'), C('xiaoxu', 'looking_at_liaosiyu', 'training-left'),
      ...L(`
      n 那个人站在靠右的一排，帽檐下面的眼睛一直看着前面。
      n 周围有人在换重心，有人在偷偷挪脚，他站得像刚被叫到一样。
      p 你看那个人。
      xiaoxu 谁？
      p 那个。靠右，站得特别直的。
      xiaoxu 哦，看到了。
      n 小徐看了两秒，又看向队伍前面的军训教官。
      xiaoxu 他站得跟真的教官一样。
      p 有点。
      xiaoxu 是不是以前练过？
      p 不知道，我连他叫什么都不知道。
      n 我们刚分班，很多人只是开学前在教室里见过一面。
      n 有的名字听起来很熟，真叫出来又怕叫错人。
      `), ...CG('cg_01'),
      ...L(`
      n 他没有在开玩笑。他真的就是这么站着，连手指也放得整整齐齐。
      n 我看着他，忽然觉得自己刚才动得有点太多了。
      p 他会不会不热？
      xiaoxu 那不可能。他脸上都是汗。
      p 那他怎么这么稳？
      xiaoxu 你过去问问。
      p 现在过去，先被问的就是我。
      n 小徐把想笑的表情收回去，视线重新转向前面。
      military_instructor 后面那排，眼睛看前方。
      p 哦。
      n 我站直了一点。右边那个人还是没动，不知道刚才听见我们说话没有。
      `), HCG('cg_01'), C('xiaohua', 'military_rest', 'training-left-near'),
      ...L(`
      xiaohua 你们俩的帽檐都歪了。
      xiaoxu 我的也歪了？
      xiaohua 一左一右。刚好。
      p 帮我看看现在呢？
      xiaohua 现在可以。
      n 她说完继续看前面，没有参加我们的研究。
      n 我调好帽子，又一次注意到右边。那个人的鞋带也系得特别规矩。
      military_instructor 稍息。身体重心放稳，别靠在别人身上。
      n 周围一下松动起来。那个人先完成动作，才低头看自己的左脚。
      xiaoxu 哎，他刚刚也看脚了。
      p 所以还是普通人。
      xiaoxu 你这个结论有点晚。
      n 我们没再说话。前面开始讲齐步走，教官先走了几步给大家看。
      military_instructor 注意自然摆臂，不要只想着脚。
      n 我脑子里已经只剩脚了。左脚之后是右脚，手应该往哪个方向？
      military_instructor 有没有同学愿意出来示范？
      n 太阳下面安静了一小会儿。没有人愿意做第一个。
      n 右边那个人把手举了起来，举得和刚才站姿一样认真。
      `), X('xiaohua'), 'jump Act1'
    ],
    Act1: [
      ...S.scene('military', 'military', '军训 · 第一次示范'),
      C('military_instructor', 'calling_student', 'instructor-front'), C('liaosiyu', 'military_command_response', 'far-right'),
      ...L(`
      liaosiyu 我。
      military_instructor 好，往前来。
      n 他从队伍里走出几步，鞋底在地上蹭出一点很轻的声音。
      `), M('liaosiyu', 'demonstrator', 'military_attention'), C('xiaoxu', 'looking_at_liaosiyu', 'training-left'), C('dazhang', 'military_smug', 'training-left-near'),
      ...L(`
      xiaoxu 他真去了。
      dazhang 勇士。我还在想怎么走第一步。
      p 人家可能真的会。
      n 教官站在他左边，先看了一眼他肩膀的位置。
      military_instructor 不用紧张。和我刚才一样，听口令再动。
      liaosiyu 好。
      n 他回答得很清楚，好像这件事一点也不困难。
      military_instructor 看清摆臂。手和脚要配合，动作不用太大。
      n 教官又示范了一次。我们在队伍里跟着比画，幅度小得像在挠痒。
      dazhang 我好像会了。
      xiaoxu 你左手和左脚一起动了。
      dazhang 那我还没会。
      `), E('military_instructor', 'military_instruction'),
      ...L(`
      military_instructor 齐步走！
      `), M('liaosiyu', 'walking-path', 'walking'),
      ...L(`
      n 第一步正常。第二步，他像突然想起还有一只手需要照顾。
      n 到第三步，手脚已经变成了同一个方向。
      p 等一下，他是不是……
      xiaoxu 顺拐了。
      n 廖思宇继续往前，表情依然认真，完全不像在故意表演。
      n 大张把嘴闭上了，可是闭得太用力，一看就知道在憋笑。
      `), M('liaosiyu', 'demonstrator', 'walking'), E('military_instructor', 'slightly_confused'),
      ...L(`
      military_instructor 立定。你自己觉得怎么样？
      liaosiyu 还可以。
      n 教官顿了一下，先让他放松，再指出左手和左脚的问题。
      military_instructor 手脚还要再配合一下。慢一点，先把顺序记住。
      liaosiyu 哦。那我再试一次。
      military_instructor 可以。先原地摆臂，不用急着往前走。
      n 他低头看了一眼手，把左右重新分开。这次做对了。
      xiaoxu 现在对了。
      dazhang 我刚才差点也跟着顺拐。
      p 你不是一直没动吗？
      dazhang 我在脑子里走。
      n 旁边传来两声没压住的笑。教官看过来，我们立刻安静。
      military_instructor 其他同学也练一下，示范不是让你们只看着。
      n 我试了两步，才发现看着容易，自己走也会越想越乱。
      n 廖思宇回到队伍之前，还和教官确认了一次动作。
      p 他还挺认真。
      xiaoxu 就是认真才有意思。
      n 那时我还不知道他的名字，却已经记住了刚才那几步。
      `), 'jump Act2'
    ],
    Act2: [
      ...S.scene('military_rest', 'military', '第一天 · 名字与外号'),
      C('military_instructor', 'normal', 'instructor-far'), C('liaosiyu', 'military_rest', 'mid-right'), C('xiaoxu', 'calling_jiaoguan', 'mid-left'),
      ...L(`
      military_instructor 原地休息五分钟。喝水，别跑远。
      n 他走到另一边，去看刚才动作没跟上的同学。
      n 我蹲下拿水杯的时候，大张已经在问那个男生叫什么了。
      `), C('dazhang', 'military_asking_question', 'center-left'),
      ...L(`
      dazhang 你叫什么？刚才怎么敢上去的？
      liaosiyu 廖思宇。
      p 哪几个字？
      liaosiyu 姓廖，思考的思，宇宙的宇。
      xiaoxu 哦，我点名的时候听见过。
      dazhang 那你以前练过吗？
      liaosiyu 没有。
      dazhang 没练过你就上去了？
      liaosiyu 他说可以试。
      n 他把杯盖拧开，说完就开始喝水，没有觉得自己的回答有什么问题。
      xiaoxu 行，教官。
      liaosiyu 嗯？
      p 他在叫你。
      liaosiyu 哦。
      n 真正的军训教官在队伍前面。我们这边刚起的外号，叫的是廖思宇。
      n 小徐似乎只是顺嘴说出来，但大张马上把这个叫法学会了。
      dazhang 教官，你觉得我们这排怎么样？
      liaosiyu 不知道。
      dazhang 要有信心。
      liaosiyu 你可以去问他。
      n 他往真正教官的方向看了一眼。大张也看了一眼，立刻把头转回来。
      dazhang 还是问你比较方便。
      xiaoxu 教官，调整军姿。
      `), E('liaosiyu', 'military_attention'), ...CG('cg_02'),
      ...L(`
      n 廖思宇真的站直了，水杯还拿在手里。
      p 你先把杯子放下。
      liaosiyu 哦。
      n 他放好杯子，又站直了一次。大张终于没忍住。
      dazhang 稍息。
      liaosiyu 稍息。
      dazhang 立正！
      liaosiyu 立正。
      n 小徐把帽檐拉低，肩膀开始抖。我也没能保持刚才的严肃。
      p 你怎么真的听啊？
      liaosiyu 反正等下也要练。
      xiaoxu 那倒是。
      n 廖思宇站在那里，看起来只是完成了一个非常普通的请求。
      `), HCG('cg_02'), E('dazhang', 'military_laughing'),
      ...question('p 休息还没结束，我说……', [['A', '教官，调整军姿。', 'Act2A'], ['B', '好了，不逗你了，先喝水。', 'Act2B'], ['C', '报告教官，请稍息。', 'Act2C']])
    ],
    Act2A: [...L(`
      p 教官，调整军姿。
      liaosiyu 我已经调整了。
      p 那再检查一下。
      n 他低头看鞋，又把帽子往上推了一点。
      liaosiyu 好了。
      p 还真检查。
      liaosiyu 你说的。
      n 我忽然觉得他记事情比我们起哄还快。
      `), B(2, 'military_joke'), 'jump TrainingRest'],
    Act2B: [E('liaosiyu', 'military_rest'), ...L(`
      p 好了，不逗你了，先喝水。
      liaosiyu 嗯。
      n 他把水杯拿起来，旁边空着的地方让给了我。
      p 你刚才上去的时候紧张吗？
      liaosiyu 有一点。
      p 我没看出来。
      liaosiyu 我也没怎么表现出来。
      n 我喝了口水，觉得这个答案好像没什么可以反驳的。
      `), B(0), 'jump TrainingRest'],
    Act2C: [E('liaosiyu', 'military_rest'), ...L(`
      p 报告教官，请稍息。
      liaosiyu 好。你也稍息。
      p 你还会回口令？
      liaosiyu 刚才听到了。
      n 他往边上挪了一步，给拿水杯的人留出位置。
      xiaoxu 学得挺快啊，教官。
      liaosiyu 这个不难。
      n 真正难的摆臂，我们暂时都没有提。
      `), B(2, 'military_joke'), 'jump TrainingRest'],
    TrainingRest: [
      ...S.scene('military_rest', 'daily', '第一天 · 阴影边上'),
      C('liaosiyu', 'military_rest', 'mid-right'), C('xiaorui', 'military_rest', 'mid-left'), C('xiaoxi', 'military_rest', 'center-left'),
      ...L(`
      n 休息时，我们挪到操场边上。那一点阴影还没盖住所有人的鞋。
      n 小瑞把水杯排到一边，免得起身时撞倒，自己在最外面坐下。
      xiaorui 这一片有风。
      p 我怎么没感觉到？
      xiaorui 等它再来一次。
      n 我们真的等了一会儿。风先吹动帽檐，再吹到后颈，短得几乎没用。
      xiaoxi 刚才谁把帽子拿成我的了？里面有一条蓝线。
      p 我这顶没有。你问后面。
      xiaoxi 找到了，是我自己放错了。
      n 她拿回帽子，先把名字写在里面，写完才坐下。
      xiaorui 你也叫他教官了？
      xiaoxi 我听见了，还以为你们真在找教官。
      p 外号。刚才临时起的。
      xiaoxi 那叫的时候，前面那个不会回头吗？
      n 我们同时往前面看。真正的教官在检查人数，没有看过来。
      liaosiyu 他应该知道不是叫他。
      p 你怎么知道？
      liaosiyu 我们在看我。
      xiaorui 确实，方向很明确。
      n 廖思宇把空了一半的杯子放好，伸手碰了碰发烫的杯盖。
      p 你中午吃什么？
      liaosiyu 不知道，还没看。
      xiaoxi 听说是饭盒送到教室。我刚才在门口看见推车了。
      xiaorui 那别等会儿全班都去堵门，先回座位。
      p 你现在就开始安排中午了。
      xiaorui 我饿了。
      n 这句说完，几个人都没有再接话。每个人都在喝自己那杯温水。
      n 我往操场另一头看。其他班的帽子看起来和我们一样，也分不清谁是谁。
      xiaoxi 下午还站吗？
      liaosiyu 应该练走路。
      p 我觉得站着也挺累的。
      liaosiyu 嗯。我脚有点酸。
      p 我还以为你一点不累。
      liaosiyu 为什么？
      p 因为你站得很直。
      liaosiyu 站直也会累。
      n 他说完把腿往前伸了一点，和旁边的人一起换了个坐姿。
      xiaorui 对，正常人都会累。
      n 我们没有再研究他是不是正常人。那阵风终于又来了。
      n 远处传来集合的哨声，有人先站起来，顺手把掉在地上的笔递回去。
      xiaoxi 走了。下午别把我的帽子拿走。
      p 你自己先记住在哪儿。
      n 我们跟着队伍回去，午饭还没到，但至少上午快结束了。
      `), 'jump TrainingDay2'
    ],
    TrainingDay2: [
      ...S.scene('military', 'military', '第二天 · 来得比昨天早'),
      C('xiaohua', 'military_attention', 'training-left'), C('xiaoying', 'military_rest', 'training-left-near'), C('liaosiyu', 'military_rest', 'far-right'),
      ...L(`
      n 第二天我比集合时间早到了几分钟，操场上还没有那么多人。
      n 小桦站在昨天的位置附近，手里拿着一张已经折过几次的安排表。
      xiaohua 今天下午练转法。最后一天有展示。
      p 你怎么记得这么清楚？
      xiaohua 表上写的。你昨天拿回去的那张。
      p 我可能放进书包就忘了。
      xiaoying 我放在课本里面，结果刚才找了半天。
      n 她把两张纸交给小桦，让她帮忙看有没有拿错。
      xiaoying 这一张是我们的吧？另一张我不知道谁的。
      xiaohua 都是。只是背面印反了。
      p 我还以为今天要交作业。
      xiaoying 今天不用，你别自己吓自己。
      n 廖思宇已经在另一边把水杯放好。我隔着几个人喊了他一声。
      p 教官，早。
      liaosiyu 早。
      p 你几点到的？
      liaosiyu 刚到。
      n 他指了指地上还没有拧紧的杯盖。真的是刚到，不是谦虚。
      n 我回到自己位置，想起昨天摆臂的顺序，先在心里试了一遍。
      `), C('military_instructor', 'normal', 'instructor-front'),
      ...L(`
      military_instructor 人到齐以后再整理。现在先检查鞋带和帽子。
      n 大家低头检查，动作一下比昨天熟练。后排还有人替前排整理领子。
      military_instructor 昨天学过的动作今天先复习，别只记住休息时间。
      p 他怎么知道我只记住这个？
      xiaoying 你声音小点。
      n 我闭上嘴。小桦把安排表折好，放到衣服口袋里。
      military_instructor 立正！稍息！
      n 昨天还要想一会儿的动作，今天身体先做了出来。
      n 右边有个人慢了一拍，自己小声说了一句“反了”，又收回去。
      n 教官没有让大家重来。他走过去，提醒那个人先把重心放稳。
      military_instructor 慢一点没关系，先做对，再跟上。
      xiaohua 这句话你可以记住。
      p 我已经做对了。
      xiaohua 我是说等下转弯。
      p 哦，那确实需要。
      n 我向右看了一眼。廖思宇正认真听说明，没有在看我们。
      n 教官让第一排开始练，其余的人在原地跟着做。
      xiaoying 我昨天回家一坐下来，就没想站起来。
      p 我也是。还把帽子戴着进了门。
      xiaoying 今天记得拿下来。
      n 她笑了一下，听见口令以后立刻转回前面。
      n 我发现班上已经没有第一天那么安静。名字仍然记不全，声音倒先熟了。
      n 今天太阳还是很热，但我至少知道自己的水杯在哪里。
      `), 'jump TrainingTurn'
    ],
    TrainingTurn: [
      ...S.scene('military', 'military', '第二天 · 转法练习'),
      C('military_instructor', 'demonstrating', 'instructor-front'), C('liaosiyu', 'military_attention', 'demonstrator'), C('xiaoxu', 'holding_laugh', 'training-left'),
      ...L(`
      n 转法看着只有几步，真正开始练时，操场上全是鞋底的声音。
      military_instructor 看我。先转，再并脚，不要把两个动作混到一起。
      n 他放慢动作，分别示范了向左和向右。我在心里给左右各留了一个位置。
      xiaoxu 左是哪边来着？
      p 你扶眼镜的那只手不是右边吗？
      xiaoxu 我两只手都扶。
      p 那你自己想办法。
      n 廖思宇又被叫到前面，这次只是给大家看手放在哪里。
      military_instructor 手不跟着甩。重心稳，动作结束再站好。
      liaosiyu 好。
      military_instructor 向右，转！
      n 前面那个人很顺利地转过去了。我跟着转，转完才发现小徐面对着我。
      p 你怎么到这边来了？
      xiaoxu 我刚才听成向左了。
      p 他明明说得很清楚。
      xiaoxu 我的脑子提前说了向左。
      n 小徐赶紧转回去。教官看过来，先让我们保持位置。
      military_instructor 有人转错不要追着别人转，先站稳。
      n 这句话很有用。后面有人本来正准备补半圈，现在停下了。
      liaosiyu 你们看我的右手。
      p 看到了。
      liaosiyu 这边是右边。
      xiaoxu 谢谢，非常清楚。
      n 他没有听出小徐在笑，仍旧把右手的位置给我们指了一遍。
      n 教官让廖思宇回队，再带着全班从头练习。
      `), M('liaosiyu', 'far-right', 'military_attention'), E('military_instructor', 'military_instruction'),
      ...L(`
      military_instructor 向后，转！
      n 我终于做对了一次，转完也没有踩到谁。
      xiaoxu 这个比较好记。
      p 因为不用分左右？
      xiaoxu 你别揭穿。
      n 休息前，教官让我们小组互相检查。廖思宇在自己位置上练，没有到处指挥。
      p 教官，你检查一下我。
      liaosiyu 你先做。
      n 我照刚才的顺序做了一遍，最后并脚的时候发出很响的一声。
      liaosiyu 不用这么用力。
      p 我想显得很整齐。
      liaosiyu 先别把脚磕疼。
      n 小徐听见这句，又把脸转到一边。我这次也觉得他说得很有道理。
      n 练完以后大家恢复到原来的方向。操场还是那个操场，我们总算没乱成一圈。
      n 廖思宇低头拍拍裤腿，确认鞋带没松，接着等下一次口令。
      `), 'jump Act3'
    ],
    Act3: [
      ...S.scene('classroom', 'daily', '第三天 · 回教室休息'), C('liaosiyu', 'military_rest', 'desk-standing'), C('xiaosun', 'military_looking_up', 'desk-behind'), C('xiaoyu', 'military_rest', 'mid-left'),
      ...L(`
      n 第三天上午下过一点雨，后来太阳又出来，空气比前两天还闷。
      n 教官让我们回教室休息一会儿。大家进门先找水杯，再找自己的座位。
      n 我这才看清，廖思宇在靠窗那一边。小孙坐在他后面，我在另一边。
      n 中间隔着几排桌子，想说话得起身绕过去，直接喊名字也会打扰别人。
      xiaoyu 门口别放杯子。刚才差点有人踢到。
      p 我拿走了。这里能放吗？
      xiaoyu 你的桌子下面就可以。
      n 她坐回自己的位置，把湿了一角的安排表压到书本下面。
      n 小孙从书包里找出纸巾，分给靠窗的几个人。
      xiaosun 有人要吗？只剩这一包了。
      liaosiyu 给我一张。
      xiaosun 你拿两张吧，帽子里面也湿了。
      p 我等会儿过去拿。
      n 我先把水杯放好，再从自己的位置起来，绕过中间那张伸出来的椅子。
      n 走到窗边之前，我就听见了一点断断续续的声音。
      `), X('xiaoyu'), X('xiaosun'), ...S.approachDesk('liaosiyu', 'military_covering_mouth_pupu'),
      ...L(`
      liaosiyu 噗噗噗……噗噗噗……
      p 你干嘛呢？
      liaosiyu 没什么。
      p 你是不是在笑？
      liaosiyu 没有。
      n 他手还放在嘴边，眼睛往桌子上看，就是没有看我。
      liaosiyu 噗噗噗……
      p 你还没有？
      liaosiyu 没有。
      p 行，那我当没听见。
      n 我从小孙那里拿了纸巾，擦擦帽子里面，坐到旁边空着的椅子上。
      liaosiyu 你帽子怎么皱了？
      p 放书包里压的。早上找了半天。
      liaosiyu 你放在上面就不会压。
      p 我现在知道了。
      n 他把自己的帽子放到桌角，帽檐朝着窗，没有特别刻意地整理。
      p 你的位置还挺凉快。
      liaosiyu 有时候会晒。
      p 我的那边现在已经晒到了。
      liaosiyu 那你坐一会儿。
      n 小孙在后面翻安排表。翻到背面以后，又翻回来。
      xiaosun 下午几点出去？
      liaosiyu 一点半。
      xiaosun 哦，还早。
      n 于是没有人着急起身。教室里只有杯盖、椅子和有人低声聊天的声音。
      p 教官，你的纸巾。
      liaosiyu 谢谢。
      n 他接过去擦手，没有再发出刚才的声音。我也没继续问。
      n 等大家准备回操场时，我才从窗边绕回去，拿自己的帽子和水杯。
      `), S.playSe('bell'), 'jump HatMixup'
    ],
    Act4: [
      ...S.scene('military_rest', 'military', '第五天 · 一次短客串'), C('liaosiyu', 'military_rest', 'mid-right'), C('xiaoxu', 'calling_jiaoguan', 'mid-left', 'move_in'),
      ...L(`
      n 军训第五天，鞋底已经记住了操场上那条路，走到哪里都是热的。
      n 小徐路过时顺口叫了一声，听起来和正常打招呼没什么区别。
      xiaoxu 教官，早。
      liaosiyu 早。
      xiaoxu 今天帽子终于没歪。
      p 你在跟谁说？
      xiaoxu 跟我自己。
      n 他拿着杯子往前走，去找刚才落在另一排的笔。
      `), X('xiaoxu', 'move_out'), C('xiaochen', 'military_normal', 'center-left', 'move_in'),
      ...L(`
      n 小陈从旁边凑过来，走到廖思宇面前，自己先把笑压了下去。
      xiaochen 教官。
      liaosiyu 嗯？
      n 他弯下腰，举起手，摆出一个很夸张、也不太站得稳的姿势。
      `), E('xiaochen', 'military_bending_forward'), ...CG('cg_06'),
      ...L(`
      xiaochen 嘿嘿嘿……
      p 你这个姿势站得住吗？
      xiaochen 教官，我是 gay。
      n 廖思宇看了他一眼，没有马上接话。小陈还在等那个预想中的反应。
      `), S.wait(350),
      ...L(`
      liaosiyu 哦。
      xiaochen 嗯？就这样？
      liaosiyu 你先站好。等会儿集合了。
      n 小陈低头看了看自己弯着的膝盖，没绷住，先笑出来了。
      xiaochen 好的教官！
      n 他自己把姿势收回来，帽子又因为抬手碰了一下，差点掉下来。
      p 你等的反应没来，帽子倒先来了。
      xiaochen 走了走了，我去拿水。
      liaosiyu 嗯。
      `), HCG('cg_06'), E('xiaochen', 'military_walking_away'), X('xiaochen', 'move_out'),
      ...L(`
      n 他笑着走开。这段小插曲也跟着结束，没有人追着讨论他刚才说的话。
      n 廖思宇拧开杯盖，先喝了一口，又看了看前面有没有集合的信号。
      p 你刚才怎么一点都没愣？
      liaosiyu 我愣了。
      p 哦，好吧。就是没有按他想的那样愣。
      liaosiyu 他想什么？
      p 我也不知道，可能想让你把水喷出来。
      liaosiyu 我还没喝水。
      n 对。连这一步也没赶上。我看着他把杯盖重新拧好。
      n 操场上有人提醒还有两分钟集合，我们暂时不用往回走。
      p 今天还有什么要练？
      liaosiyu 队列。下午可能一起走。
      p 你现在能走对了吗？
      liaosiyu 可以了。
      n 他没有专门展示。我也没让他在休息的时候重新走一遍。
      `), ...question('p 还有一点时间……', [['A', '再开一次军训玩笑', 'Act4A'], ['B', '随便聊聊军训结束以后', 'Act4B'], ['C', '问问他平时听什么歌', 'Act4C']])
    ],
    Act4A: [...L(`
      p 教官，调整军姿。
      liaosiyu 等一下，我把水杯放好。
      n 他这次没有拿着水杯立正，先把盖子检查了一遍。
      `), E('liaosiyu', 'military_attention'), ...L(`
      liaosiyu 还有吗？
      p 没了。你已经很熟练了。
      liaosiyu 练了好几天。
      p 我说的是听我们瞎喊。
      liaosiyu 这个也听了好几天。
      n 我想了一下，确实没什么可以补充。
      `), B(1), 'jump TrainingHistory'],
    Act4B: [...L(`
      p 你军训结束以后准备干嘛？
      liaosiyu 回家。
      p 然后呢？
      liaosiyu 吃饭。
      p 我是说假如有一天休息。
      liaosiyu 那就在家休息。
      n 他回答得很具体。我把想问的旅游和安排都收了回去。
      p 也行。我可能先睡到不用闹钟。
      liaosiyu 我想把鞋洗一下。
      p 这个也很实际。
      `), B(0), 'jump TrainingHistory'],
    Act4C: [C('dazhang', 'military_smug', 'mid-left'), ...L(`
      p 教官，你平时听什么歌？
      liaosiyu 我不知道现在有什么歌。
      dazhang 你平时不听歌？
      liaosiyu 听。
      p 那你听什么？
      liaosiyu 《东南苦山行》。
      n 大张停了一下。前面有人刚说完一句话，这边却突然安静了。
      dazhang 你说哪个？
      liaosiyu 《东南苦山行》。
      p 你会唱吗？
      liaosiyu 会一点。
      dazhang 那来一点。
      liaosiyu 现在？
      p 小声点就行。
      `), S.playBgm(''), ...L(`
      n 他清了清嗓子，真的认真唱了两句。我们没有接，因为谁都不会。
      n 大张的嘴张着，过了一会儿才合上。我把不知道怎么放的手放到膝盖上。
      `), S.wait(500), S.playBgm('military'), ...L(`
      p 行，听到了。你真的会。
      dazhang 我刚才还以为你临时编了一个歌名。
      liaosiyu 没有。
      p 回头你把名字写给我，刚才那几个字我没记住。
      liaosiyu 可以。
      n 他没再唱，也没让我们评价。我们终于能继续正常说话了。
      `), X('dazhang'), B(2, 'asked_music'), 'jump TrainingHistory'],
    TrainingHistory: [
      ...S.scene('military_rest', 'daily', '第五天 · 古代军队也要吃饭'), C('liaosiyu', 'military_rest', 'mid-right'), C('xiaozhang', 'military_normal', 'mid-left'), C('xiaohua', 'military_rest', 'center-left'),
      ...L(`
      n 下午休息，大张在问为什么要把每个人的步子练成一样长。
      n 小张正帮旁边的人找杯子，听完只说了一句“你问教官”。
      p 问哪个教官？
      xiaozhang 都可以。前面那个比较有用。
      liaosiyu 那你去问他。
      p 我就是顺嘴说一句。
      n 大张没有过去。他坐下来，换了一个离前面很远的问题。
      dazhang 古代军队也是这样训练的吗？
      liaosiyu 要看什么时候，不能都当成一样。
      p 所以你也不能直接给我们一个答案？
      liaosiyu 嗯。我知道的没有那么全。
      xiaohua 这句还挺可靠。
      n 廖思宇没有急着证明自己知道很多。他先问大张到底想问哪一种。
      dazhang 就是电视剧里面，几万人整齐地站着。
      liaosiyu 电视剧为了拍得清楚，会把很多事省掉。
      xiaozhang 比如水杯放在哪里？
      p 还有饭从哪里来。我现在比较关心这个。
      liaosiyu 军队当然也要吃饭。
      dazhang 那有没有人专门做饭？
      liaosiyu 有后勤的事，但每个时期怎么分，我不敢乱说。
      dazhang 我以为打完就自动有饭。
      xiaohua 你是不是在说游戏？
      dazhang 有一点。
      n 小张终于找到杯子，拿在手里，看起来像把后勤问题解决了一半。
      xiaozhang 找到了，蓝色那个不是我的。我的盖子小一点。
      p 你这杯子每天都认不出来？
      xiaozhang 昨天是别人拿错，今天是我拿错。
      n 廖思宇接着讲自己在书里看见的粮食运输，但讲到不确定的地方就停住。
      liaosiyu 后面这段我忘了。我回去再看一下。
      p 你不用为我们专门查，我们刚才只是坐着没事。
      liaosiyu 我自己也想知道。
      dazhang 那古代的马能不能自己带饭？
      xiaohua 你是问马粮，还是让马背我们的饭？
      dazhang 都问。
      liaosiyu 你先分开问。
      n 大张认真想了想，发现自己两个问题都不太认真，先笑了。
      dazhang 算了，我乱问的。
      xiaozhang 教官回答都要排队，你的问题也排一下。
      n 廖思宇点了一下头，不知道是同意哪句。
      n 集合的哨声响了。我们先把眼前的杯子放好，再谈得上几万人的事情。
      p 回去了。
      liaosiyu 嗯，走。
      n 他站起来拍掉裤腿上的灰，我才发现刚才坐的地方比旁边多了一点沙。
      `), 'jump TrainingAfternoon'
    ],
    TrainingAfternoon: [
      ...S.scene('military_afternoon', 'military', '军训中段 · 下午的队列'), C('military_instructor', 'military_instruction', 'instructor-front'), C('liaosiyu', 'military_attention', 'far-right'), C('xiaorui', 'military_attention', 'training-left'),
      ...L(`
      n 下午的太阳换到另一边，影子总算从鞋尖移到了身后。
      n 大家一起走，比单独示范更难。第一排快一点，后面就会越挤越近。
      military_instructor 不用追前面的脚，听口令。保持你自己的位置。
      n 第一遍走完，队伍还像一条没有拉直的线。小瑞回头看了看距离。
      xiaorui 我刚才差点踩到前面。
      p 我差点被后面踩到。
      liaosiyu 我也走快了。
      p 你这回至少没顺拐。
      liaosiyu 那个已经改了。
      n 他说完在原地摆了两下手，确认没有出问题，再把手放回去。
      military_instructor 第一排不用带得太快。再来一遍。
      n 第二遍开始之前，教官沿着队伍检查，让我们把间隔重新拉开。
      n 他从廖思宇旁边经过，提醒他看前面，不用一直盯着脚。
      military_instructor 顺序已经对了，现在把头抬起来。
      liaosiyu 好。
      p 你刚才一直在看脚？
      liaosiyu 我怕又反了。
      p 原来会怕。
      liaosiyu 会啊。
      n 那一句很普通，我却忽然觉得他比前几天好懂了一点。
      n 新的一遍比刚才齐。至少停下的时候，没有人额外补一大步。
      military_instructor 这次好一些。休息一下，等会儿分排练。
      xiaorui 终于。
      p 你说得比口令还整齐。
      xiaorui 我早就准备好了。
      n 小羽走过来，把刚才落在队伍边上的安排表交给小瑞。
      xiaoyu 这个是你的吧？名字写在背面。
      xiaorui 对，谢谢。我还以为在教室。
      xiaoyu 刚才从你口袋掉了。
      n 她说完就回去拿自己的杯子，没有站着等我们再聊几句。
      p 你放深一点，不然下次又掉。
      xiaorui 现在放不下，纸太大了。
      liaosiyu 你折一下。
      xiaorui 对哦。
      n 小瑞终于把纸折小，大家在旁边看着，觉得这事比整齐走路容易多了。
      n 我们这一排练完以后，换后排上去。前面的脚步声把下午切成一小段一小段。
      p 教官，明天还要这样走吗？
      liaosiyu 应该要。
      p 那我现在就开始累了。
      liaosiyu 明天再累。
      n 他把杯盖扣好，和我一起看前面。至少今天剩下的时间已经不多。
      n 临回教室前，我们最后走了一遍。风穿过队伍，谁都没有再找影子。
      `), 'jump TrainingReview'
    ],
    TrainingReview: [
      ...S.scene('classroom', 'daily', '军训后半段 · 把明天记下来'), C('liaosiyu', 'military_rest', 'desk-standing'), C('xiaosun', 'military_writing', 'desk-behind'), C('xiaoying', 'military_rest', 'mid-left'),
      ...L(`
      n 回教室以后，班里先安静了半分钟，随后椅子和杯盖一起响起来。
      n 我留在自己的座位，把明天要带的东西写到安排表下面。
      n 廖思宇在另一边，小孙坐在他后面。他们说话很轻，我只听见纸的声音。
      xiaoying 你写好了吗？等下有人要看这张。
      p 没有，我刚写到水杯。
      xiaoying 水杯你每天都带。明天要注意的是集合时间。
      p 对。我把时间圈出来。
      n 她把一张多出来的纸放到我桌上，顺便看看我写的那行数字。
      xiaoying 这里是七点四十，不是八点四十。
      p 我知道。我这七写得有点像八。
      xiaoying 那你还是重写一下，明天别连自己也骗了。
      n 我重新写清楚。小希从廖思宇那边走回来，手里多了一支笔。
      xiaoxi 教官的笔还挺好用。
      p 你去问什么了？
      xiaoxi 明天哪排先上。我昨天没听清楚。
      p 你问到了？
      xiaoxi 他说看教官安排。
      p 那也算答案。
      n 她坐回去继续记。我没有跟着过去，水杯还没拧开，鞋带也需要重新系。
      n 窗边传来大张的声音，隔着几排桌子，听不清他在问什么。
      dazhang 明天要是有人走错了怎么办？
      liaosiyu 跟着练好的走。
      dazhang 如果练好的也错了呢？
      xiaosun 那你别假设这么多。
      n 小孙说完继续写。大张终于坐下，一张椅子被拖得很响。
      xiaoying 我还以为他要一直问到放学。
      p 可能只是没想好怎么回座位。
      n 我写完安排，把纸夹到书里，没有起身。窗边的人聊自己的，我整理自己的。
      n 教室里有人用手机给家里说集合时间，说完很快收起来了。
      n 小羽把靠近门的窗开大一点，风把桌上的纸吹起了一个角。
      xiaoyu 你用本书压住。现在会飞。
      p 好，我放这里。
      n 我用练习册压好纸，坐着吹了一会儿风，才觉得背后不那么湿了。
      n 廖思宇从远处抬了一下头，好像在找什么，随后又低头去看安排表。
      n 我没有特意回应。这天我们并没有再坐到一起，事情一样都做完了。
      xiaoying 明天记得早点，不要在门口找帽子。
      p 这句你是对我说的吧？
      xiaoying 不然呢。
      n 我把帽子放到书包最上面，拉上拉链。这次总算不会再被压皱。
      n 走出教室时，窗边几个人还在确认最后一天的安排。
      n 我朝他们挥一下手，廖思宇看见了，也抬了抬手，没有喊很大声。
      `), 'jump TrainingLastPractice'
    ],
    TrainingEnd: [
      ...S.scene('military_afternoon', 'military', '军训结束 · 终于走齐了一次'), C('military_instructor', 'serious', 'instructor-front'), C('liaosiyu', 'military_attention', 'far-right'), C('xiaohua', 'military_attention', 'training-left'),
      ...L(`
      n 最后一天，大家到得都比平时早。小徐没再研究太阳，只研究自己的帽子。
      n 我们站回熟悉的位置，前面那块空地已经踩出了很多相近的脚印。
      military_instructor 按练过的来。出了小问题先稳住，不用着急。
      n 真正的教官站在队伍前方，等每一排准备好以后，才开始发口令。
      n 我看不到廖思宇的脸，只能看到右边那顶帽子和很直的肩线。
      military_instructor 齐步走！
      n 鞋底同时碰到地面的声音，比第一天清楚了很多。
      n 我没有想左右手，只盯着前面应该留出的距离，走完才想起自己也做对了。
      military_instructor 立定！
      n 我站稳。后面有人多挪了一点，但队伍没有因此散开。
      xiaohua 这次比昨天齐。
      p 我刚才都没想怎么走。
      xiaohua 那可能是练会了。
      n 我们站着等其他排走完。大张难得没有说话，嘴抿得很紧。
      n 教官看完最后一排，让大家原地休息，没有故意让谁再上来出丑。
      military_instructor 这几天大家都很认真。回去以后注意休息，别把水杯落下。
      p 谢谢教官。
      n 周围也响起类似的话，有人声音很大，有人说完才跟上。
      n 廖思宇站在学生队伍里，跟着大家一起道谢，没有任何奇怪的身份混淆。
      `), X('military_instructor', 'fade_out'), E('liaosiyu', 'military_rest'), C('xiaoxu', 'calling_jiaoguan', 'mid-left'),
      ...L(`
      xiaoxu 教官，军训结束了。
      liaosiyu 嗯。
      xiaoxu 以后不用调整军姿了。
      liaosiyu 本来也不用你喊。
      p 你现在会反驳了。
      liaosiyu 我之前也说过。
      n 小徐认真回忆了一下，没有想起来。我也没想起来。
      xiaoxu 那就是我们没听见。
      n 大家把杯子拿回来，杯盖磕在一起。一些人已经开始聊下周的课。
      xiaohua 你们回教室的时候把纸捡一下，别留在这里。
      p 这张是谁的？
      xiaohua 不知道，先拿走。
      n 我把那张没名字的纸折好，和自己的安排表放到一起。
      n 廖思宇的帽子拿在手里，头发被压得有一点扁，看起来和刚才站队时不太一样。
      p 你现在不像教官了。
      liaosiyu 我本来就不是。
      xiaoxu 外号还可以留下。
      liaosiyu 哦。
      n 他没有特别同意，也没有费力纠正。我们已经习惯这样叫他了。
      n 离开操场时，另一边还有班在走队列，口令隔着风传过来。
      n 我回头看了一眼，再往教室走。下次到这里，应该就是普通体育课。
      `), 'jump SchoolMorning'
    ],
    SchoolMorning: [
      ...S.scene('classroom', 'school', '正式开学 · 第一节课之前'), C('liaosiyu', 'writing', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), C('xiaoying', 'normal', 'mid-left'),
      ...L(`
      n 换回校服的第一天，我差点还想去拿军训帽子。
      n 教室里没有军训安排表了，桌面上换成新课本、练习册和还没写名字的卷子。
      n 我坐在自己的位置，先检查书有没有带齐。廖思宇仍然坐在隔着几排桌子的那边。
      xiaoying 数学练习册是哪本？我拿了两本长得一样的。
      p 厚的这本吧。另一本后面写了英语。
      xiaoying 哦，封面真的太像了。
      n 她把不需要的那本收进桌洞，再把要用的摊开。
      n 小孙从后面拍了拍廖思宇的椅背，递给他一张刚发下来的课程表。
      xiaosun 前面少一张，你帮忙传一下。
      liaosiyu 好。
      n 纸一张张往前走，我这边却多出一张。小颖过来看数量。
      xiaoying 你们这一排多了？那我拿走一张。
      p 可以。你刚才发的？
      xiaoying 大家一起发的，发到一半就对不上了。
      n 她没有一直留在我旁边，很快拿着纸去补另外一排。
      n 小希在另一头问黑板上写的是哪一页。我还没来得及回答，就听见廖思宇的声音。
      liaosiyu 十二页。
      xiaoxi 我刚才看成二十。谢谢。
      p 那我也看错了。
      n 我把书翻到正确的地方，压住刚才被风吹起来的页角。
      n 小徐扶了一下眼镜，从过道走过来，先看了看我的课本。
      xiaoxu 你怎么这么早就翻好了？
      p 因为刚才翻错了一次。
      xiaoxu 那我不用错了。
      n 他把书打开，坐回去。大家的声音比军训时低，事情倒更多。
      n 我没有过去找廖思宇。他正在把名字写到练习册上，写完还看了看封面。
      p 你们都写好名字了吗？
      xiaoying 写了，你先写，等下发下去又认不出。
      n 我拿出笔，名字写到一半，发现墨水颜色比想的浅。
      xiaoyu 你那支快没了。换一支吧。
      p 上次就没了，我怎么还留着。
      xiaoyu 可能忘了扔。
      n 我换笔，把那支不出水的放到一边。这一天需要解决的事都很小，却一直没停。
      n 廖思宇抬头看了一眼门，又低头把课本往里面移了移。
      n 铃声响的时候，教室安静得很快，只有最后两个人还在翻书。
      n 我坐正，发现没有人再要求把肩膀摆成昨天那样。
      n 第一节正式的高中课开始了。太阳还在窗外，课本已经打开到十二页。
      `), S.playSe('bell'), 'jump SeatChange'
    ],
    FirstBreak: [
      ...S.scene('hallway', 'daily', '第一周 · 十分钟的课间'), C('xiaorui', 'normal', 'mid-left'), C('xiaoxi', 'normal', 'center-left'), C('xiaoxu', 'adjusting_glasses', 'mid-right'),
      ...L(`
      n 下课以后，我先在走廊站了一会儿。教室外面没有桌子挡着，腿终于能伸直。
      n 小瑞拿着空杯子出来，问哪边有水。我指了指走廊尽头，他又回头看一眼队伍。
      xiaorui 那边这么多人？
      p 刚下课，都在等。
      xiaorui 我下一节再去。
      xiaoxi 你下一节也会看见这么多人。
      xiaorui 也是，那我现在去。
      n 他走到队伍后面，杯子拿在手里晃了晃，倒没催前面的人。
      n 小希靠在门边，看着下一节要用的书，手指夹在两页之间。
      xiaoxi 你刚才那个词听清了吗？我记到一半就停了。
      p 哪个？
      xiaoxi 第二行最后一个，老师念得有点快。
      n 我看了看她的笔记，又看看自己的，发现我们停在同一个地方。
      p 我的也没有后面。
      xiaoxu 你们两个加一起，还是半个词。
      p 那你有吗？
      xiaoxu 我有前面一句，没有这一个。
      xiaoxi 行，还是要回去问。
      n 她走回教室，没有隔着过道大声喊人。我等她拿到答案，先把杯盖拧开。
      n 小徐在旁边扶眼镜，镜片上有一小块光，把他眼睛挡住了一半。
      p 你眼镜是不是滑了？
      xiaoxu 一出汗就这样。
      p 军训的时候你怎么熬过来的？
      xiaoxu 一直扶。你不是看见了。
      n 小瑞接完水回来，杯子摸起来终于比刚才凉一点。
      xiaorui 其实排得挺快。你现在去还能接上。
      p 我等下去。
      xiaorui 再等就上课了。
      n 我还是跟着走过去。走廊尽头有风，水落进杯子里的声音也很清楚。
      n 回来的时候，小希已经把那个词补全，正把答案指给小徐看。
      xiaoxi 教官记了。他前后都写得很完整。
      p 他现在还有这个用途。
      xiaoxu 你别说得像发现一项功能。
      n 我们走进教室，廖思宇正在翻下一节的书，小孙在后面找笔。
      `), ...S.scene('classroom', 'daily', '第一周 · 回教室借笔记'), C('liaosiyu', 'holding_book', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), ...L(`
      p 教官，那个词是什么？
      liaosiyu 你拿笔记过来，我给你看。
      `), ...S.approachDesk('liaosiyu', 'holding_book'), ...L(`
      n 我绕过几张桌子，站在他旁边看完，才把空着的地方补上。
      p 好了。谢谢。
      liaosiyu 嗯。
      n 他继续翻书，没有留我再聊。我拿着笔记回到自己座位，刚好赶上铃声。
      n 十分钟里，我们好像做了很多事，又没有一件值得专门记下来。
      `), 'jump Act5'
    ],
    Act5: [
      ...S.scene('lunch', 'lunch', '第一周 · 午饭送到教室'), C('liaosiyu', 'eating', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), C('xiaohua', 'eating', 'mid-left'),
      ...L(`
      n 午饭送到教室的时候，讲台边的纸箱先被打开了一半。
      n 靠门的人往里面传，后排的人又站起来数剩下的份数。有人拿错了菜，只好隔着两排桌子换回来。
      xiaohua 谁还没拿到？先举一下手，我不记得刚才数到哪里了。
      p 我这边还有两份。
      xiaohua 你先别都拿走，那一份是给后面的。
      p 我知道。我就是拿起来给你看。
      n 她点了点头，把手里的名单折起来，终于坐回自己的座位。
      n 我打开饭盒，热气一下子盖住了眼前的菜。窗边已经有人在擦桌面，声音混在拆筷子的沙沙声里。
      xiaoxi 这个包装从哪边撕？
      p 有个小口。
      xiaoxi 我找到了，刚才一直捏反了。
      n 小希把筷子递给旁边的人，又低头看了一眼自己的饭盒。
      xiaohua 今天的菜好像和昨天差不多。
      p 昨天你不是说还不错？
      xiaohua 还不错和每天都吃是两回事。
      n 小徐已经吃到一半。他把空出来的纸巾推给我，指了指我桌上的水。
      xiaoxu 先挪过去一点，别一抬手碰倒。
      p 我刚才也在想这个。
      xiaoxu 那你想得比我慢一点。
      n 我把杯子放到桌角，顺便往窗边看了一眼。
      n 廖思宇坐在固定的那张桌子边，筷子拿得很稳，书没有摆在饭盒下面。
      n 小孙坐在他后面，先把作业本合上，才拆开筷子。
      xiaosun 你这道先别问我，我现在要吃饭。
      p 我还没问。
      xiaosun 你拿着本子朝这边看，我以为你要问。
      p 我在看你们还有没有纸巾。
      n 小孙从后面抽出一张递过来，廖思宇也把自己桌上的那包往过道挪了一点。
      liaosiyu 这里还有。
      p 好，等会儿用。
      n 他没有接着说话。我也没有隔着几排桌子继续喊，只先吃完自己面前的饭。
      n 教室里慢慢安静一点，声音却没有真正停下来。有人在比较菜，有人在找垃圾袋，还有人在讨论下午会不会换课。
      xiaoying 谁知道下午要不要带练习册？
      xiaohua 先放在桌上吧，真要用就不用再翻书包。
      p 你们吃饭的时候也能把下午安排完？
      xiaoying 不是安排，是怕忘。
      n 我吃完最后几口，把饭盒盖好。窗边的大张正把椅子往后拉，像是准备问点别的。
      dazhang 教官，你昨天说慈禧那个，还没说完吧？
      liaosiyu 我昨天没说慈禧。
      dazhang 那就是我自己想到的。
      p 你连昨天是谁说的都能想错。
      n 廖思宇抬头看了看我们，又看了看大张的饭盒。
      liaosiyu 你先吃完。
      dazhang 我马上。
      n 我拿着纸巾走过去，先绕开过道里没收好的椅子。小孙把旁边的书往里推了推，给我们留出一点地方。
      `), 'jump Act5Talk'
    ],
    Act5Talk: [
      ...S.scene('lunch', 'lunch', '第一周 · 慈禧不是皇帝'), C('liaosiyu', 'holding_book', 'desk-standing'), C('dazhang', 'asking_question', 'mid-left'), C('xiaoying', 'eating', 'mid-right'), ...CG('cg_03'),
      ...L(`
      n 大张终于盖上饭盒，问了一个他觉得很容易的问题。
      dazhang 慈禧到底算不算皇帝？她不是一直管着很多事吗？
      liaosiyu 她是太后。掌权和称号不是一回事。
      p 所以不能直接说她当了皇帝？
      liaosiyu 对。说具体事情的时候，还要看是哪一年。
      xiaoying 同治和光绪，我经常把先后记反。
      liaosiyu 同治在前，光绪在后。同治是她的儿子。
      dazhang 那光绪也是她的儿子？
      liaosiyu 不是亲生的。不能因为都在她旁边就这么记。
      n 大张听得很认真，但我觉得他刚才差一点就用这种方法记下去了。
      xiaoying 你先别自己总结，等他说完。
      dazhang 我还没有总结。
      p 你那个表情已经在总结了。
      n 廖思宇翻了一下书，把刚才夹进去的纸条拿出来。
      liaosiyu 同治去世以后，光绪即位。后面的事也不是一句她一直管着就能说完。
      p 你怎么连这个纸条都带着？
      liaosiyu 前几天看到这里，怕找不到。
      xiaoying 我以为是老师布置的。
      liaosiyu 不是，自己看的。
      n 他回答得很平常，像是在解释这张纸为什么夹在这一页。
      dazhang 那她坐在帘子后面，会不会听不清外面的人说话？
      p 你的重点终于来了。
      liaosiyu 我不知道那个房间实际听起来怎么样。
      dazhang 可以喊大声一点。
      xiaoying 你先把这句和事实分开。
      liaosiyu 对。垂帘听政不是说拉上帘子就突然变成皇帝。
      n 我把纸巾揉好，大张用筷子的外包装在桌边摆了一道很短的线。
      dazhang 我没有真的以为是一拉就变。
      p 你刚才那种说法挺像的。
      n 小颖看了一眼那道纸线，又把它收进垃圾袋。
      xiaoying 这个帘子先收掉，等会儿还要写作业。
      n 廖思宇低头看书，又抬头等我们问下一句。他没有要把整段历史一次讲完的意思。
      `), HCG('cg_03'), ...question('p 我接着问了一句。', [['Fact','再确认一下同治和光绪','LunchFact'],['Listen','听他把这一页讲完','LunchListen'],['Joke','问帘子能不能隔音','LunchJoke']])
    ],
    LunchFact: [...L(`
      p 所以我先记先后，不把他们全记成一个人的儿子。
      liaosiyu 嗯。你先记清楚这个就够了。
      xiaoying 我也这样记，比刚才清楚。
      n 廖思宇把纸条放回书里，停在刚才那一页，给我们看了一眼名字。
      p 行，这次应该不会混。
      dazhang 你别说太早，下午就可能混。
      p 那你下午负责提醒我。
      dazhang 我也不一定记得。
      `), B(2, 'checked_history'), 'jump LunchClearUp'],
    LunchListen: [...L(`
      p 你接着说，我先听，不乱插一句。
      liaosiyu 我也没准备讲很多。
      p 那就讲你刚才看到的那一点。
      n 他把书转过来一点，讲到一个自己不确定的名字时停住，重新看了一眼。
      xiaoying 这样挺好，比听我们互相猜快。
      dazhang 我今天已经少猜了。
      p 你只是还没来得及。
      n 大张笑了一下，没有打断他接下来的那句话。
      `), B(1, 'heard_history'), 'jump LunchClearUp'],
    LunchJoke: [...L(`
      p 所以帘子不能隔音，不然里面什么也听不到了。
      liaosiyu 你为什么还在想这个？
      p 大张刚才把我带过去了。
      dazhang 这个不能全算我的。
      xiaoying 算你们一起的，赶快回到前一个问题。
      n 廖思宇看着我们，像是在判断哪个问题需要真的回答。
      liaosiyu 我没去过那个时候的房间，不能这样说。
      p 好，知道了。这个当我乱问的。
      `), B(0), 'jump LunchClearUp'],
    LunchClearUp: [...L(`
      n 小孙从后面叫我们，把桌边的垃圾袋提起来一点。
      xiaosun 有包装的现在放，不然等会儿还要再找一次。
      dazhang 我还有这个。
      n 他把最后一截纸丢进去，廖思宇也合上书，开始擦自己桌上那一小块地方。
      p 明天还讲吗？
      liaosiyu 看明天有没有空。
      p 行。
      n 他没有答应一个专门为我们准备的安排。我也只是随口问，听见答案就往自己的座位走了。
      n 小颖回去拿练习册，大张去洗手。过道空下来以后，教室又变回了许多人各做各的样子。
      `), 'jump BorrowNotebook'],
    BorrowNotebook: [
      ...S.scene('lunch', 'daily', '第二周 · 今天先不过去'), C('xiaoyu', 'writing', 'mid-left'), C('xiaoxi', 'writing', 'mid-right'), C('liaosiyu', 'reading', 'desk-far'), ...CG('cg_04'),
      ...L(`
      n 第二周的一个午休，我刚把饭盒收好，小羽就把练习册放到我桌上。
      xiaoyu 这道你昨天写完了吗？我想看你前面怎么列的。
      p 写了，不过我还没确认后面有没有算错。
      xiaoyu 先看前面就行，后面我们一起算。
      n 我把本子抽出来，压住旁边快滑下去的尺。小希搬着椅子过来，没有挡住中间那条过道。
      xiaoxi 你们在看同一道？
      p 嗯。你也没写完？
      xiaoxi 写完了，但有一行和你们不一样。
      n 她把那一行指给我们看，小羽往前翻了两页，想找老师上课写过的例子。
      xiaoyu 等一下，这里好像不是这样放的。
      p 我昨天也在这里停了一会儿。
      xiaoxi 那先不要看最后的答案，前面重新对一遍。
      n 我们先把题目读完，再拿自己的步骤互相比较。比到第三行时，我发现是我抄错了一个数字。
      p 原来在这里。怪不得我后面怎么算都不顺。
      xiaoyu 你刚才还说可能是最后一步。
      p 我也是刚才才看出来。
      n 小希没有急着把自己的本子收走，等我改完，才把椅子往回挪了一点。
      xiaoxi 后面再算一次，别直接抄我那个。
      p 知道。
      n 远处有几声笑，我抬头看了一眼。大张站在窗边，廖思宇手里还拿着书，小孙转过身听他们说话。
      n 我今天没有走过去。不是在等他发现，也不是想看看他会怎么样。
      n 只是面前这道题还没算完，旁边两个人也正在等我写下一行。
      xiaoyu 你算出来多少？
      p 等一下，还差最后一行。
      n 我把视线收回来。风扇在头顶转，旁边有人翻过一页书，窗边的声音听不清具体说了什么。
      xiaoxi 我这一步好了，你们慢慢来。
      p 你先去接水吧，不用一直坐这里。
      xiaoxi 那我回来再看。
      n 她起身的时候把椅子推回桌下。我继续写，发现刚才那个不顺的地方已经过去了。
      xiaoyu 这次和我的一样。
      p 好。现在应该真的好了。
      n 小羽拿回练习册，把借来的尺也放回原位。
      xiaoyu 谢谢，明天你要看前面几页也可以找我。
      p 我可能今晚就要。
      xiaoyu 那你放学前提醒我，别等回家才说。
      n 午休剩下的一点时间，我趴在自己的桌上，没有再去窗边。
      n 那边的人在说话，这边的人也在过自己的午休。今天不需要把两件事接在一起。
      `), HCG('cg_04'), 'jump LunchNeighbours'
    ],
    WallHistory: [
      ...S.scene('lunch', 'lunch', '第二周 · 不是一面墙的长城'), C('liaosiyu', 'holding_book', 'desk-standing'), C('dazhang', 'asking_question', 'mid-left'), C('xiaoying', 'writing', 'mid-right'), ...CG('cg_07'),
      ...L(`
      n 隔了一天，大张拿着地理图册来问廖思宇，问的是图片里的长城。
      n 我本来只想把借来的橡皮还给小孙，听到这里，就在过道边多站了一会儿。
      dazhang 这都是秦始皇修的？
      liaosiyu 不是。不同地方、不同年代都有，不能都算到一个人身上。
      xiaoying 所以照片里这一段，还要看是哪里。
      liaosiyu 嗯。现在常见的很多长城照片是明长城的部分。
      p 我以前看图片就叫长城，没想过中间隔着那么久。
      dazhang 那修的人怎么知道最后会连多长？
      liaosiyu 你把很多时候当成一次工程了。
      n 小颖把作业本压在饭盒盖子上，挪出来一块地方，让图册可以放平。
      xiaoying 先看这一张，别一下问全部。
      dazhang 行。那这张上面，站在那里的人中午在哪吃饭？
      p 你问了三天历史，还是饭最重要。
      liaosiyu 有驻守和补给的事，具体这一处我不知道。
      dazhang 那我问一个你知道的。
      liaosiyu 你先说。
      dazhang 能不能沿着墙一直走，走到不想上课为止？
      xiaoying 你这个也不是历史问题。
      n 廖思宇看着图册上的照片，认真想了一下，才把手从书页上移开。
      liaosiyu 至少不是你想走就能一直走的。
      p 他本来也只是想不来上课。
      dazhang 我想两件事一起解决。
      n 小桦从前面经过，顺手拿走我们桌边一张空包装纸。
      xiaohua 你先解决明天交的作业，别走那么远。
      dazhang 你怎么每次经过都能听见关键那句？
      xiaohua 因为你说得很大声。
      n 她回自己位置去了。我们又往前翻了两页，发现图册里有些地方和刚才那张很不一样。
      p 原来不是看见一面墙，就能接着说它前后全部一样。
      liaosiyu 对，要先知道图片在哪里拍的。
      xiaoying 我给这页夹一下，后面找起来容易一点。
      n 她拿了张干净的便签，没有在书上写字。廖思宇把图册借给大张看，大张这次先读了图片下面的说明。
      dazhang 这里已经写了年代。
      p 那你刚才为什么不先看？
      dazhang 图片比字先被我看见。
      n 这句听起来倒很诚实。廖思宇没有笑他，只提醒他把书角压平，别吃饭的时候沾到油。
      n 小孙把饭盒往后挪了一点，图册终于有了一个不危险的位置。
      xiaosun 你们聊完放回前面，别压我的笔。
      p 看完就还。
      n 我站在旁边听完这一页，没有再把聊天拉成一整节课。小颖也低头继续写自己的题。
      `), HCG('cg_07'), 'jump LunchPack'
    ],
    LunchPack: [
      ...S.scene('lunch', 'daily', '第二周 · 午休剩下的二十分钟'), C('xiaohua', 'writing', 'mid-left'), C('xiaorui', 'eating', 'center-left'), C('xiaoyu', 'eating', 'mid-right'),
      ...L(`
      n 有时候午休也没有历史问题。那天我回到座位，小瑞还在吃最后一点饭，小羽已经把书拿出来了。
      xiaorui 刚才去拿水，回来就剩这么点时间。
      p 你先吃，不用跟我们一起收。
      xiaorui 我知道。你别把袋子拿走就行。
      n 小桦一边整理收上来的东西，一边把已经打过勾的那几张分到另一边。
      xiaohua 我这里少一张，你们看看是不是夹在自己那份里。
      p 什么颜色的？
      xiaohua 普通白纸。我问完也觉得这没什么用。
      xiaoyu 我翻一下，刚才有人把两张一起给我了。
      n 她把练习册合上，在夹着的纸里找了一会儿，果然找到了多出来的那张。
      xiaoyu 在这里。
      xiaohua 好，那就齐了。
      p 你这个比我们刚才找题目快多了。
      xiaohua 因为纸不会自己改一个数字。
      n 我想起昨天那道题，没有反驳。小瑞把饭盒盖好，朝我们伸了伸手。
      xiaorui 袋子还在吗？
      p 在你左边。
      xiaorui 我看见了，刚才以为是别人的书包。
      n 他把垃圾收好，擦了一遍桌子，再拿出下午的书。动作不算快，但总算没有落下东西。
      xiaoyu 你这支笔能借我一下吗？我的放书包底下了。
      p 可以。下节课前还我。
      xiaoyu 不用那么久，写个名字就还。
      n 小桦把纸抱到讲台上，回来的时候听见我们在算还能休息几分钟。
      xiaohua 要趴就现在趴，等你们算完又少五分钟。
      p 好，我不算了。
      n 我把手臂垫在桌上，旁边的人声还是很近，却没有哪一句需要我接。
      n 远处的椅子轻轻响了一下，窗帘被风鼓起来又落回去。没有人突然把午休变成一个特别的时刻。
      xiaorui 上课前叫我一下。
      p 你别比我先睡着就行。
      xiaorui 那可能有点难。
      n 我没有再去找廖思宇。这一天的午休只是把饭吃完，把纸找齐，再趴一会儿。
      `), 'jump Act6'
    ],
    Act6: [
      ...S.scene('pe', 'daily', '第二周 · 体育课先热身'), C('xiaorui', 'normal', 'mid-left'), C('xiaoxi', 'normal', 'mid-right'), C('liaosiyu', 'pe_normal', 'far-right'),
      ...L(`
      n 体育课下楼的时候，小瑞走得比我们快。他先去看球放在哪里，又回来提醒我们别走错集合的位置。
      xiaorui 今天在这边，刚才有人已经站到另一边去了。
      p 我就是准备跟着那几个人走的。
      xiaorui 所以我先叫你一下。
      n 小希把外套放好，低头拉了一下鞋带。我站在旁边等她，没有催。
      xiaoxi 这根总是松，我想再系紧一点。
      p 系好了再走，等会儿跑起来更麻烦。
      n 廖思宇站在靠后的地方，看老师示范热身。旁边的人还在聊天，他已经先把胳膊伸直了。
      xiaoxu 他这个动作，军训结束了也没变。
      p 现在不需要走齐。
      xiaoxu 我知道。我只是说他开始得挺早。
      n 老师叫大家散开一点。我们往左右让，地上的影子也跟着拉开。
      xiaorui 你再往这边一点，不然伸手碰到她。
      p 这里？
      xiaorui 嗯，可以了。
      n 我照着做完一组，才发现刚才一直在听他们说话，自己漏了前面两下。
      xiaoxi 你补一下吧，我刚才也少做一次。
      p 行，最后一起补。
      n 廖思宇没有像真正的教官那样检查我们。他做完就站在那里，等下一句安排。
      p 教官，你怎么体育课也站这么直？
      liaosiyu 我没觉得。
      xiaoxu 对，他没觉得，就是站着。
      n 我们笑了一下，没再让他调整。老师开始讲后面的练习，大家都转过头去听。
      n 今天太阳还是很亮，但没有军训时那种必须一直保持队形的紧。有人跑出去拿球，有人把外套折得更小。
      xiaorui 等会儿你们要不要一起传球？先不用投篮。
      p 我可以，别传太快。
      xiaoxi 我也来，不过我可能接不住。
      xiaorui 接不住就捡，没关系。
      n 他没有把这件事说成一个比赛。我们先去拿球，找了一块不挡别人的地方。
      `), 'jump BallSharing'
    ],
    BallSharing: [
      ...S.scene('pe', 'daily', '体育课 · 借个球'), C('liaosiyu', 'pe_normal', 'mid-right'), C('xiaorui', 'normal', 'mid-left'), C('xiaoxi', 'thinking', 'center-left'), ...CG('cg_08'),
      ...L(`
      n 小瑞把球递给廖思宇，让他先传过来。廖思宇低头看了看手里的球，像是把刚才那句要求再确认了一次。
      liaosiyu 直接传？
      xiaorui 对，先慢一点。
      n 球到我这边时不算快，我还是往后退了一小步才接住。
      p 行，我接到了。
      xiaoxi 你为什么像刚做完一道题？
      p 因为我刚才也不确定能不能接到。
      n 我把球传给小希，力气比刚才少了一点。她伸手接，球碰到指尖又落下去，滚了两圈才停。
      xiaoxi 等我一下。
      xiaorui 不急，先捡回来。
      n 她弯腰捡球，抬头时发现我们都还站在原地，没有人因为这一下开始催她。
      xiaoxi 我再试一次。
      p 这次我近一点。
      n 廖思宇把站的位置挪开，让我们中间空出一条直线。
      liaosiyu 这里应该好一点。
      xiaorui 对，不用隔那么远。
      n 传到第三圈的时候，我们终于不用每次先问谁准备好了。小瑞偶尔提醒一下方向，也没有一直指挥。
      p 你这个球是刚才拿的那个？
      xiaorui 嗯，等会儿要放回去。
      liaosiyu 还有人要用。
      p 那最后再传一圈。
      n 廖思宇接到球，转过身传给小瑞。动作很普通，没有谁突然变得特别厉害。
      n 我想到军训时他站在队伍前面的样子，又觉得现在这样更接近我们平时看见的人。
      xiaoxi 我接住了。
      p 看见了，这一次很稳。
      xiaoxi 别再说，我一听就容易想太多。
      n 她把球传出去，我们在旁边笑了一下。小瑞最后抱住球，朝器材那边看。
      xiaorui 好，先休息。有的人已经开始排队了。
      liaosiyu 我去放。
      p 我跟你一起，顺便过去拿水。
      n 廖思宇拿着球往回走，小瑞去叫另一边的同学。小希还在看自己的手，像是在回想刚才接住的那一下。
      `), HCG('cg_08'), 'jump SportsShade'
    ],
    SportsShade: [
      ...S.scene('pe', 'daily', '体育课 · 树影边上'), C('xiaoyu', 'normal', 'mid-left'), C('xiaohua', 'thinking', 'center-left'), C('liaosiyu', 'pe_normal', 'mid-right'),
      ...L(`
      n 树影下面比场地中间凉快。小羽先把水杯挪出一块地方，小桦正在找外套的袖子。
      xiaohua 我怎么把它折成这样了？刚才还觉得放得挺好。
      xiaoyu 你从下面抽出来，那个袖子压在里面。
      n 小桦重新展开外套，摇了摇头，最后直接搭在手臂上。
      xiaohua 算了，回去再叠。
      p 你们刚才玩什么？
      xiaoyu 跑完就站这边了，刚才在看你们传球。
      xiaohua 你第一次接的时候退得挺远。
      p 后面已经没退了。
      xiaoyu 嗯，后面好多了。
      n 廖思宇把空出来的位置让给刚走过来的人，自己往树边站了一点。
      p 你不喝水？
      liaosiyu 刚才喝了。
      p 哦。
      n 这句说完就没有下一句，我们各自站了一会儿，听旁边的球落在地上。
      xiaohua 下节是什么来着？
      xiaoyu 我记得要拿练习册，但不确定换没换。
      p 回教室看一下，别现在靠猜。
      n 小瑞把球放回去，远远朝我们抬了一下手，提醒要集合了。
      xiaoyu 走吧，外套都拿上。
      n 小桦回头检查了一下脚边，没有落东西。廖思宇等我们转身，才一起往集合的地方走。
      n 经过那片太阳时，刚才凉下来的胳膊又热起来。我们没有像军训那样保持间隔，只在碰到别人时让一让。
      p 现在回去，教室里应该挺困。
      xiaohua 你现在就已经开始预告了。
      p 我是在说我自己。
      liaosiyu 我也有一点。
      n 他这句让我意外了一下。我看了他一眼，他还在看前面的路，没有觉得自己说了什么特别的事。
      `), 'jump BadmintonBorrow'
    ],
    AfternoonDrowsy: [
      ...S.scene('afternoon', 'daily', '第二周 · 普通下午'), C('liaosiyu', 'writing', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), C('xiaoxi', 'thinking', 'mid-left'),
      ...L(`
      n 下午的教室比上午暖。我们从操场回来，先把水放好，再一层层往外拿书。
      n 小希站在桌边，盯着自己刚写的那行字看了很久。
      xiaoxi 我是不是把这里漏了？
      p 你少写了后面两个字。
      xiaoxi 我刚才写到这里走神了。
      n 她重新拿起笔，我也把自己的本子翻开。那一页看起来熟悉，真正要写的时候又得重新看题。
      p 我现在连题目都要读两次。
      xiaoxi 那我们先别聊天，等你读完。
      n 我答应了，却先打了一个哈欠。小徐看见，自己也跟着打了一下。
      xiaoxu 你这个会传。
      p 我又不是故意的。
      n 廖思宇还在窗边写。他把笔停下来，抬头看一眼黑板，再低头补后面那句。
      n 小孙在他后面拿尺，尺没找着，先摸到了昨天放进去的那截纸。
      xiaosun 你们有没有看见我的尺？
      p 你本子下面是不是？
      xiaosun 是，找到了。
      n 他把纸丢进垃圾袋，像是顺便处理完了昨天剩下的一件小事。
      n 这一个下午没有什么特别的事件。只是有人漏字，有人找尺，有人盯着自己写过的数字重新算。
      p 教官，你现在困不困？
      liaosiyu 有一点。
      p 那你怎么还能写得这么稳？
      liaosiyu 不写等会儿还要写。
      xiaoxu 他没有说不困，只是比我们先开始。
      n 我听完把笔拿稳了一点，没有去窗边看他的步骤。自己的题还是要自己写。
      xiaoxi 你刚才那题好了？
      p 前面好了，最后再看一下。
      xiaoxi 我也一样。
      n 过了一会儿，教室里响起一阵同时翻书的声音。风从窗边进来，小孙把纸角压住，廖思宇把杯子移开一点。
      n 我伸了一下肩膀，又把刚才没看完的那一行读完。
      n 午休的热闹和体育课的声音都已经过去，眼前只有一页还没写满的纸。
      `), 'jump ThreeKingdoms'
    ],
    ThreeKingdoms: [
      ...S.scene('afternoon', 'daily', '第二周 · 小说和史书'), C('liaosiyu', 'holding_book', 'desk-standing'), C('xiaoying', 'reading', 'mid-right'), C('xiaozhang', 'curious', 'mid-left'),
      ...L(`
      n 课间的小张问廖思宇，他看的三国故事为什么和电视剧里不一样。
      xiaozhang 我记得有一段特别热闹，但这本里好像没有。
      liaosiyu 你看的是哪本？
      xiaozhang 就是你桌上这本。
      liaosiyu 小说和史书不是同一种。先看书名，不能把所有三国故事放在一起。
      xiaoying 我也是以前只记住三国两个字，后面的字就不看了。
      p 那电视剧又是另一种。
      liaosiyu 嗯。会改，也会加东西。
      n 小张把书翻到封面，终于把名字完整读了一遍。
      xiaozhang 这次看到了。
      p 你刚才一直在找情节，没有看封面。
      xiaozhang 因为我以为肯定有。
      n 大张听见三国，从旁边挪过来，但没有把小张挤开。
      dazhang 那诸葛亮要是有手机，是不是就不用派人送信？
      liaosiyu 那就不是原来那个条件了。
      dazhang 我知道，我是假设。
      xiaoying 先说你在假设就行，别回头记成他真的有。
      p 他可能只是想给故事加个群聊。
      dazhang 这样大家就不用每次见面。
      liaosiyu 你还得让其他人也有手机。
      n 大张顿了一下，发现这个条件比他想的多。
      dazhang 那大家都有。
      p 你这一下把整个故事都改了。
      n 廖思宇合上书，没有跟着编一个答案。他只是说这种问题可以开玩笑，不能当成历史结论。
      liaosiyu 真要看历史，还是得回到那个时候的条件。
      xiaozhang 那我先把这本看完，再找那段电视剧。
      xiaoying 找到的时候记一下出处，下次就不用全凭记得。
      n 小张点头，把书还给廖思宇。大张也退回自己的位置，嘴里还在说群里可能会有谁。
      p 你看书的时候，也会把小说里的事记错吗？
      liaosiyu 会。所以不确定的时候要再看。
      n 他没有说自己全都分得清。我听见这句，反而更愿意下次再来问。
      `), ...question('p 我决定把话停在哪儿。', [['Source','问清楚这本书的名字','HistorySource'],['Finish','先让他继续看书','HistoryFinish'],['Imagine','加入大张的假设群聊','HistoryImagine']])
    ],
    HistorySource: [...L(`
      p 你给我看一下书名，我回去也先把名字分清楚。
      liaosiyu 这里。你别只记前面两个字。
      p 知道，我把后面也记上。
      n 他把封面转过来一点，小颖也看了一眼。我没有借走，只先记在自己的本子角上。
      xiaoying 下次问的时候能说清是哪本，就容易很多。
      p 行，这次记全。
      `), B(2, 'asked_source'), 'jump AfternoonPages'],
    HistoryFinish: [...L(`
      p 那你继续看，我们先不过来问了。
      liaosiyu 嗯。
      n 他重新打开刚才那页。我往旁边让一步，小张也拿着自己的书回去了。
      xiaoying 其实课间不一定非要聊完，明天还可以问。
      p 对，反正教室又不会走。
      n 我们各自坐回去，刚才那个问题没有结论，也没有谁觉得必须补一个结尾。
      `), B(1), 'jump AfternoonPages'],
    HistoryImagine: [...L(`
      p 大张，那你这个群里会不会天天发通知？
      dazhang 那肯定会，有的人还会不看。
      xiaoying 现在这个已经很像我们自己的班了。
      liaosiyu 这不能算历史。
      p 知道，我们就在说一个假设。
      n 廖思宇点头，继续看书。我和大张又说了两句，自己也发现离原来的问题越来越远，索性停了。
      `), B(0), 'jump AfternoonPages'],
    AfternoonPages: [
      ...S.scene('afternoon', 'daily', '第二周 · 各自的一页'), C('xiaoyu', 'reading', 'mid-left'), C('xiaoxi', 'reading', 'mid-right'), C('xiaorui', 'writing', 'center-left'),
      ...L(`
      n 下一节课前，我没有再往窗边走。小羽借来的练习册还在我桌上，提醒我应该先把自己的那页补完。
      xiaoyu 你看完了吗？我后面还要用。
      p 再等两分钟，只剩一处。
      xiaoyu 好，我先看书。
      n 小希坐在旁边，把笔夹进翻到一半的书里。她问我一会儿能不能帮忙拿几张纸，我答应了。
      xiaoxi 不多，前面那一小叠就行。
      p 你现在要？
      xiaoxi 下课再拿，先别站起来。
      n 小瑞正写一个名字，写完才发现格子不够，又换到下面一行。
      xiaorui 我刚才没看见这里还有字。
      p 我也差点填错。
      n 我们把同一张纸转过来重新看了一遍，确认最后两格不是给自己填的。
      xiaoyu 那后面留空，你别全写满。
      xiaorui 好。
      n 窗边有笑声，我没有抬头。面前那一处还没有抄完，手边还有借来的书。
      n 这不是我突然不想理谁，只是一个下午里总会有别的事更先轮到。
      p 好了，还你。
      xiaoyu 谢谢，笔也在里面吗？
      p 在，我夹回原来那页了。
      n 她拿过去翻了一眼，确认以后放进书包。小希把要拿的纸告诉我位置，小瑞把填好的那张压在课本下面。
      n 大家做的事都很小，做完却让桌面少乱了一点。
      xiaoxi 下课叫我一下，我怕又忘。
      p 我也怕忘，你先在本子角上写一下。
      n 她拿笔写了两个字，笑着说这样比较可靠。我继续看自己的题，等铃声响起再翻下一页。
      `), 'jump EnglishPairwork'
    ],
    PaperAndBooks: [
      ...S.scene('afternoon', 'lunch', '第三周 · 古人怎么传一页纸'), C('liaosiyu', 'holding_book', 'desk-standing'), C('xiaohua', 'reading', 'mid-left'), C('dazhang', 'seriously_talking_nonsense', 'mid-right'),
      ...L(`
      n 第三周，小桦抱着几张刚发下来的纸经过窗边，问起廖思宇看的那本旧书。
      xiaohua 以前没有打印机，要给很多人看，是不是得写很多遍？
      liaosiyu 有抄写，也有印刷。还要看你说的是什么年代。
      p 我们最近每次问历史，都会先问到年代。
      liaosiyu 因为不同时候真的不一样。
      n 小桦把纸放稳，抽出自己的那张折一下，留着等会儿带走。
      dazhang 那一个人抄的时候写错了，后面会不会都跟着错？
      liaosiyu 有可能，所以看材料也要比较，不能只看到一处就当都一样。
      xiaohua 这个像我们抄笔记，前面一个字漏了，后面的人也不知道。
      p 今天那个我已经补好了。
      xiaohua 我没有说你。
      n 大张把话题转到印刷，想知道做一整页是不是比抄一遍更麻烦。
      liaosiyu 要准备。也有不同的办法，不是拿一张纸按一下就能出来。
      dazhang 我本来想说像盖一个很大的章。
      p 你这次至少还在说纸。
      xiaohua 但别直接当成所有印刷都一样。
      n 廖思宇翻了一下书，找不到自己想说的那页，就没有硬讲下去。
      liaosiyu 我那个例子忘了，等我下次找到再说。
      p 没关系，我就是听到这里随便问。
      dazhang 那以前发作业是不是慢很多？
      xiaohua 你又把我们下午的事带过去了。
      liaosiyu 也不是所有时候都像我们现在的课堂。
      n 他把书合上，先接过小桦递给他的那张纸，看老师到底让我们做什么。
      p 你先看现在这一张吧，不然等会儿又问别人。
      liaosiyu 嗯，这个今晚要交。
      n 大张听到今晚，马上拿起自己的那份。刚才的问题还可以明天再说，眼前这张不太愿意等。
      xiaohua 写完放到前面那一叠，别夹进别的练习册。
      p 你这次提醒得很具体。
      xiaohua 因为昨天真有人夹走了。
      n 我们低头看纸，历史聊天就停在这里。廖思宇也拿起笔，在名字那一格先写完。
      `), 'jump Departure'
    ],
    Departure: [
      ...S.scene('sunset', 'school', '第三周 · 放学前的桌面'), C('xiaohua', 'normal', 'mid-left'), C('xiaorui', 'thinking', 'center-left'), C('xiaoying', 'thinking', 'mid-right'), C('liaosiyu', 'packing_bag', 'desk-standing'),
      ...L(`
      n 放学前，我们先把明天要带的东西写在本子角上。小桦拿着最后几张纸，从前排往后递。
      xiaohua 这张带回去，别和今天交的那张放在一起。
      p 好，我先夹在外面。
      n 小颖拿到以后看了一遍，又问小瑞明天是不是还要带另一份。
      xiaoying 我这里写了两个名字，你看清楚老师最后说哪一个了吗？
      xiaorui 后面那个。不过我再去前面看一下，别传错。
      n 他没有直接答一个很肯定的答案，走到讲台边看完才回来。
      xiaorui 对，是后面那个。上面还没擦掉。
      xiaoying 好，那我把另一个划掉。
      n 我们各自把书收进去。小希把书包拉链拉到一半，发现里面夹着自己还没写完的那张纸，又拿出来看了一眼。
      xiaoxi 我这个得带回去。
      p 你别放到最底下，不然回家又要全倒出来。
      xiaoxi 嗯，我放前面。
      n 廖思宇桌上没有很多东西。他先把书对齐，再把水杯盖紧，最后拿起夹在两本书之间的纸。
      xiaosun 廖思宇，你后面那本也带吗？
      liaosiyu 带，晚上还要用。
      p 你书包看着怎么没那么满？
      liaosiyu 我没把所有书都装进去。
      p 我也没装所有的。
      xiaoxu 但你装了你上周就该拿出来的东西。
      n 我翻了一下书包，发现里面确实还有一张已经没用了的纸。
      p 这个今天就拿出来。
      n 小徐没有继续笑我，先去找自己的外套。廖思宇把最后那本放好，站起来背书包。
      n 班里的声音又热闹起来，有人约着一起下楼，有人在问门口等的人是谁，有人还没有找到水杯。
      dazhang 我的杯子呢？
      p 你桌角那个不是？
      dazhang 看见了，刚才书挡住了。
      n 他拿起杯子，没有再用一个问题留住我们。今天的历史已经说过，剩下的都是明天还能继续的事。
      `), 'jump HallwayTomorrow'
    ],
    HallwayTomorrow: [
      ...S.scene('hallway', 'evening', '放学 · 明天见'), C('liaosiyu', 'wearing_backpack', 'mid-right'), C('xiaohua', 'wearing_backpack', 'back-left'), C('xiaoxi', 'wearing_backpack', 'mid-left'), ...CG('cg_09'),
      ...L(`
      n 走廊里还有一块很亮的太阳。小桦抱着纸往前走，小希停下来等旁边的人把鞋带系好。
      xiaohua 明天见，纸别落桌上。
      p 在书包里了。
      xiaoxi 我也放好了。
      n 廖思宇走到门边，回头看了一眼教室，不知道是在确认自己的东西，还是等小孙出来。
      p 教官，走了吗？
      liaosiyu 走。
      n 小孙从里面跟上来，手里拿着刚才差点忘记的尺。
      xiaosun 还好回头看了一眼。
      p 你今天找了两次它。
      xiaosun 明天我换个地方放。
      n 我们沿着走廊走，没有谁专门把别人留下。到楼梯口时，小希和小桦走另一边，小孙先下了一层。
      xiaoxi 明天见。
      liaosiyu 明天见。
      p 明天见。
      n 说完我们又走了几步，才各自往自己的方向去。
      n 我没有把这一次回头想得很复杂。书包还是重的，楼梯还要走，明天早上还是得按时来。
      n 只是这一周快结束的时候，我已经知道有些人会站在哪里，有些人会先说哪一句。
      `), HCG('cg_09'), 'jump OldCityChat'
    ],
    OldCityChat: [
      ...S.scene('lunch', 'lunch', '后来 · 古人的普通一天'), C('liaosiyu', 'reading', 'desk-standing'), C('xiaozhang', 'listening', 'mid-left'), C('xiaoyu', 'thinking', 'mid-right'),
      ...L(`
      n 后来的一个午休，小张问廖思宇，书里那些古人不打仗、不上朝的时候都在做什么。
      xiaozhang 我感觉电视剧里每个人都一直有事发生。
      liaosiyu 因为它不会把所有普通时候都拍出来。
      p 比如一直等午饭？
      liaosiyu 也有很多日常的事。只是你不能把不同地方的人都说成一样。
      xiaoyu 那我们看见的，可能就是最值得写出来的那一点。
      liaosiyu 嗯。普通人留下来的记录也不一定很多。
      n 大张路过，听了半句，马上给故事加了一个条件。
      dazhang 那古人想赖床怎么办？
      p 你是替今天早上问的？
      dazhang 顺便问。
      liaosiyu 我不知道这个具体怎么回答。你说哪个人？
      dazhang 一个普通人。
      xiaoyu 你又把所有普通人放在一起了。
      n 大张想了一下，发现随便选一个人也没有什么根据，只好说自己就是乱问。
      dazhang 算了，这个我乱说的。
      xiaozhang 那先看书里写到谁，不要凭空找。
      n 廖思宇把书翻回原来那页，没有借着问题讲很长。他只是指了指一处，说自己觉得这一点很有意思。
      p 原来你有时候看的是这种小事。
      liaosiyu 嗯，不一定都是大事。
      n 小羽坐下来吃最后几口饭，小张又问了一句，听完就回自己的桌子。
      n 我们没有得出一个关于古人的大结论。廖思宇继续看书，大张回去找笔，我也把下午要用的纸拿出来。
      n 教室里的普通一天，并不比书里那种普通时候更整齐。
      `), 'jump CameraSetup'
    ],
    EveningBefore: [
      ...S.scene('night', 'evening', '晚自习前 · 把今天接上'), C('xiaorui', 'reading', 'mid-left'), C('xiaoying', 'wearing_backpack', 'center-left'), C('xiaoyu', 'wearing_backpack', 'mid-right'), C('liaosiyu', 'holding_book', 'desk-far'),
      ...L(`
      n 有晚自习的那天，大家重新坐回教室。白天搭在椅背上的外套已经穿起来，窗外的亮慢慢退到看不清。
      n 小瑞拿着书，先把夹在里面的那张纸找出来。小颖放下书包，抬头看了一下前面写的安排。
      xiaoying 今晚先交这个，后面那份可以带回去。
      p 和下午说的一样？
      xiaoying 嗯，我刚才又看了一遍。
      xiaoyu 那我先写要交的。
      n 我也这样做。小瑞把书立在桌边，找了一个不挡住别人视线的位置。
      xiaorui 你们谁有多的纸？我这张后面已经写满了。
      p 我撕一张给你。
      xiaorui 好，谢谢。
      n 我撕得不太整齐，他把毛边折到里面，没有说什么。小希从前面回来，顺手把还没发完的纸带给我们。
      xiaoxi 这个刚才漏了，前面让我往后传。
      p 我这边拿到了。
      n 窗边的廖思宇已经把书打开。小孙在后面翻笔袋，又把后面的窗关上一点。
      xiaosun 风有点凉，我先关这里。
      liaosiyu 好。
      n 我看了一眼那个位置，忽然想起军训第一天，大家还不知道杯子放哪里，名字也要问两遍。
      n 现在小桦递纸、小瑞找球、小颖确认安排，小希借笔记、小羽把练习册拿回来，很多事都已经不用解释很久。
      n 廖思宇还是会认真回答一个没必要那么认真的问题，也还是会在不确定的时候说不知道。
      p 教官，今天带的还是那本？
      liaosiyu 换了一本。
      p 我明天再问，今晚先把这个写完。
      liaosiyu 嗯。
      n 他答应得很自然，好像明天我们还会在同一个地方说两句话，本来就不用提前约好。
      xiaoyu 你这道写到哪里了？
      p 第二行，后面还没有。
      xiaoyu 那我先自己看，不打断你。
      n 我低头继续写。窗外的声音变远，教室里剩下翻纸和笔尖落下的声音。
      n 回想没有把今天变成什么特殊日子。它只是让我发现，这些人已经从第一天的陌生名字，变成我每天会遇到的人。
      `), 'jump Act7'
    ],
    Act7: [
      ...S.scene('night', 'evening', '晚自习 · 他也会走过来'), C('liaosiyu', 'reading', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), C('xiaoyu', 'thinking', 'mid-left'),
      ...L(`
      n 我写到一半，发现最后一行一直没算出来。小羽也在看自己的题，暂时帮不上忙。
      xiaoyu 等我先弄懂这一步，我现在也卡着。
      p 不急，我再看一次。
      n 我没有像午休那样绕过几排桌子，先把前面的数字重新对了一遍。
      n 抬头的时候，廖思宇正在看这边。我以为他只是往后看黑板，低头又算了两行。
      n 第二次抬头，他还朝这边看了一眼。
      p 小羽，你看出来了吗？
      xiaoyu 还没有，不过我前面有一处和你不同。
      n 她把本子往我这边挪，我们正要一起比较，旁边响起轻轻的一声椅子响。
      `), S.playSe('chair'), X('xiaosun'), M('liaosiyu', 'aisle-right', 'normal_standing'), ...S.approachDesk('liaosiyu', 'normal_standing'),
      S.branchText(6, 'act7_open', '你今天一直不过来吗？', '你今天在这里写？'), ...L(`
      liaosiyu {{act7_open}}
      p 今天先把这道写完。我们两个都卡了一下。
      xiaoyu 我现在找到一处不一样了。
      liaosiyu 我看一下？
      p 可以，就这一行。
      n 他没有把我们的本子拿走，只站在旁边看，指了一下前面漏掉的条件。
      liaosiyu 这里还要用上。
      p 我刚才又漏看了。
      xiaoyu 我也是在这里少了一步。
      n 我们重新写，廖思宇在旁边等了几秒，确认接得下去才准备回去。
      p 教官，你自己写完了？
      liaosiyu 还有一点。
      p 那你先写吧，这里我们应该会了。
      liaosiyu 嗯。
      n 他走回自己的座位，小羽把本子收回来，我把漏掉的条件圈了一下。
      xiaoyu 原来不用把后面全改掉。
      p 对，刚才想得太远了。
      n 我继续写，没有一直抬头。但刚才是他从那几排桌子之间走过来，这件事我还是记住了。
      n 这没有把我们突然变成别的关系。只是我平时会去的那段路，他也已经知道怎么走。
      `), M('liaosiyu', 'desk-far', 'writing'), 'jump EveningQuiet'
    ],
    EveningQuiet: [
      ...S.scene('night', 'evening', '晚自习 · 写完前的几分钟'), C('liaosiyu', 'writing', 'desk-far'), C('xiaosun', 'writing', 'desk-behind'), C('xiaoying', 'reading', 'mid-left'),
      ...L(`
      n 晚自习后半段，我们把写好的纸一张张往前传。小颖检查了一遍自己的名字，没有再拿错那一叠。
      xiaoying 这张是今晚交的吧？
      p 对，我的放在下面。
      n 小孙从后面递过来，让我们别把另外那本一起传走。
      xiaosun 本子留着，只有纸。
      p 好，看到了。
      n 我把纸传出去，桌上突然空了一块。小徐把自己的笔收好，朝窗边说了一句。
      xiaoxu 廖思宇，明天那题再借我看一下。
      liaosiyu 可以。
      n 他叫的是名字。“教官”这个称呼没有消失，只是很多时候已经不需要拿它开头。
      n 我看着窗边那个背影，想起刚开始大家总爱让他调整军姿，连真正的教官都要回头确认在叫谁。
      n 现在更常听见的是借书、问页码、提醒带东西。他还是认真接，哪句听不懂就再问一句。
      p 教官，刚才那个条件谢谢了。
      liaosiyu 嗯，写完了？
      p 写完了。
      n 我说得很小声，他也没有隔着桌子再问别的。小孙正把后面的几张纸对齐，我们都等着最后一点时间过去。
      n 廖思宇低头看见大张传来的纸角，上面画了一个不太像的杯子。他抬手挡住嘴，肩膀轻轻动了一下。
      `), E('liaosiyu', 'covering_mouth_pupu'), ...L(`
      liaosiyu 噗噗噗。
      p 你先别笑，那张等会儿还得交。
      n 他把纸翻过来放平，重新坐好。笑声没有留下一个要解释的理由，也没有把安静的教室打断很久。
      n 我把最后一支笔放进笔袋，拉好拉链，等铃声响起来。
      `), E('liaosiyu', 'writing'), 'jump Act8'
    ],
    Act8: [
      ...S.scene('night', 'evening', '晚自习后 · 教室慢慢空下来'), C('liaosiyu', 'packing_bag', 'desk-standing'), C('xiaosun', 'packing_bag', 'desk-behind'), S.playSe('bell'),
      ...L(`
      n 晚自习结束了。椅子一张一张推回桌下，刚才还在找笔的人也终于把东西收好。
      `), C('xiaorui', 'wearing_backpack', 'mid-left'), ...L(`
      xiaorui 走了，明天见。
      p 明天见。
      `), X('xiaorui', 'move_out'), C('xiaoyu', 'wearing_backpack', 'mid-left'), ...L(`
      xiaoyu 练习册明天我还带，你要看就说。
      p 好。
      `), X('xiaoyu', 'move_out'), C('xiaoxu', 'leaving', 'mid-left'), ...L(`
      xiaoxu 我先下去，你们慢慢收。
      p 嗯。
      `), X('xiaoxu', 'move_out'), C('xiaozhang', 'normal', 'mid-left'), ...L(`
      xiaozhang 廖思宇，明天见。
      liaosiyu 明天见。
      `), X('xiaozhang', 'move_out'), X('xiaosun'), ...L(`
      n 小孙把后面的窗关好，拿着书包走了。教室里剩下的声音很少，走廊上的脚步还听得见。
      n 廖思宇把最后一本书放进去，我也从自己的座位起来，走过那几排已经空下来的桌子。
      `), ...S.approachDesk('liaosiyu', 'packing_bag'), ...L(`
      p 教官。
      liaosiyu 嗯？
      p 问你一个问题。
      liaosiyu 你说。
      p 你说……
      n 我停了一下，没有把前面的几句话再说一遍。
      p 你对我的好感度是多少？
      `), E('liaosiyu', 'thinking'), S.wait(550), ...CG('cg_05'), ...L(`
      n 他愣了一下，认真想了几秒。
      `), S.wait(650), E('liaosiyu', 'calm_100_percent'), ...L(`
      liaosiyu 100%。
      p ……这么高。
      p 你为什么给我100%？
      liaosiyu 不知道。
      liaosiyu 就是100%。
      n 我没接上话。他的表情很平常，没有等着我给这句话起一个名字。
      `), HCG('cg_05'), E('liaosiyu', 'wearing_backpack'), ...L(`
      liaosiyu 走吗？
      p ……走。
      n 他背好书包。我往门边让一点，让他先把椅子推回桌下。
      p 教官。
      liaosiyu 嗯？
      p 没事。走吧。
      liaosiyu 嗯。
      `), X('liaosiyu', 'move_out'), 'jump EndRoom'
    ],
    HatMixup: [
      ...S.scene('classroom', 'daily', '军训 · 一顶放错位置的帽子'),
      C('liaosiyu', 'military_rest', 'desk-standing'), C('xiaohua', 'military_rest', 'mid-left'), C('meili_xiaoxu', 'military_rest', 'desk-side'),
      ...L(`
      n 回教室的那天下午，大家把迷彩帽堆在桌角，一拿下来，看着都差不多。
      n 我正把杯子往桌下放，小蒋从过道探过来，指了指桌角。
      xiaojiang 教官你戴帽子，展示一下军训状态。
      liaosiyu 这个？
      xiaojiang 对，就那个。
      n 廖思宇从两本书之间拿起一顶帽子。他看见小桦正好站在旁边，就很认真地把帽子扣到了她头上。
      n 我们一时都没接上话。
      xiaohua ？
      n 她马上把帽子拿下来，低头看里面的名字。小蒋先笑出了声，旁边几个人也跟着笑了。
      liaosiyu 怎么了？
      p 你先等一下。
      xiaohua 他把这个扣我头上了。
      n 小桦手里拿着那顶迷彩帽。她刚才马上拿下来，现在正在看里面的名字。
      liaosiyu 我以为是我的。
      xiaohua 所以为什么放我头上？
      liaosiyu 我刚才想先放一下。
      n 她看着他。他也看着她，两个人都停了一会儿。
      `), C('xiaojiang', 'military_rest', 'group-left'), ...CG('cg_10'),
      ...L(`
      n 小蒋站在过道边，刚才已经看完整个动作，一说起来又笑了。
      xiaojiang 你这叫先放一下？桌子空着，你给它挑了一个会动的架子。
      p 刚才我都没看清，你就拿下来了。
      xiaohua 我不拿，它还要在这里待多久？
      liaosiyu 我马上就拿。
      meili_xiaoxu 可是你刚才都已经转头找水杯了。
      n 她本来低头整理自己的东西，这时也抬头看了一眼。
      liaosiyu 哦。
      n 小徐从门口经过，听见声音往这边看，大张已经笑着拍了一下桌沿。
      dazhang 教官今天的安排很特别。
      xiaohua 你们别跟着放，我的头不借。
      p 他可能真没想那么多。
      xiaohua 我看出来了，所以我直接拿下来了。
      n 她把帽子递回去。廖思宇接到手里，先看里面写了谁的名字。
      liaosiyu 不是我的。
      xiaojiang 好，又错了一层。
      meili_xiaoxu 那是我的。你们桌上的帽子自己认一下。
      n 她拿回帽子，抖掉夹在里面的一点纸屑，放到自己的书包上面。
      p 你的在哪里？
      liaosiyu 我再找一下。
      n 廖思宇低头看桌洞，自己的帽子就在最里面，帽檐露着一小截。
      xiaohua 找到了就放好，别再往别人头上试。
      liaosiyu 我没想试。
      xiaojiang 对，你就是直接放。
      n 大家又笑起来。廖思宇拿着自己的帽子，仍然有一点不明白为什么这么好笑。
      n 我原本还想说点什么，看见小桦已经回去收东西，就没有把笑声拉得更长。
      `), HCG('cg_10'), X('xiaohua'), C('xiaojiang', 'military_rest', 'mid-left'),
      ...L(`
      xiaojiang 教官，下次先申请一下。
      liaosiyu 没有下次。
      p 这句记住了。
      n 他把帽子放回自己的书包，手松开之前，又往里面看了一眼名字。
      meili_xiaoxu 这回是你的。
      liaosiyu 嗯。
      n 她说完继续整理安排表，没有再拿这个事逗他。
      n 小桦从另一边绕过去，去把门口那张挡路的椅子推回桌下。
      n 过了一会儿，教室恢复成正常的杯盖声。那顶帽子终于待在不会动的地方。
      p 我得回去拿自己的帽子了。
      xiaojiang 你也看看名字，别带着别人那顶走。
      p 今天看了这么一场，我应该能记住。
      `), B(0, 'event_hat'), 'jump TrainingSupplies'
    ],
    TrainingSupplies: [
      ...S.scene('military_rest', 'daily', '军训 · 找到自己的那一份'), C('xiaoying', 'military_rest', 'mid-left'), C('xiaojiang', 'military_rest', 'center-left'), C('liaosiyu', 'military_rest', 'mid-right'),
      ...L(`
      n 接下来休息的时候，几包纸巾和几张安排表被一起放到操场边上。
      n 小颖准备把它们分回去，可是每个人都觉得中间那一份好像是自己的。
      xiaoying 先拿写了名字的，没有名字的等一下。
      p 我没写名字，但背面有一行乱七八糟的东西。
      xiaojiang 大家背面都有，你这条件没什么用。
      p 我的右上角折过。
      xiaoying 那应该是这一张。你再看一眼，不要拿了就走。
      n 我摊开纸，看见自己昨天写歪的集合时间，总算认出来。
      liaosiyu 你这个七像八。
      p 已经有人提醒过，我在下面重写了。
      xiaojiang 所以你明天会看到两个时间。
      p 下面那个圈起来了。
      n 小颖让我们把自己的东西收好，又拿起最后一包没有人认领的纸巾。
      xiaoying 这个谁的？刚才谁拆开了？
      liaosiyu 我用过一张，但不是我的。
      p 小孙给的吧？我们那天用的是他的。
      xiaoying 那我拿回去问问。别一直放在地上。
      n 小蒋伸手想帮忙，拿起来才发现底下还压着一支没盖好的笔。
      xiaojiang 这支再没人认，我手上要写上颜色了。
      p 你先放我这张废纸上。
      liaosiyu 笔盖在旁边。
      n 廖思宇指了指杯子边上。小蒋拿到盖子，把笔插好，终于不用捏着笔尖。
      xiaojiang 教官今天观察挺细，怎么刚才帽子没看出来？
      liaosiyu 那个我没看到名字。
      p 他还在认真回答。
      xiaojiang 我就是问一下，你别把帽子重新拿出来证明。
      n 廖思宇本来已经往帽子那边看，听完又把目光收回来。
      xiaoying 你们先让一点，我要把这一袋拿走。
      n 我们把腿缩回去，过道空出来。小颖抱着东西回教室，这边少了一堆认不出的纸。
      n 远处的教官还在示范动作。我们轮不到这一排，坐着等前面练完。
      p 你们都把安排表带回家了吗？
      xiaojiang 带了，拿出来又放回去，没看。
      liaosiyu 我看了。
      xiaojiang 这个我猜得到。你不用每一件事都抢先完成。
      liaosiyu 你刚才问的。
      p 好了，他没有抢先，是你给了这个问题。
      n 小蒋摸了摸手上刚才沾到的一点墨，决定回去再洗。
      xiaojiang 我现在不问了。我先坐着。
      n 我们安静下来，听下一排齐步走的脚步声。太阳照着纸角，上面刚才的水印慢慢干了。
      n 军训并没有因为这些小事变得轻松，但至少休息时不只剩下热。
      `), 'jump Act4'
    ],
    TrainingLastPractice: [
      ...S.scene('military_afternoon', 'military', '军训末尾 · 不用再抢一遍'), C('military_instructor', 'military_instruction', 'instructor-front'), C('liaosiyu', 'military_attention', 'far-right'), C('xiaojiang', 'military_attention', 'training-left'),
      ...L(`
      n 最后一轮集中练习前，教官把队伍间隔重新拉开，让每排按顺序出发。
      military_instructor 后面的不用抢。看前排留出的距离，听口令。
      n 小蒋把脚尖挪回线后面，刚才不小心站到了前面人的位置。
      xiaojiang 我以为要出发了。
      p 还没到我们这排。
      xiaojiang 我知道，现在知道了。
      n 廖思宇在右边听着，手放得很规矩，鞋尖也没有超过那条线。
      xiaojiang 教官，你能不能别先摆好，看得我以为自己慢了。
      liaosiyu 我一直放在这里。
      p 所以只有你被自己催到了。
      n 小蒋看了一眼前排，决定这次只听真正教官的声音，不看我们做了什么。
      military_instructor 第三排准备。齐步走！
      n 我们一起往前。快要停下时，我听见旁边一只鞋拖了一点地，但没有人因此乱走。
      military_instructor 立定！
      n 教官看完队形，让我们回去，下一排继续。
      xiaojiang 我这回没抢。
      p 你可以不用每次走完都公布一次。
      xiaojiang 我怕没人发现进步。
      liaosiyu 我看到了。
      xiaojiang 你这么认真，我反而不好接了。
      n 廖思宇听完没有明白他想怎么接，又看向前面正在走的同学。
      n 轮到小桦那排时，小希走得有一点快，小桦只在停下以后小声提醒。
      xiaohua 下次慢半步，我刚才跟得有点紧。
      xiaoxi 好，我先听，不跟前面那个人的脚。
      n 她们没有把一次小错误说得很大。小蒋也没有隔着队伍帮忙评论。
      n 练完回到休息处，大家把水杯拿起来，沿着阴影找一个还能坐下的位置。
      `), X('military_instructor'), E('liaosiyu', 'military_rest'), E('xiaojiang', 'military_rest'),
      ...L(`
      p 明天就最后一天了。
      xiaojiang 我还没习惯每天这么早。
      liaosiyu 开学也要早。
      xiaojiang 你能不能先让我高兴十秒？
      p 他只是把后面的事情说出来。
      xiaojiang 那先别说，我现在只想到今天回家。
      n 廖思宇点点头，真的没有再讲开学。小蒋低头数还剩几节军训，又觉得算这个没有用。
      p 你还不如看现在几点。
      xiaojiang 手表在书包，我还没带出来。
      liaosiyu 我们等会儿就回去了。
      n 他把手里的杯盖拧紧。这一回没有人再让他调整军姿，大家都想坐稳一点。
      n 我看看右边那排练习的人，再看看脚下那条线，发现几天以前我们还要反复确认自己站哪里。
      n 最后一天还没来，至少今天这一遍，谁也不用抢在口令前面。
      `), 'jump TrainingEnd'
    ],
    SeatChange: [
      ...S.scene('classroom', 'daily', '开学 · 搬一张桌子的距离'), C('liaosiyu', 'normal_standing', 'desk-standing'), C('meili_xiaoxu', 'writing', 'desk-side'), C('xiaosun', 'writing', 'desk-behind'),
      ...L(`
      n 正式上课没几天，我们按新的安排调整了一次座位。
      n 椅子先推到过道，书放到桌上，大家照着前面的名字找位置，教室里反而比军训更挤。
      n 我没有搬到廖思宇旁边，自己的位置仍在另一边。只是桌子往后挪了一格。
      p 我这椅子先放这里，等下拿走。
      xiaosun 你别堵后面，我要把书搬过去。
      p 好，我再往里面推一点。
      n 小孙的位置还是在廖思宇后面。他先把水杯放稳，才搬自己的书。
      n 廖思宇旁边坐了另一位小徐。有人为了区别，平时会叫她美丽小徐。
      n 她没接那个称呼，只把自己要用的练习册放在靠近过道的一边。
      meili_xiaoxu 这本你先别动，是我的。
      liaosiyu 好。你书要放这边吗？
      meili_xiaoxu 嗯。中间留一点，我等下还有卷子。
      p 你们已经分好地方了？
      meili_xiaoxu 不分，等会儿都在找。
      n 她说完把笔袋挪回来。廖思宇伸手去拿桌上的另一支笔，又被她看了一眼。
      meili_xiaoxu 那也是我的。
      liaosiyu 哦，我拿自己的。
      p 教官，今天别再把东西放错。
      liaosiyu 我没有放错，我还没拿。
      n 我想到那顶帽子，没再继续举例。小孙从后面把廖思宇的笔递过来。
      xiaosun 在你书下面。刚才搬的时候压住了。
      liaosiyu 谢谢。
      n 小蒋从走道经过，手里抱着三本书，其中两本快要滑出去。
      xiaojiang 让一下，我这摞不能停。
      p 你先放下来也行。
      xiaojiang 快到了，就两步。
      n 他终于放到桌上，腾出手才发现水杯还在旧位置，转身又走回去。
      meili_xiaoxu 你那不是两步，是来回两趟。
      xiaojiang 你现在才说，我已经搬完了。
      n 她笑了一下，低头把练习册的名字补完整，没有再隔着过道讲话。
      n 我从窗边绕回自己的新位置，隔着的几排桌子并没有消失。
      p 我这边好像看黑板更清楚了。
      xiaoying 你刚才前面有人挡着吧。现在位置低了一点。
      p 嗯，应该是这个原因。
      n 大家陆续坐下，桌面还没完全整理好，前面已经提醒下一节要拿哪本书。
      n 我看了一眼窗边。廖思宇和同桌各做各的事情，小孙在后面翻笔袋，位置变了，声音还是熟悉的。
      n 以后要过去聊天，仍然要先站起来，再从那几排椅子之间绕过去。
      `), B(0, 'event_seat_change'), 'jump NameAfterTraining'
    ],
    NameAfterTraining: [
      ...S.scene('hallway', 'daily', '开学 · 叫名字和叫外号'), C('xiaoxu', 'adjusting_glasses', 'mid-left'), C('xiaojiang', 'normal', 'center-left'), C('liaosiyu', 'normal_standing', 'mid-right'),
      ...L(`
      n 换完座位的课间，廖思宇出来接水，小徐在门边叫住他，问刚才的作业。
      xiaoxu 廖思宇，练习册哪几题？
      liaosiyu 前面两页，后面那道先不写。
      p 你今天没叫教官。
      xiaoxu 我正常问作业，为什么一定要叫？
      xiaojiang 因为有人只记得外号，点名还没反应过来。
      liaosiyu 谁？
      xiaojiang 刚才小瑞。老师叫你，他还在找另外一个人。
      p 我刚开始也有一点。名字知道，嘴先喊教官。
      n 廖思宇把杯盖拧开，侧身给后面的人留路，没替我们决定该用哪个称呼。
      xiaoxu 所以叫什么都能听见？
      liaosiyu 你别太小声。
      xiaojiang 你看，又是一个非常实际的要求。
      p 太大声你也会听见，旁边班先听见。
      n 小徐不再隔着门问，拿出自己记的那一行作业，让廖思宇看一下。
      xiaoxu 我这里写了三页。
      liaosiyu 你多记了一页，最后那句话不是这个作业。
      xiaoxu 原来那是明天的。行，我改。
      n 小蒋探头看了一眼，发现自己的本子还在里面，准备等小徐改完再借着记。
      xiaojiang 你也给我看看，我最后一句没写。
      xiaoxu 那你先拿自己的来。
      xiaojiang 马上。
      n 他转身回去，过道边只剩我们三个。小徐低头划掉多写的那一页。
      p 你不会觉得教官这个外号烦吗？
      liaosiyu 有时候会不知道在叫谁。
      p 军训的时候？
      liaosiyu 嗯。特别是前面那个人也在。
      xiaoxu 那时候你们两个还真都回过头。
      n 我们想起那一声，笑了一下。廖思宇自己也笑得很短，很快又把杯盖放好。
      xiaoxu 以后问作业就叫名字，逗的时候再说。
      p 你还提前安排用途。
      xiaoxu 我随便说的，又不是定规定。
      n 小蒋拿本子回来，先把作业照着改好，再问廖思宇这两页写了没有。
      liaosiyu 还没有，回去再写。
      xiaojiang 好，今天终于有人和我一样。
      p 他等下就写，你等下还会出来站着。
      xiaojiang 你不要现在就预测。
      n 预备铃响了，小徐把本子递回去。廖思宇拿着刚接的水走进教室，小蒋也跟着回去。
      n 外号没有被停用，名字也没有被盖住。说哪一个，大部分时候只是顺嘴。
      `), 'jump FirstBreak'
    ],
    LunchNeighbours: [
      ...S.scene('lunch', 'lunch', '午休 · 同桌的一句问题'), C('liaosiyu', 'eating', 'desk-far'), C('meili_xiaoxu', 'writing', 'desk-side'), C('xiaosun', 'looking_up', 'desk-behind'),
      ...L(`
      n 另一个午休，我从自己座位过去的时候，廖思宇还没有吃完。
      n 美丽小徐在他旁边写题，饭盒已经盖起来。小孙坐在后面剥开一次性筷子。
      p 我坐一会儿，等你吃完再问。
      liaosiyu 不用等。什么？
      p 你上次那本历史书看完了没？
      liaosiyu 没有，还剩后面一点。
      n 我把旁边的椅子拉开，不挡住别人走。她抬了一下头，看见我没踩到桌边的袋子，又低头继续写。
      `), ...S.approachDesk('liaosiyu', 'eating'),
      ...L(`
      meili_xiaoxu 你把袋子再往里面推一点，等会儿还是会碰到。
      p 好。这样行吧？
      meili_xiaoxu 嗯。
      n 廖思宇咽下那口饭，用纸巾擦手，从书里抽出夹着的便签。
      liaosiyu 我看到这一页了。
      p 你书签夹得这么靠后，我还以为已经看完。
      liaosiyu 后面还有别的。
      n 大张从过道经过，听见“历史”两个字，先把手里的杯子放稳。
      dazhang 你们在说谁？我这次先听题目。
      p 没说谁，只问看到哪里。
      dazhang 那我等题目出来。
      meili_xiaoxu 皇帝如果早上醒不过来，旁边的人能不能再等五分钟？
      n 她说的时候仍然看着题，没有特意把笔放下，像刚好想起一个普通问题。
      p 题目出来了。
      dazhang 这个比我准备的好。
      liaosiyu 什么时期，什么皇帝？
      meili_xiaoxu 我没想具体是谁，就是等人的时候突然想到。
      liaosiyu 那我不知道。不同地方怎么安排，也不一样。
      meili_xiaoxu 哦，那先不选人。
      p 她问完又继续写了，你还在准备答案。
      n 廖思宇停下来，拿起筷子。大张觉得自己的问题似乎没地方接，先喝了一口水。
      dazhang 我本来要问皇帝请假，现在感觉太正常了。
      xiaosun 你们别把午饭都问凉了。
      p 对，他还有两口。
      n 我们等廖思宇吃完。美丽小徐把写好的那行圈起来，确认没漏条件，再收起笔。
      meili_xiaoxu 你们继续，我这道好了。
      dazhang 你不听了？
      meili_xiaoxu 我刚才听了。又不是要听到结尾才能走。
      n 她拿着饭盒去整理垃圾，回来才把书打开。没有为了刚才的问题再组织一场讨论。
      p 你同桌的问题和大张不太一样。
      liaosiyu 都不太好回答。
      dazhang 我当你是夸我。
      liaosiyu 不是。
      n 大张马上笑了。我把准备还给小孙的橡皮拿出来，免得又揣回自己座位。
      n 今天聊天开始得慢一点，停下来也很自然。窗边几张桌子各有自己的事，我们只在中间聊了几句。
      `), 'jump WallHistory'
    ],
    BadmintonBorrow: [
      ...S.scene('pe', 'daily', '体育课 · 球拍先分好'), C('xiaorui', 'badminton', 'mid-left'), C('xiaojiang', 'normal', 'group-center'), C('liaosiyu', 'pe_normal', 'group-right'),
      ...L(`
      n 另一次体育课，自由活动的时候，小瑞从器材处拿回来两副羽毛球拍。
      n 他先把一副递给旁边的人，自己留下一副，站在树影外面看哪个地方风小。
      xiaorui 这边先打吧，别站到篮球架底下。
      p 你之前就打这个？
      xiaorui 嗯，比较喜欢。你们要不要轮一下？
      xiaojiang 我能把它打过去，但不保证你能接。
      xiaorui 那先近一点。
      n 他没有开始讲一套很长的方法，只把球递给我，让我先试一下高度。
      n 我把球扔起来，球拍挥过去，什么也没碰到。球落在了自己脚边。
      xiaojiang 很好，距离非常近。
      p 你先别笑，等下就轮到你。
      xiaorui 球不用扔那么高。我示范一下，你先拿稳拍子。
      n 他轻轻打了一次，球越过中间那条缝，落在小蒋前面。
      xiaojiang 我刚才还没准备。
      liaosiyu 他已经说要示范了。
      xiaojiang 教官，你先帮我接，不用帮忙指出问题。
      n 廖思宇站到另一边，伸手接过球拍，先看看握着的方向。
      p 你会打吗？
      liaosiyu 打过一点。
      xiaorui 那就先试，不用打得很远。
      n 小希从旁边过来，拿着另外一副球拍，问这一块有没有人用。
      xiaoxi 我们在后面打，留这边给你们。
      xiaorui 好，别把球打到我们中间就行。
      xiaojiang 这句话也适合我们自己。
      n 两边各退了几步。小瑞把多出来的球放在袋子里，没有一下全倒出来。
      p 谁先发？
      liaosiyu 你先。
      p 我刚才连自己的球都没打到。
      xiaojiang 那就当刚才练习，重来。
      n 我看清球的位置，这回总算碰到了，只是打得太低，落在两个人中间。
      xiaorui 能碰到就行，下一次再高一点。
      n 他把球捡起来递回去，旁边的人也各自开始。拍子碰到球的声音比操场上说话清楚。
      n 廖思宇用鞋尖把地上的小石子踢开，站回刚才那个位置，等我再试。
      `), 'jump BadmintonMatch'
    ],
    BadmintonMatch: [
      ...S.scene('pe', 'daily', '体育课 · 先接过这一个球'), C('xiaorui', 'badminton', 'group-left'), C('liaosiyu', 'pe_normal', 'group-right'), C('xiaojiang', 'normal', 'back-left'), ...CG('cg_12'),
      ...L(`
      n 过了几轮，球终于能在两边来回。小瑞往旁边退一点，给我们留出挥拍的位置。
      n 廖思宇接到一个很高的球，抬头看了半天，拍子跟着抬起来，球却落在身后。
      p 教官，你刚才看得挺认真。
      liaosiyu 我以为能打到。
      xiaojiang 你的眼睛接住了，拍子没接住。
      n 他转身捡球，没有装成自己只是让我们赢，也没有替那个球找什么理由。
      liaosiyu 我站得太前了。
      xiaorui 你往后一点，但是别退到她们那边。
      n 另一组的小希朝这边看了一眼，已经在等自己的球。他退两步，站回空出来的位置。
      xiaojiang 这次我来发，你们看清了。
      n 小蒋把球拿得很郑重，发出去以后只飞了半米，正好落在他自己的线里面。
      p 看清了。
      liaosiyu 还没过来。
      xiaojiang 你们两个不用一起确认。
      n 小瑞从他手里接过球，发了一个比较稳的。廖思宇这回接到，打回去又低了一点。
      xiaorui 可以，再来。
      n 我们没有计分，球掉下来就捡，风忽然大一点时就先停住。
      p 你是不是经常和人这样打？
      xiaorui 有空会打。主要是想动一会儿，也不用每次都比。
      xiaojiang 那我刚才丢的分可以不算。
      p 本来就没记。
      n 小瑞笑了一下，没有开始回放自己的动作，去拿袋子里的另一只球。
      n 他换下那只已经压歪一点的球，让小希她们也看看需不需要换。
      xiaoxi 我们这只还可以，先留着。
      liaosiyu 那只要扔掉吗？
      xiaorui 不用，先装回去，别落在地上。
      n 廖思宇把旧球放进袋子，回来以后站到了小蒋刚才的那边。
      xiaojiang 你是不是又走错位置了？
      liaosiyu 我以为换边。
      p 没说换边，刚才只是换球。
      n 他看了看两边的拍子，自己走回来。大家笑了一阵，又接着发下一只球。
      n 小瑞还是正常地接球、捡球，有时候也会没打到。他没因为喜欢羽毛球就突然成了操场上最会的人。
      n 铃声还没响，我们又打一小会儿，没有特意选一个漂亮的球当结尾。
      `), HCG('cg_12'), B(0, 'event_badminton'), 'jump SportsAfter'
    ],
    SportsAfter: [
      ...S.scene('hallway', 'daily', '体育课后 · 带回来四支拍子'), C('xiaorui', 'normal', 'mid-left'), C('xiaohua', 'normal', 'center-left'), C('meili_xiaoxu', 'normal', 'mid-right'),
      ...L(`
      n 收器材的时候，我们把四支拍子放在一起，数了两遍才确认没有少。
      n 小瑞拿着装球的袋子，小希和小桦各拿一副，我们先送回去，再往教室走。
      xiaohua 这袋子谁提？手柄有点松。
      p 给我吧，我不拿拍子。
      xiaorui 小心一点，里面还有一只差点被我压扁的。
      p 我不挤它。
      n 走廊里有一点风，身上的热却没有马上退下去。美丽小徐在门边接水。
      meili_xiaoxu 你们怎么回来得这么慢？
      p 刚才去还拍子。
      meili_xiaoxu 哦，怪不得手里什么都没了。
      xiaohua 本来就是借的，不能带进来再说。
      n 她把自己的杯子拿起来，先喝一口，再看下一节要用的书在不在桌上。
      n 廖思宇从后面跟上来，头发有一点乱，正在把袖口往下拉。
      p 你刚才最后那个接得不错。
      liaosiyu 后面又掉了。
      p 对，我也看见了。
      xiaorui 掉了就接下一次，也没必要挑一个最好看的留着说。
      meili_xiaoxu 如果羽毛球一直不掉，你们是不是一直不能下课？
      n 她问得很轻，好像在确认刚才器材处的规定。
      p 不会吧，铃声响就收。
      liaosiyu 可以停下来。
      meili_xiaoxu 那你们刚才都没停，打到最后才回来。
      xiaorui 那是还想再打一会儿，不是被球困住了。
      n 她笑了一下，把接好的水拿回去，没再替那个问题找别的条件。
      xiaohua 你们进去的时候让一点，门口还有人拿书。
      p 好。
      n 我们侧身让一位同学先出来。小瑞回自己的座位，小桦把杯子放到桌下。
      n 廖思宇也回到窗边，美丽小徐坐在旁边，小孙在他后面把外套拿出来。
      p 这节回来我可能会困。
      xiaorui 我先洗个脸。你要不要去？
      p 我喝口水就行。
      n 他自己去了，没有拉着全班再组织一件事。我坐下，把下一节的课本翻开。
      n 球已经还了，操场上的声音还在外面。我们又回到几排桌子各有距离的教室。
      `), 'jump AfternoonDrowsy'
    ],
    EnglishPairwork: [
      ...S.scene('classroom', 'daily', '英语课后 · 换个人读另一句'), C('xiaoxi', 'reading', 'mid-left'), C('xiaojiang', 'reading', 'group-center'), C('meili_xiaoxu', 'writing', 'mid-right'),
      ...L(`
      n 英语课留了一个两人练习，要求把书里的对话换两个词，再读给对方听。
      n 我和小希先看说明，小蒋已经开始模仿录音的语气，只是后面那个词没有读出来。
      xiaojiang 这里是什么？我先占一个声音。
      xiaoxi 你不是已经开始读了吗？
      xiaojiang 前面都会，只有这里卡住。
      p 那先问，不要把一个嗯读得像正式单词。
      n 美丽小徐把自己的那行写完，指给我们看课本边上的解释。
      meili_xiaoxu 这里有，你们先看下面。
      xiaojiang 哦。我刚才被上面那行挡住了。
      p 字也不会挡字，你就是没有往下看。
      n 小希把要替换的两个词圈出来，提醒我别把原句从头到尾照着念。
      xiaoxi 我问这一句，你回答后面那句。
      p 可以。要用自己的东西吗？
      xiaoxi 大概写一下就行，不用把全部书包说出来。
      n 我们练了一遍，第二遍就比刚才顺。小蒋在旁边看，突然把自己的句子读给廖思宇听。
      xiaojiang 教官，你听我这个，像不像录音？
      liaosiyu 词没读对。
      xiaojiang 我在问语气。
      liaosiyu 语气有点大。
      p 两个意见都来了，你选一个先改。
      n 廖思宇没有故意把自己的读法念得特别标准，只把老师刚才带读的那个词重复了一次。
      meili_xiaoxu 你们要不先小声，后面的人还在练。
      xiaojiang 好，我改音量。
      n 他把声音降下来，重新练同一句。这一次终于没有把别人的回答盖住。
      xiaoxi 我们换过来，你来问。
      p 这句也换词？
      xiaoxi 嗯，照我们圈出来的那两个。
      n 我低头看纸，才发现刚才自己写了一个复数，后面的部分也要一起改。
      p 等一下，我这里还没有对上。
      meili_xiaoxu 你改好再读，先不用赶着说。
      n 她递过橡皮，我把那处擦干净，重新写完。小蒋终于读完，也没有让所有人给他评分。
      xiaojiang 行，这个明天再练一次就够了吧？
      p 先把老师要求的这一遍做完。
      n 我们读到最后一句，把纸折回书里。廖思宇在窗边翻自己的练习册，我没有再走过去检查他做得怎样。
      n 这一节结束以后，教室里到处都是同一段对话的几种读法，谁也不比谁更像录音。
      `), 'jump PaperAndBooks'
    ],
    CameraSetup: [
      ...S.scene('afternoon', 'daily', '课间 · 小羽找一个能看清的位置'), C('xiaoyu', 'filming', 'mid-left'), C('xiaohua', 'normal', 'group-center'), C('liaosiyu', 'normal_standing', 'group-right'),
      ...L(`
      n 后来有一个课间，小羽拿着手机，想拍一小段大家随便聊天的视频。
      n 小桦帮她看画面，先把挡在前面的椅子推进去，腾出一点过道。
      xiaoyu 我从这边拍，别站到窗前，那里会亮得看不清脸。
      xiaohua 那你站这边，我看看里面还有没有别人。
      p 我也要站过去吗？
      xiaoyu 你随便，别挡着廖思宇就行。
      n 她把手机拿稳，没有让谁摆一个很夸张的姿势。廖思宇刚把杯子放下，还不知道准备问什么。
      liaosiyu 要拍什么？
      xiaohua 问你一句，随便回答。
      liaosiyu 什么问题？
      xiaohua 等拍的时候说。
      n 小蒋从后面经过，听见要拍，先把头伸到镜头前面看自己有没有进去。
      xiaojiang 我站这里会不会挡住？
      xiaoyu 会。你往边上一点。
      xiaojiang 好，那我在画面外说话。
      p 你先别替视频安排声音。
      n 他退回去，站在小徐旁边。小徐正在收笔，没有专门为了拍摄赶到前面。
      xiaoxu 你们快一点，下一节还要换书。
      xiaoyu 就一点，不会很久。
      n 美丽小徐把廖思宇桌上的书挪到自己这边，免得他转身的时候碰掉。
      meili_xiaoxu 你杯子也放里面，不然等下自己踢到。
      liaosiyu 好。
      n 他照着放好，站到小桦对面，手不知道该放哪里，就自然垂着。
      p 不用立正，教官。
      liaosiyu 我没立正。
      xiaojiang 是，你只是看着像。
      n 小羽看了看画面，等路过的人走完，才告诉小桦可以开始。
      xiaoyu 我按了以后再问，不然前面会少一句。
      xiaohua 好。廖思宇，你看我这里就行，不用一直看手机。
      liaosiyu 嗯。
      n 他看向她，好像只是有人站在旁边正常问话。小羽手里那点画面终于稳了。
      n 我往过道边让一点，让刚进门的人先走进去，再站回能听见的位置。
      xiaoyu 好了，现在开始。
      n 小桦等了一拍，才把准备好的问题说出来。
      `), 'jump CameraQuestion'
    ],
    CameraQuestion: [
      ...S.scene('afternoon', 'daily', '课间 · 一个比问题认真的回答'), C('xiaoyu', 'filming', 'group-left'), C('xiaohua', 'normal', 'group-center'), C('liaosiyu', 'thinking', 'group-right'), ...CG('cg_11'),
      ...L(`
      xiaohua 你对这个xzsy满意吗？
      n 廖思宇没有马上接。他看着小桦，认真想了一会儿，像准备回答一道需要完整说清的问题。
      liaosiyu 就算考到了行知又怎么样呢？
      liaosiyu 难道能改变命运吗？
      n 周围短短地静了一下。小羽还拿着手机，小桦站在原地，表情慢了半拍。
      p ……你等一下。
      xiaojiang 说得好！
      dazhang 教官觉醒了。
      xiaoxu 现在开始演讲是吧？
      n 他们一句接一句，声音都不长。廖思宇看向后面，像才发现还有这么多人在听。
      liaosiyu 我没演讲。
      xiaohua 我就是问你满意不满意。
      liaosiyu 嗯，我在回答。
      xiaojiang 你这个回答一出来，我们刚才的问题突然显得很小。
      p 后排已经准备鼓掌了，前排还没反应过来。
      dazhang 讲下去，教官，先讲五分钟。
      liaosiyu 没有了。
      n 大张的手停下来，没有真的鼓掌。小羽先把录制停掉，看了一眼手机有没有录到声音。
      xiaoyu 拍到了。后面你们喊的也全在。
      xiaohua 那前面呢？我那句没有少吧？
      xiaoyu 没少，从你问之前就开始了。
      n 小桦看向廖思宇，还是没忍住笑。她没有把那个问题重新换成一个更严肃的话题。
      xiaohua 行，拍完了。你可以坐了。
      liaosiyu 哦。
      p 你不用再想第二段。
      liaosiyu 我也没有第二段。
      xiaojiang 教官这场演讲结束得挺快。
      meili_xiaoxu 你们先让他坐，椅子还在后面。
      n 她从旁边把椅子往外拉一点。廖思宇转头看见，终于回到自己的位置。
      n 小蒋还想接一句，看见小桦已经去找小羽回看，就跟着过去了。
      xiaoxu 你别把手机拿着到处走，等下人越来越多。
      xiaoyu 我就这里看一下。
      n 我们在过道边围成很小的一圈，谁经过就让开，没有堵住整条路。
      n 廖思宇低头把书拿回来，表情还是很普通。那两句说完，他没有突然变成什么特别的人。
      `), HCG('cg_11'), B(0, 'event_camera'), 'jump CameraPlayback'
    ],
    CameraPlayback: [
      ...S.scene('classroom', 'daily', '课间 · 回看的时候又笑一次'), C('xiaoyu', 'normal', 'mid-left'), C('xiaohua', 'thinking', 'center-left'), C('xiaojiang', 'normal', 'mid-right'),
      ...L(`
      n 小羽把音量调低，先回放前面的问题。大家要听清，就各自往近一点的位置挪。
      xiaohua 你看，我刚开始还在等他正常回答。
      p 这里我也是。后面小蒋先反应过来。
      xiaojiang 其实我也停了。我是看大张开始笑才喊的。
      n 手机里又传来那两句，声音比刚才小，周围的人却又笑起来。
      xiaoyu 你们别一起说，我听不清录进去的是谁。
      xiaohua 这个“觉醒”是大张，后面小徐说演讲。
      xiaojiang 我那句说得好最清楚。
      p 你现在还要对比谁的声音清楚？
      xiaojiang 就是看一下，不用给我加字幕。
      n 小羽拖回前面那一小段，确认开头没有被自己的手碰掉，再把手机放低。
      xiaoyu 好了，拍到就行，我不一直放。
      xiaohua 等下给我看一下那张停住的表情，不用剪一长段。
      p 你想看自己的？
      xiaohua 对，我刚才到底愣了多久。
      n 她低头看了一眼，发现其实只有一小会儿，又笑着退回自己的座位。
      n 小蒋朝窗边喊廖思宇，想让他自己也来听。
      xiaojiang 教官，来验收一下你的发言。
      liaosiyu 我听到了。
      xiaojiang 你站那么远也听到了？
      liaosiyu 刚才你们一直在放。
      p 对，他不用再走过来听自己的声音。
      n 美丽小徐在旁边翻下一节的书，顺手把廖思宇刚才放偏的那本往里面推。
      meili_xiaoxu 你刚才那句有没有想很久？
      liaosiyu 没有。
      meili_xiaoxu 我以为你至少准备了后面一句。
      liaosiyu 就两句。
      n 她点了一下头，没有继续追问他想表达什么。小羽把手机收好，拿出课本。
      xiaoyu 我这里完了，你们要接水现在去。
      p 不去了，我先换书。
      n 小蒋回到自己的座位，还小声模仿了一次那个停顿，被小徐看了一眼。
      xiaoxu 差不多得了，他都坐下了。
      xiaojiang 好，下一段留到下次。
      n 没有人真安排下一段。预备铃响起，笑声被翻书的声音一点点盖过去。
      n 这一段视频留在手机里。我们这一节课仍然要上，桌面上的题也没有因为刚才那几句话自动写完。
      `), 'jump RainyArrival'
    ],
    RainyArrival: [
      ...S.scene('rainy', 'daily', '雨天 · 先别把伞带进桌子中间'), C('xiaohua', 'wearing_backpack', 'mid-left'), C('xiaojiang', 'wearing_backpack', 'center-left'), C('xiaoying', 'wearing_backpack', 'mid-right'), ...CG('cg_13'),
      ...L(`
      n 那场雨是早上来的。走到教学楼的时候，鞋边已经湿了一圈，伞沿还在往下滴水。
      n 小桦站在门边，把已经合起来的几把伞挪到不挡路的地方，提醒后面的人先别进过道。
      xiaohua 你把伞放外面，等会儿水都到书上了。
      p 好，我先合起来。
      xiaojiang 我刚才合到一半，又被风掀开了。
      xiaoying 所以你外套背面也是湿的？
      xiaojiang 差不多。我已经不想再检查哪里湿了。
      n 他把外套脱下来，里面那本拿在手上的书倒保护得很好，没有跟着淋到。
      p 你先拿进去吧，外套等会儿再找地方。
      xiaojiang 对，我这本只剩封面一点，里面还干着。
      n 廖思宇从另一边上来，鞋尖碰到一小块积水，先在门口停住。
      liaosiyu 地上有点滑。
      xiaojiang 谢谢，刚才我已经体验过一次。
      p 你也没摔啊。
      xiaojiang 但我认真考虑了可能摔。
      n 美丽小徐拿着纸巾从里面出来，把窗边桌上那点水擦掉，又去把窗关小。
      meili_xiaoxu 这边会飘进来，里面的书你先别放靠窗。
      liaosiyu 好，我放中间。
      n 小颖把自己的袋子打开，里面还装着一双干袜子。小蒋看了一眼，表情终于变得羡慕。
      xiaojiang 你早就知道会这样？
      xiaoying 出门看下雨就带了。只有一双，不够你们轮流换。
      p 你自己换吧，我鞋里面还没那么湿。
      n 大家各自检查书和卷子，小桦把伞柄对好，免得有人去拿自己的时带出三把。
      xiaohua 这把黑的是谁的？
      p 我的，手柄有一道白线。
      xiaohua 好。我没换位置，你放学自己认。
      n 小羽从旁边走进来，书包外面套着袋子，袋子角上沾了一点雨水。
      xiaoyu 我先把袋子拿掉，你们让一点。
      n 我们退开半步，她在门边把袋子收好，没有把水抖到别人身上。
      xiaojiang 我明天也这么装。
      xiaoying 明天不一定还下，你先记今天的作业。
      n 小蒋把干着的书放好，往椅背上搭外套。我回自己位置，伸脚试试鞋里还有没有水。
      n 廖思宇在窗边收拾同桌提醒的那块地方，小孙从后面拿出自己的卷子压住书角。
      n 雨让早上的几分钟都慢了一点，铃声却没有跟着等。我们只好先把还没处理完的东西放好。
      `), HCG('cg_13'), B(0, 'event_rain'), 'jump RainyBreak'
    ],
    RainyBreak: [
      ...S.scene('rainy', 'lunch', '雨天午休 · 窗外没有操场上的声音'), C('meili_xiaoxu', 'eating', 'desk-side'), C('liaosiyu', 'reading', 'desk-far'), C('xiaosun', 'looking_up', 'desk-behind'),
      ...L(`
      n 到午休，雨还没有停。操场上没有人，教室的饭盒比平时开得更齐，大家都不想往外走。
      n 我把湿过的纸摊在自己桌上，先用一本书压住边角，等它慢慢平一点。
      p 我这张干了，还皱得有点厉害。
      xiaoyu 没挡字就行，别再用手来回压了。
      p 好。我刚才还想让它恢复成原来那样。
      n 她看着自己的题，没有跟我一起修纸。我抬头看窗边，廖思宇正翻一本比较薄的书。
      n 美丽小徐吃着饭，看完窗外那条雨水，忽然问了他一句。
      meili_xiaoxu 如果以前的大臣进门全淋湿了，要先换衣服还是先说事？
      liaosiyu 我不知道。你说的是哪里的安排？
      meili_xiaoxu 没说哪里。我刚才看见小蒋那件外套，还没干。
      xiaosun 那你直接问小蒋不就好了？
      meili_xiaoxu 他会说先坐下，早上已经坐了。
      n 后面的小孙笑了一声，继续吃饭。廖思宇也低头笑了笑，没有把这个假设接成历史事实。
      liaosiyu 我没有看过具体的，就不说了。
      meili_xiaoxu 嗯，你继续看。我先吃完。
      n 她没有等他查一个答案。小蒋从另外一边走过来，正好听见自己外套的事。
      xiaojiang 那个只是搭着，不需要你们替它安排朝代。
      p 我隔这么远都听见了，你也听见？
      xiaojiang 听见我名字。后面才听到衣服。
      n 他把外套换了一个位置，再把椅子推进去，免得别人从过道经过时蹭到。
      xiaojiang 现在可以继续讨论，不要往它上面放帽子。
      liaosiyu 我没拿帽子。
      p 这事还记着呢。
      n 雨声在玻璃外面连着响。我没有绕过去，只在自己的位置上听完这一小段。
      n 小颖把早上分开的几张纸递给我，已经干得差不多，边缘还留一点波浪。
      xiaoying 你的放这里。我这边有一张名字不清楚，你看看是不是小希的。
      p 是她的，左边那个希少了一点。
      n 我把纸往前传。小希拿到以后，先写清楚名字，再夹回自己的书里。
      xiaoxi 下次用袋子装，我不想再吹一上午。
      p 我也这么想。
      n 窗边又安静下来。美丽小徐吃完收饭盒，廖思宇还在看书，小孙拿起笔。
      n 午休的雨没什么需要解决的，纸已经干了，我们就做下午要做的事。
      `), 'jump ExamBefore'
    ],
    ExamBefore: [
      ...S.scene('classroom', 'daily', '考试前 · 每个人都卡在不同的地方'), C('xiaoying', 'writing', 'mid-left'), C('xiaojiang', 'reading', 'center-left'), C('meili_xiaoxu', 'thinking', 'mid-right'), ...CG('cg_14'),
      ...L(`
      n 第一次阶段测验前，桌面上的东西换成我们已经写过的卷子。每个人都在找一个自己容易错的地方。
      n 我翻了三页，发现标过的题都不太想重做，就先挑看起来最短的那道。
      xiaoying 你不是说这道已经会了？
      p 会是会，就是先找一道能写出来的。
      xiaojiang 我也有这个想法，但我一直找不到。
      meili_xiaoxu 你刚才那道不是写出来了吗？
      xiaojiang 后面还有一步，我停在那里了。
      n 她把本子转过去，指给他看自己做过的那一段，只指到他卡住的位置。
      meili_xiaoxu 后面你自己试，我也不想整道重抄。
      xiaojiang 可以，这一步就够。
      n 小颖把多出来的一张草稿纸放在中间，我们谁需要就抽一张，不用再去讲台拿。
      n 廖思宇在另一边翻练习册，没有和谁比赛写得快。小徐拿本子过去看了一眼，又走回来。
      xiaoxu 他前面也改了两次，我刚才那一行不算特别惨。
      p 你是去找答案还是找安慰？
      xiaoxu 两个都找到了。
      n 小蒋想把自己的题也拿过去，起身前又看见刚才被同桌指出的那一步。
      xiaojiang 我先写这个，别又回来发现还是同一行。
      meili_xiaoxu 对，你刚才看了，还没落笔。
      n 我把自己的卷子放平，擦掉一处写错的符号。考试还没开始，我已经不太想被计时。
      p 你们复习都要把每道重做吗？
      xiaoying 我先看标出来的，不一定每道写。
      meili_xiaoxu 我先把不会的弄清楚。前面写对的放后面。
      xiaojiang 我先让这张纸少空一点。
      n 几个人的方法不一样，说完各自继续。小徐把笔袋拉开，确认明天要用的两支笔都能写。
      xiaoxu 这个先试，别明天在桌上甩。
      p 我先试一下自己的。
      n 我在草稿纸上画两条短线，两支都能写，至少这一件不用担心。
      n 小桦路过，把明天的时间提醒了一遍，说完就回去整理自己那几张纸。
      xiaohua 提前到，书包先放到前面。你们别早上再问。
      p 好，我记了。
      n 我看着面前还没写完的那题，想了一会儿现在先做什么比较有用。
      `), HCG('cg_14'), ...question('p 还剩一点复习时间。', [['Ask', '把卡住的这一步问清楚', 'ExamAsk'], ['Notes', '整理自己的易错记录', 'ExamNotes'], ['Try', '先独立重做这一道', 'ExamTry']])
    ],
    ExamAsk: [...L(`
      n 我先走到窗边，把卡住的那一行指给廖思宇看。
      p 这一步你当时怎么接的？
      liaosiyu 前面这个条件还没用，你先试一下。
      n 我把本子拿回来，写了两行，发现确实只差眼前这一点。
      p 好了，后面我自己写。
      liaosiyu 嗯。
      n 我回座位前把他的书让开，没有继续把剩下几页全拿给他。
      `), B(1, 'exam_asked'), 'jump ExamAfter'],
    ExamNotes: [...L(`
      n 我把以前圈过的地方集中写到同一页，每一行只记自己哪里容易漏。
      xiaoying 你这样明天好找一点，别只写题号。
      p 对，我把条件也写上。
      n 写完看了一遍，才发现几次错误其实是同一个习惯。
      p 这行以前就漏过。
      xiaoying 那明天看到这里多停一下。
      n 我给那行加了一个记号，把整页夹回自己的练习册。
      `), B(0, 'exam_notes'), 'jump ExamAfter'],
    ExamTry: [...L(`
      n 我先把答案遮住，重新写自己刚才没有完成的那道题。
      n 写到原来卡住的位置，手还是停了一下，这回我先看了看题干。
      p 找到了，这里我刚才没圈。
      meili_xiaoxu 那你先写，写完再对，不用每行都看答案。
      p 好。
      n 她把自己的书移开一点，我在桌面空出的地方写完最后两行。
      n 这回没有一次全对，但至少知道下一次还要注意哪里。
      `), B(0, 'exam_tried'), 'jump ExamAfter'],
    ExamAfter: [
      ...S.scene('afternoon', 'daily', '考完 · 先把桌子搬回去'), C('xiaoxi', 'normal', 'mid-left'), C('xiaojiang', 'thinking', 'center-left'), C('liaosiyu', 'normal_standing', 'mid-right'),
      ...L(`
      n 测验结束以后，大家先把书包拿回来，再把临时分开的桌子一点点合回原来的位置。
      n 我把椅子往后拖，后面的人提醒先别拖，他的水杯还放在那里。
      p 好，你先拿走。
      xiaoxi 我的书放你桌上一下，我搬完再拿。
      p 可以。你今天带得也太多了。
      xiaoxi 中午还要用，不能都放家里。
      n 小蒋拿着空笔袋进来，直到坐下才发现两支笔还在另一张桌上。
      xiaojiang 等下，我笔还没有考完。
      p 你这个话说晚了，老师已经收卷子。
      n 他去把笔拿回来，坐下就开始问最后那道。几个人的数字刚报出来就不一样。
      xiaojiang 你们写多少？我先说，我那个可能有问题。
      xiaoxi 我忘了最后写的是哪个，草稿上改过两次。
      p 我也改了，先别把我报的当最后答案。
      liaosiyu 我也是最后改了一下。
      xiaojiang 那教官今天也不能当标准答案。
      liaosiyu 本来就不能。
      n 他把刚拿回来的书包放好，先整理桌面，没有马上给所有人讲题。
      meili_xiaoxu 我现在不想对，等发下来再看。
      p 我也是。刚才写完就觉得可以先停一下。
      xiaojiang 好，那这个数字暂时各自保管。
      n 小希把书拿走，我桌面终于空出来。小孙从后面递来廖思宇刚才忘记搬的那本书。
      xiaosun 这个在旧桌上，你别回头又找。
      liaosiyu 谢谢。
      p 你也会漏东西。
      liaosiyu 会。刚才书太多。
      n 他把书放回同桌分出的那一边。美丽小徐抬头确认自己的卷子还在，没有继续纠正别人的桌面。
      xiaoxi 你们下午要不要先去接水？我杯子空了。
      p 我去。
      xiaojiang 我也去，刚才嗓子都干了。
      n 廖思宇留在座位上，慢慢把自己的笔收进笔袋，没有跟着我们每一件事一起做。
      n 回来以后，有人还在对答案，有人已经把英语书打开。我们各自选了眼前要做的事。
      n 这一回考得怎样还不知道，至少桌子已经回到原来的位置，午饭也快送到了。
      `), B(0, 'event_exam'), 'jump HistoryCalendar'
    ],
    HistoryCalendar: [
      ...S.scene('lunch', 'lunch', '后来 · 一句话里的时间'), C('liaosiyu', 'holding_book', 'desk-standing'), C('meili_xiaoxu', 'reading', 'desk-side'), C('dazhang', 'asking_question', 'mid-left'),
      ...L(`
      n 考完后的一个午休，大张看见廖思宇书里写着一个年号，问它是不是一个人的名字。
      liaosiyu 不是这个人的名字，是记时间用的。
      dazhang 那能不能直接告诉我是多少年？
      liaosiyu 你要先知道这段说的是什么时候，再去看怎么对应。
      p 所以不能随便换一个熟悉的数字进去。
      liaosiyu 嗯，这页下面有说明。
      n 他把书往中间挪一点，让大张看下面那几行。大张低头读，不像刚开始那样只看图片。
      dazhang 我还以为后面那个二是年龄。
      p 你要真这么想，后面应该看不懂很多。
      dazhang 是看不懂，我这不是来问了吗？
      n 美丽小徐在旁边看自己的书，听到这里，把一根手指留在原来的那行。
      meili_xiaoxu 那他们说去年的时候，还要重新想一下叫哪个吗？
      liaosiyu 不知道。我没有看过你问的这种具体说法。
      meili_xiaoxu 哦，换了年号以后，再说以前那年可能挺麻烦。
      dazhang 你这个问题听着正常，仔细想又不太一样。
      p 至少和“张作霖会不会飞”不在同一个地方。
      dazhang 我那句是乱说的，今天已经在认真看。
      n 廖思宇翻回前面的说明，确认这段书究竟把时间写到哪里，没有为了接上问题编一个规矩。
      liaosiyu 这里能对上，你看这一行。
      p 看到了。这本写得还挺细。
      liaosiyu 但不是每一处都有，所以我有的地方也要再找。
      n 大张把书页放平，手指停在刚才的年号旁边，终于把人物和时间分清。
      dazhang 我这次没有跨到另一个朝代吧？
      liaosiyu 没有。
      meili_xiaoxu 好，今天进度可以。
      n 她说完笑了一下，重新看自己那行。大张没有把这当成老师给的评价，只说午饭还没吃完。
      dazhang 我先去吃两口，再来。
      p 你不用提前约下一段，他也要看自己的书。
      n 大张拿起饭盒回去。廖思宇把书放回原来位置，便签夹到已经看过的那页。
      meili_xiaoxu 我刚才那句不用查，我就是看见你们在说才想到。
      liaosiyu 嗯。
      n 我们没有把这次聊天变成一节完整的课，只比刚才更清楚地看懂了眼前一段。
      n 我把椅子推回桌边，再绕过那几排座位，回去继续吃自己的饭。
      `), 'jump HomeworkExchange'
    ],
    HomeworkExchange: [
      ...S.scene('afternoon', 'daily', '普通下午 · 少抄了一行的地方'), C('xiaoying', 'writing', 'mid-left'), C('xiaojiang', 'writing', 'center-left'), C('xiaohua', 'reading', 'mid-right'),
      ...L(`
      n 下午整理笔记，小蒋发现自己从一个小标题直接跳到了下一个，中间少了一行。
      n 他先问前后两个人，又看自己的书，最后把本子挪到小颖旁边。
      xiaojiang 你这里和我的不一样，我是不是漏了？
      xiaoying 嗯，中间还有这一句。你别全照我的抄，我下面有一句自己加的。
      p 她把自己补的也写在这里了，你看那个括号。
      xiaojiang 哦，我刚才还以为老师也说过。
      n 他把需要补的那一句圈出来，再去找自己的空白地方，结果原来留下的格子不够。
      xiaohua 你就写在旁边，划一条线过去，不用把整页重来。
      xiaojiang 这页原本还挺整齐。
      p 现在至少能看懂，比整齐空着好一点。
      n 小桦拿过一本书给他压着纸角，没一直坐着看他补完，转回去整理自己的记录。
      n 小希从前面回来，放下一小叠还没发到后排的纸，我们一起把它们往后传。
      xiaoxi 一个人一张，多的先放在最后。
      p 好。这次我数一下。
      n 我把纸分开，发现其中两张粘在一起，差点又整叠递过去。
      xiaojiang 你先别把我这本也传出去，我正在写。
      p 我只拿纸，没拿你本子。
      n 他放心地低头，继续补那句。靠窗的廖思宇和同桌也在对自己的笔记，小孙在后面写别的作业。
      meili_xiaoxu 你这里到底是四还是九？
      liaosiyu 四。
      meili_xiaoxu 那你旁边补一个清楚的，我刚才看了两遍。
      n 廖思宇拿笔补写，刚好被小蒋看见，又拿来笑了一句。
      xiaojiang 教官也需要别人帮忙认自己的字。
      liaosiyu 她认不清，不是我。
      meili_xiaoxu 我认不清的是你写的字。
      p 这次她说得比较完整。
      n 廖思宇低头看了一眼，还是把那个四重写了。小蒋笑完继续补自己的，不够的那行顺着线接到了页边。
      xiaoying 你现在补完了吗？我把本子拿回来。
      xiaojiang 完了，谢谢。
      n 他递回去，确认没有把夹在里面的小纸条一起带走。小颖检查一遍，放回原来的那页。
      n 我没有再去窗边，自己刚收到的纸还没看完，小桦也在旁边整理同一份。
      p 这张先留着，还是今天交？
      xiaohua 留着，明天带。你看右上角写了。
      n 我终于看见那行小字，把纸夹进明天会拿出来的书里。
      n 这一天下午，窗边有人认真重写一个数字，这边有人补上漏掉的一行，做完以后都往下一页去了。
      `), 'jump EveningAnother'
    ],
    EveningAnother: [
      ...S.scene('night', 'evening', '另一晚自习 · 不急着说完的话'), C('liaosiyu', 'writing', 'desk-far'), C('meili_xiaoxu', 'reading', 'desk-side'), C('xiaosun', 'writing', 'desk-behind'), ...CG('cg_15'),
      ...L(`
      n 在最后那个晚上之前，我们已经在教室里坐过几次普通晚自习。
      n 灯亮起来，窗外的东西慢慢看不见，白天移开的桌椅都回到原来的地方。
      n 我在自己的位置写题，小羽在旁边翻书，没有像课间那样拿出手机拍什么。
      p 你前几天那段还留着吗？
      xiaoyu 留着，回头你要看再说，现在先写这个。
      p 好，我就是突然想起来。
      n 我继续写，小蒋从讲台边回来，路过时把纸留给前一排，再坐回自己的位置。
      xiaojiang 我这边发完了，多的放前面。
      p 看见了，别落在椅子上就行。
      n 他把椅子推进去，翻了两页，不再隔着过道叫人。教室里一会儿只剩下翻纸的声音。
      n 窗边的美丽小徐轻轻敲了一下桌面，让廖思宇看看自己指的那行。
      meili_xiaoxu 你这个本子明天借我一下，我只看这一页。
      liaosiyu 可以，我今晚先写完后面。
      meili_xiaoxu 嗯，明天拿，不用现在给。
      n 她留了一个小记号，继续看自己的书。小孙从后面把掉到桌角的橡皮捡回去，也没打断他们。
      n 我看过去一眼，想起军训时大家把帽子堆在一起，半天才认出谁的是谁。
      n 现在东西还是会放错，只是不用每次先问一个名字，借什么、还什么都能直接说。
      p 小羽，你这页还有题没写？
      xiaoyu 最后一道，我先看一下。
      p 我也写到那里了，要不要等下对前面的条件？
      xiaoyu 可以，等我到那一步，不然现在听了还是乱。
      n 我们各自继续，小蒋写完一行，停着看天花板，过了一会儿又低头动笔。
      n 廖思宇没有一直朝这边看，我也没有专门过去。他还有自己的作业，我们这一边也没有闲下来。
      xiaojiang 你们写完之后叫我，我想知道自己是不是一直落后。
      p 我还没完，现在说没用。
      xiaojiang 好，那我先别比较。
      n 他把自己的本子往前移一点，写完前面漏着的部分。没人宣布哪一排已经全写好了。
      n 铃声响以前，小羽终于到了刚才那一步。我们把条件对了一遍，都少看了一句。
      xiaoyu 这回一起补，不用改前面。
      p 嗯，我先圈起来。
      n 我圈好，接着写。那天没有留下一个特别的话题，也没有谁为了聊天把别人一直等到最后。
      n 后来的晚上，大家还会回到这里，翻书、问一题，再把桌上的东西收好。
      `), HCG('cg_15'), 'jump EveningBefore'
    ],
    EndRoom: [
      ...S.scene('empty', 'ending', '晚自习后 · 空教室'),
      'n 门轻轻带上。', 'n 桌上最后一张试卷没有再动。', S.clearCharacters(), 'stop sound', S.f(function () { window.JiaoguanAudio?.stop(); }),
      'show scene #000000 with fadeIn duration 600ms', 'centered 有些关系没有名字。', 'centered 但是它确实存在。', 'centered END', S.finish(), 'end'
    ]
  });
})();
