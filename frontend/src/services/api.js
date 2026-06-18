import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Adicionar token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export async function registrar(email, senha) {
  const { data } = await api.post("/auth/register", { email, senha });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", email);
  }
  return data;
}

export async function login(email, senha) {
  const { data } = await api.post("/auth/login", { email, senha });
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", email);
  }
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
}

export function obterUsuarioAtual() {
  const email = localStorage.getItem("userEmail");
  return email ? { email } : null;
}


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