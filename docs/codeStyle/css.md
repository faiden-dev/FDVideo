# CSS Style Guide



## File structure

Group related styles under a single comment.

Rules:
- Use one comment for each style block.
- Place related classes directly below the comment.
- Leave one empty line between classes.
- Leave three empty lines between style blocks.
- Use `camelCase` for class names.

Example:

```css
/* Main layout */
.mainContainer {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.content {
    flex: 1;
    overflow: auto;
}

.sidebar {
    width: 280px;
}



/* Toolbar */
.toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
}

.toolbarButton {
    padding: 8px 12px;
    cursor: pointer;
}

.toolbarIcon {
    width: 20px;
    height: 20px;
}



/* Video player */
.videoPlayer {
    width: 100%;
    background: #000;
}

.videoCanvas {
    width: 100%;
    aspect-ratio: 16 / 9;
}

.videoControls {
    display: flex;
    justify-content: space-between;
}
```