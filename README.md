# 👨‍💻 Praveen Kumar S — Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live%20Site-praveen542spk--ship--it.github.io-6c63ff?style=for-the-badge&logo=github)](https://praveen542spk-ship-it.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-praveen542spk--ship--it-181717?style=for-the-badge&logo=github)](https://github.com/praveen542spk-ship-it)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Praveen%20Kumar%20S-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/praveen-kumar-s-0bab05411)

> A pixel-perfect, fully responsive, and accessible personal portfolio website built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 🌐 Live Website

🔗 **[https://praveen542spk-ship-it.github.io/](https://praveen542spk-ship-it.github.io/)**

---

## 📸 Pages Overview

| Page | Description |
|------|-------------|
| 🏠 `index.html` | Home — Hero section, skills overview, CTA |
| 👤 `about.html` | About Me — Story, values, education timeline |
| 💼 `projects.html` | Projects — Filterable project cards with GitHub links |
| ✉️ `contact.html` | Contact — Working contact form (Web3Forms) |
| 📄 `resume.html` | Resume — Printable / PDF-saveable CV |

---

## 🚀 Key Features

### 🎨 Design & Themes
- **Dark / Light Mode Toggle** — Smooth theme switching with `localStorage` persistence
- **Anti-Flash Script** — Inline script prevents white flash on dark mode page load
- **System Preference Detection** — Falls back to `prefers-color-scheme` if no saved preference
- **Google Fonts** — Playfair Display, DM Sans, JetBrains Mono

### 📐 Layout & Responsiveness
- **Mobile-First Design** — Custom media queries for 320px → 4K displays
- **CSS Grid** — Used for project grids, about/contact two-column layouts
- **Flexbox** — Navigation, skill tags, buttons, and stat items

### ♿ Accessibility (WCAG 2.1)
- **Skip Navigation Link** — Keyboard / screen-reader shortcut to main content (`WCAG 2.4.1`)
- **Semantic HTML5** — `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<address>`, `<abbr>`
- **ARIA Roles & Labels** — All interactive elements and icons properly labelled
- **Live Regions** — Form success/error messages use `aria-live="polite"`
- Target Lighthouse Accessibility Score: **100/100**

### ✉️ Functional Contact Form
- **Web3Forms Integration** — Submits directly to `praveen542spk@gmail.com` via AJAX
- **Client-Side Validation** — Real-time field validation with helpful error messages
- **Success State** — Smooth in-form success message without page reload

### 📄 Printable Resume
- **CSS Print Media Queries** — Clean A4-formatted resume when printed
- **One-Click PDF** — "Print / Save PDF" button with `window.print()` trigger
- Banner hidden on print, box-shadow stripped for clean output

### 🔍 SEO Optimized
- **JSON-LD Structured Data** — Schema.org `Person` type for rich search results
- **Open Graph Tags** — Social media preview cards
- **Twitter Card** — Twitter-optimized meta tags
- **Canonical URLs** — Prevents duplicate content issues
- **Descriptive Meta Tags** — All pages have unique titles and descriptions

---

## 📂 Featured Projects

| # | Project | Stack | Status |
|---|---------|-------|--------|
| 💼 | **Job Application Tracker** | React, Node.js, Express, MongoDB | [GitHub](https://github.com/praveen542spk-ship-it/job-app) |
| 🎙️ | **Jarvis AI Voice Assistant** | Python, SpeechRecognition, NLP | [GitHub](https://github.com/praveen542spk-ship-it/Jarvis-AI-Voice-Assistant) |
| 🛒 | **E-Commerce Application** | React, Node.js, Express, MongoDB | [GitHub](https://github.com/praveen542spk-ship-it/ecom-app) |
| ✅ | **To-Do Productivity App** | React, CSS3, LocalStorage | [GitHub](https://github.com/praveen542spk-ship-it/To-Do) · [Live](https://praveen542spk-ship-it.github.io/To-Do/) |
| 🌤️ | **Weather Forecast App** | React, OpenWeatherMap API, CSS3 | [GitHub](https://github.com/praveen542spk-ship-it/weather-dashboard) · [Live](https://praveen542spk-ship-it.github.io/weather-dashboard/weather-dashboard/) |

---

## 🛠️ Tech Stack

```
Frontend     →  HTML5, CSS3 (Custom Properties, Grid, Flexbox), JavaScript (ES6+)
Fonts        →  Google Fonts (Playfair Display, DM Sans, JetBrains Mono)
Form API     →  Web3Forms (serverless email submission)
Hosting      →  GitHub Pages
```

---

## 📁 Project Structure

```
praveen542spk-ship-it.github.io/
│
├── 📄 index.html          # Homepage — Hero, Skills, CTA
├── 📄 about.html          # About — Story, Values, Education Timeline
├── 📄 projects.html       # Projects — Filter + Cards
├── 📄 contact.html        # Contact — Form + Info
├── 📄 resume.html         # Resume — Print-ready CV
│
├── 📁 css/
│   └── style.css          # All styles, dark/light theme, responsive breakpoints
│
├── 📁 js/
│   └── main.js            # Theme toggle, form validation, AJAX submission
│
├── 📁 assets/
│   ├── profile.jpg        # Contact page profile photo
│   └── about-profile.jpg  # About page profile photo
│
└── 📄 README.md           # This file
```

---

## ⚙️ Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/praveen542spk-ship-it/praveen542spk-ship-it.github.io.git

# 2. Navigate to the folder
cd praveen542spk-ship-it.github.io

# 3. Open in browser
# Option A: Just open index.html directly
# Option B: Use VS Code Live Server extension for hot reload
```

---

## 👤 About Me

**Praveen Kumar S** — B.E. Computer Science & Engineering student at **R.M.D. Engineering College**, Thiruvallur, Tamil Nadu.

- 📧 Email: [praveen542spk@gmail.com](mailto:praveen542spk@gmail.com)
- 💼 LinkedIn: [praveen-kumar-s-0bab05411](https://www.linkedin.com/in/praveen-kumar-s-0bab05411)
- 🐙 GitHub: [praveen542spk-ship-it](https://github.com/praveen542spk-ship-it)
- 📍 Location: Thiruvallur, Tamil Nadu (Remote-friendly)

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Crafted with passion &amp; code 🚀 by <strong>Praveen Kumar S</strong></p>
