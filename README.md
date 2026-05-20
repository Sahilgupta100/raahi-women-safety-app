# Raahi — Women Safety App (Frontend)

Modern, mobile-first React frontend for **Raahi** — *Your Safety, Your Journey*.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4**
- **React Router v7**
- **Lucide React** icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
npm run preview
```

## Logo

The official Raahi logo lives at `src/assets/raahi-logo.png` and is used via the `RaahiLogo` component (`src/components/ui/RaahiLogo.jsx`). Replace that file to update the logo app-wide.

Variants: `full`, `nav`, `splash`, `auth`, `sidebar`, `icon`.

## Project Structure

```
src/
├── assets/           # Images, logo
├── components/
│   ├── auth/         # ProtectedRoute
│   ├── dashboard/    # Device, Recording, Map, Contacts
│   ├── layout/       # Navbar, Sidebar, BottomNav, AppLayout
│   └── ui/           # Button, Card, FormInput, Modal, Toast, Loader
├── context/          # Auth, Theme, Toast
├── data/             # mockData.json
├── hooks/            # useForm, useAsync
├── pages/            # Splash, Login, Signup, Dashboard, Profile, Settings
└── services/         # API-ready mock services
```

## Pages

| Route | Page |
|-------|------|
| `/` | Splash (auto → login) |
| `/login` | Login |
| `/signup` | Sign up |
| `/forgot-password` | Password reset |
| `/dashboard` | Main dashboard (protected) |
| `/profile` | User profile (protected) |
| `/settings` | App settings (protected) |

## Mock Auth

Any email/phone + password (4+ chars) will log in. Signup validates matching passwords (6+ chars).

## Backend Integration

Services in `src/services/` use mock delays and in-memory state. To connect Firebase or a REST API:

1. Set `VITE_API_BASE_URL` in `.env`
2. Replace implementations in `authService.js`, `deviceService.js`, etc.
3. Use `api.js` for authenticated HTTP requests

## Features

- Dark mode (persisted in `localStorage`)
- Toast notifications
- Loading & error states
- Responsive layout with sidebar (desktop) and bottom nav (mobile)
- SOS emergency button with contact management
- Mock Bluetooth device connection, recording, and live location

## Design

Primary palette: **Purple**, **Pink**, **White**, **Black** with smooth transitions and card-based dashboard layout.

---

© Raahi — Women Safety App
