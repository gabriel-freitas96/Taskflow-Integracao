import { useState, useCallback, useEffect } from "react";
import { PROJETOS_INICIAIS } from "./data/initialData";
import { getProjects, logout } from "./services/api";
import GlobalStyle from "./styles/GlobalStyle";
import Sidebar from "./Componentes/Sidebar/Sidebar";
import Topbar from "./Componentes/Topbar/Topbar";
import AIAssistente from "./Componentes/AIAssistente/AIAssistente";
import PageLogin from "./pages/Login";
import PageCadastro from "./pages/Cadastro";
import PageDashboard from "./pages/Dashboard";
import PageProjeto from "./pages/ProjetoDetalhes";
import PageNovaTarefa from "./pages/NovaTarefa";
import PagePerfil from "./pages/Perfil";
import PageMembros from "./pages/Membros";

export default function App() {
  const [page, setPage] = useState("login");
  const [projetos, setProjetos] = useState(PROJETOS_INICIAIS);
  const [projSelecionado, setProjSelecionado] = useState(null);
  const [toast, setToast] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(v => {
      document.body.classList.toggle("light", v);
      return !v;
    });
  };

  // ✅ Só carrega projetos quando está autenticado (tem token)
  const carregarProjetos = async () => {
    try {
      const data = await getProjects();
      if (Array.isArray(data)) {
        setProjetos(data);
      } else {
        setProjetos(PROJETOS_INICIAIS);
      }
    } catch (err) {
      console.warn("Erro ao carregar projetos:", err.message);
      setProjetos(PROJETOS_INICIAIS);
    }
  };

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // ✅ Fazer logout
  const handleLogout = () => {
    logout();
    setPage("login");
    setProjetos(PROJETOS_INICIAIS);
  };

  const pageTitle = {
    dashboard: "Dashboard",
    projeto: Array.isArray(projetos) ? (projetos.find(p => p._id === projSelecionado)?.nome || "Projeto") : "Projeto",
    "nova-tarefa": "Nova Tarefa",
    perfil: "Meu Perfil",
    membros: "Membros",
  };

  // ✅ Se está em LOGIN
  if (page === "login") return (
    <>
      <GlobalStyle />
      <PageLogin setPage={(newPage) => {
        if (newPage === "cadastro") {
          setPage("cadastro");
        } else if (newPage === "dashboard") {
          setPage("dashboard");
          carregarProjetos();
        }
      }} />
    </>
  );

  // ✅ Se está em CADASTRO
  if (page === "cadastro") return (
    <>
      <GlobalStyle />
      <PageCadastro setPage={(newPage) => {
        if (newPage === "login") {
          setPage("login");
        } else if (newPage === "dashboard") {
          setPage("dashboard");
          carregarProjetos();
        }
      }} />
    </>
  );

  // ✅ Se está autenticado, mostra DASHBOARD
  return (
    <>
      <GlobalStyle />
      <div className="app-layout">
        <Sidebar page={page} setPage={setPage} />
        <div className="main-content">
          <Topbar
            title={pageTitle[page] || "TaskFlow"}
            setPage={setPage}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            onLogout={handleLogout}
          />
          <div className="page-content">
            {page === "dashboard" && (
              <PageDashboard projetos={projetos} setPage={setPage} setProjSelecionado={setProjSelecionado} />
            )}
            {page === "projeto" && (
              <PageProjeto projetos={projetos} setProjetos={setProjetos} projetoId={projSelecionado} setPage={setPage} />
            )}
            {page === "nova-tarefa" && (
              <PageNovaTarefa projetos={projetos} setProjetos={setProjetos} setPage={setPage} showToast={showToast} />
            )}
            {page === "perfil" && (
              <PagePerfil projetos={projetos} setPage={setPage} />
            )}
            {page === "membros" && (
              <PageMembros />
            )}
          </div>
        </div>
      </div>

      <AIAssistente projetos={projetos} />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
