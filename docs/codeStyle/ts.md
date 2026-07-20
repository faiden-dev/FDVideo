# TypeScript Style Guide



## Naming

Use clear and predictable names.

Rules:

- Use `camelCase` for variables and functions.
- Use `PascalCase` for interfaces, types, classes and components.

Example:

```ts
const videoProject = "project";

function createProject() {}

interface VideoProject {}

class ProjectManager {}
```



## Comments

Use comments to briefly describe code.

Rules:

- `/* === Block */` - main section of code.
- `/* --- Function */` - function description.
- `//` - short explanation inside code.
- Do not comment obvious code.

Example:

```ts
/* === User data block */

// User information structure
interface User {
    id: number;
    name: string;
}



/* === User functions */

/* --- Create new user */
function createUser(name: string): User {
    return {
        id: Date.now(),
        name
    };
}

// Check user before saving
const user = createUser("Alex");
```



## Indentation

Use spacing to separate code.

Rules:

- Use 3 empty lines between main code blocks.
- Use 1 empty line between functions or related parts.
- Use 0 empty lines before comments describing the code.

Example:

```ts
/* === User data block */

// User information structure
interface User {
    id: number;
    name: string;
}



/* === User functions */

/* --- Create new user */
function createUser(name: string): User {
    return {
        id: Date.now(),
        name
    };
}

// Check user before saving
const user = createUser("Alex");
```