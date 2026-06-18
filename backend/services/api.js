import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export async function getProjects() {
  const { data } = await api.get("/projetos");
  return data;
}

export async function createTarefa(projetoId, tarefa) {
  const { data } = await api.post(`/projetos/${projetoId}/tarefas`, tarefa);
  return data;
}

export async function toggleTarefaStatus(projetoId, tarefaId) {
  const { data } = await api.patch(`/projetos/${projetoId}/tarefas/${tarefaId}/toggle`);
  return data;
}

export async function sendAIMessage(system, messages) {
  const { data } = await api.post("/ai/chat", { system, messages });
  return data.reply;
}

export default api;