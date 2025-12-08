# AGENTS.md - Contexto do Projeto Frontend (Stiven's Hotel)

Este arquivo contém o contexto, regras de negócio, padrões de design e estrutura técnica para o desenvolvimento do frontend do sistema "Stiven's Hotel".

## 1. Visão Geral do Projeto

O **Stiven's Hotel** é um sistema de gerenciamento hoteleiro (PMS) focado em operações diárias.

- **Objetivo:** Substituir controles manuais por uma interface web limpa e eficiente.
- **Usuários:** Administradores e Recepcionistas.
- **Backend:** API REST em Spring Boot (Java 21) rodando em container Docker na Oracle Cloud.

## 2. Stack Tecnológica (Frontend)

- **Framework:** Next.js 16.0.3 (App Router)
- **React:** 19.2.0
- **Linguagem:** TypeScript 5
- **Estilização:** Tailwind CSS 4 (com `@tailwindcss/postcss`)
- **Cliente HTTP:** Axios 1.13.2
- **Gerenciamento de Estado Assíncrono:** TanStack React Query 5.90.11
- **Formulários:** React Hook Form 7.66.1 + Zod 4.1.13 (validação)
- **Autenticação:** Armazenamento de JWT (LocalStorage/Cookies)
- **Linting:** ESLint 9 com `eslint-config-next`

### Fontes do Projeto

- **Montserrat** (variável: `--font-montserrat`)
- **Poppins** (variável: `--font-poppins`)

## 3. Estrutura do Projeto

```
frontend/
├── app/
│   ├── globals.css          # Estilos globais e variáveis CSS (Tailwind)
│   ├── layout.tsx           # Layout raiz (fontes, metadata)
│   ├── page.tsx             # Página inicial (redireciona para login/dashboard)
│   ├── login/
│   │   ├── layout.tsx       # Layout da página de login (centralizado)
│   │   └── page.tsx         # Formulário de login
│   └── (withmenu)/          # Route Group: páginas com menu/sidebar
│       ├── layout.tsx       # Layout com Header + Sidebar + Content
│       ├── dashboard/
│       │   └── page.tsx     # Resumo de ocupação, check-ins/outs
│       ├── reservations/
│       │   └── page.tsx     # Tabela de reservas
│       ├── guests/
│       │   └── page.tsx     # Gestão de hóspedes
│       ├── rooms/
│       │   └── page.tsx     # Cards de quartos
│       └── users/
│           └── page.tsx     # Gestão de usuários (apenas ADMIN)
├── public/
│   ├── login/               # Assets da tela de login
│   ├── menu/                # Ícones do menu/sidebar
│   └── svg/                 # Ícones gerais (add, search, edit, etc.)
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

### Padrão de Rotas (App Router)

- **Route Groups:** O grupo `(withmenu)` agrupa páginas que compartilham o mesmo layout com header e sidebar.
- **Layouts Aninhados:** Cada pasta pode ter seu próprio `layout.tsx` para encapsular estrutura.

## 4. Design System & UI

### Paleta de Cores (Definidas em `globals.css`)

| Token CSS              | Cor (HEX) | Uso                                    |
| ---------------------- | --------- | -------------------------------------- |
| `--color-background`   | `#F5F1E9` | Background geral das páginas           |
| `--color-foreground`   | `#A1988E` | Sidebar, bordas, textos secundários    |
| `--color-tertiary`     | `#FDFBF6` | Cards, inputs, áreas claras            |
| `--color-primary`      | `#EAE7E2` | Background do painel de login          |
| `--color-secondary`    | `#4A403A` | Header, texto do botão de login        |
| `--color-success`      | `#2A5B4F` | Status Disponível, botão Check-In      |
| `--color-danger`       | `#8C484E` | Status Ocupado, botão Check-Out, Admin |
| `--color-info`         | `#6B9AC4` | Status Limpeza, botão Pesquisar        |
| `--color-warning`      | `#D88C72` | Status Manutenção                      |
| `--color-green-light`  | `#A3BCA7` | Botão "Adicionar novo..."              |
| `--color-yellow-light` | `#E8D5A3` | Uso complementar                       |

### Indicadores de Status (Cards de Quartos e Reservas)

Os cards de quartos possuem uma borda lateral esquerda (`border-l-7`) colorida:

| Status     | Cor (Token) | Classe Tailwind  |
| ---------- | ----------- | ---------------- |
| Disponível | `success`   | `border-success` |
| Ocupado    | `danger`    | `border-danger`  |
| Manutenção | `warning`   | `border-warning` |
| Limpeza    | `info`      | `border-info`    |

### Layout dos Cards (Quartos)

- **Container:** `flex flex-wrap content-start justify-start gap-4`
- **Card Individual:** `w-[200px] h-[200px] bg-tertiary rounded-3xl shadow-sm grid grid-cols-1 grid-rows-3 p-2`

### Componentes de UI Comuns

1. **Barra de Pesquisa:** Grid com input + botão azul (`bg-info`)
2. **Botão Adicionar:** `bg-green-light` com ícone `add_icon.svg`
3. **Tabelas:** Bordas com `border-foreground`, cabeçalho em negrito
4. **Badges de Status:** `px-3 py-1 rounded-2xl` com cores correspondentes

## 5. Estrutura de Telas e Navegação

### Layout Principal (`(withmenu)/layout.tsx`)

- **Header (Topo):** Logo + nome "Stiven's Hotel" à esquerda, saudação "Olá, [Nome]!" + avatar à direita
- **Sidebar (Direita):** Fundo `foreground`, links de navegação:
  - `/dashboard` - Dashboard
  - `/reservations` - Reservas
  - `/guests` - Hóspedes
  - `/rooms` - Quartos
  - `/users` - Usuários (apenas ADMIN)
- **Área de Conteúdo:** `bg-background`, max-width `7xl`, centralizado

### Telas Implementadas

1. **Login (`/login`):**

   - Layout centralizado com fundo `secondary`
   - Card dividido: ilustração à esquerda, formulário à direita
   - Campos: Email e Senha com validação HTML5
   - Botão "Entrar" com `bg-success`

2. **Dashboard (`/dashboard`):**

   - Resumo de Operação com legenda de cores
   - Gráfico de pizza (CSS `conic-gradient`)
   - Painel de Check-ins do dia
   - Painel de Check-outs do dia

3. **Quartos (`/rooms`):**

   - Título + botão "Adicionar novo quarto"
   - Barra de pesquisa
   - Grid de cards com status visual

4. **Reservas (`/reservations`):**

   - Tabela com colunas: Hóspede, Quarto, Período, Status, Ações
   - Status: Confirmada (verde), Cancelada (vermelho), Em andamento (azul)
   - Ações: Ver detalhes, Editar

5. **Hóspedes (`/guests`):**

   - Tabela com colunas: Nome Completo, CPF, Telefone, Ações
   - Ações: Editar, Excluir

6. **Usuários (`/users`):**
   - Tabela com colunas: Nome Completo, Função, Ações
   - Badge de função: Admin (vermelho), Recepcionista (azul)
   - Ações: Editar, Excluir

## 6. Integração com Backend

### Configuração

- **Base URL:** `http://136.248.117.42` (Produção) ou `http://localhost:8080` (Dev)
- **Autenticação:** Header `Authorization: Bearer <TOKEN_JWT>` em todas as requisições protegidas

### Endpoints Principais

| Método | Endpoint                | Descrição                             | Acesso      |
| ------ | ----------------------- | ------------------------------------- | ----------- |
| POST   | `/api/auth/login`       | Login (payload: `{ name, password }`) | Público     |
| GET    | `/api/users`            | Lista usuários                        | ADMIN       |
| GET    | `/api/rooms`            | Lista quartos                         | Autenticado |
| POST   | `/api/rooms`            | Cria quarto (`roomType: { id: 1 }`)   | Autenticado |
| PUT    | `/api/rooms/:id`        | Atualiza quarto                       | Autenticado |
| GET    | `/api/reservations`     | Lista reservas                        | Autenticado |
| POST   | `/api/reservations`     | Cria reserva                          | Autenticado |
| PUT    | `/api/reservations/:id` | Atualiza reserva                      | Autenticado |
| GET    | `/api/guests`           | Lista hóspedes                        | Autenticado |
| POST   | `/api/guests`           | Cria hóspede                          | Autenticado |
| PUT    | `/api/guests/:id`       | Atualiza hóspede                      | Autenticado |

### Configuração do React Query

Utilizar `@tanstack/react-query` para:

- Cache de dados da API
- Invalidação automática após mutações
- Estados de loading/error/success

## 7. Regras de Negócio no Frontend

### Controle de Acesso (RBAC)

- O token JWT contém a claim `roles`
- **ADMIN:** Acesso total (inclui menu "Usuários")
- **RECEPTIONIST:** Acesso restrito (não vê gestão de usuários)
- **403 Forbidden:** Redirecionar para login ou mostrar alerta de permissão

### Tratamento de Erros

- **401 Unauthorized:** Token expirado/inválido → Logout forçado → Redirecionar para `/login`
- **Network Error:** Exibir toast de erro de conexão
- **Validação:** Usar Zod schemas com React Hook Form para validação no cliente

### Formulários

- Utilizar `react-hook-form` para gerenciamento de estado
- Validação com `zod` via `@hookform/resolvers`
- Feedback visual de erros inline

## 8. Convenções de Código

### Nomenclatura

- **Variáveis/Funções:** camelCase (`checkInDate`, `handleSubmit`)
- **Componentes:** PascalCase (`RoomCard.tsx`, `SearchBar.tsx`)
- **Arquivos de página:** `page.tsx` (convenção Next.js App Router)
- **Arquivos de layout:** `layout.tsx`

### Padrões de Componentes

```tsx
// Exemplo de componente funcional tipado
interface RoomCardProps {
  room: Room;
  onEdit: (id: number) => void;
}

export function RoomCard({ room, onEdit }: RoomCardProps) {
  // ...
}
```

### Commits

Conventional Commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` alterações de estilização
- `refactor:` refatoração sem mudança de comportamento
- `docs:` documentação

### Classes Tailwind

- Usar as variáveis de cor definidas em `globals.css` (ex: `bg-success`, `text-danger`)
- Fontes: `font-poppins` ou `font-montserrat`
- Arredondar cards com `rounded-3xl` ou `rounded-2xl`

## 9. Progresso e Tarefas

### ✅ Concluído

- [x] Criar cliente Axios configurado com interceptors JWT (`lib/api.ts`)
- [x] Configurar React Query Client com suporte SSR (`lib/query-client.ts`)
- [x] Criar QueryProvider com DevTools (`providers/query-provider.tsx`)
- [x] Implementar service de quartos com operações CRUD (`services/room-service.ts`)
- [x] Criar custom hooks React Query para quartos (`hooks/use-rooms.ts`)

### 📋 Tarefas Pendentes

#### 🧑‍💻 Stiven (Autenticação + Quartos & Reservas)

- [x] Adicionar React Query Provider no layout raiz (`app/layout.tsx`)
- [x] Implementar autenticação com contexto/provider (`providers/auth-provider.tsx`)
- [x] Criar service de autenticação (`services/auth-service.ts`)
- [x] Integrar página de login com API real (RHF + Zod v4)
- [x] Criar service e hooks para reservas (`services/reservation-service.ts`, `hooks/use-reservations.ts`)
- [ ] Implementar formulários de quartos e reservas (React Hook Form + Zod)
- [ ] Integrar páginas `/rooms` e `/reservations` com dados reais da API

#### 👨‍💻 Weine (RBAC + Hóspedes & Usuários)

- [ ] Implementar controle de acesso baseado em roles (RBAC)
- [ ] Criar páginas de erro (404, 500)
- [ ] Criar service e hooks para hóspedes (`services/guest-service.ts`, `hooks/use-guests.ts`)
- [ ] Criar service e hooks para usuários (`services/user-service.ts`, `hooks/use-users.ts`)
- [ ] Implementar formulários de hóspedes e usuários (React Hook Form + Zod)
- [ ] Componentizar elementos repetidos (SearchBar, Table, StatusBadge)
- [ ] Adicionar loading states e skeletons nas páginas
- [ ] Integrar páginas `/guests` e `/users` com dados reais da API
