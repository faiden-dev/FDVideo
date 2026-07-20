# Editor Page



## src/pages/editor.tsx

The main video editing page.

- Header at the top with the main actions such as File, Edit, View, Export and other tools.
- The center of the page is divided into three columns.
    - The left column contains elements that can be added to the project.
    - The center column displays the video preview.
    - The right column contains settings for the selected element.
- The bottom of the page contains the timeline with tracks for editing.

Example:

```text
File  Edit  View                               Export
┌────────────┬─────────────────────────┬────────────┐
│            │                         │            │
│  Elements  │      Video Preview      │ Properties │
│            │                         │            │
└────────────┴─────────────────────────┴────────────┘
┌───────────────────────────────────────────────────┐
│                     Timeline                      │
└───────────────────────────────────────────────────┘
```