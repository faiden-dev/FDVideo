/* === Import block */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";



/* === Server config block */

/* Paths setup */
const dataDir = path.resolve(process.cwd(), "data");
const projectsDir = path.join(dataDir, "projects");
const settingsFile = path.join(dataDir, "settings.json");

/* Supported video file extensions */
const supportedVideoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".m4v"];

/* --- Ensure directories and config exist */
function ensureStructureExists() {
    try {
        if (!fs.existsSync(projectsDir)) {
            fs.mkdirSync(projectsDir, { recursive: true });
        }

        if (!fs.existsSync(settingsFile)) {
            fs.writeFileSync(settingsFile, "", "utf8");
        }
    } catch (error) {
        console.error("Failed to create folder structure:", error);
    }
}

ensureStructureExists();

/* --- Get video files */
function getVideoFiles() {
    try {
        return fs.readdirSync(projectsDir, { withFileTypes: true })
            .filter((entry: fs.Dirent) => entry.isFile())
            .filter((entry: fs.Dirent) => supportedVideoExtensions.includes(path.extname(entry.name).toLowerCase()))
            .map((entry: fs.Dirent) => ({
                name: entry.name,
                url: `${encodeURIComponent(entry.name)}`,
                imageUrl: `http://localhost:3001/preview/${encodeURIComponent(entry.name)}`
            }));
    } catch {
        return [];
    }
}

/* --- Check safe file path */
function isSafeFilePath(filePath: string) {
    const resolvedProjectsDir = path.resolve(projectsDir);
    const resolvedFilePath = path.resolve(filePath);

    return resolvedFilePath.startsWith(`${resolvedProjectsDir}${path.sep}`);
}



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
            const files = getVideoFiles();

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(files));
        } catch {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to read projects folder" }));
        }

        return;
    }

    /* --- Video file API */
    if (req.url?.startsWith("/video/") && req.method === "GET") {
        const fileName = decodeURIComponent(req.url.slice("/video/".length));
        const filePath = path.join(projectsDir, fileName);

        if (!isSafeFilePath(filePath) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Video not found" }));
            return;
        }

        const extension = path.extname(fileName).toLowerCase();
        const contentTypes: Record<string, string> = {
            ".mp4": "video/mp4",
            ".webm": "video/webm",
            ".ogg": "video/ogg",
            ".mov": "video/quicktime"
        };
        let contentType = "application/octet-stream";

        for (const [key, value] of Object.entries(contentTypes)) {
            if (extension === key) {
                contentType = value;
                break;
            }
        }

        res.writeHead(200, { "Content-Type": contentType });
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    /* --- Preview API */
    if (req.url?.startsWith("/preview/") && req.method === "GET") {
        const fileName = decodeURIComponent(req.url.slice("/preview/".length));
        const filePath = path.join(projectsDir, fileName);

        if (!isSafeFilePath(filePath) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Preview not found" }));
            return;
        }

        if (!ffmpegPath) {
            throw new Error("FFmpeg not found");
        }
        const result = spawnSync(ffmpegPath, ["-y", "-i", filePath, "-frames:v", "1", "-q:v", "2", "-f", "image2pipe", "-"], { encoding: null });

        if (result.error || result.status !== 0) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to create preview" }));
            return;
        }

        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(result.stdout);
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