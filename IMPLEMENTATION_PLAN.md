# Portfolio Implementation Plan

## Quick Wins — 30 min total

Content and copy fixes. No visual regressions.

- [ ] Fix impact strip: replace `"Azure"` stat with `"10TB+"` / `"data migrated to Azure"`
- [ ] Remove `"CO-OP"` from `"Data Engineer, CO-OP"` heading
- [ ] Remove `"5-Day Vibe Coding — planned"` from Continuous Learning
- [ ] Remove redundant plain-text email below contact buttons
- [ ] Fix footer year: `{new Date().getFullYear()}`
- [ ] Remove Diploma entry (2014–2017) from Education
- [ ] Vary action verbs in Wisr AI bullets — two consecutive "Built..." → "Designed...", "Developed..."
- [ ] Add `"Upcoming"` badge to Web Summit 2026 conference card
- [ ] Add `id="conferences"` to Conferences section and add it to `NAV_LINKS`

---

## Sprint 1 — Visual polish — 2–4 hours

Theme and component-level improvements.

- [ ] Add custom fonts: `DM Mono` (headings) + `Inter` (body) via Google Fonts
- [ ] Cut accent colors from 4 → 2: keep indigo (primary) + cyan (accent), remove violet and pink
- [ ] Add `color` prop to `Pill` component — pass matching card accent per competency card
- [ ] Add active-section highlight to nav via `IntersectionObserver`
- [ ] Give each experience role a distinct left-border color (TransLink → cyan, Zaveribazaar → accent2, Bluepen → accent3)
- [ ] Replace "Core Strengths" skill card with "Vector & Retrieval" card (Pinecone, pgvector, ChromaDB, Weaviate)
- [ ] Add missing AI Engineer skills: Anthropic API, OpenAI API, prompt engineering pills to AI/ML card
- [ ] Remove icon-strip skills that are already covered by pills (deduplication)
- [ ] Sharpen hero tagline: `"I build the data infrastructure and AI systems that let organizations act on information, not just store it."`
- [ ] Fix hero CTA hierarchy: solid primary (View Projects), outlined secondary (Resume), text/icon links (GitHub, LinkedIn)
- [ ] Add subtle gradient or decorative divider between major sections

---

## Sprint 2 — Interactivity — 4–8 hours

Components that turn the portfolio into proof of work.

- [ ] Add **Magic UI `NumberTicker`** to impact strip stats (30%, 4, 3 count up on scroll)
- [ ] Add **`AnimatedBeam`** or **`OrbitingCircles`** to hero (Azure, LangChain, Docker logos orbiting headshot) — lazy-load
- [ ] Add tag filter row to Projects section (`Data Engineering`, `AI/ML`, `Security`)
- [ ] Add Framer Motion expand/collapse to Experience cards — show mini architecture description on expand
- [ ] Add Mermaid.js architecture diagram to all 3 project cards (render to SVG, inline as image)
- [ ] Add **Recharts `RadarChart`** to Skills section (axes: Data Eng, AI/ML, Cloud, Security, Frontend) above pill cards
- [ ] Add GitHub pinned-repo callouts below the GitHub Calendar

---

## Sprint 3 — Signature features — 1–2 weeks

The features that place this in the top 1% of AI engineer portfolios.

### Interactive Pipeline Diagram
- [ ] Migrate to `@xyflow/react` (React Flow)
- [ ] Build TransLink ETL pipeline node graph: SSIS → Azure Synapse → Data Lake, with Azure icons per node
- [ ] Add click-to-reveal: row counts, latency, code snippet per node
- [ ] Embed on TransLink project card as an expandable panel

### Live Demo Embed
- [ ] Build CVE-to-CVSS classifier in Python (Gradio)
- [ ] Host on Hugging Face Spaces (free CPU tier)
- [ ] Embed via `<gradio-app>` web component on OpenClaw project card

### EPSS × CVSS Scatter Plot
- [ ] Add **Nivo `ScatterPlot`**: x = CVSS severity, y = EPSS exploit probability, bubble = vulnerability age
- [ ] Pull data from NVD + FIRST APIs
- [ ] Add as a live visualization widget in the Wisr AI project or a standalone Analytics section

---

## Sprint 4 — RAG Chatbot — 2–3 weeks

The single highest-leverage feature for an AI engineer portfolio.

- [ ] Migrate hosting from GitHub Pages → **Vercel** (required for serverless backend)
- [ ] Set up **Upstash Vector** for the knowledge store
- [ ] Embed resume PDF + project writeups as vector documents
- [ ] Wire **Groq free tier** (`llama-3.3-70b-versatile`) for inference
- [ ] Build chat endpoint as Vercel Route Handler using **Vercel AI SDK**
- [ ] Add `useChat` hook on frontend — floating "Ask about my work" button
- [ ] Frame as third-person expert system: "Dhaval built X..." (avoids uncanny-valley problem)
- [ ] Add prompt injection defense (validate all user inputs before passing to LLM)

---

## Reference

- Design research: `portfolio-design-research`
- Magic UI components: copy-paste, MIT license — `magicui.design`
- React Flow: `@xyflow/react` — 36k stars
- Cameron Rye RAG chatbot writeup: architecture blueprint for the chatbot sprint
- Nivo charts: `nivo.rocks` — best defaults, SSR support
- Hugging Face Spaces: free CPU tier, `<gradio-app>` embed
