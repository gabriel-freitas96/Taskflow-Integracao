import { useState } from "react";
import { registrar } from "../services/api";

function PageCadastro({ setPage }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleCadastro() {
    if (!email || !senha || !confirmaSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha.length < 6) {
      setErro("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmaSenha) {
      setErro("As senhas não conferem");
      return;
    }

    setCarregando(true);
    setErro("");
    setSucesso("");

    try {
      await registrar(email, senha);
      setSucesso("✅ Conta criada com sucesso! Redirecionando para login...");
      
      setTimeout(() => {
        setPage("login");
      }, 2000);
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao cadastrar");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg-text slide-in">
          <div className="auth-bg-logo">
            <div className="auth-bg-logo-icon">⟡</div>
            TaskFlow
          </div>
          <div className="auth-bg-headline">
            Comece a organizar seus <span>projetos hoje</span>
          </div>
          <div className="auth-bg-sub">
            Crie sua conta gratuitamente e tenha acesso a todas as ferramentas de gestão de tarefas com IA.
          </div>
        </div>
      </div>
      <div className="auth-panel fade-in">
        <div className="auth-title">Criar conta</div>
        <div className="auth-sub">Preencha os dados para começar</div>

        {erro && <div style={{ color: "red", marginBottom: "10px", fontSize: "12px" }}>⚠️ {erro}</div>}
        {sucesso && <div style={{ color: "green", marginBottom: "10px", fontSize: "12px" }}>{sucesso}</div>}

        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input 
            className="form-input" 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="seu@email.com" 
            disabled={carregando} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Senha</label>
          <input 
            className="form-input" 
            type="password" 
            value={senha} 
            onChange={e => setSenha(e.target.value)} 
            placeholder="Mínimo 6 caracteres" 
            disabled={carregando} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirmar Senha</label>
          <input 
            className="form-input" 
            type="password" 
            value={confirmaSenha} 
            onChange={e => setConfirmaSenha(e.target.value)} 
            placeholder="Confirme sua senha" 
            disabled={carregando} 
          />
        </div>
        <button 
          className="btn btn-primary" 
          style={{ width: "100%", marginTop: 4 }} 
          onClick={handleCadastro} 
          disabled={carregando}
        >
          {carregando ? "Criando..." : "Criar Conta"}
        </button>
        <div className="auth-footer">
          Já tem uma conta?{" "}
          <span className="auth-link" onClick={() => setPage("login")}>Faça Login</span>
        </div>
      </div>
    </div>
  );
}

export default PageCadastro;
