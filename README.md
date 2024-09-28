## 🔧 Under Development 🔨

## Todos
- add sample account with sample entries
- add Dashboard
- add Profile

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL = <supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY = <supabase_anon_key>
NEXT_PUBLIC_SUPABASE_DATABASE_URL = <supabase_postgres_url>

NEXT_PUBLIC_SUPABASE_PUBLIC_LOADER_URL = <bucket_url>

NEXT_PUBLIC_FRONTEND_URL = http://localhost:3050/

NEXT_PUBLIC_HOSTNAMES = <supabase_url>, <another_url>, <sample_url>

NEXT_PUBLIC_S3_ACCESS_KEY = <supabase_s3_access_key>
NEXT_PUBLIC_S3_SECRET_KEY = <supabase_s3_secret_key>

NEXT_PUBLIC_SUPABASE_BUCKET_NAME = manga_image
```

## Installed Packages Command

```bash
npm i drizzle-orm postgres
npm i -D drizzle-kit
npm i drizzle-zod
npm install @supabase/supabase-js
npm install @supabase/supabase-js @supabase/ssr
npm i pg

npm i -D prettier
npm install @mui/material @emotion/react @emotion/styled
npm install @reduxjs/toolkit
npm install react-redux
npm install moment --save
npm install sass
npm install sweetalert2
npm install zod
npm i use-debounce
npm install -D tailwindcss
npm i redux-persist
npm install axios
npm install framer-motion
npm i react-number-format
npm install react-icons --save

npm install @supabase/supabase-js @auth/supabase-adapter
npm install next-auth
```

## Supabase & Drizzle ORM

We are using Drizzle ORM for database migrations and schema generation. The following commands will help you manage the database schema and migrations.

To generate the database schema from your TypeScript models, run:
```bash
npm run db:generate
```

To apply the migrations to your database, run:
```bash
npm run db:migrate
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
