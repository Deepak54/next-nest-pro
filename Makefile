# =========================
# Projeto1 — Makefile
# =========================

SHELL := /bin/bash
.DEFAULT_GOAL := help

.PHONY: help clear reinstall dev-api dev-web

## --------- UTIL ---------

help: ## Lista os comandos disponíveis (este help)
	@echo ""
	@echo "Comandos:"
	@grep -E '^[a-zA-Z0-9_\-]+:.*?## ' $(MAKEFILE_LIST) | sort \
	| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-18s\033[0m %s\n", $$1, $$2}'
	@echo ""

clear: ## Remove node_modules (root, apps/api, apps/web)
	@echo "🧹 Removendo node_modules (root, apps/api, apps/web)..."
	@rm -rf node_modules apps/api/node_modules apps/web/node_modules
	@echo "✅ Feito."

reinstall: clear ## Limpa node_modules e reinstala dependências do monorepo
	@echo "📦 Instalando dependências (pnpm -w)..."
	@pnpm install -w
	@echo "✅ Reinstalação concluída."

## --------- DEV RÁPIDO ---------

dev-api: ## Sobe a API (Nest) em dev
	cd apps/api && pnpm start:dev

dev-web: ## Sobe o Front (Next) em dev
	cd apps/web && pnpm dev


.PHONY: up dev test cov prod-build prod-up prod-logs prod-down

up:
\tdocker compose -f docker-compose.dev.yml up -d

dev:
\tpnpm --filter ./apps/api start:dev & pnpm --filter ./apps/web dev

test:
\tpnpm -r test

cov:
\tpnpm -r test:cov

prod-build:
\tcd docker && docker compose -f docker-compose.prod.yml build

prod-up:
\tcd docker && JWT_ACCESS_SECRET=$${JWT_ACCESS_SECRET} JWT_REFRESH_SECRET=$${JWT_REFRESH_SECRET} docker compose -f docker-compose.prod.yml up -d

prod-logs:
\tcd docker && docker compose -f docker-compose.prod.yml logs -f

prod-down:
\tcd docker && docker compose -f docker-compose.prod.yml down
