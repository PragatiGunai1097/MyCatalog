# 🛍️ Catalog Page – Headless CMS (Sanity + Next.js)

---

## 🚀 Overview

This project is a dynamic catalog page built using a **headless CMS (Sanity)** and a **Next.js frontend**. It demonstrates server-side rendering, CMS-driven UI, and role-based content visibility.

The application supports:

* Dynamic product listing
* Role-based pricing (logged-in vs guest)
* CMS-driven display mapping (price-first / specs-first)
* Category filtering and search
* Responsive UI
* Login-based behavior using cookies

---

## 🔐 Login Details

Use the following credentials to test login functionality:

```
ID: admin
Password: Admin@123
```

👉 After login:

* User sees **Set A + Set B products**
* Logged-in pricing is applied

---

## 🧠 Tech Stack & CMS Choice

### Frontend

* **Next.js (App Router)** – Server-side rendering & performance
* **React (JavaScript)** – Dynamic UI components

---

### CMS – Sanity

**Why Sanity?**

* Flexible schema design
* Real-time content updates
* Easy integration with Next.js
* ✅ **Free trial available (perfect for development & testing)**

---

### Deployment

* **Vercel**

  * Easy deployment for Next.js apps
  * Automatic builds

---

## ⚙️ How to Run Locally

---

### ▶️ Run Frontend (UI)

```bash
cd /Users/pragati/Pragati/WebSite/Front-End-Catlog-Project/catalog-frontend
npm install
npm run dev
```

👉 Open: http://localhost:3000

---

### ▶️ Run Sanity Studio (CMS)

```bash
cd /Users/pragati/Pragati/WebSite/Front-End-Catlog-Project/catalog-page
npm install
npm run dev
```

👉 Open: http://localhost:3333

---

## 🛠️ How to Install Sanity (VS Code Terminal)

👉 Run these commands:

```bash
npm create sanity@latest
```

👉 Then follow prompts:

* Project name
* Dataset (usually `production`)
* Template → **Clean project**

---

### Navigate into project

```bash
cd your-sanity-project
```

---

### Install dependencies

```bash
npm install
```

---

### Run Sanity Studio

```bash
npm run dev
```

---

## 🗂️ CMS Structure (Sanity)

### 📦 Item (Product)

Each product includes:

* `title`
* `image`
* `priceLoggedOut`
* `priceLoggedIn`
* `category`
* `cardSet`
* `attributes`

---

### 🎛️ Mapping (UI Control)

* `price_first` → price highlighted
* `specs_first` → specs highlighted

---


## 🔐 Role-Based Logic

### Guest User

* Only sees **Set A items**
* Uses `priceLoggedOut`

---

### Logged-In User

* Sees **Set A + Set B items**
* Uses `priceLoggedIn`

👉 Logic handled in **Next.js server (`page.js`)**

---

## 🔄 Dynamic Content Behavior

* Managed fully in Sanity CMS
* Changes reflect instantly after publishing
* No redeployment required


---
🧪 Testing (Unit Tests)

This project includes basic unit tests to validate:

Role-based filtering (guest vs logged-in user)
Mapping logic (price-first vs specs-first sorting)
📁 Test File Location

Create the test file inside:

catalog-frontend/__tests__/catalog.test.js
🛠️ Install Jest

Run the following command inside the frontend folder:

cd catalog-frontend
npm install jest
▶️ Run Tests
npx jest

output 👍
pragati@MacBook-Air-2 catalog-frontend % npx jest
 PASS  test/catalog.test.js
  Catalog Logic Tests
    ✓ guest sees only Set A items (1 ms)
    ✓ logged-in user sees all items
    ✓ price_first sorts items by price
    ✓ specs_first sorts items by rating


## 📌 Future Improvements

* Add real authentication (NextAuth)
* Add pagination
* Add sorting (price, rating)
* Improve accessibility
* Add testing

---

## 🎯 Conclusion

This project demonstrates:

* Full-stack CMS integration
* Server-side rendering
* Role-based business logic
* Dynamic UI driven by CMS
* Scalable frontend architecture


## My catalog Project Live Link
https://my-catalog-five.vercel.app/

## sanity studio link for Schema
https://catalog-pragati.sanity.studio

## My github link
https://github.com/PragatiGunai1097/MyCatalog.git
---
