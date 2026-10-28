# Runtime regression checks

The browser check uses the bundled game engine and all six scripted choices. It
checks that returning to the title during a choice and starting a new game still
allows the next dialogue to advance. A current choice must continue to block
ordinary progression until an option is selected.

Install the test-only browser dependency, then run from the repository root:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node --test tests/runtime.test.cjs
```

To use an existing Chromium installation, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable path. The test builds the
release and serves it on an available loopback port; it does not publish files.
