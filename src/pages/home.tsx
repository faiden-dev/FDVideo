/* === Import block */
import ProjectsViewing from "../components/projectsViewing";
import "../styles/home.css";



/* === Home page block */

/* --- Home page */
export default function HomePage() {
    // Render home page content
    return (
        <div id="home">
            <header id="header">
                <div></div>

                <div id="title">FDVideo</div>

                <div id="settings">Settings</div>
            </header>

            <main id="content">
                <ProjectsViewing />
            </main>
        </div>
    );
}