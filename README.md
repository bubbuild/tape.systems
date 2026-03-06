# tape.systems

Live: [https://tape.systems](https://tape.systems)

A minimal site describing a tape-based context model, practiced in [bub.build](https://bub.build). Source: [bubbuild/bub](https://github.com/bubbuild/bub).

## What’s Inside

- Mechanisms: Append, Anchor, Handoff
- Session Modeling: Single, Multi-turn, Isolation, Topic Threading
- Context Strategies: Compact, Summary, Fork-Merge
- Advanced: Memory assembly from anchor graphs
- Teams: shared tape + cross-tape views

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
