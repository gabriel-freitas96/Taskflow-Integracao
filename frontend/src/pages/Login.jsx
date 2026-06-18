import { useState } from "react";
import { login } from "../services/api";

function PageLogin({ setPage }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      setErro("Preencha email e senha");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const response = await login(email, senha);
      
      // ✅ CORREÇÃO 1: Verifica se token foi recebido
      if (response.token) {
        // ✅ CORREÇÃO 2: Verifica se token foi salvo no localStorage
        const tokenSalvo = localStorage.getItem("token");
        if (tokenSalvo) {
          // ✅ CORREÇÃO 3: Aguarda 100ms para localStorage sincronizar
          await new Promise(resolve => setTimeout(resolve, 100));
          setPage("dashboard");
        } else {
          setErro("Erro ao salvar sessão. Tente novamente.");
        }
      } else {
        setErro("Token não recebido do servidor");
      }
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao fazer login");
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
            Gerencie seus projetos com <span>inteligência</span>
          </div>
          <div className="auth-bg-sub">
            Uma plataforma completa para organizar tarefas, acompanhar projetos acadêmicos e contar com uma IA integrada para otimizar sua produtividade.
          </div>
        </div>
      </div>
      <div className="auth-panel fade-in">
        <div className="auth-title">Bem-vindo de volta</div>
        <div className="auth-sub">Entre com suas credenciais para continuar</div>
        
        {erro && <div style={{ color: "red", marginBottom: "10px", fontSize: "12px" }}>⚠️ {erro}</div>}

        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" disabled={carregando} />
        </div>
        <div className="form-group">
          <label className="form-label">Senha</label>
          <input className="form-input" type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="••••••••" disabled={carregando} />
        </div>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 4 }} onClick={handleLogin} disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar no TaskFlow"}
        </button>
        <div className="auth-footer">
          Não tem uma conta?{" "}
          <span className="auth-link" onClick={() => setPage("cadastro")}>Cadastre-se</span>
        </div>
      </div>
    </div>
  );
}

export default PageLogin;