# Rental Inventory Dashboard (Frontend)

Tech stack:
- React + Vite
- Tailwind CSS
- Axios (interceptors)
- React Router DOM
- React Hook Form
- React Hot Toast
- Framer Motion
- Quagga (for camera barcode scanning - placeholder included)

## Setup

1. Install deps:
```
npm install
```

2. Prepare tailwind:
```
npx tailwindcss init -p
```
Make sure `tailwind.config.cjs` content is already set.

3. Create `.env` in project root (optional):
```
VITE_API_BASE=http://localhost:5000/api
```

4. Run:
```
npm run dev
```

The frontend expects the backend at `http://localhost:5000/api`.

