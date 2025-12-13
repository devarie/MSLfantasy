# Railway Deployment Guide

## Wat Railway doet:
- **Web service**: Draait de Next.js website
- **Worker service**: Draait het auto-update script continu (elke 5 minuten)

## Environment Variables:

Voeg deze toe in Railway:

### GOOGLE_CREDENTIALS
De OAuth credentials voor Google Sheets API

### GOOGLE_TOKEN
De OAuth token voor authenticatie

## Services:
- **Web**: Next.js applicatie op poort 3000
- **Worker**: Background service die elke 5 minuten de Google Sheets data ophaalt

## Deployment:
Railway detecteert automatisch het Node.js project en gebruikt:
- `npm run build` voor de build
- `npm run start` voor de web service
- `npm run update-sheets` voor de worker service
