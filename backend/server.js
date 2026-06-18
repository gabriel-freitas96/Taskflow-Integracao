require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const projetosRoutes = require("./routes/projetos");
const aiRoutes = require("./routes/ai");
const authRoutes = require("./routes/auth");
const { verificarToken } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/taskflow")
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

app.get("/", (req, res) => {
  res.json({ status: "ok", mensagem: "TaskFlow API rodando 🚀" });
});

// ROTAS PÚBLICAS
app.use("/api/auth", authRoutes);

// ROTAS PROTEGIDAS
app.use("/api/projetos", verificarToken, projetosRoutes);
app.use("/api/ai", verificarToken, aiRoutes);

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.listen(PORT, () => {
  console.log(`TaskFlow API rodando em http://localhost:${PORT}`);
});