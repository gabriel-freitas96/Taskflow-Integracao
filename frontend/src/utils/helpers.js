export function getStatusTag(tarefa) {
  if (tarefa.status === "Concluído") return <span className="tag-status tag-concluido">✓ Concluído</span>;
  const atrasada = new Date(tarefa.prazo) < new Date();
  if (atrasada) return <span className="tag-status tag-atrasada">⚠ Atrasada</span>;
  if (tarefa.status === "Em Andamento") return <span className="tag-status tag-andamento">⟳ Em Andamento</span>;
  return <span className="tag-status tag-pendente">◦ Pendente</span>;
}

export function formatDate(str) {
  if (!str) return "—";
  const d = new Date(str + "T12:00:00");
  return d.toLocaleDateString("pt-BR");
}

export function calcProgress(tarefas) {
  if (!tarefas.length) return 0;
  return Math.round((tarefas.filter(t => t.status === "Concluído").length / tarefas.length) * 100);
}
