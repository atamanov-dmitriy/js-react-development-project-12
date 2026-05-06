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

develop:
	make start-backend & make start-frontend