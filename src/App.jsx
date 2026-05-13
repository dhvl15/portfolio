import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './index.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function ResumeModal({ isOpen, onClose }) {
  const [numPages, setNumPages] = useState(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl h-[85vh] bg-surface border border-border rounded-xl overflow-hidden shadow-2xl flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface2">
              <span className="text-sm font-medium text-text-muted">Resume — Dhaval Jariwala</span>
              <div className="flex items-center gap-3">
                <a
                  href="/Resume.pdf"
                  download
                  className="px-4 py-1.5 text-sm bg-primary hover:bg-primary-hover text-white rounded-md transition-colors"
                >
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 text-text-muted hover:text-text rounded-md hover:bg-surface transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Clean PDF canvas preview */}
            <div className="flex-1 overflow-y-auto bg-neutral-900 flex flex-col items-center py-6 gap-6">
              <Document
                file="/Resume.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={<p className="text-text-muted text-sm">Loading resume...</p>}
              >
                {numPages && Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={700}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    className="shadow-lg rounded-sm"
                  />
                ))}
              </Document>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Section({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeIn}
    >
      {children}
    </motion.section>
  )
}

function Pill({ children }) {
  return (
    <span className="px-2.5 py-1 text-xs rounded-full bg-primary/10 border border-primary/20 text-primary">
      {children}
    </span>
  )
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="font-bold text-lg text-primary">DJ</a>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-6 text-sm">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-text-muted hover:text-primary transition-colors">{l.label}</a>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-text-muted"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4 flex flex-col gap-4 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-text-muted hover:text-primary transition-colors" onClick={() => setMenuOpen(false)}>{l.label}</a>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headshot */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-4 ring-offset-background">
              <img src="/headshot.jpeg" alt="Dhaval Jariwala" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent2 to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Dhaval Jariwala
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-text-muted mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Data & AI Engineer — I build Azure lakehouses, threat-intel pipelines, and multi-agent AI systems
          </motion.p>

          {/* Credibility chips */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <span className="px-3 py-1.5 text-sm rounded-full border border-primary/30 bg-primary/10 text-primary">MS Data Analytics Eng</span>
            <span className="px-3 py-1.5 text-sm rounded-full border border-accent/30 bg-accent/10 text-accent">Wisr AI</span>
            <span className="px-3 py-1.5 text-sm rounded-full border border-accent2/30 bg-accent2/10 text-accent2">Ex-TransLink</span>
            <span className="px-3 py-1.5 text-sm rounded-full border border-accent3/30 bg-accent3/10 text-accent3">Vancouver, BC</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <a href="#projects" className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">
              View Projects
            </a>
            <button onClick={() => setResumeOpen(true)} className="px-6 py-3 bg-surface border border-accent3/30 rounded-lg hover:bg-surface2 hover:border-accent3/50 text-accent3 transition-colors cursor-pointer">
              Resume
            </button>
            <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface2 hover:border-accent/50 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface2 hover:border-accent2/50 transition-colors">
              LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ IMPACT STRIP ═══════════ */}
      <Section className="py-12 px-6 border-y border-border bg-surface">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-primary">4 days</p>
            <p className="text-sm text-text-muted mt-1">manual work eliminated per quarter</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent">30%</p>
            <p className="text-sm text-text-muted mt-1">DAU increase via UI revamp</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent2">3</p>
            <p className="text-sm text-text-muted mt-1">multi-agent AI systems built</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-accent3">Azure</p>
            <p className="text-sm text-text-muted mt-1">Data Lake migration at scale</p>
          </div>
        </div>
      </Section>

      {/* ═══════════ ABOUT ═══════════ */}
      <Section id="about" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="space-y-4 text-text-muted leading-relaxed max-w-3xl">
            <p>
              I started as a software and mobile developer in India, building full-stack applications with Flutter and Flask. During my Master's in Data Analytics Engineering at Northeastern University Vancouver, I pivoted into data engineering — first at TransLink where I worked on Azure cloud migrations, ETL pipelines, and Power BI dashboards for one of Canada's largest transit authorities.
            </p>
            <p>
              Now at Wisr AI, I sit at the intersection of data engineering, data science, and AI engineering. I build ETL pipelines for threat intelligence data, develop analytical models for vulnerability analysis, and design autonomous multi-agent AI systems for security testing.
            </p>
            <p>
              I'm drawn to roles where I can combine engineering rigor with AI/ML innovation — building systems that don't just move data, but extract meaning and automate decisions from it.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ SKILLS ═══════════ */}
      <Section id="skills" className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Technical Skills</h2>

          {/* Skill icon strips via skillicons.dev */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-primary">Languages & Core</h3>
              <img src="https://skillicons.dev/icons?i=python,r,java,dart&theme=dark" alt="Languages" className="h-12" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent">Data & Cloud</h3>
              <img src="https://skillicons.dev/icons?i=azure,aws,docker,kubernetes,postgres,mongodb,sqlite&theme=dark" alt="Data & Cloud" className="h-12" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent2">AI / ML</h3>
              <img src="https://skillicons.dev/icons?i=pytorch,tensorflow,sklearn&theme=dark" alt="AI/ML" className="h-12" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent3">Web & Tools</h3>
              <img src="https://skillicons.dev/icons?i=react,flask,flutter,firebase,git,github&theme=dark" alt="Web & Tools" className="h-12" />
            </div>
          </div>

          {/* Competency areas */}
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 border border-primary/20 rounded-lg bg-surface2 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-3 text-primary">Data Engineering</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Apache Airflow</Pill><Pill>SSIS</Pill><Pill>Azure Synapse</Pill><Pill>Data Lake</Pill><Pill>ETL Pipelines</Pill><Pill>Data Management</Pill><Pill>Data Scraping</Pill><Pill>PostgreSQL</Pill><Pill>SQL Server</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent/20 rounded-lg bg-surface2 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent">AI & Machine Learning</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>LLMs</Pill><Pill>Generative AI</Pill><Pill>AI Agents</Pill><Pill>PyTorch</Pill><Pill>Algorithms</Pill><Pill>LangChain</Pill><Pill>RAG</Pill><Pill>NLP</Pill><Pill>Multi-Agent Orchestration</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent2/20 rounded-lg bg-surface2 hover:border-accent2/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent2">Data Science & Analytics</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Regression Analysis</Pill><Pill>Data Clustering</Pill><Pill>Data Mining</Pill><Pill>Data Visualization</Pill><Pill>NumPy</Pill><Pill>Pandas</Pill><Pill>Streamlit</Pill><Pill>Power BI</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent3/20 rounded-lg bg-surface2 hover:border-accent3/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent3">Cloud & Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Microsoft Azure</Pill><Pill>Azure Synapse Analytics</Pill><Pill>Docker</Pill><Pill>Kubernetes</Pill><Pill>CI/CD</Pill><Pill>AWS</Pill>
              </div>
            </div>
            <div className="p-5 border border-primary/20 rounded-lg bg-surface2 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-3 text-primary">Cybersecurity Data</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>CVE/CWE/CPE</Pill><Pill>CVSS/EPSS</Pill><Pill>Threat Intelligence</Pill><Pill>Vulnerability Clustering</Pill><Pill>Pentesting Frameworks</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent/20 rounded-lg bg-surface2 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent">Core Strengths</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Data-Driven Decision Making</Pill><Pill>Detail-Oriented</Pill><Pill>SQL</Pill><Pill>Python</Pill><Pill>R Programming</Pill><Pill>Data Analysis</Pill>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <Section id="experience" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Work Experience</h2>

          <div className="space-y-8">
            {/* Wisr AI */}
            <div className="border-l-2 border-primary pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Data Scientist, R&D</h3>
                <span className="text-text-muted text-sm">Feb 2025 – Present</span>
              </div>
              <p className="text-primary mb-1">Wisr AI</p>
              <p className="text-sm text-text-muted mb-3">Vancouver, BC</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Pill>Python</Pill><Pill>PostgreSQL</Pill><Pill>LangChain</Pill><Pill>Docker</Pill><Pill>OpenClaw</Pill><Pill>NLP</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Built ETL pipelines and backend data services connecting PostgreSQL to operationalize threat intelligence data</li>
                <li>Built analytical models to identify CVE similarity patterns and analyze KEV conversion timelines</li>
                <li>Designed and prototyped an autonomous multi-agent pentesting framework using OpenClaw</li>
              </ul>
            </div>

            {/* TransLink */}
            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Data Engineer, CO-OP</h3>
                <span className="text-text-muted text-sm">Jan 2024 – Sep 2024</span>
              </div>
              <p className="text-primary mb-1">TransLink</p>
              <p className="text-sm text-text-muted mb-3">Vancouver, BC</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Pill>SSIS</Pill><Pill>Azure Synapse</Pill><Pill>Azure Data Lake</Pill><Pill>SQL Server</Pill><Pill>Power BI</Pill><Pill>DAX</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Supported migrating on-prem SQL Server databases to Azure Data Lakes using SSIS and Azure Synapse</li>
                <li>Created interactive Power BI dashboards for real-time monitoring and analysis of device events</li>
                <li>Automated fare infraction dispute reporting — eliminated 4 days of manual entry per quarter</li>
              </ul>
            </div>

            {/* Zaveribazaar */}
            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Flutter Developer</h3>
                <span className="text-text-muted text-sm">Jun 2021 – Jul 2022</span>
              </div>
              <p className="text-primary mb-1">Zaveribazaar.co.in</p>
              <p className="text-sm text-text-muted mb-3">Mumbai, India</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Pill>Flutter</Pill><Pill>Firebase</Pill><Pill>TensorFlow</Pill><Pill>SQLite</Pill><Pill>REST APIs</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Led UI revamp using Flutter — 30% increase in daily active users</li>
                <li>Integrated REST APIs to develop features such as Expense Manager and Recommendation System</li>
                <li>Deployed on Android and iOS with CI/CD pipeline using Codemagic</li>
              </ul>
            </div>

            {/* Bluepen */}
            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Software Developer</h3>
                <span className="text-text-muted text-sm">Nov 2020 – May 2021</span>
              </div>
              <p className="text-primary mb-1">Bluepen.co.in</p>
              <p className="text-sm text-text-muted mb-3">Mumbai, India</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Pill>Flutter</Pill><Pill>Flask</Pill><Pill>MongoDB</Pill><Pill>TensorFlow</Pill><Pill>Razorpay</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>End-to-end UI development with TensorFlow-powered real-time object detection</li>
                <li>Created microservice-based backend using Flask with MongoDB</li>
                <li>Integrated Razorpay payments gateway to enable a subscription model</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <Section id="projects" className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>

          <div className="space-y-6">
            {/* Job Search */}
            <div className="bg-surface2 border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">AI-Powered Job Search System</h3>
                <a href="https://github.com/dhvl15/job-search" target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">github.com/dhvl15/job-search</a>
              </div>
              <p className="text-sm text-text-muted mb-3">Personal AI-powered automation system for targeted, thoughtful job applications</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill>Claude Code</Pill><Pill>Python</Pill><Pill>Obsidian</Pill><Pill>Markdown Skills</Pill><Pill>Git</Pill><Pill>Dataview</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Architected a composable skill system with 8 modular markdown-based skills enabling focused context loading per task</li>
                <li>Implemented structured scoring rubric with weighted dimensions, gate conditions, and role archetype classification</li>
                <li>Built URL inbox capture pipeline with one-hotkey job URL queuing and batch evaluation processing</li>
                <li>Integrated Kanban-based application tracking with analytics dashboards for pipeline health and skill gap analysis</li>
              </ul>
            </div>

            {/* OpenClaw */}
            <div className="bg-surface2 border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">OpenClaw Multi-Agent Pentesting Framework</h3>
                <span className="text-primary text-sm">Research Prototype</span>
              </div>
              <p className="text-sm text-text-muted mb-3">Autonomous security testing framework with dynamic agent spawning and persistent memory</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill>Python</Pill><Pill>OpenClaw</Pill><Pill>Docker</Pill><Pill>Nmap</Pill><Pill>Nuclei</Pill><Pill>LLMs</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Designed and prototyped an autonomous multi-agent pentesting framework using OpenClaw</li>
                <li>Implemented dynamic agent spawning with reusable skills and Docker sandboxing</li>
                <li>Built persistent memory system for agent state management across security testing sessions</li>
                <li>Integrated security tools (Nmap, Nuclei) for automated vulnerability scanning and assessment</li>
              </ul>
            </div>

            {/* WordOut */}
            <div className="bg-surface2 border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">WordOut — LLM Career Platform</h3>
                <span className="text-primary text-sm">Jan 2025 – Sep 2025</span>
              </div>
              <p className="text-sm text-text-muted mb-3">Platform helping candidates showcase communication skills through portfolio-style videos for hiring teams</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Pill>LLMs</Pill><Pill>Firebase</Pill><Pill>Multi-Agent</Pill><Pill>LangChain</Pill><Pill>Python</Pill>
              </div>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Built LLM features for candidate communication skills showcase platform</li>
                <li>Prototyped multi-agent resume & career-development workflows (profile ingest → critique → rewrite → video pitch prompts)</li>
                <li>Hosted and orchestrated LLM services on Firebase with auth, data flow, and prompt/version management</li>
                <li>Partnered in rapid product brainstorming and UX experiments</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <Section id="education" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Education</h2>

          <div className="space-y-6">
            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold">Master of Science, Data Analytics Engineering</h3>
              <p className="text-primary">Northeastern University, College of Engineering</p>
              <p className="text-sm text-text-muted">Vancouver, BC · Sep 2022 – Dec 2024</p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Bachelor of Engineering, Computer Engineering</h3>
              <p className="text-primary">University of Mumbai, Shah & Anchor Kutchhi Engineering College</p>
              <p className="text-sm text-text-muted">Mumbai, India · Aug 2017 – Oct 2020</p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Diploma, Computer Engineering</h3>
              <p className="text-primary">Shri Bhagubhai Mafatlal Polytechnic</p>
              <p className="text-sm text-text-muted">Mumbai, India · Aug 2014 – Jun 2017</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONFERENCES ═══════════ */}
      <Section className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Conferences</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 border border-border rounded-lg bg-surface2 text-center">
              <h3 className="text-lg font-semibold">Web Summit 2026</h3>
              <p className="text-sm text-text-muted">Vancouver, BC</p>
            </div>
            <div className="p-5 border border-border rounded-lg bg-surface2 text-center">
              <h3 className="text-lg font-semibold">All In 2025</h3>
              <p className="text-sm text-text-muted">Montreal, QC</p>
            </div>
            <div className="p-5 border border-border rounded-lg bg-surface2 text-center">
              <h3 className="text-lg font-semibold">Web Summit 2025</h3>
              <p className="text-sm text-text-muted">Vancouver, BC</p>
            </div>
          </div>

          <div className="p-6 bg-surface2 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Booth Presentations</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Represented Wisr AI at Web Summit Vancouver and All In Montreal, demoing the threat intelligence platform to attendees ranging from technical practitioners to business executives. Explained complex cybersecurity concepts in accessible language for non-technical audiences, including CEOs, CTOs, and business owners. Gathered market feedback and product insights from hundreds of conversations.
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ LEARNING ═══════════ */}
      <Section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Continuous Learning</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border border-border rounded-lg bg-surface">
              <h3 className="text-lg font-semibold mb-3 text-primary">Kaggle x Google</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>5-Day Generative AI Intensive — completed</li>
                <li>5-Day AI Agents Intensive — in progress</li>
                <li>5-Day Intensive Vibe Coding — planned</li>
              </ul>
            </div>
            <div className="p-5 border border-border rounded-lg bg-surface">
              <h3 className="text-lg font-semibold mb-3 text-primary">Claude Academy</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>AI Fluency — completed</li>
                <li>Claude Code 101 — completed</li>
                <li>Claude Code in Action — completed</li>
                <li>Subagents, MCP — completed</li>
              </ul>
            </div>
            <div className="p-5 border border-border rounded-lg bg-surface">
              <h3 className="text-lg font-semibold mb-3 text-primary">In Progress</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Apache Airflow 101 & DAG Authoring</li>
                <li>Databricks Foundations</li>
                <li>AWS Cloud Practitioner</li>
              </ul>
            </div>
            <div className="p-5 border border-border rounded-lg bg-surface">
              <h3 className="text-lg font-semibold mb-3 text-primary">Reading</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>Agentic Design Patterns — Antonio Gulli (in progress)</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ GITHUB ACTIVITY ═══════════ */}
      <Section className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">GitHub Activity</h2>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="dhvl15"
              colorScheme="dark"
              fontSize={14}
              blockSize={14}
              blockMargin={4}
            />
          </div>
        </div>
      </Section>

      {/* ═══════════ CONTACT ═══════════ */}
      <Section id="contact" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            I'm open to opportunities in Data Engineering, Data Science, and AI Engineering roles.
            Based in Vancouver, BC — open to remote, hybrid, and on-site.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a href="mailto:dhaval.jariwala98@gmail.com" className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors">
              Email Me
            </a>
            <button onClick={() => setResumeOpen(true)} className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface2 hover:border-accent3/50 transition-colors cursor-pointer">
              Resume
            </button>
            <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface2 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface2 transition-colors">
              LinkedIn
            </a>
          </div>
          <p className="text-sm text-text-muted">dhaval.jariwala98@gmail.com</p>
        </div>
      </Section>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-sm text-text-muted">
          <p>&copy; 2025 Dhaval Jariwala. Built with React, Tailwind CSS & Framer Motion.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
