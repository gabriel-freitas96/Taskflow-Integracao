const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0b14;
      --surface: #11131f;
      --surface2: #1a1d2e;
      --surface3: #222540;
      --border: rgba(255,255,255,0.07);
      --border2: rgba(255,255,255,0.12);
      --accent: #6c63ff;
      --accent2: #3b82f6;
      --accent3: #8b5cf6;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --text: #e8eaf6;
      --text2: #9b9ec9;
      --text3: #5c5f7a;
      --radius: 14px;
      --radius-sm: 8px;
      --shadow: 0 8px 32px rgba(0,0,0,0.4);
      --glow: 0 0 24px rgba(108,99,255,0.25);
    }

    .light {
      --bg: #f0f2f9;
      --surface: #ffffff;
      --surface2: #e8eaf6;
      --surface3: #d8daf0;
      --border: rgba(0,0,0,0.08);
      --border2: rgba(0,0,0,0.14);
      --text: #1a1b2e;
      --text2: #4a4d6e;
      --text3: #9b9ec9;
      --shadow: 0 8px 32px rgba(0,0,0,0.1);
      --glow: 0 0 24px rgba(108,99,255,0.2);
    }

    html, body, #root { height: 100%; font-family: 'Sora', sans-serif; background: var(--bg); color: var(--text); transition: background 0.3s, color 0.3s; }

    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 10px; }

    input, select, textarea, button { font-family: inherit; }

    .app-layout { display: flex; min-height: 100vh; }

    /* ── SIDEBAR ── */
    .sidebar {
      width: 240px; min-height: 100vh;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      padding: 0 0 24px;
      position: fixed; left: 0; top: 0; bottom: 0;
      z-index: 50; transition: transform 0.3s, background 0.3s;
    }
    .sidebar-logo {
      padding: 24px 20px 20px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 10px;
      font-size: 18px; font-weight: 800; letter-spacing: -0.5px; cursor: pointer;
    }
    .sidebar-logo-icon {
      width: 34px; height: 34px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      border-radius: 9px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; box-shadow: var(--glow);
    }
    .sidebar-section {
      padding: 20px 12px 8px; font-size: 10px; font-weight: 600;
      letter-spacing: 1.5px; text-transform: uppercase; color: var(--text3);
    }
    .sidebar-nav { padding: 0 8px; flex: 1; }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: var(--radius-sm);
      font-size: 14px; font-weight: 500; color: var(--text2);
      cursor: pointer; transition: all 0.18s; margin-bottom: 2px;
      border: none; background: none; width: 100%; text-align: left;
    }
    .nav-item:hover { background: var(--surface2); color: var(--text); }
    .nav-item.active { background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(59,130,246,0.12)); color: var(--accent); border: 1px solid rgba(108,99,255,0.25); }
    .nav-item .nav-icon { font-size: 16px; width: 20px; text-align: center; }
    .sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); margin-top: auto; }
    .user-mini {
      display: flex; align-items: center; gap: 10px;
      padding: 10px; border-radius: var(--radius-sm);
      cursor: pointer; transition: background 0.18s;
    }
    .user-mini:hover { background: var(--surface2); }
    .avatar-mini {
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      font-size: 12px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .user-mini-info { overflow: hidden; }
    .user-mini-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .user-mini-role { font-size: 11px; color: var(--text3); }

    /* ── MAIN ── */
    .main-content { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
    .topbar {
      height: 60px; background: var(--surface);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 28px; position: sticky; top: 0; z-index: 40;
      transition: background 0.3s;
    }
    .topbar-title { font-size: 16px; font-weight: 700; }
    .topbar-actions { display: flex; align-items: center; gap: 12px; }
    .page-content { padding: 28px; flex: 1; }

    /* ── TOGGLE DARK/LIGHT ── */
    .theme-toggle-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 20px;
      transition: background 0.2s;
    }
    .theme-toggle-btn:hover {
      background: var(--surface2);
    }
    .toggle-track {
      width: 40px;
      height: 22px;
      background: var(--surface3);
      border: 1px solid var(--border2);
      border-radius: 20px;
      display: flex;
      align-items: center;
      padding: 0 3px;
      transition: background 0.3s, border-color 0.3s;
      flex-shrink: 0;
    }
    .theme-toggle-btn.light .toggle-track {
      background: rgba(108,99,255,0.2);
      border-color: var(--accent);
    }
    .toggle-thumb {
      width: 16px;
      height: 16px;
      background: var(--accent);
      border-radius: 50%;
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
      transform: translateX(0);
      flex-shrink: 0;
    }
    .theme-toggle-btn.light .toggle-thumb {
      transform: translateX(18px);
    }
    .toggle-icon {
      font-size: 15px;
      line-height: 1;
      user-select: none;
    }

    /* ── CARDS ── */
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; transition: background 0.3s; }
    .card:hover { border-color: var(--border2); }

    /* ── DASHBOARD ── */
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px;
      position: relative; overflow: hidden;
      transition: border-color 0.2s, transform 0.2s, background 0.3s;
    }
    .stat-card:hover { border-color: var(--border2); transform: translateY(-2px); }
    .stat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--card-color, var(--accent)); }
    .stat-label { font-size: 12px; color: var(--text3); font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
    .stat-value { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
    .stat-sub { font-size: 12px; color: var(--text3); }
    .stat-icon { position: absolute; top: 18px; right: 18px; font-size: 22px; opacity: 0.2; }

    .projetos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
    .projeto-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px;
      cursor: pointer; transition: all 0.2s;
      position: relative; overflow: hidden;
    }
    .projeto-card:hover { border-color: var(--border2); transform: translateY(-3px); box-shadow: var(--shadow); }
    .projeto-card::after { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: var(--proj-color, var(--accent)); }
    .projeto-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
    .projeto-card-nome { font-size: 15px; font-weight: 700; line-height: 1.3; padding-right: 8px; }
    .projeto-card-desc { font-size: 13px; color: var(--text2); line-height: 1.6; margin-bottom: 16px; }
    .projeto-card-footer { display: flex; align-items: center; justify-content: space-between; }
    .tarefa-count { font-size: 12px; color: var(--text3); display: flex; align-items: center; gap: 4px; }
    .progress-bar { height: 4px; background: var(--surface3); border-radius: 2px; overflow: hidden; margin-top: 12px; }
    .progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, var(--proj-color, var(--accent)), var(--accent2)); transition: width 0.4s; }
    .badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; }
    .badge-blue { background: rgba(108,99,255,0.15); color: var(--accent); }
    .badge-success { background: rgba(16,185,129,0.15); color: var(--success); }
    .badge-warning { background: rgba(245,158,11,0.15); color: var(--warning); }
    .badge-danger { background: rgba(239,68,68,0.15); color: var(--danger); }
    .badge-neutral { background: var(--surface3); color: var(--text2); }

    /* ── DETALHES DO PROJETO ── */
    .detalhes-header { margin-bottom: 24px; display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
    .detalhes-back { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text3); cursor: pointer; padding: 6px 0; transition: color 0.2s; border: none; background: none; }
    .detalhes-back:hover { color: var(--text); }
    .detalhes-title { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .detalhes-desc { font-size: 14px; color: var(--text2); }
    .tarefa-row {
      display: flex; align-items: center; gap: 16px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius-sm); padding: 14px 18px;
      margin-bottom: 10px; transition: all 0.18s;
    }
    .tarefa-row:hover { border-color: var(--border2); }
    .tarefa-titulo { font-size: 14px; font-weight: 600; flex: 1; }
    .tarefa-meta { font-size: 12px; color: var(--text3); display: flex; align-items: center; gap: 6px; }
    .tarefa-checkbox {
      width: 18px; height: 18px; border: 2px solid var(--border2);
      border-radius: 50%; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: all 0.18s;
    }
    .tarefa-checkbox.done { background: var(--success); border-color: var(--success); }

    /* ── FORMULÁRIOS ── */
    .form-card { max-width: 560px; margin: 0 auto; }
    .form-title { font-size: 20px; font-weight: 800; margin-bottom: 24px; }
    .form-group { margin-bottom: 18px; }
    .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--text2); margin-bottom: 7px; }
    .form-input {
      width: 100%; background: var(--surface2); border: 1px solid var(--border2);
      border-radius: var(--radius-sm); padding: 11px 14px;
      font-size: 14px; color: var(--text); outline: none;
      transition: border-color 0.2s, box-shadow 0.2s, background 0.3s;
    }
    .form-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(108,99,255,0.15); }
    .form-input::placeholder { color: var(--text3); }
    select.form-input option { background: var(--surface2); }

    /* ── BOTÕES ── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 7px;
      padding: 10px 20px; border-radius: var(--radius-sm);
      font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all 0.18s;
    }
    .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; box-shadow: 0 4px 14px rgba(108,99,255,0.4); }
    .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
    .btn-ghost { background: var(--surface2); color: var(--text2); border: 1px solid var(--border2); }
    .btn-ghost:hover { background: var(--surface3); color: var(--text); }
    .btn-danger { background: rgba(239,68,68,0.12); color: var(--danger); border: 1px solid rgba(239,68,68,0.25); }
    .btn-danger:hover { background: rgba(239,68,68,0.22); }
    .btn-sm { padding: 7px 14px; font-size: 13px; }
    .btn-icon { width: 36px; height: 36px; padding: 0; border-radius: var(--radius-sm); }

    .theme-fab {
  position: fixed;
  bottom: 90px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--border2);
  background: var(--surface);
  font-size: 22px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.theme-fab:hover {
  transform: scale(1.12);
  box-shadow: 0 6px 24px rgba(0,0,0,0.4);
}

    /* ── LOGIN / CADASTRO ── */
    .auth-page { min-height: 100vh; display: flex; position: relative; overflow: hidden; }
    .auth-bg {
      flex: 1;
      background: linear-gradient(135deg, #0a0b14 0%, #0d0e1f 40%, #11131f 100%);
      display: flex; align-items: center; justify-content: center; padding: 40px;
    }
    .light .auth-bg { background: linear-gradient(135deg, #e8eaf6 0%, #f0f2f9 100%); }
    .auth-bg-text { max-width: 480px; }
    .auth-bg-logo { font-size: 28px; font-weight: 800; margin-bottom: 32px; display: flex; align-items: center; gap: 12px; }
    .auth-bg-logo-icon { width: 44px; height: 44px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .auth-bg-headline { font-size: 36px; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
    .auth-bg-headline span { background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .auth-bg-sub { font-size: 16px; color: var(--text2); line-height: 1.7; }
    .auth-panel { width: 420px; background: var(--surface); border-left: 1px solid var(--border); display: flex; flex-direction: column; justify-content: center; padding: 48px 40px; transition: background 0.3s; }
    .auth-title { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
    .auth-sub { font-size: 14px; color: var(--text2); margin-bottom: 32px; }
    .auth-link { color: var(--accent); text-decoration: none; font-weight: 600; cursor: pointer; }
    .auth-footer { text-align: center; font-size: 13px; color: var(--text3); margin-top: 20px; }

    /* ── PERFIL ── */
    .perfil-header { display: flex; align-items: center; gap: 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; margin-bottom: 20px; }
    .avatar-lg { width: 72px; height: 72px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 50%; font-size: 24px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: var(--glow); }
    .perfil-name { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
    .perfil-role { font-size: 13px; color: var(--text3); }
    .perfil-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .info-item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 16px; }
    .info-item-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .info-item-value { font-size: 14px; font-weight: 600; }

    /* ── AI CHAT ── */
    .ai-fab {
      position: fixed; bottom: 24px; right: 24px;
      width: 52px; height: 52px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      border: none; border-radius: 50%; color: white; font-size: 22px;
      cursor: pointer; box-shadow: 0 4px 20px rgba(108,99,255,0.5), var(--glow);
      z-index: 999; display: flex; align-items: center; justify-content: center; transition: all 0.25s;
    }
    .ai-fab:hover { transform: scale(1.08); }
    .ai-fab.open { background: linear-gradient(135deg, #dc2626, #ef4444); box-shadow: 0 4px 20px rgba(239,68,68,0.4); }
    .ai-chat {
      position: fixed; bottom: 88px; right: 24px;
      width: 360px; max-height: 540px;
      background: var(--surface); border: 1px solid var(--border2);
      border-radius: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      display: flex; flex-direction: column; z-index: 998; overflow: hidden;
      animation: chatSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes chatSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
    .ai-header { background: linear-gradient(135deg, rgba(108,99,255,0.2), rgba(59,130,246,0.12)); border-bottom: 1px solid var(--border); padding: 14px 16px; display: flex; align-items: center; gap: 10px; }
    .ai-avatar { width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .ai-name { font-size: 14px; font-weight: 700; }
    .ai-status { font-size: 11px; color: var(--success); display: flex; align-items: center; gap: 4px; }
    .ai-status::before { content: ''; width: 6px; height: 6px; background: var(--success); border-radius: 50%; }
    .ai-close { margin-left: auto; background: none; border: none; color: var(--text3); cursor: pointer; font-size: 16px; padding: 4px; transition: color 0.2s; }
    .ai-close:hover { color: var(--text); }
    .ai-msgs { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .ai-msg { max-width: 88%; animation: msgIn 0.18s ease; }
    @keyframes msgIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .ai-msg.user { align-self: flex-end; }
    .ai-msg.assistant { align-self: flex-start; }
    .ai-msg-bubble { padding: 10px 14px; border-radius: 14px; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; }
    .ai-msg.assistant .ai-msg-bubble { background: var(--surface2); color: var(--text); border-radius: 4px 14px 14px 14px; border: 1px solid var(--border); }
    .ai-msg.user .ai-msg-bubble { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; border-radius: 14px 14px 4px 14px; }
    .ai-typing { display: flex; gap: 5px; align-items: center; padding: 12px 14px; }
    .ai-dot { width: 7px; height: 7px; background: var(--text3); border-radius: 50%; animation: dot 1.2s infinite; }
    .ai-dot:nth-child(2) { animation-delay: 0.2s; }
    .ai-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes dot { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
    .ai-suggestions { padding: 0 12px 10px; display: flex; flex-wrap: wrap; gap: 6px; }
    .ai-chip { background: none; border: 1px solid rgba(108,99,255,0.35); color: var(--accent); border-radius: 20px; padding: 5px 11px; font-size: 12px; cursor: pointer; transition: all 0.18s; }
    .ai-chip:hover { background: rgba(108,99,255,0.12); }
    .ai-input-row { display: flex; align-items: flex-end; gap: 8px; padding: 10px 12px; border-top: 1px solid var(--border); }
    .ai-textarea { flex: 1; background: var(--surface2); border: 1px solid var(--border2); border-radius: 10px; padding: 9px 12px; font-size: 13.5px; color: var(--text); resize: none; outline: none; max-height: 90px; overflow-y: auto; transition: border-color 0.2s; font-family: 'Sora', sans-serif; }
    .ai-textarea:focus { border-color: var(--accent); }
    .ai-textarea::placeholder { color: var(--text3); }
    .ai-send { width: 36px; height: 36px; flex-shrink: 0; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 9px; color: white; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s; }
    .ai-send:disabled { opacity: 0.35; cursor: not-allowed; }
    .ai-send:not(:disabled):hover { opacity: 0.85; }

    /* ── TOAST ── */
    .toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius-sm); padding: 12px 20px; font-size: 13px; font-weight: 500; box-shadow: var(--shadow); animation: toastIn 0.3s ease; z-index: 9999; white-space: nowrap; }
    @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

    /* ── MISC ── */
    .section-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .dot-sep { color: var(--text3); }
    .row { display: flex; align-items: center; gap: 12px; }
    .flex-1 { flex: 1; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .mb-16 { margin-bottom: 16px; }
    .empty-state { text-align: center; padding: 48px 20px; color: var(--text3); font-size: 14px; }
    .empty-icon { font-size: 40px; margin-bottom: 12px; }
    .tag-status { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .tag-concluido { background: rgba(16,185,129,0.15); color: var(--success); }
    .tag-andamento { background: rgba(245,158,11,0.15); color: var(--warning); }
    .tag-pendente  { background: rgba(100,116,139,0.2); color: #94a3b8; }
    .tag-atrasada  { background: rgba(239,68,68,0.15); color: var(--danger); }
    .divider { height: 1px; background: var(--border); margin: 20px 0; }

    /* ── ANIMATIONS ── */
    .fade-in { animation: fadeIn 0.25s ease; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .slide-in { animation: slideIn 0.25s ease; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

export default GlobalStyle;