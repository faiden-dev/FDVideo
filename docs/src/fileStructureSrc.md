# Source File Structure



## Core

### main.tsx

- The main application entry point.
- Contains only application initialization and page rendering.

### pages

- Contains the main application pages.
- Each file represents a separate page.



## Code

### components

- Contains reusable UI components.
- Components should be shared between multiple pages whenever possible.

### styles

- Contains global styles and shared CSS files.
- Do not place component logic here.

### utils

- Contains helper functions and reusable utilities.
- Use for code that is not related to the user interface.



## Resources

### config

- Contains shared application configuration.
- Use for constants, default settings and application configuration files.

### assets

- Contains static resources.
- Examples include images, icons, fonts and other project files.