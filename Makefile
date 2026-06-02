lint-frontend:
	make -C frontend lint

install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

start-backend:
	npx start-server -s ./frontend/dist

start-frontend:
	make -C frontend start

start:
	make start-backend

develop:
	make start-backend & make start-frontend