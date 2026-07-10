import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import Editor from "./pages/editor";
import Files from "./pages/files";

function App() {
    const [page, setPage] = useState("files");

    // changes the page and updates the URL without reloading the page
    function changePage(value: string) {
        setPage(value);
        window.history.pushState({}, "", `/${value}`);
    }

    // handles the click event for the link
    function handleFilesClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        changePage("files");
    }

    function handleEditorClick(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        changePage("editor");
    }

    // sets the initial page based on the URL and listens for popstate events
    useEffect(() => {
        const path = window.location.pathname.replace("/", "");

        if (path === "editor" || path === "files") {
            setPage(path);
        } else {
            setPage("files");
            window.history.replaceState({}, "", "/files");
        }

        window.onpopstate = () => {
            const path = window.location.pathname.replace("/", "");
            setPage(path || "files");
        };
    }, []);

    // updates the document title based on the current page
    useEffect(() => {
        document.title = `${page === "editor" ? "Editor" : "Files"} - FDVideo`;
    }, [page]);

    // renders the links and the current page component
    return (
        <>
            <a href="/files" onClick={handleFilesClick}>
                Files
            </a>

            {" | "}

            <a href="/editor" onClick={handleEditorClick}>
                Editor
            </a>

            {page === "editor" ? <Editor/> : <Files/>}
        </>
    );
}

// renders the App component inside the root element
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);