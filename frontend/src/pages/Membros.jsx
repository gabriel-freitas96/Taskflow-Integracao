const MEMBROS = [
  {
    id: 1,
    nome: "Gabriel Lacerda",
    email: "gabriel.lacerda@taskflow.com",
    funcao: "Administrador / Desenvolvedor Frontend / Fundador",
    iniciais: "GL",
    cor: "#6c63ff",
    status: "Online",
    projetos: ["TaskFlow Web App", "Portal Comunitário"],
  },
  {
    id: 2,
    nome: "Erick Monteiro",
    email: "erick.monteiro@taskflow.com",
    funcao: "Desenvolvedor Fullstack",
    iniciais: "EM",
    cor: "#10b981",
    status: "Online",
    projetos: ["TaskFlow Web App", "API Gateway & Backend"],
  },
  {
    id: 3,
    nome: "Miguel Viana",
    email: "miguel.viana@taskflow.com",
    funcao: "UI/UX Designer",
    iniciais: "MV",
    cor: "#f59e0b",
    status: "Ausente",
    projetos: ["TaskFlow Web App"],
  },
  {
    id: 4,
    nome: "Ana Beatriz",
    email: "ana.beatriz@taskflow.com",
    funcao: "Analista de Requisitos",
    iniciais: "AB",
    cor: "#3b82f6",
    status: "Online",
    projetos: ["Portal Comunitário"],
  },
  {
    id: 5,
    nome: "Henry Galdino",
    email: "henry.galdino@taskflow.com",
    funcao: "Desenvolvedor Backend",
    iniciais: "HG",
    cor: "#ef4444",
    status: "Offline",
    projetos: ["API Gateway & Backend"],
  },
];

function PageMembros() {
  return (
    <div className="slide-in">
      <div className="section-title">
        Membros da Equipe <span className="dot-sep">·</span>
        <span style={{ color: "var(--text3)", fontSize: 13, fontWeight: 400 }}>
          {MEMBROS.length} membros
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {MEMBROS.map(m => (
          <div key={m.id} className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: `linear-gradient(135deg, ${m.cor}, #3b82f6)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 800, flexShrink: 0,
                boxShadow: `0 0 16px ${m.cor}44`,
              }}>
                {m.iniciais}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{m.nome}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{m.funcao}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                background: m.status === "Online" ? "rgba(16,185,129,0.15)" : m.status === "Ausente" ? "rgba(245,158,11,0.15)" : "rgba(100,116,139,0.2)",
                color: m.status === "Online" ? "var(--success)" : m.status === "Ausente" ? "var(--warning)" : "var(--text3)",
              }}>
                {m.status}
              </span>
            </div>

            <div style={{ fontSize: 12, color: "var(--text3)" }}>{m.email}</div>

            <div>
              <div style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
                Projetos
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {m.projetos.map((p, i) => (
                  <span key={i} className="badge badge-blue">{p}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageMembros;