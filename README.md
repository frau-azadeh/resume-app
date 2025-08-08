📄 Resume App
A sleek, production-ready Resume Builder & Application Tracking web app built with React + TypeScript, powered by Supabase (Postgres + Auth), Redux Toolkit, and Tailwind CSS.
Users can create a resume via a multi-step wizard, submit an application, track status, and download a PDF. Admins can review applications, approve/reject with a message, and manage decisions from a dedicated panel.

Live Demo: https://resume-app-swart.vercel.app/

Repo: https://github.com/frau-azadeh/resume-app

---

## 🖼️ UI Preview

![Personal Information](https://raw.githubusercontent.com/frau-azadeh/resume-app/master/public/information.png)

![Education Information](https://raw.githubusercontent.com/frau-azadeh/resume-app/master/public/education.png)

![Work Information](https://raw.githubusercontent.com/frau-azadeh/resume-app/master/public/work.png)

![Skill Information](https://raw.githubusercontent.com/frau-azadeh/resume-app/master/public/skill.png)

[🔗 Live Demo](https://resume-app-swart.vercel.app/)

[📂 GitHub Repo](https://github.com/frau-azadeh/resume-app)

---

## 🚀 Tech Stack

- ⚛️ **React (TypeScript)** – Component-based UI development

- 💨 **Tailwind CSS** – Utility-first styling framework

- 🧩 **React Hook Form + Zod** – Form state management and schema validation

- 🎯 Redux Toolkit + Redux Persist – Global state with local persistence

- 🧼 **Prettier** – Code formatting and consistency

- 🐘 Supabase – Postgres DB, Auth, (optional Storage)

- 🧱 Headless UI & Lucide – Accessible components & icons

---

## ✨ Features

✅ Multi-step Resume Wizard (Personal, Education, Work, Skills, …)

✅ Typed forms with Zod validation and RHF

✅ Auth with Supabase (email/password)

✅ Candidate Panel: build resume, submit application, track status, download PDF

✅ Admin Panel:

View applications (search, filter, sort)

Approve/Reject with a custom message

Decision metadata (message, decided_at, decided_by)

Nice decision modal with suggested messages

✅ Client-side join for last names (apps + personal info)

✅ State persistence (Redux Persist)

✅ RTL-friendly UI & responsive design

---

## 💻 Getting Started

1.  Clone the repository:

        git clone https://github.com/faru-azadeh/resume-app.git

        cd resume-app

2.  Install dependencies:

        npm install

3.  Start the development server:

        npm run dev

---

📁 Project Structure

```
resume-app/
│
├── public/                          # Static files
│   └── favicon.svg
│
├── src/                             # Main source folder
│
│   ├── assets/                      # Images, logos, icons
│
│   ├── components/                  # Reusable UI and domain components
│   │   ├── admin/                   # Admin-specific components (from 2nd tree)
│   │   │   ├── AdminDecisionModal.tsx
│   │   │   ├── ApplicationsTable.tsx
│   │   │   ├── FilterStatus.tsx
│   │   │   ├── ResumeModal.tsx
│   │   │   └── SearchBox.tsx
│   │   ├── ui/                      # Shared UI widgets (from both trees)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...                  # (other UI components)
│   │   └── skill/                   # Domain-specific (from 1st tree)
│   │       ├── SkillForm.tsx
│   │       ├── LanguageSkillForm.tsx
│   │       ├── ManagementSkillForm.tsx
│   │       ├── SkillList.tsx
│   │       └── ResumeUpload.tsx
│
│   ├── hooks/                       # Custom hooks (from 2nd tree)
│
│   ├── lib/
│   │   └── supabase.ts              # Supabase client (from 2nd tree)
│
│   ├── pages/                       # Route pages (merged)
│   │   ├── PersonalInfo.tsx         # Candidate-side steps (from 1st tree)
│   │   ├── Education.tsx            # Candidate-side steps (from 1st tree)
│   │   ├── SkillInfo.tsx            # Candidate-side steps (from 1st tree)
│   │   ├── Summary.tsx              # Candidate-side summary (from 1st tree)
│   │   └── admin/                   # Admin panel pages (from 2nd tree)
│   │       ├── Dashboard.tsx
│   │       ├── EducationHistory.tsx
│   │       ├── Footer.tsx
│   │       ├── Login.tsx
│   │       ├── PersonalInfo.tsx     # Admin-side personal info view
│   │       ├── Signup.tsx
│   │       ├── SkillInfo.tsx
│   │       ├── Summary.tsx          # Candidate “status summary” page (admin view)
│   │       └── WorkInfo.tsx
│
│   ├── routes/                      # Route configs (from 1st tree)
│   │   └── AppRouter.tsx
│
│   ├── store/                       # Redux Toolkit + Persist (merged)
│   │   ├── slices/
│   │   │   ├── skillSlice.ts        # Example slice (from 1st tree)
│   │   │   └── ...                  # Other slices (auth, resume, etc.)
│   │   ├── persistConfig.ts         # Redux Persist setup (from 1st tree)
│   │   └── store.ts                 # Store config (present in both → kept one path)
│
│   ├── styles/
│   │   └── fonts.css                # From 2nd tree
│
│   ├── types/                       # Custom types (merged)
│   │   ├── admin.ts                 # AppStatus, DecisionStatus, rows... (2nd tree)
│   │   └── skill.d.ts               # Skill types (1st tree)
│
│   ├── utils/                       # Helper functions (from 1st tree)
│   │   └── stars.ts                 # Example: renderStars helper
│
│   ├── validation/                  # Zod schemas (merged)
│   │   ├── skillSchema.ts           # From 1st tree
│   │   └── (other zod schemas)      # From 2nd tree
│
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind base styles
│
├── .env                             # From 1st tree (legacy keys if used)
├── .env.example                     # From 1st tree
├── .env.local                       # From 2nd tree (Vite + Supabase envs)
├── package.json                     # From 2nd tree
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md

```

---

## 🔐 Authentication & Roles

Supabase Auth (email/password) is used for login/signup.

Admin capability is typically controlled via a profile record (e.g., profiles.role IN ('admin','user')) or by granting the admin user ID in your database.

The Admin panel is visible only to users that your app treats as admins (e.g., after checking role or a secure claim).

Tip: Create a profiles table keyed by auth.users.id and store role ('admin' | 'user'). Load it after login and gate routes/UI accordingly.

---

## 🗄️ Database (Supabase)

Minimum required tables (simplified):

applications

id uuid pk default gen_random_uuid()

user_id uuid not null (FK to auth.users.id)

status text not null ('pending' | 'approved' | 'rejected')

decision_message text null

decided_at timestamptz null

decided_by uuid null

created_at timestamptz default now()

personal_infos

user_id uuid pk

first_name text, last_name text, … (fields you already have)

educations, work_infos, skill … (your current structure)

If you’re evolving an existing DB, this migration is handy:

        alter table public.applications
        add column if not exists decision_message text,
        add column if not exists decided_at timestamptz,
        add column if not exists decided_by uuid;

        -- Optional: index for admin lists
        create index if not exists idx_applications_created_at on public.applications (created_at desc);

---

## 📦 Local Persistence

This project uses Redux Persist to store the application state in localStorage. This ensures that user inputs are saved even after page refreshes or browser restarts, enhancing the user experience significantly.

RLS
For local dev you can keep RLS off. In production, enable RLS and add policies that:

allow candidates to read/update their own records,

allow admins to read all applications & personal infos.

---

## 🧪 Getting Started

1.  Clone & Install

         git clone https://github.com/frau-azadeh/resume-app.git
         cd resume-app
         npm install

2.  Environment Variables

Create .env.local in the root:

        VITE_SUPABASE_URL=https://YOUR-SUPABASE-PROJECT.supabase.co
        VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY

3.  Run Dev

         npm run dev

4.  Build & Preview

         npm run build
         npm run preview

---

## 🔧 Notable Implementation Details

Client-side join: the Admin list fetches applications and personal_infos (for last names) and merges client-side.

Decision Modal: when approving/rejecting, admin can edit a message; message & timestamps are saved to applications.

Redux Persist: preserves form steps and candidate data between reloads.

RTL: fully RTL-compatible styles.

---

## 🧭 Roadmap

⬜ File storage for resume uploads (Supabase Storage)

⬜ Email notifications on decision

⬜ Audit log for admin actions

⬜ E2E tests (Playwright/Cypress)

---

## 🤝 Contributing

Contributions are warmly welcomed!

Feel free to fork this repo, create a feature branch, and submit a pull request.

---

## 🌻Developed by

Azadeh Sharifi Soltani
