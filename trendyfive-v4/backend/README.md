# Trendy Five Marketplace API

Spring Boot 3 + Java 21 REST API for the Trendy Five Marketplace.

## Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /api/products/{id}/emi-plans`
- `GET /api/brands`
- `GET /api/stores?city=Bengaluru`
- `GET /api/cities`
- `POST /api/orders`

The default profile uses an in-memory H2 database so the API can be started without MySQL. The `mysql` profile uses MySQL 8.
