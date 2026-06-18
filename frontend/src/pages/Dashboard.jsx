import { calcProgress, formatDate } from "../utils/helpers";

function PageDashboard({ projetos, setPage, setProjSelecionado }) {
  const projetosArray = Array.isArray(projetos) ? projetos : [];
  const allTarefas = projetosArray.flatMap(p => p.tarefas || []);
  const total = allTarefas.length;
  const done = allTarefas.filter(t => t.status === "Concluído").length;
  const late = allTarefas.filter(t => t.status !== "Concluído" && new Date(t.prazo) < new Date()).length;
  const inProgress = allTarefas.filter(t => t.status === "Em Andamento").length;

  const tarefasConcluidas = allTarefas
    .filter(t => t.status === "Concluído")
    .map(t => ({
      ...t,
      projeto: projetosArray.find(p => p.tarefas && p.tarefas.some(x => x._id === t._id)),
    }));

  const stats = [
    { id: "total", label: "Total de Tarefas", value: total, sub: `${projetosArray.length} projetos`, icon: "⊞", color: "#6c63ff" },
    { id: "concluidas", label: "Concluídas", value: done, sub: `${total ? Math.round(done / total * 100) : 0}% do total`, icon: "✓", color: "#10b981" },
    { id: "andamento", label: "Em Andamento", value: inProgress, sub: "em progresso", icon: "⟳", color: "#f59e0b" },
    { id: "atrasadas", label: "Atrasadas", value: late, sub: "requer atenção", icon: "⚠", color: "#ef4444" },
  ];

  return (
    <div className="slide-in">
      <div className="stats-row">
        {stats.map((s) => (
          <div key={s.id} className="stat-card" style={{ "--card-color": s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="section-title">
        Meus Projetos <span className="dot-sep">·</span>
        <span style={{ color: "var(--text3)", fontSize: 13, fontWeight: 400 }}>{projetosArray.length} projetos ativos</span>
      </div>

      <div className="projetos-grid">
        {projetosArray.map(p => {
          const prog = calcProgress(p.tarefas || []);
          const lateCount = (p.tarefas || []).filter(t => t.status !== "Concluído" && new Date(t.prazo) < new Date()).length;
          return (
            <div 
              key={p._id} 
              className="projeto-card" 
              style={{ "--proj-color": p.cor }} 
              onClick={() => { 
                setProjSelecionado(p._id); 
                setPage("projeto"); 
              }}
            >
              <div className="projeto-card-header">
                <div className="projeto-card-nome">{p.nome}</div>
                {lateCount > 0 && (
                  <span className="badge badge-danger">
                    {lateCount} atrasada{lateCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="projeto-card-desc">{p.descricao}</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: prog + "%", "--proj-color": p.cor }} 
                />
              </div>
              <div className="projeto-card-footer" style={{ marginTop: 10 }}>
                <div className="tarefa-count">
                  📋 {(p.tarefas || []).length} tarefas
                </div>
                <span style={{ 
                  fontSize: 13, 
                  fontWeight: 700, 
                  color: prog === 100 ? "var(--success)" : "var(--text2)" 
                }}>
                  {prog}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="section-title" style={{ marginTop: 32 }}>
        Atividades Concluídas <span className="dot-sep">·</span>
        <span style={{ color: "var(--text3)", fontSize: 13, fontWeight: 400 }}>
          {tarefasConcluidas.length} tarefas
        </span>
      </div>

      {tarefasConcluidas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          Nenhuma tarefa concluída ainda.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tarefasConcluidas.map(t => (
            <div 
              key={t._id} 
              style={{
                display: "flex", 
                alignItems: "center", 
                gap: 16,
                background: "var(--surface)", 
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", 
                padding: "14px 18px",
                borderLeft: `3px solid ${t.projeto?.cor || "var(--success)"}`,
              }}
            >
              <div style={{
                width: 28, 
                height: 28, 
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ color: "var(--success)", fontSize: 12, fontWeight: 700 }}>
                  ✓
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600, 
                  textDecoration: "line-through", 
                  color: "var(--text2)" 
                }}>
                  {t.titulo}
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: "var(--text3)", 
                  marginTop: 3, 
                  display: "flex", 
                  gap: 8 
                }}>
                  <span>📁 {t.projeto?.nome || "—"}</span>
                  <span>·</span>
                  <span>👤 {t.responsavel}</span>
                  <span>·</span>
                  <span>📅 {formatDate(t.prazo)}</span>
                </div>
              </div>
              <span className="tag-status tag-concluido">
                ✓ Concluído
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PageDashboard;
