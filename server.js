// server.js
import express from "express";
import * as deepl from "deepl-node";

const app = express();
const port = process.env.PORT || 8080;

const authKey = process.env.DEEPL_API_KEY; 
const translator = new deepl.Translator(authKey);

app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;
    if (!text || !targetLang) {
      return res.status(400).json({ error: "Missing text or targetLang" });
    }

    const result = await translator.translateText(text, null, targetLang);
    res.json({ translated: result.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send(" DeepL MCP HTTP server is running");
});

app.listen(port, () => {
  console.log(` DeepL MCP HTTP server running on port ${port}`);
});
