# Docker Quick start

## Usando el archivo docker-compose.yml

```bash
docker network create proxy
docker compose up -d
```

## Usando Dockerfile

```bash
docker build . -t thianlopezz/api.aeropuertos-gps
docker run --name api.aeropuertos-gps -p 3000:3000 -d thianlopezz/api.aeropuertos-gps
```