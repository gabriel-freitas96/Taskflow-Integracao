# TaskFlow 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)

Sistema de gerenciamento de projetos e tarefas com integração de IA assistente.

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Integrantes do Grupo](#-integrantes-do-grupo)
- [Tecnologias](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api---endpoints)
- [Banco de Dados](#-modelagem-do-banco-de-dados)
- [Como Rodar](#-instruções-para-rodar)
- [Autenticação](#-autenticação)
- [Assistente de IA](#-assistente-de-ia)
- [Features](#-funcionalidades-principais)
- [Troubleshooting](#-troubleshooting)
- [Contribuindo](#-contribuindo)

---

## 📋 Sobre o Projeto

**TaskFlow** é uma aplicação web full-stack desenvolvida para facilitar o gerenciamento de projetos e tarefas em equipe. Com interface intuitiva, autenticação segura e um assistente de IA integrado, oferece uma experiência completa de produtividade.

### ✨ Principais Características

- ✅ Autenticação segura com JWT
- ✅ Gerenciamento completo de projetos
- ✅ Criação e organização de tarefas
- ✅ Atribuição de responsáveis e prazos
- ✅ Controle de status de tarefas
- ✅ Assistente de IA integrado (Claude)
- ✅ Interface responsiva e moderna
- ✅ Modo claro/escuro
- ✅ Perfil de usuário
- ✅ Gerenciamento de membros

---

## 👥 Integrantes do Grupo

- [Gabriel Lacerda]
- [Miguel Viana]
- [Henry Galdino]
- [Erick Monteiro]
---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| Node.js | v14+ | Runtime JavaScript |
| Express.js | ^4.19.2 | Framework web |
| MongoDB | Latest | Banco de dados NoSQL |
| Mongoose | ^9.7.0 | ODM para MongoDB |
| Anthropic Claude API | ^0.32.0 | Integração com IA |
| CORS | ^2.8.5 | Controle de origem cruzada |
| dotenv | ^16.4.5 | Variáveis de ambiente |

### Frontend
| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| React | 18.2.0 | Biblioteca UI |
| React Router DOM | 6.22.0 | Roteamento |
| Axios | 1.18.0 | Cliente HTTP |
| React Scripts | 5.0.1 | Ferramenta de build |

---

## 📁 Estrutura do Projeto

```
taskflow/
├── backend/
│   ├── models/
│   │   └── Projeto.js                    # Schema do Projeto e Tarefa
│   ├── routes/
│   │   ├── projetos.js                   # Rotas de gerenciamento de projetos
│   │   ├── ai.js                         # Rotas da IA assistente
│   │   └── auth.js                       # Rotas de autenticação
│   ├── middleware/
│   │   └── auth.js                       # Middleware de verificação de token
│   ├── services/
│   │   └── [serviços]                    # Lógica de negócio
│   ├── scripts/
│   │   └── [scripts úteis]               # Scripts auxiliares
│   ├── server.js                         # Arquivo principal do servidor
│   ├── package.json                      # Dependências do backend
│   └── .env.example                      # Exemplo de variáveis de ambiente
│
├── frontend/
│   ├── src/
│   │   ├── Componentes/
│   │   │   ├── Sidebar/                  # Barra lateral de navegação
│   │   │   ├── Topbar/                   # Barra superior
│   │   │   ├── AIAssistente/             # Componente do assistente de IA
│   │   │   └── [outros componentes]      # Componentes reutilizáveis
│   │   ├── pages/
│   │   │   ├── Login.jsx                 # Página de login
│   │   │   ├── Cadastro.jsx              # Página de cadastro
│   │   │   ├── Dashboard.jsx             # Dashboard principal
│   │   │   ├── ProjetoDetalhes.jsx       # Detalhes do projeto
│   │   │   ├── NovaTarefa.jsx            # Criação de nova tarefa
│   │   │   ├── Perfil.jsx                # Perfil do usuário
│   │   │   └── Membros.jsx               # Gerenciamento de membros
│   │   ├── services/
│   │   │   └── api.js                    # Chamadas HTTP para o backend
│   │   ├── styles/
│   │   │   └── GlobalStyle.js            # Estilos globais
│   │   ├── utils/                        # Funções auxiliares
│   │   ├── data/
│   │   │   └── initialData.js            # Dados iniciais
│   │   ├── App.jsx                       # Componente principal
│   │   └── index.js                      # Entrada da aplicação
│   ├── public/                           # Arquivos estáticos
│   ├── package.json                      # Dependências do frontend
│   └── .env.example                      # Exemplo de variáveis de ambiente
│
└── README.md                             # Este arquivo
```

---

## 📡 API - Endpoints

### 🔑 Autenticação

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "sua_senha"
}
```

**Resposta (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "507f1f77bcf86cd799439011",
    "nome": "João Silva",
    "email": "usuario@exemplo.com"
  }
}
```

#### Cadastro
```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "Novo Usuário",
  "email": "novo@exemplo.com",
  "senha": "senha_segura"
}
```

---

### 📂 Projetos

#### Listar Todos os Projetos
```http
GET /api/projetos
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Projeto Exemplo",
    "descricao": "Descrição do projeto",
    "cor": "#6c63ff",
    "tarefas": [],
    "dataCriacao": "2024-06-16T19:55:00.000Z"
  }
]
```

#### Adicionar Tarefa a um Projeto
```http
POST /api/projetos/{projetoId}/tarefas
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Implementar login",
  "descricao": "Criar página de autenticação",
  "responsavel": "João Silva",
  "prazo": "2024-12-31",
  "status": "Pendente"
}
```

**Resposta (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "nome": "Projeto",
  "tarefas": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "titulo": "Implementar login",
      "descricao": "Criar página de autenticação",
      "responsavel": "João Silva",
      "prazo": "2024-12-31",
      "status": "Pendente",
      "dataCriacao": "2024-06-18T10:30:00.000Z"
    }
  ]
}
```

#### Alternar Status da Tarefa
```http
PATCH /api/projetos/{projetoId}/tarefas/{tarefaId}/toggle
Authorization: Bearer {token}
```

**Resposta (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "tarefas": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "status": "Concluído"
    }
  ]
}
```

---

### 🤖 IA Assistente

#### Chat com IA
```http
POST /api/ai/chat
Authorization: Bearer {token}
Content-Type: application/json

{
  "mensagem": "Quais são as tarefas mais prioritárias?",
  "contexto": {
    "projetos": [...],
    "tarefaAtual": {...}
  }
}
```

**Resposta (200 OK):**
```json
{
  "resposta": "Com base nas suas tarefas, recomendo focar em...",
  "sugestoes": []
}
```

---

## 🗄️ Modelagem do Banco de Dados

### Diagrama ER

```
┌─────────────────────────┐
│      PROJETO            │
├─────────────────────────┤
│ _id (ObjectId)          │
│ nome (String) [req]     │
│ descricao (String)      │
│ cor (String)            │
│ tarefas (Array)    ────┐│
│ dataCriacao (Date)      │
└─────────────────────────┘
                          │
                          │ 1:N
                          │
                    ┌─────┘
                    │
        ┌───────────▼──────────────┐
        │        TAREFA            │
        ├──────────────────────────┤
        │ _id (ObjectId)           │
        │ titulo (String) [req]    │
        │ descricao (String)       │
        │ responsavel (String) [req]
        │ prazo (String) [req]     │
        │ status (String) [enum]   │
        │ dataCriacao (Date)       │
        └──────────────────────────┘
```

### Entidade: Projeto

| Campo | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|--------|-----------|
| `_id` | ObjectId | ✅ | Auto | ID único do projeto |
| `nome` | String | ✅ | - | Nome do projeto |
| `descricao` | String | ❌ | "" | Descrição do projeto |
| `cor` | String | ❌ | #6c63ff | Cor identificadora |
| `tarefas` | Array | ❌ | [] | Lista de tarefas |
| `dataCriacao` | Date | ❌ | now() | Data de criação |

### Entidade: Tarefa

| Campo | Tipo | Obrigatório | Padrão | Descrição |
|-------|------|-------------|--------|-----------|
| `_id` | ObjectId | ✅ | Auto | ID único da tarefa |
| `titulo` | String | ✅ | - | Título da tarefa |
| `descricao` | String | ❌ | "" | Descrição detalhada |
| `responsavel` | String | ✅ | - | Pessoa responsável |
| `prazo` | String | ✅ | - | Data limite |
| `status` | String | ❌ | Pendente | Status (Pendente / Em Andamento / Concluído) |
| `dataCriacao` | Date | ❌ | now() | Data de criação |

---

## 🚀 Instruções para Rodar

### Pré-requisitos

- **Node.js** v14+ ([Download](https://nodejs.org/))
- **MongoDB** ([Instalação Local](https://docs.mongodb.com/manual/installation/) ou [Atlas Cloud](https://www.mongodb.com/cloud/atlas))
- **npm** ou **yarn**
- **Git**

### Instalação do Backend

#### 1️⃣ Navegue até a pasta backend
```bash
cd backend
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz da pasta `backend`:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Banco de Dados
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/taskflow

# Autenticação
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRE=7d

# IA
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
```

#### 4️⃣ Inicie o servidor

**Modo desenvolvimento** (com hot reload):
```bash
npm run dev
```

**Modo produção**:
```bash
npm start
```

✅ Servidor rodando em: `http://localhost:5000`

---

### Instalação do Frontend

#### 1️⃣ Navegue até a pasta frontend
```bash
cd frontend
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Configure as variáveis de ambiente (opcional)
Crie um arquivo `.env` na raiz da pasta `frontend`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### 4️⃣ Inicie o servidor de desenvolvimento
```bash
npm start
```

✅ Aplicação abrirá em: `http://localhost:3000`

---

## 🔐 Autenticação

O projeto utiliza **JWT (JSON Web Tokens)** para autenticação:

### Fluxo de Autenticação

```
1. Usuário insere email e senha
        ↓
2. Servidor valida credenciais
        ↓
3. Gera um token JWT assinado
        ↓
4. Cliente armazena token (localStorage)
        ↓
5. Cada requisição inclui: Authorization: Bearer {token}
        ↓
6. Middleware valida token
        ↓
7. Requisição é processada ou rejeitada
```

### Estrutura do JWT

```
Header:     { "alg": "HS256", "typ": "JWT" }
Payload:    { "userId": "...", "email": "...", "iat": "...", "exp": "..." }
Signature:  HMACSHA256(header + payload + JWT_SECRET)
```

---

## 🤖 Assistente de IA

Integração com **Anthropic Claude API** para assistência inteligente:

### Funcionalidades

- 💡 Sugestões de tarefas baseadas no contexto
- 📊 Análise de produtividade e performance
- ❓ Respostas a dúvidas sobre gerenciamento
- ✅ Otimização de fluxo de trabalho
- 🎯 Priorização automática de tarefas

### Como Usar

```javascript
// Exemplo de chamada ao assistente
const resposta = await fetch('/api/ai/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    mensagem: 'Qual é a melhor forma de organizar minhas tarefas?',
    contexto: { projetos, tarefas }
  })
});
```

---

## 📝 Funcionalidades Principais

### ✅ Implementadas

- [x] Autenticação segura com JWT
- [x] Cadastro e login de usuários
- [x] Gerenciamento de projetos (criar, listar, editar)
- [x] Gerenciamento de tarefas (CRUD completo)
- [x] Atribuição de responsáveis e prazos
- [x] Controle de status de tarefas
- [x] Assistente de IA integrado
- [x] Interface responsiva
- [x] Modo claro/escuro
- [x] Perfil de usuário
- [x] Gerenciamento de membros

### 🚀 Planejadas

- [ ] Comentários em tarefas
- [ ] Notificações em tempo real
- [ ] Anexos de arquivos
- [ ] Integração com Google Calendar
- [ ] Relatórios de produtividade
- [ ] Exportação de dados (PDF/Excel)
- [ ] Mobile app (React Native)

---

## 🔄 Fluxo de Desenvolvimento

### Backend - Ciclo de Requisição

```
📨 Requisição HTTP chega
    ↓
🔍 Express roteia para a rota
    ↓
🔐 Middleware de autenticação valida JWT
    ↓
📝 Route handler processa dados
    ↓
✔️ Validação de dados (Mongoose schema)
    ↓
💾 Operação no MongoDB
    ↓
📤 Resposta JSON retorna ao cliente
```

### Frontend - Ciclo de Renderização

```
👆 Usuário interage com a UI
    ↓
⚡ Event handler React executa
    ↓
📡 Axios faz chamada à API
    ↓
⏳ Aguarda resposta do servidor
    ↓
🔄 setState atualiza estado React
    ↓
🎨 Componente re-renderiza
    ↓
📱 DOM é atualizado no navegador
```

---

## 📦 Dependências Importantes

### Backend
```json
{
  "express": "Framework web",
  "mongoose": "ODM para MongoDB",
  "@anthropic-ai/sdk": "SDK da IA Claude",
  "cors": "Middleware CORS",
  "dotenv": "Variáveis de ambiente",
  "jsonwebtoken": "Geração de JWT"
}
```

### Frontend
```json
{
  "react": "Biblioteca UI",
  "react-router-dom": "Roteamento SPA",
  "axios": "Cliente HTTP",
  "react-scripts": "Ferramentas de build"
}
```

---

## 🐛 Troubleshooting

### ❌ Erro: "Cannot find module 'mongoose'"

**Solução:**
```bash
cd backend
npm install mongoose
```

---

### ❌ Erro: "ECONNREFUSED 127.0.0.1:27017"

**Problema:** MongoDB não está rodando

**Solução:**
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Linux (Ubuntu/Debian)
sudo systemctl start mongod

# Windows
# Use MongoDB Compass ou inicie o serviço via Services
```

---

### ❌ Erro: "CORS policy: No 'Access-Control-Allow-Origin'"

**Solução:** Verifique se CORS está ativado em `server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### ❌ Erro: "Token invalid or expired"

**Solução:** Verifique:
1. JWT_SECRET está configurado no `.env`
2. Token não expirou (JWT_EXPIRE)
3. Token é enviado corretamente no header

---

### ❌ Erro: "Cannot GET /api/projetos"

**Solução:** Verifique:
1. Servidor está rodando (porta 5000)
2. Rota está registrada em `routes/projetos.js`
3. Você tem permissão (JWT válido)

---

## 📚 Recursos Adicionais

### Documentação Oficial
- 📖 [Express.js](https://expressjs.com/)
- ⚛️ [React](https://react.dev/)
- 🍃 [MongoDB](https://docs.mongodb.com/)
- 🤖 [Anthropic Claude API](https://docs.anthropic.com/)
- 🔐 [JWT.io](https://jwt.io/)

### Ferramentas Úteis
- 🛠️ [Postman](https://www.postman.com/) - Testar APIs
- 📊 [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI MongoDB
- 🔍 [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debug frontend
- 📝 [VS Code](https://code.visualstudio.com/) - Editor recomendado

### Tutoriais
- [Express + MongoDB Tutorial](https://www.mongodb.com/languages/javascript/mongodb-and-nodejs)
- [React Hooks Guide](https://react.dev/reference/react)
- [JWT Authentication](https://jwt.io/introduction)

---

## 📄 Licença

Este projeto é de código aberto e está disponível sob a **Licença MIT**.

```
MIT License

Copyright (c) 2024 TaskFlow Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Queremos que este projeto seja melhorado por você.

### Como Contribuir

1. **Fork o projeto**
   ```bash
   git clone https://github.com/seu-usuario/taskflow.git
   cd taskflow
   ```

2. **Crie uma branch para sua feature**
   ```bash
   git checkout -b feature/NovaFeature
   ```

3. **Faça suas alterações**
   ```bash
   # Edite os arquivos necessários
   # Execute testes localmente
   ```

4. **Commit suas mudanças**
   ```bash
   git commit -m "feat: adicionar nova feature"
   git commit -m "fix: corrigir bug em projetos"
   git commit -m "docs: atualizar README"
   ```

5. **Push para sua branch**
   ```bash
   git push origin feature/NovaFeature
   ```

6. **Abra um Pull Request**
   - Descreva as mudanças claramente
   - Faça referência a issues relacionadas
   - Adicione screenshots se necessário

### Convenções de Commit
```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: formatação de código
refactor: refatoração sem mudança de funcionalidade
test: adição de testes
chore: atualizações de ferramentas/configurações
```

---

## 📞 Contato e Suporte

- 💼 **LinkedIn:** [linkedin.com/in/gabriellacerda22](https://www.linkedin.com/in/gabriellacerda22)
- 🐙 **GitHub:** [github.com/gabriel-freitas96](https://github.com/gabriel-freitas96)
- 💬 **Issues:** [Abrir issue no GitHub](../../issues)

---

## 🎉 Agradecimentos

Obrigado a todos que contribuíram para este projeto!

- ❤️ Comunidade de developers
- 🙏 Mentores e professores
- 👥 Membros do grupo TaskFlow

---

<div align="center">

**Desenvolvido com ❤️ por Gabriel Lacerda**

**Última atualização:** Junho de 2024

[![Stars](https://img.shields.io/github/stars/seu-usuario/taskflow?style=social)](https://github.com/seu-usuario/taskflow)
[![Forks](https://img.shields.io/github/forks/seu-usuario/taskflow?style=social)](https://github.com/seu-usuario/taskflow)
[![Issues](https://img.shields.io/github/issues/seu-usuario/taskflow)](https://github.com/seu-usuario/taskflow/issues)

</div>
