// http-server.js
import express from "express";
import bodyParser from "body-parser";
import { Server } from "@modelcontextprotocol/sdk/dist/server.js";
import { z } from "zod";
import * as deepl from "deepl-node";

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

const server = new Server(
  { name: "deepl-mcp", version: "1.0.0" },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.tool(
  "translate",
  "Translate text with DeepL",
  z.object({
    text: z.string(),
    target_lang: z.string(),
  }),
  async ({ text, target_lang }) => {
    const result = await translator.translateText(text, null, target_lang);
    return { result: result.text };
  }
);

const app = express();
app.use(bodyParser.json());

app.post("/mcp", async (req, res) => {
  try {
    const response = await server.handleRequest(req.body);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(` DeepL MCP HTTP server running on port ${port}`);
});
