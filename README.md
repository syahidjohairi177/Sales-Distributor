# Sales Distribution System — Caliph Group

Web application for managing sales distribution across roles:
Business Director (BD), Business Manager (BM), Business Executive (BE), HR, and Super Admin.

## Tech Stack

Backend:
- Laravel (REST API)
- MySQL / SQLite (dev)
- Laravel Sanctum (authentication)

Frontend:
- React (Vite)
- Axios

## Features (MVP)

- HR uploads sales
- Secure login
- Role-based access (planned)
- Commission distribution (planned)

## Run Locally

### Backend
cd backend
composer install
php artisan migrate
php artisan serve

### Frontend
cd frontend
npm install
npm run dev
