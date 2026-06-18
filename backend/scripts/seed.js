
require("dotenv").config();
const mongoose = require("mongoose");
const Projeto = require("../models/Projeto");

async function seed() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado ao MongoDB");

    // Limpar dados anteriores (opcional - comente se quiser manter)
    await Projeto.deleteMany({});
    console.log("🗑️  Dados anteriores deletados");

    // Dados iniciais
    const projetos = [
      {
        nome: "Projeto Integrador 1",
        descricao: "Desenvolvimento do sistema colaborativo TaskFlow.",
        cor: "#6c63ff",
        tarefas: [
          {
            titulo: "Estruturação do Layout React",
            responsavel: "Lucas",
            prazo: "2026-05-24",
            status: "Em Andamento",
          },
          {
            titulo: "Configuração do React Router",
            responsavel: "Sheila",
            prazo: "2026-05-20",
            status: "Concluído",
          },
          {
            titulo: "Estilização Base com CSS",
            responsavel: "Gabriel Lacerda",
            prazo: "2026-05-28",
            status: "Pendente",
          },
          {
            titulo: "Documentação dos Componentes",
            responsavel: "Gabriel Lacerda",
            prazo: "2026-05-19",
            status: "Concluído",
          },
        ],
      },
      {
        nome: "Trabalho de Extensão",
        descricao: "Criação de plataforma web para a comunidade externa.",
        cor: "#f59e0b",
        tarefas: [
          {
            titulo: "Levantamento de Requisitos",
            responsavel: "Ana Beatriz",
            prazo: "2026-05-18",
            status: "Concluído",
          },
          {
            titulo: "Protótipo de Interface",
            responsavel: "Gabriel Lacerda",
            prazo: "2026-05-30",
            status: "Em Andamento",
          },
        ],
      },
      {
        nome: "Desenvolvimento de API Rest",
        descricao: "Implementação de rotas e regras de negócio de backend.",
        cor: "#10b981",
        tarefas: [
          {
            titulo: "Modelagem do Banco de Dados",
            responsavel: "Henry Galdino",
            prazo: "2026-05-22",
            status: "Pendente",
          },
          {
            titulo: "Autenticação JWT",
            responsavel: "Erick Monteiro",
            prazo: "2026-06-01",
            status: "Pendente",
          },
        ],
      },
    ];

    // Inserir projetos com tarefas que também terão ObjectIds
    const projetosInseridos = projetos.map((p) => ({
      ...p,
      tarefas: p.tarefas.map((t) => ({
        _id: new mongoose.Types.ObjectId(),
        ...t,
      })),
    }));

    const resultado = await Projeto.insertMany(projetosInseridos);
    console.log(`✅ ${resultado.length} projetos inseridos com sucesso!`);

    // Mostrar IDs para referência
    resultado.forEach((proj, idx) => {
      console.log(`\nProjeto ${idx + 1}: ${proj.nome}`);
      console.log(`  ID: ${proj._id}`);
      console.log(`  Tarefas: ${proj.tarefas.length}`);
    });

    console.log("\n✅ Seed completado com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao fazer seed:", err.message);
    process.exit(1);
  }
}

seed();