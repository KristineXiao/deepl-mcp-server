// server.js
import express from "express";
import { translateText } from "./src/index.mjs"; 

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing text or targetLang" });
    }

    const translated = await translateText(text, targetLang);
    res.json({ translated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.get("/", (req, res) => {
  res.send(" DeepL MCP HTTP server is running");
});

app.listen(port, () => {
  console.log(` DeepL MCP HTTP server running on port ${port}`);
});
