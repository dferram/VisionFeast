.PHONY: start-backend start-mobile up down clean

start-backend:
	cd backend && uvicorn main:app --reload

start-mobile:
	cd mobile && npm start

up:
	docker-compose up -d

down:
	docker-compose down

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
