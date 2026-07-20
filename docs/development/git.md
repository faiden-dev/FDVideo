# Git Style Guide



## Commits

Use commits to describe what was changed.

Format:

```text
type(block or area): short description
```

Example:

```text
feat(video player): add video playback component

refactor(editor): split editor logic into separate files

docs(code style): add TypeScript documentation
```

Types:

- `feat` - add new functionality.
- `fix` - fix a problem.
- `refactor` - change code structure.
- `style` - change code style or formatting.
- `docs` - update documentation.
- `chore` - update configuration or dependencies.



## Branches

Use branches to separate different stages of development.

Main branches:

- `main` - public stable version of the project.
- `development` - main development branch for new changes.

Additional branches:

Create separate branches from `development` for individual tasks.

Example:

```text
main

development
├── feature/video-player
├── feature/timeline
└── fix/file-loading
```

Rules:

- Do not develop directly in `main`.
- New features are created from `development`.
- Task branches are merged back into `development`.
- Stable versions are merged into `main`.