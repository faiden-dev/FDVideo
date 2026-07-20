# File Structure Guide



## General structure

The project is separated into two main folders:

- `src` - application source code.
- `docs` - project documentation.



## Naming

Rules:

- Use `camelCase` for folders and files.
- Use clear names and group related files by purpose.

Example:

```text
src/
├── pages/
│   ├── editor.tsx
│   └── files.tsx
```


# Source folder

`src` contains all application code.

Rules:

- Keep application logic inside `src`.
- Separate code by functionality.
- Create folders when a group of files has a common purpose.

Example:

```text
src/
├── pages/
├── components/
├── utils/
└── types/
```



## Documentation folder

`docs` contains project documentation.

Rules:

- Separate documentation by category.
- Use folders to group related documents.

Example:

```text
docs/
├── codeStyle/
└── development/
```

- `codeStyle` - code writing rules.
- `development` - development process and project rules.