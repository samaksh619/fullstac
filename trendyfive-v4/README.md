# Trendy Five Marketplace

A full-stack electronics marketplace built as a standalone implementation of the provided marketplace assignment. The frontend is React/Vite and the backend is Spring Boot + JPA with MySQL support (H2 is available as the zero-setup local default).

## Stack

- Frontend: React, JavaScript, Vite, CSS
- Backend: Java 21, Spring Boot 3, Spring Web, Spring Data JPA
- Database: MySQL 8 (or H2 for quick local development)
- API: REST

## Run quickly (no MySQL required)

### 1. Start backend

Open a terminal in `backend/` and run:

```bash
mvn spring-boot:run
```

The default profile uses H2 in-memory DB and seeds products, brands and stores automatically.

### 2. Start frontend

In a second terminal at the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run with MySQL

Install Docker Desktop, then from the project root:

```bash
docker compose up -d
```

Start the backend with:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

The included compose file creates database `trendyfive`, user `trendyfive`, password `trendyfive`.

## Main API endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /api/products/{id}/emi-plans`
- `GET /api/brands`
- `GET /api/stores?city=Bengaluru`
- `GET /api/cities`
- `POST /api/orders`

Selecting an EMI plan and pressing **Proceed with EMI** creates an order record through the REST API.
