Backend : run air in terminal
Frontend : npm run dev

--docker
build docker : docker compose up --build
run docker : docker compose up

--maintenance
stop docker : docker compose down


| Bagian   | Localhost      | Docker            |
| -------- | -------------- | ----------------- |
| MySQL    | localhost      | mysql             |
| Backend  | localhost:8080 | backend:8080      |
| Frontend | localhost:5173 | localhost (nginx) |
| ENV      | .env           | .env.docker       |
