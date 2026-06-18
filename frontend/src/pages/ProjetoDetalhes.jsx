import { calcProgress, formatDate, getStatusTag } from "../utils/helpers";
import { toggleTarefaStatus, getProjects } from "../services/api";

function PageProjeto({ projetos, setProjetos, projetoId, setPage }) {
  const projeto = Array.isArray(projetos) ? projetos.find(p => p._id === projetoId) : null;
  if (!projeto) return <div className="empty-state"><div className="empty-icon">🔍</div>Projeto não encontrado</div>;

  async function toggleStatus(tarefaId) {
    setProjetos(prev => Array.isArray(prev) ? prev.map(p => p._id === projetoId ? {
      ...p,
      tarefas: (p.tarefas || []).map(t => t._id === tarefaId ? {
        ...t,
        status: t.status === "Concluído" ? "Em Andamento" : "Concluído"
      } : t)
    } : p) : prev);

    try {
      await toggleTarefaStatus(projetoId, tarefaId);
      const projetosAtualizados = await getProjects();
      setProjetos(projetosAtualizados);
    } catch (err) {
      console.warn("Não foi possível salvar o status:", err.message);
    }
  }

  const prog = calcProgress(projeto.tarefas || []);

  return (
    <div className="slide-in">
      <div className="detalhes-header">
        <div>
          <button className="detalhes-back" onClick={() => setPage("dashboard")}>← Voltar ao Dashboard</button>
          <div className="detalhes-title" style={{ color: projeto.cor }}>{projeto.nome}</div>
          <div className="detalhes-desc">{projeto.descricao}</div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, maxWidth: 200 }}>
              <div className="progress-bar" style={{ marginTop: 0 }}>
                <div className="progress-fill" style={{ width: prog + "%", "--proj-color": projeto.cor }} />
              </div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: projeto.cor }}>{prog}% concluído</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setPage("nova-tarefa")}>+ Adicionar Tarefa</button>
      </div>

      <div className="section-title">Tarefas ({(projeto.tarefas || []).length})</div>
      {(projeto.tarefas || []).length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          Nenhuma tarefa ainda. Adicione a primeira!
        </div>
      ) : (
        (projeto.tarefas || []).map(t => {
          const done = t.status === "Concluído";
          return (
            <div key={t._id} className="tarefa-row">
              <div
                className={`tarefa-checkbox ${done ? "done" : ""}`}
                onClick={() => toggleStatus(t._id)}
                title={done ? "Marcar como pendente" : "Marcar como concluído"}
              >
                {done && <span style={{ color: "white", fontSize: 10, fontWeight: 700 }}>✓</span>}
              </div>
              <div style={{ flex: 1, opacity: done ? 0.5 : 1 }}>
                <div className="tarefa-titulo" style={{ textDecoration: done ? "line-through" : "none" }}>{t.titulo}</div>
                <div className="tarefa-meta">
                  <span>👤 {t.responsavel}</span>
                  <span>·</span>
                  <span>📅 {formatDate(t.prazo)}</span>
                </div>
              </div>
              {getStatusTag(t)}
            </div>
          );
        })
      )}
    </div>
  );
}

export default PageProjeto;