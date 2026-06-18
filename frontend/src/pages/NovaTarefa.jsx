import { useState } from "react";
import { createTarefa, getProjects } from "../services/api";

const MEMBROS = ["Ana Beatriz", "Gabriel Lacerda", "Erick Monteiro", "Miguel Vianna", "Henry Galdino"];

function PageNovaTarefa({ projetos, setProjetos, setPage, showToast }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [prazo, setPrazo] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [projetoId, setProjetoId] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit() {
    if (!titulo.trim() || !responsavel || !prazo || !projetoId) return;
    const novaTarefa = { titulo: titulo.trim(), descricao: descricao.trim(), responsavel, prazo, status };
    setSalvando(true);
    setErro("");
    try {
      await createTarefa(projetoId, novaTarefa);
      const projetosAtualizados = await getProjects();
      setProjetos(projetosAtualizados);
      showToast("✓ Tarefa criada com sucesso!");
      setPage("dashboard");
    } catch (err) {
      setErro("Não foi possível salvar a tarefa. Verifique se o backend está rodando.");
      console.error(err);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="slide-in">
      <div className="card form-card">
        <div className="form-title">Adicionar Nova Tarefa</div>

        {/* PROJETO */}
        <div className="form-group">
          <label className="form-label">Projeto</label>
          <select className="form-input" value={projetoId} onChange={e => setProjetoId(e.target.value)}>
            <option value="">Selecione um projeto...</option>
            {Array.isArray(projetos) && projetos.map(p => <option key={p._id} value={p._id}>{p.nome}</option>)}
          </select>
        </div>

        {/* TÍTULO */}
        <div className="form-group">
          <label className="form-label">Título da Tarefa</label>
          <input className="form-input" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ex: Implementar autenticação..." />
        </div>

        {/* DESCRIÇÃO */}
        <div className="form-group">
          <label className="form-label">Descrição</label>
          <input className="form-input" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descreva brevemente a tarefa..." />
        </div>

        {/* RESPONSÁVEL */}
        <div className="form-group">
          <label className="form-label">Responsável</label>
          <select className="form-input" value={responsavel} onChange={e => setResponsavel(e.target.value)}>
            <option value="">Selecione um membro...</option>
            {MEMBROS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* PRAZO */}
        <div className="form-group">
          <label className="form-label">Prazo</label>
          <input className="form-input" type="date" value={prazo} onChange={e => setPrazo(e.target.value)} />
        </div>

        {/* STATUS */}
        <div className="form-group">
          <label className="form-label">Status Inicial</label>
          <select className="form-input" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Pendente</option>
            <option>Em Andamento</option>
            <option>Concluído</option>
          </select>
        </div>

        {erro && <div style={{ color: "var(--danger)", fontSize: 13, marginTop: 12 }}>{erro}</div>}

        <div className="row mt-16">
          <button className="btn btn-ghost" onClick={() => setPage("dashboard")}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!titulo.trim() || !responsavel || !prazo || !projetoId || salvando}>
            {salvando ? "Salvando..." : "Salvar Tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageNovaTarefa;