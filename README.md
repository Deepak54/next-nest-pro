# Full-Stack CRUD Demo — Next + NestJS + MongoDB + CI/CD Azure
<div>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
<img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn%2Fui&logoColor=white" alt="shadcn/ui"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" alt="Cloudflare"/>
<img src="https://img.shields.io/badge/JWT-DB3724?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Query"/>
<img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form"/>
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm"/>
<img src="https://img.shields.io/badge/Microsoft_Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white" alt="Microsoft Azure"/>
<img src="https://img.shields.io/badge/CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="CI/CD Pipeline"/>
<img src="https://img.shields.io/badge/Monorepo-000000?style=for-the-badge&logo=lerna&logoColor=white" alt="Monorepo"/>
<img src="https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" alt="Terraform"/>
</div>

## ✨ Visão Geral
- Projeto de demonstração full-stack com foco em arquitetura de microsserviços, cloud-native e automação de infraestrutura.
- Frontend moderno construído com Angular, utilizando Angular Material para uma UI rica e reativa, Reactive Forms para formulários tipados e HttpClient com RxJS para comunicação com o backend.
- Backend robusto e corporativo em Java (Spring Boot), com Spring Security (JWT) para autenticação, Spring Data para acesso a dados e Maven para gerenciamento de build.
- Banco NoSQL gerenciado na nuvem com Azure Cosmos DB, garantindo alta disponibilidade e escalabilidade.
- Infraestrutura como Código (IaC) completa com Terraform, provisionando todos os recursos na Azure de forma automatizada e versionada.
- Pipeline CI/CD orquestrado pelo GitHub Actions, automatizando testes, build de imagens Docker, provisionamento da infra e deploy no Azure Kubernetes Service (AKS).

## 🧩 Stack
- Frontend: Angular (Standalone API) · Angular Material (UI Kit) · RxJS · Reactive Forms · TypeScript
- Backend: Java 17 · Spring Boot 3 · Spring Security (JWT) · Spring Data Cosmos DB · Maven
- Banco de Dados: NoSQL - Azure Cosmos DB
- Infraestrutura como Código: Terraform
- Container & Orquestração: Docker · Azure Kubernetes Service (AKS) · Azure Container Registry (ACR)
- CI/CD: GitHub Actions
- Cloud & Rede: Microsoft Azure · Cloudflare (DNS, SSL, CDN)

## 🧭 Monorepo Turbo
```bash/next-nest-pro
├─ apps/
│  ├─ api/             # Backend NestJS (TypeScript)
│  │  └─ src/
│  │     ├─ auth/        # Módulo de Autenticação (login, register, jwt)
│  │     │  ├─ dto/
│  │     │  ├─ decorators/
│  │     │  ├─ guards/
│  │     │  ├─ strategies/
│  │     │  ├─ auth.controller.ts
│  │     │  └─ auth.service.ts
│  │     ├─ users/       # Módulo de Usuários
│  │     │  ├─ users.controller.ts
│  │     │  ├─ users.service.ts
│  │     │  └─ users.schema.ts  (Mongoose Schema)
│  │     ├─ products/    # Módulo de Produtos (CRUD)
│  │     └─ main.ts      # Ponto de entrada da API
│  └─ web/             # Frontend Next.js (React)
│     └─ src/
│        ├─ app/         # App Router do Next.js
│        │  ├─ (auth)/     # Grupo de rotas p/ login, registro
│        │  ├─ dashboard/ 
│        │  ├─ (main-app)/ # Grupo de rotas p/ app logado (dashboard)
│        │  ├─ layout.tsx
│        │  └─ page.tsx
│        ├─ components/  # Componentes reutilizáveis (shadcn/ui)
│        ├─ hooks/       # Hooks customizados (useLogin, useAuthGuard)
│        └─ stores/      # Estado global (Zustand)
├─ packages/
│  └─ ui/                # Componentes de UI compartilhados
├─  docker-compose.yml
└─ .github/workflows/   # Pipelines de CI/CD para API e Web
```

- Ferramentas de Performance: pnpm, que é conhecido por ser um dos gerenciadores de pacotes mais rápidos.
- Turbopack: (next dev --turbopack), que é o sucessor do Webpack escrito em Rust, conhecido por sua velocidade absurda no ambiente de desenvolvimento.
- Filosofia Moderna: como o Turborepo (criado pela Vercel), que é um orquestrador de builds de alta performance para monorepos, focado em cache inteligente e paralelismo para tornar os processos de build e teste o mais rápido possível. O pipeline de CI/CD segue esses mesmos princípios de eficiência.

## 🧪 Testes
- UI (React / Next.js): Jest + React Testing Library (RTL)
- Escopo: Testes unitários e de integração para componentes, hooks customizados (useLogin), validações de formulário com Zod, e simulação de estados de loading/erro vindos do TanStack Query.
- API (NestJS): Jest + Supertest
- Escopo: Testes unitários para a lógica de negócio nos Services (ex: AuthService) e testes de integração (e2e) para os Controllers, validando o fluxo completo das requisições, respostas HTTP, proteção de rotas (Guards) e DTOs.

## 🔁 CI (GitHub Actions)
- Pipelines Automatizados:
- Infraestrutura (terraform-ci.yml):
- Roda terraform init e terraform plan em Pull Requests para validar as mudanças.
- Roda terraform apply em pushes para a main para sincronizar a infraestrutura na Azure.
- Backend (api-ci.yml):
- Instala dependências (mvn install).
- Roda os testes (mvn test).
- Constrói a imagem Docker.
- Envia a imagem para o Azure Container Registry (ACR).
- Faz o deploy da nova imagem no Azure Kubernetes Service (AKS).
- Frontend (web-ci.yml):
- Instala dependências (pnpm install).
- Roda os testes (ng test).
- Constrói os arquivos estáticos.
- Faz o deploy para o Azure Static Web Apps.

## 🚀 CD Deploy — Azure
- UI (Frontend): Azure Static Web Apps. Conectado ao GitHub para deploy contínuo. A URL pública será app.seu-dominio.com.
- API (Backend): Azure Kubernetes Service (AKS). O cluster roda os contêineres Docker da aplicação. A URL pública será api.seu-dominio.com.
- Banco de Dados: Azure Cosmos DB. Provisionado e configurado pelo Terraform. As credenciais são injetadas no AKS via segredos.
- Cloudflare: Gerencia o DNS, apontando os subdomínios para os respectivos serviços do Azure, e provê a camada de segurança e CDN.

## 🧭 API Docs — Swagger / OpenAPI
- A documentação da API é gerada automaticamente a partir do próprio código-fonte usando o padrão OpenAPI (Swagger).
- Ferramenta: Usado o módulo oficial @nestjs/swagger.
- Como Funciona: Os Controllers e DTOs da nossa API são decorados com anotações como @ApiOperation(), @ApiResponse() e @ApiProperty().
- Resultado: O NestJS utiliza essas anotações para gerar uma página web interativa, onde é possível visualizar todos os endpoints, seus parâmetros, schemas de resposta e até mesmo testá-los diretamente pelo navegador.
- Acesso: A documentação fica disponível no endpoint /api/docs (ou o nome que configurarmos no main.ts).

## 🧰 Makefile
- Pense no Makefile como um "Menu de Atalhos" ou um "Índice de Comandos" para o seu projeto.
- É um arquivo de texto simples chamado Makefile (sem extensão) que fica na raiz do projeto. Dentro dele, você define "apelidos" (chamados de targets) para comandos de terminal longos, complexos ou que você usa com frequência.
- As principais vantagens de usar um Makefile são:
- Simplicidade: Em vez de digitar **docker-compose up -d**, você simplesmente digita **make up**.
- Padronização: Garante que todos no time (incluindo você no futuro) executem os mesmos comandos da mesma forma.
- Documentação: O próprio arquivo serve como uma documentação viva dos principais comandos necessários para rodar, testar e construir o projeto.
- Agilidade: up, down, logs, install, reset, tests, coverage, build, prettier, eslint 
- dev-api: Inicia o servidor do NestJS.
- dev-web: Inicia o servidor do Next.js.
- Para desenvolver, você abre dois terminais e roda make dev-api, e make dev-web no outro.
- test: Roda todos os testes de uma vez, ótimo para o pipeline de CI/CD.
- test-api / test-web: Permitem testar cada aplicação de forma isolada.
