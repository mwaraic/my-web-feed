.PHONY: start

start:
	npm install --save-dev prettier && \
	npx prettier --write frontend/src/**/*.js && \
	npx prettier --write backend/src/**/*.js \
	eslint --fix