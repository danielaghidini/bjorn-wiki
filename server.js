import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const __dirname = path.resolve();
const dialoguesPath = path.join(__dirname, "public", "data", "dialogues.json");

// Permite requisições do Vite (CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Rota para salvar o JSON
app.post("/save-dialogues", (req, res) => {
    try {
        const data = JSON.stringify(req.body, null, 2);
        fs.writeFileSync(dialoguesPath, data, "utf8");
        console.log("dialogues.json updated successfully!");
        res.json({ success: true });
    } catch (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Failed to save JSON" });
    }
});

const PORT = 5174;
app.listen(PORT, () =>
    console.log(`🚀 Local save server running on http://localhost:${PORT}`)
);
