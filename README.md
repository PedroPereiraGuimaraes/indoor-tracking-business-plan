# Indoor Tracking - Gerador de Plano de Negócios com IA

Este projeto é uma aplicação web moderna desenvolvida para gerar Planos de Negócios completos e profissionais para startups utilizando Inteligência Artificial (Google Gemini 2.5).

O sistema guia o empreendedor por etapas de preenchimento e, ao final, gera um documento estruturado contendo Análise de Mercado, Estratégia, Financeiro e mais.

## 🚀 Funcionalidades

- **Formulário Wizard:** Interface passo a passo para coleta de dados.
- **Geração via IA:** Integração com Google Gemini 2.5 Flash para criar conteúdo estratégico.
- **Preview e Exportação:** Visualização prévia e impressão otimizada para "Salvar como PDF".
- **Design Responsivo:** Interface moderna e adaptável a dispositivos móveis.

## 🛠 Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, Vite
- **Estilização:** Tailwind CSS
- **Roteamento:** React Router DOM
- **Ícones:** Lucide React
- **IA:** Google GenAI SDK

## 📂 Estrutura de Arquivos e Pastas

O projeto segue uma organização limpa e modular:

```
/
├── components/       # Componentes reutilizáveis de UI
│   ├── Button.tsx    # Botões padronizados
│   ├── Footer.tsx    # Rodapé da aplicação
│   ├── Input.tsx     # Inputs de texto e seleção
│   └── Navbar.tsx    # Barra de navegação responsiva
│
├── pages/            # Páginas da aplicação (Rotas)
│   ├── About.tsx     # Página Sobre
│   ├── Contact.tsx   # Página de Contato
│   ├── CreatePlan.tsx# O Core da aplicação (Formulário + Geração)
│   ├── Home.tsx      # Landing Page
│   └── HowItWorks.tsx# Explicação do processo
│
├── services/         # Lógica de negócios e integrações externas
│   └── geminiService.ts # Comunicação com a API do Google Gemini
│
├── types.ts          # Definições de tipos TypeScript (Interfaces)
├── App.tsx           # Componente raiz e configuração de rotas
├── main.tsx          # Ponto de entrada da aplicação (antigo index.tsx)
└── index.html        # Template HTML principal
```

## 💻 Como Rodar Localmente

Siga os passos abaixo para executar o projeto em sua máquina.

### 1. Pré-requisitos
- Node.js instalado (versão 18 ou superior).
- Uma API Key do Google Gemini. [Obtenha aqui](https://aistudio.google.com/app/apikey).

### 2. Instalação

Clone o projeto e instale as dependências:

```bash
npm install
```

### 3. Configuração da API Key

Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave:

```env
API_KEY=sua_chave_api_aqui_sem_aspas
```

### 4. Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O acesso geralmente será em `http://localhost:5173`.

## 📄 Licença

Este projeto é destinado para fins de demonstração e portfólio da Indoor Tracking.
