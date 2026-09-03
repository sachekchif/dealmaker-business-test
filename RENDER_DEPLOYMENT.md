# Render Deployment Guide — Deal Maker Business Platform

This application can be deployed on **Render** ([render.com](https://render.com)) either as a **Static Site** or as a **Node.js Web Service**.

---

## 1. Root Directory Requirements for Web Service Deployment

If you select **Web Service** on Render, the **Root Directory** field in Render should be set to `./` (or left blank).

The root directory must contain the following core project files:

```text
dealmaker-business-test/          <-- Root Directory (./)
├── package.json                   <-- Required (defines dependencies & scripts)
├── package-lock.json              <-- Required (lockfile for npm install)
├── vite.config.ts                 <-- Required (Vite build configuration)
├── tsconfig.json                  <-- Required (TypeScript compiler config)
├── index.html                     <-- Required (HTML entry point)
├── render.yaml                    <-- Optional (Blueprint config)
└── src/                           <-- Required (Application source code)
```

---

## 2. Render Web Service Dashboard Settings

When creating a **New Web Service** on dashboard.render.com:

- **Name**: `dealmaker-business-webservice`
- **Region**: Oregon (US West) or closest region
- **Branch**: `main`
- **Root Directory**: `./` (leave blank or enter `./`)
- **Environment**: `Node`
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

---

## 3. `package.json` Scripts for Web Service

Render passes a dynamic `$PORT` variable to Web Services. Your `package.json` `"start"` script is pre-configured to bind to this dynamic port:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview --host 0.0.0.0 --port 4173",
  "start": "vite preview --host 0.0.0.0 --port $PORT"
}
```

---

## 4. Summary: Static Site vs. Web Service

| Setting | Static Site (Recommended) | Node Web Service |
| :--- | :--- | :--- |
| **Render Service Type** | Static Site | Web Service |
| **Environment** | Static | Node |
| **Root Directory** | `./` | `./` |
| **Build Command** | `npm run build` | `npm run build` |
| **Publish Directory / Start** | `dist` | `npm run start` |
| **SPA Rewrite Required** | Yes (`/* -> /index.html`) | Handled by Node preview |
