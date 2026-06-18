# TaskFlow — Fase 2 (Frontend + Backend)

## O que mudou nesta entrega

- Adicionado o **Backend** (Node.js + Express), que antes não existia no projeto.
- Corrigido o `App.jsx`: ele chamava `getProjects()` sem essa função existir em
  nenhum lugar do código, o que quebrava a aplicação inteira na inicialização
  (tela em branco). Agora `getProjects` vem de `src/services/api.js` e busca os
  projetos no backend, com fallback para os dados mockados se a API estiver fora.
- `NovaTarefa.jsx` e `ProjetoDetalhes.jsx` agora persistem as mudanças
  (criar tarefa / marcar como concluída) no backend, em vez de só guardar em
  memória no navegador.
- O Assistente de IA (`AIAssistente.jsx`) chamava a API da Anthropic
  **direto do navegador**, sem chave de API — isso nunca funcionaria, e mesmo
  com chave seria inseguro (a chave ficaria visível no código do navegador).
  Agora ele chama o backend, que é quem de fato conversa com a Anthropic.

## Como rodar

Precisa de **dois terminais abertos ao mesmo tempo** (o backend e o frontend
são dois servidores separados).

### Terminal 1 — Backend

```bash
cd Backend
npm install
cp .env.example .env
# (opcional) edite o .env e cole sua ANTHROPIC_API_KEY se quiser o chat de IA funcionando
npm start
```

A API sobe em `http://localhost:5000`.

### Terminal 2 — Frontend

```bash
cd Frontend
npm install
npm start
```

O site abre em `http://localhost:3000` e já está configurado (arquivo `.env`)
para chamar a API em `http://localhost:5000/api`.

> Se você só abrir o frontend sem o backend rodando, o app não quebra mais —
> ele cai de volta nos dados mockados e mostra um aviso no console do navegador.

