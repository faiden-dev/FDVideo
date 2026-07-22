/* === Import block */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";



/* === Server config block */

/* --- Paths setup */
const dataDir = path.resolve(process.cwd(), "data");
const projectsDir = path.join(dataDir, "projects");
const settingsFile = path.join(dataDir, "settings.json");

/* --- Ensure directories and config exist */
function ensureStructureExists() {
    try {
        if (!fs.existsSync(projectsDir)) {
            fs.mkdirSync(projectsDir, { recursive: true });
        }

        if (!fs.existsSync(settingsFile)) {
            const defaultConfig = {
                createdFolder: "projects",
                version: "1.0.0"
            };
            fs.writeFileSync(settingsFile, JSON.stringify(defaultConfig, null, 4), "utf8");
        }
    } catch (error) {
        console.error("Failed to create folder structure:", error);
    }
}

ensureStructureExists();



/* === Server block */

/* --- Create server */
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    /* --- Enable CORS */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    /* --- Files API */
    if (req.url === "/files" && req.method === "GET") {
        ensureStructureExists();

        try {
            const files = fs.readdirSync(projectsDir, { withFileTypes: true })
                .filter((entry: fs.Dirent) => entry.isFile())
                .map((entry: fs.Dirent) => entry.name);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(files));
        } catch {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to read projects folder" }));
        }

        return;
    }

    /* --- Not found */
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
});



/* === Start server block */

/* --- Start server */
server.listen(3001, () => {
    console.log("Server listening on http://localhost:3001");
    console.log(`Projects folder: ${projectsDir}`);
});