# Dissertation - Luxy Marketplace

## Requisites:
- Docker
- Metamask

## Run project
- Create a "docker-compose.yml" with the code below:
```yaml
    version: '3'
    services:
    server:
        image: andremorais98/luxyserver
        ports:
        - "1337:1337"
    market:
        image: andremorais98/luxymarket
        ports:
        - "3000:3000"
```
- Run "docker-compose up"
