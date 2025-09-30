// http-server.js
import express from "express";
import bodyParser from "body-parser";
import { DeepLMcpServer } from "./src/index.mjs";

const app = express();
app.use(bodyParser.json());

const server = new DeepLMcpServer({
  apiKey: process.env.DEEPL_API_KEY,  
});

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
