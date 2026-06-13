# Praveen Kumar S — Developer Portfolio

Welcome to the GitHub repository of my personal developer portfolio! This project is a pixel-perfect, highly responsive, and accessible personal website designed to showcase my skills, projects, and educational journey. 

Live Website: [https://praveen542spk-ship-it.github.io/](https://praveen542spk-ship-it.github.io/)

---

## 🚀 Key Features

### 📐 Modern Layout Architectures
- **CSS Grid:** Employed for two-dimensional core page grids (project layouts, about details, and contact grids).
- **Flexbox:** Utilized for one-dimensional alignments, component items, buttons, and navigation elements.
- **Mobile-First Design:** Fluid, responsive styling using custom media queries for seamless adaptation on mobiles, tablets, and desktops.

### 🎨 Themes & Aesthetics
- **Light/Dark Mode Toggle:** Smooth light/dark theme transition utilizing custom CSS custom properties (`--color-*`).
- **Persistence & Anti-Flash:** Remembers user choice using `localStorage` and falls back to system settings (`prefers-color-scheme`). Features an inline script block to prevent page flash during loading.

### ♿ Accessibility (WCAG 2.1 Compliance)
- Target Lighthouse Accessibility Score of **100/100**.
- **Skip Navigation Link:** Allows keyboard/screen-reader users to skip header menus directly to main content (`WCAG 2.4.1`).
- **Semantic HTML5:** Native tags (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<address>`, `<abbr>`) used throughout.
- **Aria Roles & Descriptive Labels:** Enhanced screen reader usability for toggles, forms, links, and icons.

### 📄 Digital A4 Resume (`resume.html`)
- Built-in, screen-responsive resume page.
- Specially formatted using **CSS print media queries** allowing recruiters to hit `Ctrl + P` / `Cmd + P` to print or save a clean, single-page A4 PDF resume.

### ✉️ Functional Contact Form
- **Form Validation:** Client-side validator checks and live warning messages.
- **Placeholder Styling Helper:** Clean JS logic to style default select option dynamically.
- **Web3Forms AJAX Integration:** Smooth form submission to `praveen542spk@gmail.com` using AJAX fetch request without page reloads.

---

## 📂 Featured Projects
I have designed and built several academic and personal projects demonstrating full-stack engineering, automation, and frontend styling:
1. 💼 **Job Application Tracker** (React, Node.js, Express, MongoDB) – Full-stack Kanban board and analytics dashboard.
2. 🎙️ **Jarvis AI Voice Assistant** (Python, SpeechRecognition, Automation) – Desktop AI assistant utilizing speech-to-text.
3. 🛒 **E-Commerce Application** (React, Node.js, Express, MongoDB) – Modern e-commerce web portal with auth and admin dashboard.
4. 	✅ **To-Do Productivity App** (React, LocalStorage, CSS3) – Task tracker featuring offline session persistence.
5. 🌤️ **Weather Forecast Application** (React, OpenWeatherMap API, CSS3) – Geolocation-enabled dynamic weather forecast.

---

## 🛠️ Technologies Used
- **Core:** HTML5, CSS3 (Advanced Custom Properties, Flexbox, Grid), JavaScript (ES6+, IIFE modules).
- **API Integration:** Web3Forms (Mail submissions).
- **Icons & Fonts:** Google Fonts (Playfair Display, DM Sans, JetBrains Mono).

---

## 📁 Directory Structure
```text
├── css/
│   └── style.css      # Core styles, dark/light theme properties, and responsiveness
├── js/
│   └── main.js        # Form validation, theme toggle, AJAX sender, select helpers
├── index.html         # Homepage containing profile & core technologies
├── about.html         # Detailed educational timeline & background
├── projects.html      # Portfolio projects & interactive filter tags
├── contact.html       # Email contact form utilizing Web3Forms
├── resume.html        # Print-ready professional single-page CV
└── README.md          # Project documentation
```

---

## ⚙️ Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/praveen542spk-ship-it/praveen542spk-ship-it.github.io.git
   ```
2. Navigate to the project folder:
   ```bash
   cd praveen542spk-ship-it.github.io
   ```
3. Open `index.html` in your browser (or use VS Code's Live Server extension).

---

## 📈 Quality Assurance
- **SEO Optimization:** JSON-LD structured data schema, canonical links, descriptive headings, and crawl-friendly meta attributes.
- **Responsive Validations:** Tested across standard resolutions (320px mobile up to 4K displays).
