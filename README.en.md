# Jiaoguan · 《教官》

[简体中文](README.md) · English

A Chinese-language school-life visual novel built with Monogatari 2.8.0 and static HTML/CSS/JavaScript. No account or backend is required. Dialogue and story choices are in Chinese; there is no English story translation.

## Play locally

Install Node.js 20+ and clone the repository, then run:

```sh
node tools/build-release.cjs
node tools/check-release.cjs
node tools/serve-release.cjs
```

Open `http://127.0.0.1:5174/`. The server serves only the built `dist/` folder. Rebuild after editing source or assets. Do not substitute an older release ZIP for the current source version; consult its own version notes.

Advance with click, Space, Enter or Right Arrow. Escape opens/closes the pause menu; A toggles auto, S toggles skip, L opens history and H hides dialogue. Shift+S / Shift+L open save/load. Audio may require an initial user gesture.

Saves belong to the current browser and site origin. Clearing browser data or moving to another address does not transfer them. The current schema retains compatibility with existing 4.x saves; protect that compatibility when editing the story or storage logic.

## Development and assets

Story: `js/script.js`; runtime and storage: `js/main.js`, `js/storage.js`, `js/ui.js`. Build scripts validate required assets, approved artwork hashes and the release file allowlist. Release checks verify the manifest and exclude private reference material. These checks do not replace playing the story and testing saves in a browser.

Report the displayed version, browser, story location, selected choice and reproduction steps through [Issues](https://github.com/XiaoRui114514/jiaoguan/issues). Use a minimal synthetic save if needed and exclude personal information.

Monogatari and audio have separate license/attribution requirements: see [THIRD_PARTY.md](THIRD_PARTY.md), [engine license](vendor/monogatari/LICENSE) and [audio credits](assets/audio/CREDITS.md). The repository does not provide a blanket project license; do not assume all original story/artwork is MIT licensed.
