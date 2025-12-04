# Research Lab Manager — Frontend

This repository contains a Vite + React frontend for the Research Lab Manager app.

Features provided:
- Sidebar listing database tables (from `src/utils/schema.js`)
- Dynamic table view with rows displayed in a responsive table
- Insert / Update / Delete operations using a reusable modal and auto-generated forms
- Axios-based placeholder API wrapper (`src/utils/api.js`) that targets `/api/<table>` endpoints
- Chakra UI for quick, modern styling

Run locally:

```powershell
cd "c:\Users\niyam\DMSD Project"
npm install
npm run dev
```

Notes:
- The frontend calls backend endpoints under `/api/<TABLE>` (GET/POST/PUT/DELETE). You should provide a backend or a proxy to handle those routes during development.
- Schemas are defined in `src/utils/schema.js`. The UI reads these to generate forms dynamically.

Next steps you may want me to do:
- Add a small mock server for development (json-server or express) so CRUD works out of the box
- Add unit tests and form validation
- Integrate more precise input types (selects for enums, foreign key pickers)
