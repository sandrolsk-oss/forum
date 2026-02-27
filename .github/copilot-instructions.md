# Cyberpunk Forum – Copilot Instructions

This document is intended for AI agents (Copilot, Copilot Chat, etc.) working on the
`forum` repository.  The goal is to help an agent become productive quickly by
highlighting the architecture, workflows, conventions, and gotchas that are specific
to this codebase.

---

## 🧠 Big‑Picture Architecture

1. **Monorepo with two independent Node projects.**
   - `server/` is an Express API using **SQLite + Sequelize**.  It lives entirely in
     `server/src`; the SQLite file (`cyberforum.sqlite`) is created there.
   - `client/` is a **React + Vite** single‑page app using **Tailwind CSS**.
   - There is no shared build tool; install & run each sub‑project separately.

2. **Data flow & integration**
   - Client calls the backend at `http://<hostname>:5001/api/*`.  The base URL is
     configured in `client/src/services/api.js` and uses the browser hostname.
   - Authentication is JWT‑based.  Tokens are stored in `localStorage` under
     `cyber_token` and attached by an Axios request interceptor.
   - Roles (`user`, `moderator`, `admin`) are enforced by `middlewares/auth.js`
     with `authenticate` and `authorize(roles)` guards.
   - Sequelize models (`User`, `Topic`, `Post`) are defined in `server/src/models`
     and associated in `models/index.js`.  Controllers return stylized JSON
     messages (e.g. `[SYS_ERR]` prefixes, sci‑fi flavour).
   - An initial admin is seeded at startup in `server/src/server.js` if missing.

3. **Frontend structure**
   - Pages live in `client/src/pages`, reusable visuals in `components/`.
   - `AuthContext` handles login/register/logout and exposes `useAuth()` hook.
   - Layout uses a fixed header and sidebar; utility classes such as
     `glass-panel` and `cyber-button` are defined in `src/styles/index.css`.
   - Navigation links in `Sidebar.jsx` are conditionally rendered based on
     authentication and role.

4. **Styling conventions**
   - Tailwind with a few custom classes (`--neon-pink`, `--matrix-green`, etc.).
   - Classes are written in all‑caps strings (e.g. `text-matrixGreen`), and
     most components apply `transition-all` + `hover:` effects for the cyberpunk
     aesthetic.

5. **Backend structure**
   - Routes are grouped under `routes/` and call controllers in `controllers/`.
   - Error handling is simple: custom 404 and generic 500 middleware in `app.js`.
   - The database configuration is in `config/database.js` and always uses a
     local SQLite file with logging disabled.


## 🛠 Developer Workflows

- **Install dependencies**: run `npm install` inside both `client/` and
  `server/` folders separately.
- **Start development servers**:
  - Backend: `cd server && npm run dev` (port `5001` by default).
  - Frontend: `cd client && npm run dev` (Vite will show the port in output).
- **Build for production**: run `npm run build` in `client` (server does not
  serve the built files; deployment is outside scope).
- **Reset database**: delete `server/src/cyberforum.sqlite` and restart the
  server; models will sync again and re‑seed the admin.
- **Quick demo login**: the login page has a hard‑coded button that signs in as
  `admin` using the seeded credentials.  This is useful for testing.
- **Environment variables**:
  - `PORT` (backend listen port)
  - `JWT_SECRET` (defaults to `cyberpunk_neon_secret_2077`)
  There is no `.env` file in the repo; agents should treat these as optional.


## 📁 Project‑Specific Conventions

- **Stylistic messages** – controller and middleware responses use in‑universe
  phrasing (`"Transmission failed."`, "Endpoint missing in cyberspace.").
  Preserve this flavour when adding new messages or tests.
- **Token key naming**: always use `cyber_token` / `cyber_user` in localStorage.
- **Role checks on the frontend**: examine `user?.role` directly, not by string
  comparison function.
- **Database sync** uses `sequelize.sync({ alter: true })` which updates the
  schema automatically; avoid manual migrations.
- **No lint/formatter config** – follow existing code style (ES modules, no
  semicolons in JSX except where necessary, single quotes in JS).
- **Font families** (Orbitron, Fira, JetBrains) are referenced but included
  via CDN in `index.html` (inspect if needed).


## 📌 Integration Points / Dependencies

- **External services**: none.  The avatar URL in `User` defaults to a Dicebear
  endpoint (`/bottts/svg?seed=netrunner`).
- **Packages**:
  - `axios`, `react-router-dom`, `lucide-react` on the client.
  - `express`, `sequelize`, `sqlite3`, `bcryptjs`, `jsonwebtoken` on the server.
- **Cross‑component communication**:
  - The AuthContext and `api` module are the only shared pieces between React
    pages; UI components import them directly.
  - Backend controllers sometimes eager‑load associated models; look at
    `include` options for examples.


## ✅ Adding Features / Modifying Code

1. **New API endpoint**:
   - Add a route in the appropriate file under `server/src/routes`.
   - Implement controller logic in `controllers/` (use existing error/message
     patterns).
   - Protect with `authenticate`/`authorize` as needed.
   - Update frontend pages/services to call the new endpoint via `api.js`.
   - Add UI elements consistent with existing Tailwind classes.
2. **Styling changes**: modify `client/src/styles/index.css` or use inline
   Tailwind; custom utility classes are in the `@layer components` section.
3. **Authentication**: any change to token handling should update both
   `AuthContext.jsx` and the `api` interceptor.
4. **Database models**: define in `models/*.js`; associations belong in
   `models/index.js`.  The sync step will apply new fields automatically.


## ⚠️ Notes & Gotchas

- The server has **no rate limiting** and is in-memory; use caution when
  running on shared hardware.
- The login/register forms display network errors directly; do not leak
  sensitive details in responses.
- UI routes assume React Router v6; keep components functional and hooks‑based.
- There is no automated test suite currently – agents should not add tests
  unless explicitly requested by the user.
- Many components use fixed pixel margins (`mt-[76px]`, `w-64`) to align with
  the header/sidebar; altering them may require updating layout logic.


---

> _When in doubt, mimic existing files.  Look at `Topic.jsx`, `Profile.jsx`,
> and `Home.jsx` for typical page patterns.  Backend logic is deliberately
> simple – most features are added by copying and modifying one of the
> controller functions above._

Please review this file and let me know if any sections are unclear or if other
project‑specific behaviours should be documented.