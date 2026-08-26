# 📊 Abhyudaya Sinha | Professional 3D Data Analyst Portfolio

Welcome to the official repository of my personal portfolio website. This is a state-of-the-art, interactive 3D WebGL-enhanced web application designed to showcase custom data analytics dashboards, SQL query optimizations, and business intelligence case studies.

Built on a modern front-end architecture using **React**, **Vite**, **Three.js / React Three Fiber**, and **GSAP**, this site bridges data analyst competencies with high-fidelity web aesthetics.

---

## 🚀 Key Interactive Features

### 1. 3D WebGL Constellation Canvas
* An interactive 3D particle network representing data nodes, rendering directly in the background.
* Responds dynamically to mouse coordinates (gravitational pull) and scroll positions (camera depth movement).

### 2. Playable SQL Sandbox Console
* A fully functional client-side SQL terminal console.
* Allows recruiters to execute predefined or custom SQL queries directly against mock databases (`skills`, `projects`) and see results rendered instantly in formatted data tables.

### 3. Recruiter Fast-Track Dashboard
* A developer-mode toggle at the top of the navbar that highlights core metrics, isolates project highlights, and opens custom HR utility widgets.

### 4. Dynamic PDF Resume Generator
* Tailors my professional experience and target keywords between **Data Analyst** and **Business Analyst** tracks on the fly.
* Compiles and triggers an immediate download of an ATS-friendly single-page PDF resume using client-side `jsPDF`.

### 5. ATS Keyword Compatibility Matcher
* An interactive matcher allowing recruiters to paste a target Job Description.
* Runs a comparison algorithm to calculate percentage compatibility and lists matched and missing keywords dynamically.

### 6. Portfolio Self-Analytics Dashboard
* Integrates responsive line and bar charts powered by **Recharts** displaying website traffic volumes, resume download metrics, and visitor channels.

---

## 🛠️ Technology Stack & Libraries

* **Core Framework**: React 19 (JavaScript module entrypoints)
* **Build System**: Vite 8 (Hot Module Replacement)
* **3D Graphics**: Three.js & React Three Fiber (R3F) & @react-three/drei
* **Animations**: GSAP (GreenSock Animation Platform)
* **Data Visualization**: Recharts
* **Document Compilation**: jsPDF
* **Email Transmission**: Client-side EmailJS Integration (with offline fallback links)
* **Styling**: Modern CSS Custom Properties & responsive glassmorphism frames

---

## 💻 Getting Started (Local Development)

To run the application locally on your system, ensure you have **Node.js** and **npm** installed, then execute the following steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/as04-CyberNova/Personal_Portfolio_Website_Updated.git
   cd Personal_Portfolio_Website_Updated
   ```

2. **Install Dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to the local address displayed in your terminal (usually `http://localhost:5173/`).

> [!IMPORTANT]
> **Why do I see a blank screen if I open `index.html` directly?**
>
> If you double-click or open `index.html` via the file protocol (`file:///...`), the browser will show a blank screen. Modern web frameworks use JavaScript modules (`type="module"`) to organize scripts, which modern browsers block locally via CORS policies for security. Always run `npm run dev` to serve the website.

---

## 📬 Contact & Collaborations

* **LinkedIn**: [linkedin.com/in/abhyudaya-sinha-7035a8373](https://www.linkedin.com/in/abhyudaya-sinha-7035a8373)
* **GitHub**: [github.com/as04-CyberNova](https://github.com/as04-CyberNova)
* **Email**: abhyudayasinha04@gmail.com
