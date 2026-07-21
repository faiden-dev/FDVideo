/* === Import block */

import { useState } from "react";

/* --- declare window interface */
declare global {
    interface Window {
        showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
    }
}



/* === Projects viewing block */

/* --- Create projects view */
function createProjectsView(projects: string[]) {
    return projects.map((project) => (
        <div key={project}>
            {project}
        </div>
    ));
}

/* --- Projects viewing */
export default function ProjectsViewing() {
    const [projects, setProjects] = useState<string[]>([]);
    const projectsView = createProjectsView(projects);

    /* --- Select folder */
    async function selectFolder() {
        const handle = await window.showDirectoryPicker();

        const files: string[] = [];

        for await (const entry of handle.values()) {
            if (entry.kind === "file") {
                files.push(entry.name);
            }
        }

        setProjects(files);
    }

    // Render projects viewing content
    return (
        <div>
            <button onClick={selectFolder}>
                Select folder
            </button>

            {projectsView}
        </div>
    );
}