# 有鬆島 Yousong Island

Taiwan healing ecosystem platform — connecting venues, facilitators, herbs and ingredients across the island.

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: PostgreSQL (node-postgres)
- **Scraper**: Puppeteer (Portaly link-in-bio pages)
- **Frontend**: Static HTML + CSS + vanilla JS
- **Notifications**: Line Notify + SendGrid

## Quick Start

```bash
# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env
# Edit .env with your database URL and API keys

# Initialize database
npm run db:init

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/venues` | List venues |
| GET | `/api/venues/:id` | Get venue detail |
| POST | `/api/venues` | Create venue |
| PUT | `/api/venues/:id` | Update venue |
| DELETE | `/api/venues/:id` | Delete venue |
| GET | `/api/facilitators` | List facilitators |
| GET | `/api/herbals` | List herbals |
| GET | `/api/ingredients` | List ingredients |
| POST | `/api/scrape` | Scrape a Portaly page |
| GET | `/api/health` | Health check |

Query parameters: `?featured=true`, `?tag=meditation`

## Scraping Portaly

```bash
# Via API
curl -X POST http://localhost:3000/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"url": "https://portaly.cc/username", "category": "venue"}'

# Via CLI
npm run scrape -- https://portaly.cc/username venue
```

## Project Structure

```
server.js              Express entry point
db/                    SQL schemas and seed data
src/config/            Database pool configuration
src/routes/            REST API route handlers
src/scraper/           Puppeteer Portaly scraper
src/notifications/     Line Notify + SendGrid
public/                Static frontend (HTML/CSS/JS)
```
