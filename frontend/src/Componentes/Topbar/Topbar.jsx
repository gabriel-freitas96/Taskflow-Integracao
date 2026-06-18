function Topbar({ title, setPage, darkMode, toggleTheme }) {
  return (
    <div className="topbar">
      <div className="topbar-title">{title}</div>
      <div className="topbar-actions">
        <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
          {darkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => setPage("nova-tarefa")}>
          + Nova Tarefa
        </button>
      </div>
    </div>
  );
}

export default Topbar;