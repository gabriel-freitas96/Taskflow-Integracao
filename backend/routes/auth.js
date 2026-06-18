const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTRAR
router.post("/register", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha obrigatórios" });
    }

    // Verificar se usuário já existe
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já está cadastrado" });
    }

    // Criar novo usuário
    const novoUsuario = new User({
      email,
      senha,
      nome: email.split("@")[0], // Nome padrão baseado no email
    });

    await novoUsuario.save();

    // Gerar token JWT
    const token = jwt.sign(
      { userId: novoUsuario._id, email: novoUsuario.email },
      process.env.JWT_SECRET || "sua_chave_secreta_aqui_123456",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      sucesso: true,
      token,
      usuario: { 
        id: novoUsuario._id,
        email: novoUsuario.email,
        nome: novoUsuario.nome 
      },
    });
  } catch (err) {
    console.error("Erro ao registrar:", err);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha obrigatórios" });
    }

    // Encontrar usuário (usando select para incluir a senha)
    const usuario = await User.findOne({ email }).select("+senha");

    if (!usuario) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    // Comparar senhas
    const senhaCorreta = await usuario.compararSenha(senha);
    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha incorretos" });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || "sua_chave_secreta_aqui_123456",
      { expiresIn: "7d" }
    );

    res.json({
      sucesso: true,
      token,
      usuario: { 
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome 
      },
    });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// OBTER PERFIL DO USUÁRIO AUTENTICADO
router.get("/perfil", require("../middleware/auth").verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.userId);
    res.json({
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
      },
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao obter perfil" });
  }
});

module.exports = router;