import { USUARIO } from "../../data/initialData";

function Sidebar({ page, setPage }) {
  const navItems = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "membros",   icon: "👥", label: "Membros" },
    { id: "nova-tarefa", icon: "+", label: "Nova Tarefa" },
    { id: "perfil", icon: "◎", label: "Meu Perfil" },
  ];

  function handleLogout() {
    if (window.confirm("Deseja sair da sua conta?")) {
      setPage("login");
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={() => setPage("dashboard")}>
        <div className="sidebar-logo-icon">⟡</div>
        TaskFlow
      </div>
      <div className="sidebar-section">Menu</div>
      <nav className="sidebar-nav">
        {navItems.map(it => (
          <button key={it.id} className={`nav-item ${page === it.id ? "active" : ""}`} onClick={() => setPage(it.id)}>
            <span className="nav-icon">{it.icon}</span>
            {it.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="user-mini" style={{ flex: 1 }} onClick={() => setPage("perfil")}>
            <div className="avatar-mini">{USUARIO.iniciais}</div>
            <div className="user-mini-info">
              <div className="user-mini-name">{USUARIO.nome}</div>
              <div className="user-mini-role">Aluno</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sair"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text3)", fontSize: 16, padding: "6px 8px",
              borderRadius: "var(--radius-sm)", transition: "color 0.18s, background 0.18s",
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--danger)"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.background = "none"; }}
          >
            ⎋
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;