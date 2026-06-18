import { USUARIO } from "../data/initialData";

function PagePerfil({ projetos, setPage }) {
  const allTarefas = projetos.flatMap(p => p.tarefas);
  const done = allTarefas.filter(t => t.status === "Concluído").length;
  const infos = [
    { label: "Nome Completo", value: USUARIO.nome },
    { label: "E-mail", value: USUARIO.email },
    { label: "Função", value: USUARIO.funcao },
    { label: "Projetos Ativos", value: projetos.length },
    { label: "Tarefas Totais", value: allTarefas.length },
    { label: "Tarefas Concluídas", value: `${done} (${allTarefas.length ? Math.round(done / allTarefas.length * 100) : 0}%)` },
  ];
  return (
    <div className="slide-in">
      <div className="perfil-header">
        <div className="avatar-lg">{USUARIO.iniciais}</div>
        <div>
          <div className="perfil-name">{USUARIO.nome}</div>
          <div className="perfil-role">{USUARIO.funcao}</div>
        </div>
        <button className="btn btn-danger btn-sm" style={{ marginLeft: "auto" }} onClick={() => setPage("login")}>
          Sair da conta
        </button>
      </div>
      <div className="section-title">Informações da Conta</div>
      <div className="perfil-info-grid">
        {infos.map((info, i) => (
          <div key={i} className="info-item">
            <div className="info-item-label">{info.label}</div>
            <div className="info-item-value">{info.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PagePerfil;
