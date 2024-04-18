##################################################################
## DEV
dev: build-dev run-dev

build-dev:
	docker build -t crypto-frontend:dev -f Dockerfile.dev .
run-dev:
	docker-compose -f docker-compose.dev.yaml up


##################################################################
## PRODUCTION
prod: build-prod run-prod

build-prod:
	docker build -t cryptofrontend:production -f Dockerfile.prod .
run-prod:
	docker run --rm -p 3000:3000 cryptofrontend:production