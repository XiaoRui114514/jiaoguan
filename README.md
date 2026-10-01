# 《教官》3.0

> “一开始，我只是觉得这个人很好玩。”

一款 25–35 分钟的浏览器轻视觉小说：上海普通高中、高一开学、军训、午休教室、历史闲聊，以及一个认真说出“100%”的普通男生。军训教官现在拥有独立立绘、对话和前后景站位；小陈作为一次性校园搞笑客串出现，不进入主线关系或结局。

## 当前实现

项目采用 GitHub 上的 [Monogatari v2.8.0](https://github.com/Monogatari/Monogatari) 作为视觉小说引擎底座。剧情在 `js/script.js`，主题在 `css/game.css`，引擎核心只放在 `vendor/`。

已接入：七名角色共 66 个动作与服装状态、五张重新生成的事件 CG、ACT 0–8、军训教官的 ACT 0/1/2 演出、小陈一次性客串、`噗噗噗` 捂嘴动作、角色进入/移动/退场、远近站位、LocalStorage 存读档、自动、快进、历史、设置与画廊。

## 本地运行

```powershell
node tools/build-release.cjs
node tools/check-release.cjs
node tools/serve-release.cjs
```

浏览器打开 `http://127.0.0.1:5174/`。本地预览服务器仅提供 `dist/` 内的发布文件。

点击场景、空格或 Enter 推进；ESC 打开菜单，A 自动，S 快进，L 历史，H 隐藏对话框。自动与快进遇到选择会停止。存档属于当前浏览器与网址；3.0 使用独立存档空间，保留旧版记录。

手机窄屏自动显示横屏游戏，竖向窗口也会旋转完整画面；把手机横过来后恢复正常横向显示。

## 项目结构

- `index.html` — 页面骨架
- `js/resources.js` — 角色与资源注册
- `js/script.js` — 完整剧情、ACT、选择、站位和动作
- `css/game.css` — 校园视觉小说皮肤与站位层级
- `assets/` — 游戏运行所需的风格化立绘、背景、CG 和音频
- `vendor/monogatari/` — Monogatari v2.8.0 引擎与许可证
- `tools/build-release.cjs`、`tools/serve-release.cjs` — 构建与本地预览

## 隐私说明

真人参考素材仅用于内部角色设计与一致性参考，正式发布版本仅包含经过筛选的风格化游戏资产，不包含原始照片或制作过程文件。`素材/`、`reference/`、`private/` 和 `workbench/` 不应上传到公开仓库。

## 部署

发布 `dist/` 内容。Cloudflare Pages 构建命令为 `node tools/build-release.cjs`，输出目录为 `dist`；GitHub Pages 使用构建后的静态文件。线上无需 Node 服务或后端。不要直接部署整个工作目录。

