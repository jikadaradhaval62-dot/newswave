# NewsWave (React + Vite + Tailwind + NewsAPI)

## Setup
1) Install dependencies
```bash
npm install
```

2) Create `.env` in project root (same level as package.json):
```env
VITE_NEWS_API_KEY=a07ce93a78a94777a142b4721b8c7891
```

> After creating/changing `.env`, **restart** the dev server:
```bash
npm run dev
```

## Troubleshooting
### "Missing API key..."
- Make sure file name is exactly `.env` (not `.env.txt`)
- Make sure it's in the project root (where package.json is)
- Restart the dev server after changes

### favicon 404
Fixed by adding `public/favicon.svg`.
