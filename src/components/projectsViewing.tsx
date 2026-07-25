/* === Import block */

import { useEffect, useState } from "react";
import "../styles/projectsViewing.css";



/* === Projects viewing block */

/* --- Project file type */
type ProjectFile = {
    name: string;
    url: string;
    imageUrl: string;
};

/* --- Load projects */
async function loadProjects(setProjects: React.Dispatch<React.SetStateAction<ProjectFile[]>>) {
    try {
        const response = await fetch("http://localhost:3001/files");
        const data = await response.json() as ProjectFile[] | { error: string };

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
function createProjectsView(projects: ProjectFile[]) {
    return projects.map((project) => (
    <div key={project.name} className="card" onClick={() => window.open(`/editor?videoUrl=${encodeURIComponent(project.url)}`, "_blank")}>
        <img className="img" src={project.imageUrl} alt={project.name} />
        <div className="name">{project.name}</div>
    </div>
    ));
}

/* --- Projects viewing */
export default function ProjectsViewing() {
    const [projects, setProjects] = useState<ProjectFile[]>([]);
    const projectsView = createProjectsView(projects);

    useEffect(() => {
        void loadProjects(setProjects);
    }, []);

    // Render projects viewing content
    return (
        <div id="projectsViewingContainer">
            {projectsView}
        </div>
    );
}