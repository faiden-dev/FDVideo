# TSX Style Guide



## Naming

Use clear and predictable names.

Rules:

- Use `camelCase` for variables and functions.
- Use `PascalCase` for React components, props interfaces and types.

Example:

```tsx
const videoTitle = "Project";

function handlePlay() {}

interface VideoPlayerProps {}

function VideoPlayer() {}
```



## Comments

Use comments to briefly describe code.

Rules:

- `/* === Block */` - main section of code.
- `/* --- Component */` - component description.
- `//` - short explanation inside code.
- Do not comment obvious code.

Example:

```tsx
/* === Video player block */

// Component properties
interface VideoPlayerProps {
    title: string;
}



/* === Video player component */

/* --- Video player */
function VideoPlayer({ title }: VideoPlayerProps) {
    // Render video title
    return (
        <div>
            {title}
        </div>
    );
}
```



## Indentation

Use spacing to separate code.

Rules:

- Use 3 empty lines between main code blocks.
- Use 1 empty line between components or related parts.
- Use 0 empty lines before comments describing the code.

Example:

```tsx
/* === Video page block */

// Page component
function EditorPage() {
    return (
        <div>
            <VideoPlayer />
        </div>
    );
}



/* === Video player component */

/* --- Video player */
function VideoPlayer() {
    return (
        <video />
    );
}

// Render page
const page = <EditorPage />;
```