const express = require("express");
const crypto = require("crypto");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/generate", (req, res) => {
    const password = crypto.randomBytes(8).toString("hex");
    res.json({ password });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
