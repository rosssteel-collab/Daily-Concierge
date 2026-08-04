# Cotta Concierge Daily Scheduler

## Setup

```bash
npm create vite@latest cotta-scheduler -- --template react
cd cotta-scheduler
npm install
```

Replace `src/App.jsx` with `rota_scheduler_claudecode.jsx`, then:

```bash
npm run dev
```

## Key differences from Claude artifact version
- Uses `localStorage` instead of `window.storage` for holiday persistence
- Holidays survive browser refreshes automatically

## Adding a new month
In the `MONTHS` array at the top of the file, add a new entry following the same pattern as June, July or August. Each day entry uses:
- `D` = Danica
- `A` = Angela  
- `K` = Kylene
- `H` = Harvey
- `null` = OFF, `[start, end]` = shift hours (24h)

## Adding default holidays
In the `DEFAULT_HOLIDAYS` array, add entries in the format:
```javascript
{ agent: "Danica", from: "2026-07-24", to: "2026-07-26" }
```

## Deploying
To deploy on Vercel:
```bash
npm run build
npx vercel --prod
```

## To deploy on Netlify:
```bash
npm run build
# Drag and drop the `dist` folder into Netlify
```
