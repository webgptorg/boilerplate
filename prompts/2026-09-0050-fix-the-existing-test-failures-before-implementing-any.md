[x] by OpenAI Codex `gpt-5.6-luna` thinking `low` (ChatGPT account) - Implementation ~$0.0545 a minute; Testing a few seconds

[✨🚙] Fix the existing test failures before implementing any queued coding tasks.

The verification command `npm test` failed before coding started. Fix the underlying failure without weakening or removing the tests, and leave the project ready for the remaining coding prompts.

## Verification output

```
npm error Missing script: "test"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: /Users/hejny/.npm/_logs/2026-09-05T15_16_42_792Z-debug-0.log
[1]-  Exit 1                  bash "$1"
```

-   Keep in mind the DRY _(don't repeat yourself)_ principle.
-   Do a proper analysis of the current functionality before you start implementing.
-   Add the changes into the [changelog](CHANGELOG.md)
-   Update the [README](README.md) if needed.
-   Update the [AGENTS.md](AGENTS.md) for the next job to be done if it makes sense.

