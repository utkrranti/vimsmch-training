# training.vimsmch.edu.in — Build Plan & Tracker

> Vocational Training subdomain of VIMSMCH (Dr. Vithalrao Vikhe Patil Foundation's Medical College & Hospital)
> Stack: Next.js 16 · Tailwind CSS v4 · Prisma 5 · MongoDB (rs0) · TypeScript

---

## ✅ Foundation — COMPLETE

- [x] Next.js 16 project scaffold (App Router, TypeScript, `src/` directory)
- [x] Tailwind CSS v4 with college theme colors (`#04415f`, `#2086b8`, `#011e2c`, `#f1f5f7`)
- [x] Work Sans font (Google Fonts) — matches parent PHP college site
- [x] Prisma 5 + MongoDB provider configured
- [x] MongoDB replica set (`rs0`) initialized on localhost:27017
- [x] Schema: Course, Inquiry, Enrollment, Faculty, Certificate, AdminUser
- [x] Seed script (6 courses, findUnique + create pattern for standalone-safe seeding)
- [x] `src/lib/db/courses.ts` — typed Prisma query layer (getAllCourses, getFeaturedCourses, getCourseBySlug, getAllSlugs)
- [x] Public assets copied from PHP parent: `logo.png`, `logo-dark.png`, `naac.png`, `college-photo.png`
- [x] Production DB dump saved: `database/vimsmch_production.sql` (2.92 MB)

---

## ✅ Layout Components — COMPLETE

- [x] `UGCTopBar` — UGC 2(f)/12(B), affiliation, NAAC, anti-ragging helpline 1800-180-5522
- [x] `Navbar` — Logo, nav links, mobile drawer
- [x] `Footer` — Real college address/phone/email, quick links, courses, compliance, anti-ragging bar, UTKRRANTI credit

---

## ✅ Phase 0 — Homepage — COMPLETE

- [x] `HeroSection` — Gradient hero, admission badge, 4 info cards, CTA buttons
- [x] `StatsSection` — Key numbers
- [x] `FeaturedCourses` — First 3 courses from MongoDB (async server component)
- [x] `WhyChooseUs`
- [x] `HowToEnroll`
- [x] `QuickInquiry`

---

## ✅ Phase 1A — Courses — COMPLETE

- [x] `/courses` — Listing page with search by name/tag, filter by all/short-term/long-term
- [x] `/courses/[slug]` — Full detail: NSQF badge, fee breakdown table, assessment scheme, syllabus accordion, outcomes grid, sticky sidebar fee card, inquiry form
- [x] `CourseGrid` client component with live filter/search
- [x] `CourseInquiryForm` client component (UI complete, API pending)
- [x] `generateStaticParams` pulls slugs from MongoDB at build time

---

## ✅ Phase 1B — Public Pages — COMPLETE

### `/about`
- [x] Hero section — mission statement, college background
- [x] UGC recognition block — 2(f), 12(B), NAAC grade, affiliation details
- [x] Mandatory Disclosure table (UGC requirement)
- [x] Grievance Officer details
- [x] ICC / POSH Act committee details
- [x] RTI — Public Information Officer details
- [x] Anti-ragging section with helpline
- [x] `Setting` MongoDB model — all about content editable from DB (`about.*`, `grievance.*`, `icc.*`, `rti.*`, `antiragging.*`)

### `/faculty`
- [x] Fetch `faculty` collection from MongoDB
- [x] Responsive grid — photo/avatar, name, designation, bio
- [x] Empty state if no faculty seeded

### `/contact`
- [x] Address block with real college details (from PHP footer reference)
- [x] Phone / email / website links
- [x] Contact form (name, phone, email, message) — POSTs to `/api/inquiries`
- [x] Success/error state on form submission

### `/verify`
- [x] Certificate number input form
- [x] GET `/api/verify?certNo=` on submit
- [x] Result card: student name, course name, issue date, certificate number
- [x] Not-found state for invalid cert numbers

---

## ✅ Phase 2 — API Routes — COMPLETE

### `POST /api/inquiries`
- [x] Accept: name, phone, email, courseId, message
- [x] Validate required fields (name, phone) — returns 400 on failure
- [x] Save to MongoDB `inquiries` collection with status `PENDING`
- [x] Returns 201 on success
- [x] Wired to `CourseInquiryForm`
- [x] Wired to `/contact` form via `ContactForm` component

### `GET /api/verify`
- [x] Look up `certificates` collection by `certificateNo`
- [x] Return: studentName, courseName, issuedAt, certificateNo
- [x] Return 404 `{ found: false }` if not found

---

## 🔲 Phase 3 — Auth

- [ ] Install `next-auth` + `bcryptjs` — *Always follow the PHP project its theme & content for better understanding*
- [ ] NextAuth config — credentials provider (email + bcrypt password check against `admin_users` collection) — *Always follow the PHP project its theme & content for better understanding*
- [ ] `middleware.ts` — redirect `/admin/*` to `/admin/login` if no session — *Always follow the PHP project its theme & content for better understanding*
- [ ] `/admin/login` page — email/password form, error state, redirect on success — *Always follow the PHP project its theme & content for better understanding*
- [ ] Seed first admin user (`npm run db:seed` or separate admin seed script) — *Always follow the PHP project its theme & content for better understanding*

---

## 🔲 Phase 4 — Admin Panel

### `/admin` — Dashboard
- [ ] Stats cards: total courses, new inquiries (last 7 days), total enrollments, certificates issued — *Always follow the PHP project its theme & content for better understanding*
- [ ] Recent inquiries table (last 10) — *Always follow the PHP project its theme & content for better understanding*
- [ ] Quick nav to all admin sections — *Always follow the PHP project its theme & content for better understanding*

### `/admin/courses` — Course Management
- [ ] Table: title, NSQF level, fees, seats, category, active toggle — *Always follow the PHP project its theme & content for better understanding*
- [ ] Active/inactive toggle (PATCH `/api/admin/courses/[id]`) — *Always follow the PHP project its theme & content for better understanding*
- [ ] Link to edit, link to add new — *Always follow the PHP project its theme & content for better understanding*

### `/admin/courses/new` + `/admin/courses/[id]/edit`
- [ ] Full form: all Course model fields — *Always follow the PHP project its theme & content for better understanding*
- [ ] JSON fields (feeBreakdown, syllabus, outcomes, tags, batchMonths) as dynamic form sections — *Always follow the PHP project its theme & content for better understanding*
- [ ] Save to MongoDB on submit — *Always follow the PHP project its theme & content for better understanding*
- [ ] Redirect to course list on success — *Always follow the PHP project its theme & content for better understanding*

### `/admin/inquiries` — Inquiry Management
- [ ] Table: date, name, phone, email, course, status — *Always follow the PHP project its theme & content for better understanding*
- [ ] Filter by status: PENDING / CONTACTED / CLOSED — *Always follow the PHP project its theme & content for better understanding*
- [ ] Click row to update status — *Always follow the PHP project its theme & content for better understanding*
- [ ] PATCH `/api/admin/inquiries/[id]` — *Always follow the PHP project its theme & content for better understanding*

### `/admin/faculty` — Faculty Management
- [ ] Table: name, designation, active, sort order — *Always follow the PHP project its theme & content for better understanding*
- [ ] Add / edit modal or page — *Always follow the PHP project its theme & content for better understanding*
- [ ] Delete with confirmation — *Always follow the PHP project its theme & content for better understanding*
- [ ] CRUD via `/api/admin/faculty` — *Always follow the PHP project its theme & content for better understanding*

### `/admin/certificates` — Certificate Issuance
- [ ] List enrollments without a certificate — *Always follow the PHP project its theme & content for better understanding*
- [ ] Issue form: assign certificate number, confirm student + course — *Always follow the PHP project its theme & content for better understanding*
- [ ] Save to `certificates` collection — *Always follow the PHP project its theme & content for better understanding*
- [ ] List all issued certificates with search by cert number / student name — *Always follow the PHP project its theme & content for better understanding*

---

## 🔲 Phase 5 — Deployment

- [ ] Production `.env` — MongoDB Atlas or Hostinger MongoDB connection string — *Always follow the PHP project its theme & content for better understanding*
- [ ] `next.config.ts` — image domains, any rewrites — *Always follow the PHP project its theme & content for better understanding*
- [ ] `npm run build` clean pass — *Always follow the PHP project its theme & content for better understanding*
- [ ] Deploy to hosting (Vercel / Hostinger Node) — *Always follow the PHP project its theme & content for better understanding*
- [ ] DNS: point `training.vimsmch.edu.in` to deployment — *Always follow the PHP project its theme & content for better understanding*
- [ ] Smoke test all public pages + admin login — *Always follow the PHP project its theme & content for better understanding*

---

## Notes

- **Parent site reference**: Always match colors, fonts, logos from `e:\xampp-server\xampp\htdocs\vimsmch-college-website`
- **Theme**: `#04415f` accent · `#2086b8` secondary · `#011e2c` heading · `#f1f5f7` bg · `#e6edf0` light bg · `#ffffff` surface
- **Font**: Work Sans (Google Fonts, weights 400/500/600/700/800)
- **UGC compliance required on every page**: fee transparency, NSQF level, anti-ragging helpline, grievance officer
- **MongoDB**: localhost:27017, replica set `rs0`, DB `vimsmch_vocational`
- **No static fallbacks**: all data from MongoDB via Prisma — nothing hardcoded
- **Seed command**: `npm run db:seed` (uses findUnique + create, replica-set safe)
- **DB push command**: `npx prisma db push`
