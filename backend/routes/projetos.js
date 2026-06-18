const express = require("express");
const router = express.Router();
const Projeto = require("../models/Projeto");

router.get("/", async (req, res) => {
  const projetos = await Projeto.find();
  res.json(projetos);
});

router.post("/:projetoId/tarefas", async (req, res) => {
  const { titulo, responsavel, prazo, descricao, status } = req.body;
  
  console.log("📥 Tentando adicionar tarefa ao projeto:", req.params.projetoId);

  const projeto = await Projeto.findById(req.params.projetoId);
  
  if (!projeto) {
    return res.status(404).json({ erro: "Projeto não encontrado" });
  }

  const novaTarefa = {
    titulo,
    descricao: descricao || "",
    responsavel,
    prazo,
    status: status || "Pendente"
  };

  projeto.tarefas.push(novaTarefa);
  await projeto.save();

  console.log("✅ Tarefa adicionada com sucesso!");
  res.status(201).json(projeto);
});

router.patch("/:projetoId/tarefas/:tarefaId/toggle", async (req, res) => {
  const projeto = await Projeto.findById(req.params.projetoId);
  if (!projeto) {
    return res.status(404).json({ erro: "Projeto não encontrado" });
  }

  const tarefa = projeto.tarefas.id(req.params.tarefaId);
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }

  tarefa.status = tarefa.status === "Concluído" ? "Em Andamento" : "Concluído";
  await projeto.save();

  res.json(projeto);
});

module.exports = router;