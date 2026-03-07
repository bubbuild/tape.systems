# tape.systems

Live: [https://tape.systems](https://tape.systems)

A minimal site about constructing context from tape, practiced in [bub.build](https://bub.build).

The site covers both the core context model and three natural extensions: observability, evaluation, and model training.

References:

- Bub source: [bubbuild/bub](https://github.com/bubbuild/bub)

## What’s Inside

- Minimal Model: tape, entry, anchor, view
- Mechanisms: append, anchor, handoff
- Session Modeling: single, multi-turn, isolation, topic threading
- Context Strategies: compact, summary, fork-merge
- Advanced Collaboration: memory, teams
- Appendix:
    - observability via replayable tape timelines
    - evaluation via anchor-bounded views, judges, and derived annotations
    - training via anchor-segmented trajectory export

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

The production build is exported to `out/` for GitHub Pages.

## Deployment

The site is deployed via GitHub Actions to GitHub Pages.
Custom domain: `tape.systems`.

## License

[Apache-2.0](./LICENSE)
