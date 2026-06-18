const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    default: "",
  },
  responsavel: {
    type: String,
    required: true,
  },
  prazo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pendente", "Em Andamento", "Concluído"],
    default: "Pendente",
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const projetoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    default: "",
  },
  cor: {
    type: String,
    default: "#6c63ff",
  },
  tarefas: [tarefaSchema],
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Projeto", projetoSchema);