# ⚡ TaskFlow

> Sistema web de gerenciamento de tarefas em equipe, desenvolvido como projeto acadêmico da disciplina de Desenvolvimento Web.

---

## 👥 Integrantes

| Nome | GitHub |
|------|--------|
| Gabriel | gabriel-freitas96 |
| Henry   | @henry  |
| Miguel  | @miguel |
| Erick   | @erick  |

---


## 📋 Descrição do Sistema

O **TaskFlow** é uma aplicação web voltada para o **gerenciamento de tarefas em equipe no ambiente empresarial**. O sistema permite que times organizem suas atividades de forma centralizada, acompanhem o progresso de cada tarefa, definam prioridades e prazos, e visualizem a distribuição de trabalho entre os membros da equipe.

A proposta é simular um ambiente real de gestão de projetos, com foco em usabilidade profissional e organização visual clara.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| **React 18** | Biblioteca principal para construção da UI |
| **React Router DOM v6** | Navegação entre páginas (SPA) |
| **CSS Variables** | Sistema de design tokens e temas |
| **Google Fonts** | Tipografia (DM Sans + Space Grotesk) |
| **Dados Mockados** | Simulação do backend  |

---

## 🖥️ Telas Desenvolvidas

### 1. 🔐 Login (`/login`)
Tela de autenticação com layout dividido em dois painéis:
- **Painel esquerdo:** apresentação visual do sistema com features listadas
- **Painel direito:** formulário de login com validação e credenciais de teste
- Credenciais de teste: `admin@taskflow.com` / `123456`

### 2. 📊 Dashboard (`/dashboard`)
Visão geral do sistema com:
- Cards de estatísticas (Total, Concluídas, Em Andamento, Pendentes)
- Barra de progresso da sprint atual com percentual
- Lista dos membros da equipe com status
- Tabela com as tarefas mais recentes

### 3. ✅ Tarefas (`/tarefas`)
Listagem completa de tarefas com:
- Filtros por status, prioridade e busca por texto
- Tabela com todas as informações: título, projeto, responsável, prioridade, status e prazo
- Contador de resultados filtrados
- Botão de acesso rápido ao cadastro

### 4. ➕ Cadastro de Tarefa (`/cadastro`)
Formulário completo de criação de tarefa com:
- Campos: título, descrição, projeto, responsável, prioridade, status e prazo
- Validação de campos obrigatórios com mensagens de erro
- **Pré-visualização em tempo real** da tarefa sendo criada
- Tela de sucesso após criação

### 5. 👥 Membros (`/membros`)
Listagem dos membros da equipe em cards com:
- Avatar com iniciais e cor única por membro
- Nome, e-mail, cargo e status

---

## 📁 Organização das Pastas

```
taskflow/
├── public/
│   └── index.html              # HTML base da aplicação
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Menu lateral de navegação
│   │   └── Topbar.jsx          # Barra superior com título e data
│   ├── data/
│   │   └── mockData.js         # Dados simulados (tarefas, membros, projetos)
│   ├── pages/
│   │   ├── Login.jsx           # Tela de login
│   │   ├── Dashboard.jsx       # Tela inicial / visão geral
│   │   ├── Tarefas.jsx         # Listagem de tarefas
│   │   ├── Cadastro.jsx        # Formulário de cadastro
│   │   └── Membros.jsx         # Listagem de membros
│   ├── routes/
│   │   └── AppRoutes.jsx       # Definição das rotas e layout
│   ├── styles/
│   │   └── global.css          # Estilos globais e sistema de design
│   ├── App.jsx                 # Componente raiz com BrowserRouter
│   └── index.js                # Ponto de entrada da aplicação
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) v16 ou superior
- npm (incluso com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/gabriel-freitas96/taskflow-entrega.git

# 2. Entre na pasta do projeto
cd taskflow-entrega

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

A aplicação estará disponível em: **http://localhost:3000**

### Login de acesso
```
E-mail: admin@taskflow.com
Senha:  123456
```

---

## 📌 Observações

- Esta é a **Fase 1** do projeto, com foco no frontend.
- Nenhuma API ou banco de dados real foi utilizado nesta fase.
- A integração com o backend será realizada nas próximas fases.

---

<p align="center">Desenvolvido por Gabriel, Henry, Miguel e Erick · 2025</p>
