export const USUARIO = {
  nome: "Gabriel Lacerda",
  email: "gabriel.lacerda@taskflow.com",
  funcao: "Desenvolvedor Full Stack / Aluno",
  iniciais: "GL",
};

export const PROJETOS_INICIAIS = [
  {
    id: 1,
    nome: "Projeto Integrador 1",
    descricao: "Desenvolvimento do sistema colaborativo TaskFlow.",
    cor: "#6c63ff",
    tarefas: [
      { id: 1, titulo: "Estruturação do Layout React", responsavel: "Henry Galdino", prazo: "2026-05-24", status: "Em Andamento" },
      { id: 2, titulo: "Configuração do React Router", responsavel: "Miguel Viana", prazo: "2026-05-20", status: "Concluído" },
      { id: 3, titulo: "Estilização Base com CSS", responsavel: "Gabriel Lacerda", prazo: "2026-05-28", status: "Pendente" },
      { id: 8, titulo: "Documentação dos Componentes", responsavel: "Gabriel Lacerda", prazo: "2026-05-19", status: "Concluído" },
    ],
  },
  {
    id: 2,
    nome: "Trabalho de Extensão",
    descricao: "Criação de plataforma web para a comunidade externa.",
    cor: "#f59e0b",
    tarefas: [
      { id: 4, titulo: "Levantamento de Requisitos", responsavel: "Ana Beatriz", prazo: "2026-05-18", status: "Concluído" },
      { id: 5, titulo: "Protótipo de Interface", responsavel: "Gabriel Lacerda", prazo: "2026-05-30", status: "Em Andamento" },
    ],
  },
  {
    id: 3,
    nome: "Desenvolvimento de API Rest",
    descricao: "Implementação de rotas e regras de negócio de backend.",
    cor: "#10b981",
    tarefas: [
      { id: 6, titulo: "Modelagem do Banco de Dados", responsavel: "Henry Galdino", prazo: "2026-05-22", status: "Pendente" },
      { id: 7, titulo: "Autenticação JWT", responsavel: "Erick Monteiro", prazo: "2026-06-01", status: "Pendente" },
    ],
  },
];