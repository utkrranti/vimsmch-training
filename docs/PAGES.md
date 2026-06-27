# training.vimsmch.edu.in — Pages & Content Plan

---

## PUBLIC PAGES

---

### `/` — Home

**Hero Section**
- College name + tagline ("Skill up. Stand out.")
- CTA buttons: "Explore Courses" → `/courses` | "Inquire Now" → `/contact`
- Background: full-width banner or dark themed hero image

**Stats Strip**
- Total courses offered | Students enrolled | Years of excellence | Certifications issued

**Featured Courses**
- 3–4 course cards (active courses, sorted by newest)
- Each card: Course name, duration, fees, "Know More" button

**Why VIMSMCH Vocational?**
- 4 icon boxes: Industry-ready curriculum | Experienced faculty | Government-recognized certificates | Flexible batches

**Meet the Faculty (brief)**
- 3 faculty photo cards with name + designation
- "View All Faculty" link

**How to Enroll — 3 Steps**
- Step 1: Browse courses | Step 2: Fill inquiry | Step 3: Confirm & join

**Inquiry Form (quick)**
- Name, Phone, Course (dropdown), Submit
- Feeds directly into Inquiry table in DB

---

### `/courses` — All Courses

**Page Header**
- Title: "Vocational Courses Offered"
- Short intro line

**Filter Bar**
- Filter by: All | Short-term | Long-term (based on duration)
- Search box (client-side filter by course name)

**Course Cards Grid**
- All active courses
- Each card: Course title, duration, fees, short description, "View Details" button

---

### `/courses/[slug]` — Course Detail

**Course Header**
- Full title, duration badge, fees badge
- CTA: "Inquire About This Course" (scrolls to inline form)

**About the Course**
- Full description

**What You Will Learn**
- Bullet list of key skills/outcomes

**Course Details Table**
- Duration | Batch size | Eligibility | Mode (classroom/practical/both)

**Inquiry Form**
- Name, Email, Phone, Message (course pre-selected)
- On submit: saved to `inquiries` table, confirmation shown

---

### `/about` — About

**About the Institution**
- Brief about VIMSMCH and why the vocational division was started

**Our Mission**
- Short mission statement

**Affiliation & Recognition**
- Logos or text: affiliated bodies, govt recognition, accreditations

**Infrastructure**
- Labs, equipment, classrooms — text + optional photo grid

---

### `/faculty` — Faculty

**Page Header**
- "Our Expert Faculty"

**Faculty Grid**
- All active faculty members
- Each card: Photo, Name, Designation, short bio excerpt

---

### `/contact` — Contact & Inquiry

**Contact Details**
- Address, phone, email, map embed (Google Maps iframe)

**Full Inquiry Form**
- Name, Email, Phone, Course interested in (dropdown — all courses), Message
- Submit → saved to `inquiries` table
- Success message shown on same page (no redirect)

---

### `/verify` — Certificate Verification

**Search Form**
- Input: Certificate Number
- Submit button

**Result (shown below form)**
- If found: Student Name, Course Name, Issued Date, Certificate No — in a styled card
- If not found: "No certificate found with this number"

---

## ADMIN PAGES (protected — `/admin/*`)

All admin pages require login. Middleware blocks access and redirects to `/admin/login` if not authenticated.

---

### `/admin/login` — Admin Login

- Email + Password form
- On success: JWT cookie set, redirect to `/admin`
- No "forgot password" on v1

---

### `/admin` — Dashboard

**Summary Cards (top row)**
- Total Courses | Total Inquiries (this month) | Total Enrollments | Certificates Issued

**Recent Inquiries Table**
- Last 10 inquiries: Name, Course, Phone, Date, Status badge
- "View All" link to `/admin/inquiries`

**Recent Enrollments Table**
- Last 10 enrollments: Name, Course, Date, Status badge

---

### `/admin/courses` — Manage Courses

**Table: All courses**
- Columns: Title | Duration | Fees | Seats | Status (Active/Inactive) | Actions (Edit | Toggle Active)

**Top right:** "Add New Course" button → `/admin/courses/new`

---

### `/admin/courses/new` — Add Course

**Form fields:**
- Title, Slug (auto-generated from title, editable), Description (textarea), Duration, Fees, Seats
- Submit → creates course, redirect to `/admin/courses`

---

### `/admin/courses/[id]/edit` — Edit Course

- Same form as Add, pre-filled with existing data
- Save → updates course

---

### `/admin/inquiries` — Manage Inquiries

**Table: All inquiries**
- Columns: Name | Course | Phone | Email | Message (truncated) | Date | Status | Actions

**Actions per row:**
- Mark as Contacted | Mark as Closed | View full message (modal)

**Filter:**
- By status: All | Pending | Contacted | Closed

---

### `/admin/enrollments` — Manage Enrollments

**Table: All enrollments**
- Columns: Name | Course | Phone | Email | Date | Status | Actions

**Actions per row:**
- Confirm | Cancel | Issue Certificate (only if Confirmed)

**"Issue Certificate" flow:**
- Click button → modal asks for confirmation
- On confirm: auto-generates certificate number, saves to `certificates` table

---

### `/admin/faculty` — Manage Faculty

**Table: All faculty**
- Columns: Photo (thumbnail) | Name | Designation | Status | Actions (Edit | Toggle Active)

**"Add Faculty" button** → form: Name, Designation, Bio, Photo upload

---

### `/admin/certificates` — Manage Certificates

**Table: All certificates issued**
- Columns: Certificate No | Student Name | Course | Issued Date | Actions (View)

**Search:** by certificate number or student name

---

### `/admin/users` — Admin Users *(Super Admin only)*

**Table: Admin accounts**
- Columns: Name | Email | Role | Created | Actions (Edit role | Deactivate)

**"Add Admin" button** → form: Name, Email, Password, Role (Editor / Super Admin)

---

## ROUTE SUMMARY

| Route | Type | Description |
|---|---|---|
| `/` | Public | Home |
| `/courses` | Public | All courses listing |
| `/courses/[slug]` | Public | Course detail + inquiry |
| `/about` | Public | About the institution |
| `/faculty` | Public | Faculty profiles |
| `/contact` | Public | Contact + inquiry form |
| `/verify` | Public | Certificate verification |
| `/admin/login` | Auth | Login page |
| `/admin` | Protected | Dashboard |
| `/admin/courses` | Protected | Course list |
| `/admin/courses/new` | Protected | Add course |
| `/admin/courses/[id]/edit` | Protected | Edit course |
| `/admin/inquiries` | Protected | Inquiry management |
| `/admin/enrollments` | Protected | Enrollment management |
| `/admin/faculty` | Protected | Faculty management |
| `/admin/certificates` | Protected | Certificate records |
| `/admin/users` | Super Admin | Admin user management |
