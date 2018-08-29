help:
	@echo "usage: make COMMAND [c=[arguments]]"
	@echo ""
	@echo "Commands:"
	@echo "  up                            Up all docker services"
	@echo "  down                          Stop all docker services"
	@echo "  dps                           Show all running containers"

# Show all running containers
dps:
	@docker ps --format "table {{.ID}}\t{{.Ports}}\t{{.Names}}"

# Up docker environment
up:
	docker-compose up -d
	make dps

up-build:
	docker-compose up -d --build
	make dps

# Down docker environment
down:
	docker stop $(shell docker ps -a -q)

# Refresh db data by using knex
db-refresh:
	@node_modules/.bin/knex migrate:rollback
	@node_modules/.bin/knex migrate:latest
	@node_modules/.bin/knex seed:run
