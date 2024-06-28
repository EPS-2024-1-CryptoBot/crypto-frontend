PURPLE = \033[95m
CYAN = \033[96m
DARKCYAN = \033[36m
BLUE = \033[94m
GREEN = \033[92m
YELLOW = \033[93m
RED = \033[91m
BOLD = \033[1m
UNDERLINE = \033[4m
END = \033[0m

help:
	@echo "$(YELLOW)# ------------------- Makefile commands ------------------- #$(END)"
	@echo ""
	@echo "$(GREEN)## DEV$(END)"
	@printf "$(CYAN)%-20s$(END) %b \n" "dev:" "Builds and runs the development environment"
	@printf "$(CYAN)%-20s$(END) %b \n" "build-dev:" "Builds the development Docker image"
	@printf "$(CYAN)%-20s$(END) %b \n" "run-dev:" "Runs the development Docker containers"
	@echo ""

	@echo "$(RED)## PRODUCTION$(END)"
	@printf "$(CYAN)%-20s$(END) %b \n" "prod:" "Builds and runs the production environment"
	@printf "$(CYAN)%-20s$(END) %b \n" "build-prod:" "Builds the production Docker image"
	@printf "$(CYAN)%-20s$(END) %b \n" "run-prod:" "Runs the production Docker container locally"
	@echo ""


##################################################################
## DEV
dev: build-dev
	docker-compose -f docker-compose.dev.yaml up
bigbang: build-dev
	docker-compose -f docker-compose.dev.yaml up -d
build-dev:
	docker build -t crypto-frontend:dev -f Dockerfile.dev .
run-dev:
	docker-compose -f docker-compose.dev.yaml up -d
	docker exec -it frontend_service sh


##################################################################
## PRODUCTION
prod: build-prod run-prod

build-prod:
	docker build -t cryptofrontend:production -f Dockerfile.prod .
run-prod:
	docker run --rm -p 3000:3000 cryptofrontend:production