import { useState, useRef, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import { sendAIMessage } from "../../services/api";

function AIAssistente({ projetos }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Olá! 👋 Sou sua assistente IA do TaskFlow. Posso analisar seus projetos, identificar tarefas atrasadas e dar dicas de produtividade. Como posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  function buildContext() {
    const linhas = projetos.map(p => {
      const total = p.tarefas.length;
      const done = p.tarefas.filter(t => t.status === "Concluído").length;
      const late = p.tarefas.filter(t => t.status !== "Concluído" && new Date(t.prazo) < new Date()).length;
      return `Projeto "${p.nome}": ${total} tarefas, ${done} concluídas, ${late} atrasadas.\n` +
        p.tarefas.map(t => `  - ${t.titulo} | Resp: ${t.responsavel} | Prazo: ${formatDate(t.prazo)} | Status: ${t.status}`).join("\n");
    }).join("\n\n");
    return `Você é um assistente de produtividade integrado ao TaskFlow. Seja direto, amigável e útil. Responda sempre em português brasileiro. Máximo 3 parágrafos curtos. Não repita dados brutos, interprete-os.\n\nDados do usuário:\n${linhas}`;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const newMsgs = [...msgs, { role: "user", content: text }];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const reply = await sendAIMessage(
        buildContext(),
        newMsgs.map(m => ({ role: m.role, content: m.content }))
      );
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      const msg = err.response?.data?.erro || "Erro ao conectar com a IA. Tente novamente.";
      setMsgs(prev => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function autoResize() {
    const ta = taRef.current;
    if (ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }
  }

  const chips = ["Quais tarefas estão atrasadas?", "Resumo dos projetos", "O que priorizar hoje?"];

  return (
    <>
      <button className={`ai-fab ${open ? "open" : ""}`} onClick={() => setOpen(v => !v)} title="Assistente IA">
        {open ? "✕" : "✨"}
      </button>

      {open && (
        <div className="ai-chat">
          <div className="ai-header">
            <div className="ai-avatar">✨</div>
            <div>
              <div className="ai-name">Assistente TaskFlow</div>
              <div className="ai-status">Online</div>
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="ai-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                <div className="ai-msg-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg assistant">
                <div className="ai-msg-bubble ai-typing">
                  <div className="ai-dot" /><div className="ai-dot" /><div className="ai-dot" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {msgs.length === 1 && (
            <div className="ai-suggestions">
              {chips.map((c, i) => (
                <button key={i} className="ai-chip" onClick={() => setInput(c)}>{c}</button>
              ))}
            </div>
          )}

          <div className="ai-input-row">
            <textarea
              ref={taRef}
              className="ai-textarea"
              value={input}
              onChange={e => { setInput(e.target.value); autoResize(); }}
              onKeyDown={onKey}
              placeholder="Pergunte sobre seus projetos..."
              rows={1}
            />
            <button className="ai-send" onClick={send} disabled={!input.trim() || loading}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIAssistente;
