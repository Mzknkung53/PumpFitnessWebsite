# Pump Fitness Chiang Mai

One-page bilingual (EN/TH) landing site for Pump Fitness — two branches near Chang Phuak Gate and Chiang Mai Gate.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel)

```bash
npx vercel
npx vercel --prod
```

## Content & media

- Copy / prices / hours: [`src/data/content.json`](src/data/content.json)
- Design tokens: [`src/styles/tokens.css`](src/styles/tokens.css)
- Logo: [`public/images/logo/`](public/images/logo/)

Photo and video slots use placeholders. Drop real files under `public/media/` later and wire them into the section components.
