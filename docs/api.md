# 有鬆島 API Documentation

Base URL: `http://localhost:3000/api`

## Resources

All four resource types share the same CRUD endpoints:

### List Resources
```
GET /api/{type}
```
Types: `venues`, `facilitators`, `herbals`, `ingredients`

Query parameters:
- `featured=true` — filter featured resources only
- `tag={tag}` — filter by tag

### Get Single Resource
```
GET /api/{type}/{id}
```

### Create Resource
```
POST /api/{type}
Content-Type: application/json
```

**Venues fields**: name, description, location, address, contact, website, portaly_url, image_url, tags, featured

**Facilitators fields**: name, title, bio, specialties, contact, website, portaly_url, image_url, tags, featured

**Herbals fields**: name, description, origin, usage_notes, supplier, website, portaly_url, image_url, tags, featured

**Ingredients fields**: name, description, origin, season, supplier, website, portaly_url, image_url, tags, featured

### Update Resource
```
PUT /api/{type}/{id}
Content-Type: application/json
```

### Delete Resource
```
DELETE /api/{type}/{id}
```

## Scrape Endpoint

```
POST /api/scrape
Content-Type: application/json

{
  "url": "https://portaly.cc/username",
  "category": "venue|facilitator|herbal|ingredient"
}
```

Scrapes a Portaly page and inserts/updates the corresponding database table.

## Notifications

New resources created via POST automatically trigger:
- **Line Notify** — message to configured channel
- **SendGrid Email** — notification to admin email

Both are fire-and-forget; failures are logged but don't block the response.
