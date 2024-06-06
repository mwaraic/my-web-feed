.PHONY: prettify start

prettify:
	npm install --save-dev prettier && \
	npx prettier --write frontend/src/**/*.js && \
	npx prettier --write backend/src/**/*.js

start:
	cd frontend && docker-compose up -d
	cd backend && npm install && npm start
