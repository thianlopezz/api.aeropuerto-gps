# Docker Quick start

## Usando el archivo docker-compose.yml

```bash
docker network create proxy
docker compose up -d
```

## Usando Dockerfile

```bash
docker build . -t thianlopezz/api.aeropuerto-gps
docker run --name api.aeropuerto-gps -p 3000:3000 -d thianlopezz/api.aeropuerto-gps
```