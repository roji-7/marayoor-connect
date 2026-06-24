## Plan: Admin Dashboard for TVK Marayoor Site

### 1. Enable Lovable Cloud
Provision database + auth so content, admin users, theme, and pages persist.

### 2. Auth
- Email/password login at `/admin/login`.
- Seed initial admin: **admintvk@gmail.com / ADMIN** (user creates this on first launch via a one-time setup screen, since Cloud cannot auto-create auth users from migrations).
- `user_roles` table (`admin` role) + `has_role()` security-definer function — never store role on profile.
- Admin can change email & password from dashboard (Settings page).
- All `/admin/*` routes guarded; redirect non-admins.

### 3. Database tables (all RLS-protected; admins write, public reads where needed)
- `site_content` — key/value JSONB store for hero (headline, video URL, poster), about, vision, mission, contact info, footer credit, social links.
- `events` — id, title, description, date, image_url, published, order.
- `news` — id, title, body, date, image_url, published, order.
- `theme_settings` — single row: primary, secondary, accent, background, gold (HSL values for the existing design tokens in `index.css`).
- `pages` — id, slug, title, body (rich text / markdown), published, nav_label, nav_order. Rendered dynamically at `/p/:slug` and optionally added to nav.
- `user_roles` — (user_id, role).

### 4. Public site changes
- Refactor `Hero`, `About`, `Vision`, `Mission`, `Contact`, `Footer`, `Events`, `News` to fetch from `site_content` / `events` / `news` with the current hardcoded values as fallback so the site keeps working before any edits.
- On app load, read `theme_settings` and inject CSS variables onto `:root` to override `index.css` tokens live.
- Dynamic nav items appended from `pages` where `published = true`.
- New route `/p/:slug` renders a dynamic page.

### 5. Admin dashboard (`/admin`)
Shadcn sidebar layout with these sections:
- **Dashboard** — quick stats (events, news, pages count).
- **Hero** — edit headline, video URL, poster image upload.
- **Content** — About, Vision, Mission, Contact (phone/email/address/socials), Footer credit text.
- **Events** — list + create/edit/delete (with image upload to Cloud storage).
- **News** — list + create/edit/delete.
- **Pages** — list + create/edit/delete; toggle nav visibility & order.
- **Theme** — color pickers for primary/secondary/accent/background/gold; live preview; save.
- **Settings** — change admin email, change password.

### 6. Storage
A `media` bucket for uploaded images (events, news, hero poster, page images). Admin-only write, public read.

### 7. Technical notes
- React Router already in place; add `/admin/*` route tree with a layout component + `RequireAdmin` guard.
- Forms use `react-hook-form` + `zod` with field length limits.
- Theme override: small `ThemeProvider` that sets `--primary`, etc. on `document.documentElement` from DB row.
- All Tailwind classes continue to use semantic tokens — no hardcoded colors introduced.

### Out of scope (confirm if you want these too)
- Per-user content versioning / drafts history.
- Multi-admin management UI (only the logged-in admin edits their own credentials).
- Rich WYSIWYG editor — pages use a simple textarea / markdown for now.

Approve and I'll build it end to end.