# training.vimsmch.edu.in — Build Plan & Tracker

> Vocational Training subdomain of VIMSMCH (Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital)
> Stack: Next.js 16 · Tailwind CSS v4 · Prisma 5 · MongoDB (rs0) · TypeScript
> Repo: https://github.com/utkrranti/vimsmch-training

---

## ✅ Foundation — COMPLETE

- [x] Next.js 16 project scaffold (App Router, TypeScript, `src/` directory)
- [x] Tailwind CSS v4 with college theme colors (`#04415f`, `#2086b8`, `#011e2c`, `#f1f5f7`)
- [x] Work Sans font (Google Fonts) — matches parent PHP college site
- [x] Prisma 5 + MongoDB provider configured
- [x] MongoDB replica set (`rs0`) initialized on localhost:27017
- [x] Schema: Course, Inquiry, Enrollment, Faculty, Certificate, AdminUser, Setting
- [x] Seed scripts: 6 courses, admin user, faculty, settings (findUnique + create pattern)
- [x] `src/lib/db/courses.ts` — typed Prisma query layer
- [x] Public assets from PHP parent: `logo.png` (new_logo_t.png), `logo-dark.png` (white_logo.png), `naac.png`, `college-photo.png`

---

## ✅ Layout Components — COMPLETE

- [x] `UGCTopBar` — UGC 2(f)/12(B), affiliation, NAAC, anti-ragging helpline 1800-180-5522
- [x] `Navbar` — Logo, nav links, mobile drawer
- [x] `Footer` — Real college address/phone/email, quick links, compliance, anti-ragging bar

---

## ✅ Phase 0 — Homepage — COMPLETE

- [x] `HeroSection` — Gradient hero, admission badge, 4 info cards, CTA buttons
- [x] `StatsSection` — Key numbers
- [x] `FeaturedCourses` — First 3 courses from MongoDB, "Enquire Now" button on each card
- [x] `WhyChooseUs`
- [x] `HowToEnroll`
- [x] `QuickInquiry`

---

## ✅ Phase 1A — Courses — COMPLETE

- [x] `/courses` — Listing page with search by name/tag, filter by all/short-term/long-term; "Enquire Now" button on every card
- [x] `/courses/[slug]` — Full detail: NSQF badge, fee breakdown table, assessment scheme, syllabus accordion, outcomes grid, sticky sidebar with "Enquire Now" → `/enquire/[slug]`
- [x] `/enquire/[slug]` — Dedicated enquiry page showing selected course name prominently, sidebar course summary, "What happens next?" steps
- [x] `CourseGrid` client component with live filter/search
- [x] `CourseInquiryForm` with courseId linking to MongoDB inquiry record
- [x] `generateStaticParams` pulls slugs from MongoDB at build time

---

## ✅ Phase 1B — Public Pages — COMPLETE

### `/about`
- [x] Mission statement, UGC recognition block, Mandatory Disclosure table
- [x] Grievance Officer, ICC/POSH, RTI, Anti-ragging — all from `Setting` MongoDB collection

### `/faculty`
- [x] Responsive grid — photo (next/image with wildcard remotePatterns), name, designation, bio

### `/contact`
- [x] Address block, phone/email, contact form → POST `/api/inquiries`

### `/verify`
- [x] Certificate number lookup → GET `/api/verify`, result card

---

## ✅ Phase 2 — API Routes — COMPLETE

- [x] `POST /api/inquiries` — saves with courseId link, returns 201
- [x] `GET /api/verify?certNo=` — certificate lookup

---

## ✅ Phase 3 — Auth — COMPLETE

- [x] NextAuth credentials provider (email + bcrypt)
- [x] JWT strategy, `withAuth` middleware protecting `/admin/*`
- [x] `/admin/login` — futuristic dark gradient page, animated form (motion v12)
- [x] Admin seeded: `utkrranti@gmail.com` / `Admin@1234`

---

## ✅ Phase 4 — Admin Panel — COMPLETE

| Route | Features |
|---|---|
| `/admin` | Dashboard — live counts: courses, inquiries, enrollments, certificates; recent inquiries table |
| `/admin/courses` | Table with active toggle, edit, delete |
| `/admin/courses/new` | Full course form — all fields, fee breakdown, syllabus, outcomes, batch months |
| `/admin/courses/[id]/edit` | Same form pre-filled from DB |
| `/admin/inquiries` | Status filter tabs, inline dropdown (PENDING/CONTACTED/CLOSED), delete |
| `/admin/faculty` | Modal add/edit (name, designation, bio, photo URL, sort order), active toggle, delete |
| `/admin/enrollments` | Status filter, inline dropdown (PENDING/CONFIRMED/CANCELLED/COMPLETED), cert link |
| `/admin/certificates` | Issue form (pick enrollment, enter cert no.) + issued certs table with revoke |
| `/admin/users` | Read-only list of admin accounts |

---

## ✅ Phase 5 — Deployment Prep — COMPLETE

- [x] `next.config.ts` — security headers, `poweredByHeader: false`, wildcard `remotePatterns`
- [x] Logo updated to `new_logo_t.png` (from PHP parent `assets/img/`)
- [x] `.env.production.example` created — template for MongoDB Atlas + NEXTAUTH_SECRET
- [x] `vercel.json` — framework: nextjs, region: bom1 (Mumbai)
- [x] All code committed and pushed: https://github.com/utkrranti/vimsmch-training
- [x] Build verified: 22 routes, zero TypeScript errors, zero ESLint errors

---

## 🔲 Phase 5 — Deploy to Production (manual steps)

### 1. MongoDB Atlas
1. Create free M0 cluster at https://cloud.mongodb.com
2. Create DB user, whitelist `0.0.0.0/0`
3. Get connection string: `mongodb+srv://USER:PASS@CLUSTER.mongodb.net/vimsmch_vocational?retryWrites=true&w=majority`

### 2. Deploy to Vercel
1. Go to https://vercel.com/new → Import `utkrranti/vimsmch-training`
2. Set environment variables:
   - `DATABASE_URL` — Atlas connection string from step 1
   - `NEXTAUTH_SECRET` — run `openssl rand -base64 32` to generate
   - `NEXTAUTH_URL` — `https://training.vimsmch.edu.in`
3. Deploy → Vercel will build and give a `.vercel.app` URL

### 3. Seed production DB
```bash
# In local terminal with DATABASE_URL set to Atlas string:
DATABASE_URL="mongodb+srv://..." npm run db:push
DATABASE_URL="mongodb+srv://..." npm run db:seed
DATABASE_URL="mongodb+srv://..." npm run db:seed-settings
DATABASE_URL="mongodb+srv://..." npm run db:seed-admin
```

### 4. DNS — add CNAME in Hostinger
1. Hostinger hPanel → Domains → vimsmch.edu.in → DNS Zone
2. Add record: `training` → CNAME → `cname.vercel-dns.com`
3. In Vercel project → Settings → Domains → add `training.vimsmch.edu.in`
4. Wait for propagation (up to 24h, usually minutes)

---

## Notes

- **Parent site reference**: Always match colors, fonts, logos from `e:\xampp-server\xampp\htdocs\vimsmch-college-website`
- **Theme**: `#04415f` accent · `#2086b8` secondary · `#011e2c` heading · `#f1f5f7` bg · `#e6edf0` light bg
- **Font**: Work Sans (Google Fonts, weights 400/500/600/700/800)
- **MongoDB Atlas**: No replica set flag needed — Atlas handles this automatically
- **Admin creds (dev)**: `utkrranti@gmail.com` / `Admin@1234` — reseed in production
