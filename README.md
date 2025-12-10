# 🏨 Stiven's Hotel - Sistema de Gerenciamento Hoteleiro

Sistema de gerenciamento hoteleiro (PMS - Property Management System) completo, desenvolvido com arquitetura moderna de frontend e backend separados, containerizados com Docker.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.6-green?style=flat-square&logo=springboot)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17.6-blue?style=flat-square&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Stack Tecnológica](#-stack-tecnológica)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Deploy em Produção](#-deploy-em-produção)

## 📖 Sobre o Projeto

O **Stiven's Hotel** é um sistema de gerenciamento hoteleiro focado em operações diárias, substituindo controles manuais por uma interface web limpa e eficiente.

### Usuários do Sistema

- **Administrador (ADMIN):** Acesso total, incluindo gestão de usuários
- **Recepcionista (USER):** Acesso às operações do dia a dia

## ✨ Funcionalidades

### Dashboard

- Resumo de ocupação dos quartos (gráfico de pizza)
- Check-ins pendentes do dia
- Check-outs pendentes do dia
- Ações rápidas de Check-In/Check-Out

### Gestão de Reservas

- Listagem com filtros e busca
- Criação, edição e cancelamento
- Controle de status (Confirmada, Em Andamento, Concluída, Cancelada)

### Gestão de Quartos

- Cards visuais com indicadores de status por cor
- Status: Disponível, Ocupado, Limpeza, Manutenção
- Edição rápida via modal

### Gestão de Tipos de Quarto

- CRUD completo de categorias
- Definição de capacidade e preço por diária

### Gestão de Hóspedes

- Cadastro completo com documentos
- Histórico de reservas

### Gestão de Usuários (Admin)

- CRUD de usuários do sistema
- Controle de permissões (ADMIN/USER)

### Autenticação

- Login com JWT
- Proteção de rotas por nível de acesso
- Logout com limpeza de sessão

## 🏗 Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE (Browser)                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     NGINX (Reverse Proxy)                       │
│                         Porta 80/443                            │
│  ┌─────────────────────┐    ┌─────────────────────────────────┐ │
│  │  /api/* → :8080     │    │  /* → :3000                     │ │
│  │  (Backend)          │    │  (Frontend)                     │ │
│  └─────────────────────┘    └─────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌───────────────────┐                       ┌───────────────────┐
│     FRONTEND      │                       │      BACKEND      │
│   Next.js 16      │                       │  Spring Boot 3.5  │
│    (Bun)          │                       │    (Java 21)      │
│   Porta 3000      │                       │   Porta 8080      │
└───────────────────┘                       └───────────────────┘
                                                     │
                                                     ▼
                                            ┌───────────────────┐
                                            │    PostgreSQL     │
                                            │      17.6         │
                                            │   Porta 5432      │
                                            └───────────────────┘
```

### Padrões de Arquitetura

**Backend (Spring Boot):**

- Arquitetura em camadas (Controller → Service → Repository)
- DTOs para transferência de dados
- Validação com Bean Validation
- Autenticação JWT com Spring Security

**Frontend (Next.js):**

- App Router com Route Groups
- Server e Client Components
- Hooks customizados para operações CRUD
- React Query para cache e sincronização
- Context API para autenticação global

## 🛠 Stack Tecnológica

### Backend

| Tecnologia      | Versão | Descrição                  |
| --------------- | ------ | -------------------------- |
| Java            | 21     | Linguagem de programação   |
| Spring Boot     | 3.5.6  | Framework principal        |
| Spring Data JPA | -      | Persistência de dados      |
| Spring Security | -      | Autenticação e autorização |
| JWT (jjwt)      | 0.11.5 | Tokens de autenticação     |
| PostgreSQL      | 17.6   | Banco de dados             |
| Lombok          | -      | Redução de boilerplate     |
| Gradle          | -      | Build tool                 |

### Frontend

| Tecnologia      | Versão  | Descrição                     |
| --------------- | ------- | ----------------------------- |
| Bun             | 1.3.3   | Runtime e package manager     |
| Next.js         | 16.0.3  | Framework React               |
| React           | 19.2.0  | Biblioteca UI                 |
| TypeScript      | 5       | Tipagem estática              |
| Tailwind CSS    | 4       | Estilização                   |
| Axios           | 1.13.2  | Cliente HTTP                  |
| React Query     | 5.90.11 | Gerenciamento de estado async |
| React Hook Form | 7.66.1  | Formulários                   |
| Zod             | 4.1.13  | Validação de schemas          |
| react-hot-toast | 2.6.0   | Notificações                  |

### Infraestrutura

| Tecnologia     | Descrição                |
| -------------- | ------------------------ |
| Docker         | Containerização          |
| Docker Compose | Orquestração local       |
| Nginx          | Reverse proxy (produção) |

## 📦 Pré-requisitos

- **Docker** e **Docker Compose** (para rodar com containers)

Ou para desenvolvimento local:

- **Java 21** (backend)
- **Bun** (frontend) - ou npm/yarn
- **PostgreSQL 17+** (banco de dados)

## 🚀 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/StivenF0/stivens-hotel.git
cd stivens-hotel
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_segura
POSTGRES_DB=stivens_hotel

# JWT
JWT_SECRET=sua_chave_secreta_muito_longa_e_segura_aqui
```

### 3. Execute com Docker Compose

**Desenvolvimento:**

```bash
docker compose up -d
```

**Produção:**

```bash
# Adicione no .env:
# NEXT_PUBLIC_API_URL=http://seu-dominio-ou-ip

docker compose -f docker-compose.prod.yml up -d
```

### 4. Acesse a aplicação

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api

## ⚙️ Variáveis de Ambiente

### Obrigatórias

| Variável            | Descrição              | Exemplo               |
| ------------------- | ---------------------- | --------------------- |
| `POSTGRES_USER`     | Usuário do PostgreSQL  | `postgres`            |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL    | `senha123`            |
| `POSTGRES_DB`       | Nome do banco de dados | `stivens_hotel`       |
| `JWT_SECRET`        | Chave secreta para JWT | `minha-chave-secreta` |

### Produção (adicionais)

| Variável              | Descrição             | Exemplo                   |
| --------------------- | --------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | URL da API (sem /api) | `http://meu-servidor.com` |

## 📁 Estrutura do Projeto

```
stivens-hotel/
├── docker-compose.yml          # Docker Compose (desenvolvimento)
├── docker-compose.prod.yml     # Docker Compose (produção)
├── .env                        # Variáveis de ambiente (criar)
├── README.md
│
├── backend/
│   ├── build.gradle
│   ├── docker/
│   │   ├── Dockerfile.dev
│   │   └── Dockerfile.prod
│   └── src/main/java/.../
│       ├── config/             # Configurações (Security, CORS, JWT)
│       ├── controller/         # Controllers REST
│       ├── dto/                # Data Transfer Objects
│       ├── enums/              # Enumerações (Status, Roles)
│       ├── exception/          # Exceções customizadas
│       ├── model/              # Entidades JPA
│       ├── repository/         # Repositórios Spring Data
│       └── service/            # Lógica de negócio
│
└── frontend/
    ├── package.json
    ├── docker/
    │   ├── Dockerfile.dev
    │   └── Dockerfile.prod
    ├── app/                    # App Router (Next.js)
    │   ├── layout.tsx          # Layout raiz
    │   ├── page.tsx            # Página inicial
    │   ├── login/              # Autenticação
    │   └── (withmenu)/         # Páginas com sidebar
    │       ├── dashboard/
    │       ├── reservations/
    │       ├── guests/
    │       ├── rooms/
    │       ├── room-types/
    │       └── users/
    ├── components/             # Componentes reutilizáveis
    ├── hooks/                  # Hooks customizados (React Query)
    ├── services/               # Serviços de API (Axios)
    ├── providers/              # Context providers
    └── utils/                  # Tipos e utilitários
```

## 🔌 API Endpoints

### Autenticação

| Método | Endpoint          | Descrição               |
| ------ | ----------------- | ----------------------- |
| POST   | `/api/auth/login` | Login                   |
| GET    | `/api/auth/me`    | Dados do usuário logado |

### Quartos

| Método | Endpoint          | Descrição        |
| ------ | ----------------- | ---------------- |
| GET    | `/api/rooms`      | Listar quartos   |
| GET    | `/api/rooms/{id}` | Buscar por ID    |
| POST   | `/api/rooms`      | Criar quarto     |
| PUT    | `/api/rooms/{id}` | Atualizar quarto |
| DELETE | `/api/rooms/{id}` | Excluir quarto   |

### Tipos de Quarto

| Método | Endpoint               | Descrição      |
| ------ | ---------------------- | -------------- |
| GET    | `/api/room-types`      | Listar tipos   |
| POST   | `/api/room-types`      | Criar tipo     |
| PUT    | `/api/room-types/{id}` | Atualizar tipo |
| DELETE | `/api/room-types/{id}` | Excluir tipo   |

### Reservas

| Método | Endpoint                           | Descrição          |
| ------ | ---------------------------------- | ------------------ |
| GET    | `/api/reservations`                | Listar reservas    |
| POST   | `/api/reservations`                | Criar reserva      |
| PUT    | `/api/reservations/{id}`           | Atualizar reserva  |
| DELETE | `/api/reservations/{id}`           | Cancelar reserva   |
| PATCH  | `/api/reservations/{id}/check-in`  | Realizar check-in  |
| PATCH  | `/api/reservations/{id}/check-out` | Realizar check-out |

### Hóspedes

| Método | Endpoint           | Descrição         |
| ------ | ------------------ | ----------------- |
| GET    | `/api/guests`      | Listar hóspedes   |
| POST   | `/api/guests`      | Criar hóspede     |
| PUT    | `/api/guests/{id}` | Atualizar hóspede |
| DELETE | `/api/guests/{id}` | Excluir hóspede   |

### Usuários (Admin)

| Método | Endpoint          | Descrição         |
| ------ | ----------------- | ----------------- |
| GET    | `/api/users`      | Listar usuários   |
| POST   | `/api/users`      | Criar usuário     |
| PUT    | `/api/users/{id}` | Atualizar usuário |
| DELETE | `/api/users/{id}` | Excluir usuário   |

## 🌐 Deploy em Produção

### Configuração do Nginx

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # API (Backend)
    location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Comandos de Deploy

```bash
# Buildar e subir os containers
docker compose -f docker-compose.prod.yml up -d --build

# Rebuild sem cache (após mudanças em variáveis de ambiente)
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d

# Ver logs
docker compose -f docker-compose.prod.yml logs -f

# Parar containers
docker compose -f docker-compose.prod.yml down
```

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais.

---

Desenvolvido com ❤️ por **Stiven** e **Weine**.
