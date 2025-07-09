# SincroTask

Organize sua rotina, visualize suas metas e gerencie tarefas com inteligência. O **SincroTask** é uma aplicação web que une produtividade, usabilidade e um design moderno com suporte a modo escuro.

---

## Funcionalidades

* Cadastro e login de usuários com autenticação via Firebase (e-mail/senha ou Google)
* Interface com avatares e dropdown de perfil
* Dashboard com estrutura pronta para tarefas, metas e lembretes
* Modo claro/escuro com transições suaves
* Interface responsiva utilizando Tailwind CSS

---

## Tecnologias

* HTML5 + TailwindCSS
* JavaScript (modular, ES Modules)
* Firebase Authentication
* Vite (dev server e build)
* Flowbite (componentes UI)

---

## Atualizações e Refatorações

Este projeto passou por uma reestruturação completa, com foco em modularização, organização e simplicidade. As principais mudanças incluem:

* Substituição do uso de **Express** e **MariaDB** (removidos por não serem necessários no contexto atual)
* Implementação do **Vite** para desenvolvimento moderno, com suporte a hot reload e build otimizado
* Uso de **variáveis de ambiente (`.env`)** para configuração do Firebase
* Modularização dos scripts JavaScript, separando responsabilidades em arquivos claros e reutilizáveis
* Reorganização da estrutura de pastas para maior escalabilidade e manutenção do projeto

---

## Como iniciar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/sincrotask.git
   cd sincrotask
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

## Variáveis de ambiente

As credenciais do Firebase são configuradas via arquivo `.env`, que deve ser criado na raiz do projeto.

Um arquivo `.env.example` está incluído no repositório como modelo. Basta copiá-lo e preencher com suas próprias chaves:

```bash
cp .env.example .env
```

Conteúdo esperado do `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Essas variáveis são lidas automaticamente pelo Vite e usadas na configuração do Firebase no frontend.


**Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

## Estrutura do Projeto

A estrutura de arquivos foi organizada para promover separação de responsabilidades e facilitar futuras expansões:

```
/
├── public/                  # Arquivos HTML servidos diretamente
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── src/
│   ├── config/
│   │   └── firebase.js     # Configuração do Firebase com uso de env
│
│   ├── auth/
│   │   ├── login.js        # Lógica de autenticação por e-mail/senha e Google
│   │   ├── register.js     # Cadastro de novos usuários
│   │   └── auth-state.js   # Verificação de autenticação na dashboard
│
│   ├── ui/
│   │   └── dropdown.js     # Controle do dropdown de avatar na dashboard
│
│   └── pages/
│       └── dashboard.js    # Arquivo de entrada para a página dashboard
│
├── .env                    # Variáveis de ambiente (não versionado)
├── index.html              # Entrada padrão (opcional, não usada diretamente)
├── vite.config.js          # Configuração do Vite
└── package.json
```

---

## Arquivo de entrada por página

Cada página HTML importa diretamente seu arquivo de entrada correspondente via `<script type="module">`.

Por exemplo, no `dashboard.html`:

```html
<script type="module" src="/src/pages/dashboard.js"></script>
```

Esse arquivo centraliza a lógica da página e importa os módulos necessários (autenticação, interface, etc).

---

## Sobre o Projeto

Este projeto foi desenvolvido em colaboração por três profissionais dedicados:

* **Filipe Brito** – Focado no design e desenvolvimento do frontend, criando interfaces intuitivas e responsivas para melhor experiência do usuário.
* **Henrique Miranda** – Responsável pela arquitetura do sistema e implementação do backend, garantindo a robustez e escalabilidade da aplicação.
* **Gabriel Manke** – Atuou na integração entre frontend e backend, além de testes e documentação, assegurando a qualidade e manutenção do código.
* [**Clinton Rocha**](https://github.com/clintonrocha98) – Refatorou trechos do código, auxiliou na revisão e melhorias da arquitetura geral por meio de PRs, contribuindo para a organização e qualidade do projeto.

Juntos, buscamos entregar um projeto de alta qualidade, com código limpo, organizado e funcional.

