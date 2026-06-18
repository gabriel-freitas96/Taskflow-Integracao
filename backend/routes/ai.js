const express = require("express");
const router = express.Router();
const Anthropic = require("@anthropic-ai/sdk");

const apiKey = process.env.ANTHROPIC_API_KEY;
const anthropic = apiKey ? new Anthropic({ apiKey }) : null;

router.post("/chat", async (req, res) => {
  if (!anthropic) {
    return res.status(503).json({
      erro: "Assistente de IA não configurado. Defina ANTHROPIC_API_KEY no .env do Backend.",
    });
  }

  const { system, messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ erro: "messages é obrigatório." });
  }

  try {
    const resposta = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system,
      messages,
    });
    const texto = resposta.content?.find(b => b.type === "text")?.text || "";
    res.json({ reply: texto });
  } catch (err) {
    console.error("Erro ao chamar a API da Anthropic:", err.message);
    res.status(502).json({ erro: "Falha ao falar com a IA. Tente novamente." });
  }
});

module.exports = router;