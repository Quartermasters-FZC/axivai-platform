<p align="center">
  <img src="https://axivai.com/brand/axivai-wordmark.png" alt="AXIVAI" width="240" />
</p>

<p align="center">
  <strong>Deployable power infrastructure · concept in research and development</strong><br />
  Power anywhere. Ready when needed.
</p>

<p align="center">
  <a href="https://axivai.com">axivai.com</a>
</p>

---

AXIVAI explores how to make electrical capacity available when fixed infrastructure is too slow, too limited or too inflexible, through modular storage, mission-specific deployment and managed operations. It is a research concept, not an operating business.

Source of truth: [docs/planning/AXIVAI_Improved_Concept_Paper_October_2026.md](docs/planning/AXIVAI_Improved_Concept_Paper_October_2026.md). Brand rules: [docs/planning/50_Design_System.md](docs/planning/50_Design_System.md).

## What's on the site

| Page | Purpose |
|------|---------|
| `/` | The concept: problems, approach, deployment modes, alternatives test, applications, economics, staged validation, evidence standard |
| `/report-a-gap` | Power-access gap report form for Stage I problem mapping. Submissions are stored in MySQL (`GapReport`) |
| Legal pages | Privacy, terms, cookies, accessibility, CCPA and privacy requests |

The earlier school-bus TCO calculator was retired in October 2026. Its last version is in git history at commit `50336f6`.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, Prisma 7 with MySQL (MariaDB adapter), zod.

## Local development

```bash
git clone https://github.com/Quartermasters-FZC/axivai-platform.git
cd axivai-platform
npm install            # also runs prisma generate

cp .env.example .env   # set DATABASE_URL and GAP_REPORT_IP_SALT

docker compose up -d db   # MySQL 8 on 127.0.0.1:3307
npm run db:migrate        # apply migrations
npm run dev
```

## Deployment (Hostinger)

Set `DATABASE_URL` (host `127.0.0.1`, port `3306`) and `GAP_REPORT_IP_SALT` as environment variables, build, then run `npm run db:migrate` once per new migration.

## Security

**Never commit `.env` files.** All secrets must be configured via environment variables. See [.env.example](.env.example).

---

<p align="center">
  <sub>© 2025–2026 <a href="https://aliffcapital.com">Aliff Capital, LLC</a>. All Rights Reserved.</sub>
</p>
