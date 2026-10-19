# Landing dependency maintenance

The public Landing Action is pinned to `9014baa64f82893dc194a3f1e31391737f68c426`.
Duty runs Mondays at 02:23 UTC, on manual dispatch, on forwarded security alerts,
and after eligible dependency PR build failures. It publishes draft updates;
maintainers decide merge and alert dismissal.

## Setup

Set repository variable `LANDING_MODEL` and secret `LANDING_API_KEY`.
Optional variables: `LANDING_API_BASE` and `LANDING_COMPLETION_ARGS`.
Duty stays disabled while `LANDING_MODEL` is empty.

The default publisher is `github-actions[bot]`; allow Actions to create PRs in
repository settings. Alternatively, set secret `LANDING_GITHUB_TOKEN` for an
authorized identity with contents, PR, issue and Actions write access and
Dependabot alerts read access. Set `LANDING_GIT_NAME` and `LANDING_GIT_EMAIL`
for its Git identity. Secret `LANDING_ADMISSION_TOKEN` optionally provides a
separate admission identity. Never store credentials in workflow files.

Candidates use isolated `deps/landing-*` branches. Dispatch
`gh workflow run dependency-checks.yml --ref <candidate-branch>` for independent
checks, including when workflow-token commits do not trigger PR workflows.
Checks use pnpm 10, Node 20, a frozen lockfile install and `pnpm build`, matching
the Pages build. Deployment failures are outside repair scope.

Automatic repair admits Dependabot and Renovate authors, plus the prepared
publisher on `deps/landing-*` branches. Variable
`LANDING_DEPENDENCY_UPDATE_ACTORS` adds permitted authors, one per line.
Set `LANDING_BUMP_ON_FAILURE=false` to disable repair.

## Security alerts

Weekly maintenance can discover open alerts. Real-time delivery requires an
external webhook receiver that verifies GitHub's signature and sends this
repository dispatch payload, replacing `123` with the actual alert number:

```json
{"event_type":"dependabot_alert","client_payload":{"alert_number":123}}
```

These workflows do not install a receiver. Landing reads current alert state;
fixed or dismissed alerts reconcile tracked work without a new upgrade.
Listeners must exist on the default branch to receive events.

References: [Landing integration](https://github.com/bubbuild/landing/blob/9014baa64f82893dc194a3f1e31391737f68c426/docs/guides/github.md),
[GitHub permissions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#permissions),
[GitHub events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows).
