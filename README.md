# 📄 Resume App

A sleek and modern **Resume Builder Web Application** developed to demonstrate advanced front-end skills using React, TypeScript, and Tailwind CSS.

This app features a structured multi-step form where users can enter their personal details, educational background, technical and language skills, management experience, and more — all with intuitive validation and responsive design.

---

## 🚀 Tech Stack

- ⚛️ **React (TypeScript)** – Component-based UI development

- 💨 **Tailwind CSS** – Utility-first styling framework

- 🧩 **React Hook Form + Zod** – Form state management and schema validation

- 🗂 **Redux Toolkit + Redux Persist** – Global state management with local persistence

- 🧼 **Prettier** – Code formatting and consistency

---

## 🏗️ Features

- ✅ Multi-step form wizard

- ✅ Sections: Personal Info, Education, Skills, Languages, Management Experience, Resume Upload

- ✅ Integrated form validation (with Zod)

- ✅ Automatic data persistence (via **Redux Persist**) across browser reloads

- ✅ Reusable, modular components

- ✅ Fully responsive and RTL-friendly UI

- ✅ Clean code structure and best practices

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
│   ├── components/                  # Reusable UI and form components
│   │   ├── ui/                      # Buttons, Inputs, Selects, etc.
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   └── skill/                   # Domain-specific components
│   │       ├── SkillForm.tsx
│   │       ├── LanguageSkillForm.tsx
│   │       ├── ManagementSkillForm.tsx
│   │       ├── SkillList.tsx
│   │       └── ResumeUpload.tsx
│
│   ├── pages/                       # Page components (Step-based forms)
│   │   ├── PersonalInfo.tsx
│   │   ├── Education.tsx
│   │   ├── SkillInfo.tsx
│   │   ├── Summary.tsx
│   │   └── ...
│
│   ├── store/                       # Redux Toolkit slices and store config
│   │   ├── slices/
│   │   │   ├── skillSlice.ts
│   │   │   └── ...
│   │   ├── persistConfig.ts         # Redux Persist setup
│   │   └── store.ts
│
│   ├── validation/                  # Zod schemas
│   │   └── skillSchema.ts
│
│   ├── routes/                      # Route configs
│   │   └── AppRouter.tsx
│
│   ├── utils/                       # Helper functions (optional)
│   │   └── stars.ts                 # Example: renderStars helper
│
│   ├── types/                       # Custom types & interfaces (optional)
│   │   └── skill.d.ts
│
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # App entry point
│   └── index.css                    # Tailwind base styles
│
├── .env                             # Supabase keys (if re-enabled)
├── .env.example                     # Example environment file
├── tailwind.config.js
├── tsconfig.json
├── postcss.config.js
├── vite.config.ts
├── README.md
└── package.json
```

---

## 📦 Local Persistence

This project uses Redux Persist to store the application state in localStorage. This ensures that user inputs are saved even after page refreshes or browser restarts, enhancing the user experience significantly.

---

## 🤝 Contributing

Contributions are warmly welcomed!

Feel free to fork this repo, create a feature branch, and submit a pull request.

---

## 🌻Developed by

Azadeh Sharifi Soltani
