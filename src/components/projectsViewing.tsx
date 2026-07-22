/* === Import block */

import { useEffect, useState } from "react";



/* === Projects viewing block */

/* --- Load projects */
async function loadProjects(setProjects: React.Dispatch<React.SetStateAction<string[]>>) {
    try {
        const response = await fetch("http://localhost:3001/files");
        const data = await response.json() as string[] | { error: string };

        if (Array.isArray(data)) {
            setProjects(data);
        } else {
            setProjects([]);
        }
    } catch {
        setProjects([]);
    }
}

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

    useEffect(() => {
        void loadProjects(setProjects);
    }, []);

    // Render projects viewing content
    return (
        <div>
            {projectsView}
        </div>
    );
}