# Dissertation - Luxy Marketplace

## Requisites:
- Docker


- ### Create a docker-compose.yml
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

- ### Run "docker-compose up"
