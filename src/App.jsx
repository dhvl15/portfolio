import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { Document, Page, pdfjs } from 'react-pdf'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts'
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
                  href={`${import.meta.env.BASE_URL}Resume.pdf`}
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
                file={`${import.meta.env.BASE_URL}Resume.pdf`}
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

// NumberTicker — counts up on scroll into view
function NumberTicker({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const num = parseFloat(value)
    if (isNaN(num)) { setCount(value); return }
    const duration = 1500
    const steps = 40
    const increment = num / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= num) { setCount(num); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{typeof count === 'number' ? count : value}{suffix}
    </span>
  )
}

// Radar chart data for skills
const RADAR_DATA = [
  { skill: 'Data Eng', value: 90 },
  { skill: 'AI / ML', value: 85 },
  { skill: 'Cloud', value: 80 },
  { skill: 'Security', value: 70 },
  { skill: 'Frontend', value: 55 },
]

// Project tags for filtering
const PROJECT_TAGS = ['All', 'Data Engineering', 'AI/ML', 'Security']

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

function Pill({ children, color = 'primary' }) {
  const styles = {
    primary: 'bg-primary/10 border-primary/20 text-primary',
    accent: 'bg-accent/10 border-accent/20 text-accent',
  }
  return (
    <span className={`px-2.5 py-1 text-xs rounded-full border ${styles[color] || styles.primary}`}>
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
  { href: '#conferences', label: 'Conferences' },
  { href: '#contact', label: 'Contact' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [projectFilter, setProjectFilter] = useState('All')
  const [expandedExp, setExpandedExp] = useState(null)

  // IntersectionObserver for active nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
                <a key={l.href} href={l.href} className={`transition-colors ${activeSection === l.href ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>{l.label}</a>
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

      {/* ═══════════ HERO + ABOUT (split) ═══════════ */}
      <section id="about" className="bg-glow min-h-screen flex items-center px-6 pt-24 pb-12 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left — Hero */}
          <div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-4 ring-offset-background">
                <img src={`${import.meta.env.BASE_URL}headshot.jpeg`} alt="Dhaval Jariwala" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Dhaval Jariwala
            </motion.h1>

            <motion.p
              className="text-lg text-text-muted mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              I build the data infrastructure and AI systems that let organizations act on information, not just store it.
            </motion.p>

            {/* Credibility chips */}
            <motion.div
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <span className="px-3 py-1.5 text-sm rounded-full border border-primary/30 bg-primary/10 text-primary">MS Data Analytics Eng</span>
              <span className="px-3 py-1.5 text-sm rounded-full border border-accent/30 bg-accent/10 text-accent">Wisr AI</span>
              <span className="px-3 py-1.5 text-sm rounded-full border border-primary/30 bg-primary/10 text-primary">Ex-TransLink</span>
              <span className="px-3 py-1.5 text-sm rounded-full border border-accent/30 bg-accent/10 text-accent">Vancouver, BC</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <a href="#projects" className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-sm">
                View Projects
              </a>
              <button onClick={() => setResumeOpen(true)} className="px-5 py-2.5 bg-surface border border-primary/30 rounded-lg hover:bg-surface2 hover:border-primary/50 text-primary transition-colors cursor-pointer text-sm">
                Resume
              </button>
              <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-full border border-border bg-surface hover:bg-surface2 hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full border border-border bg-surface hover:bg-surface2 hover:border-primary/50 transition-colors">
                <svg className="w-4 h-4 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </motion.div>
          </div>

          {/* Right — About */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold font-heading mb-6 text-text-muted">About Me</h2>
            <div className="space-y-4 text-text-muted leading-relaxed text-sm">
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
          </motion.div>

        </div>
      </section>


      {/* ═══════════ SKILLS ═══════════ */}
      <Section id="skills" className="bg-dots py-20 px-6 bg-surface overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 font-heading">Technical Skills</h2>

          {/* Radar (left) + icon strip (right) */}
          <div className="grid md:grid-cols-2 items-center gap-10 mb-12">
            <div className="w-72 h-72 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA} outerRadius="65%">
                  <PolarGrid stroke="#2e2e3a" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <img src="https://skillicons.dev/icons?i=python,r,pytorch,tensorflow,azure&theme=dark" alt="Languages & ML" className="h-12" />
              <img src="https://skillicons.dev/icons?i=aws,docker,postgres,flask,firebase&theme=dark" alt="Cloud & Backend" className="h-12" />
              <img src="https://skillicons.dev/icons?i=flutter,git,github,kubernetes&theme=dark" alt="Tools" className="h-12" />
            </div>
          </div>

          {/* Competency areas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border border-primary/20 rounded-lg bg-surface2 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-3 text-primary">Data Engineering</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Apache Airflow</Pill><Pill>SSIS</Pill><Pill>Azure Synapse</Pill><Pill>Data Lake</Pill><Pill>ETL Pipelines</Pill><Pill>Data Management</Pill><Pill>Data Scraping</Pill><Pill>PostgreSQL</Pill><Pill>SQL Server</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent/20 rounded-lg bg-surface2 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent">AI & Machine Learning</h4>
              <div className="flex flex-wrap gap-2">
                <Pill color="accent">LLMs</Pill><Pill color="accent">Generative AI</Pill><Pill color="accent">Openclaw</Pill><Pill color="accent">AI Agents</Pill><Pill color="accent">PyTorch</Pill><Pill color="accent">LangChain</Pill><Pill color="accent">RAG</Pill><Pill color="accent">NLP</Pill><Pill color="accent">Anthropic API</Pill><Pill color="accent">OpenAI API</Pill><Pill color="accent">Prompt Engineering</Pill>
              </div>
            </div>
            <div className="p-5 border border-primary/20 rounded-lg bg-surface2 hover:border-primary/50 transition-colors">
              <h4 className="font-semibold mb-3 text-primary">Data Science & Analytics</h4>
              <div className="flex flex-wrap gap-2">
                <Pill>Regression Analysis</Pill><Pill>Data Clustering</Pill><Pill>Data Mining</Pill><Pill>Data Visualization</Pill><Pill>NumPy</Pill><Pill>Pandas</Pill><Pill>Streamlit</Pill><Pill>Power BI</Pill>
              </div>
            </div>
            <div className="p-5 border border-accent/20 rounded-lg bg-surface2 hover:border-accent/50 transition-colors">
              <h4 className="font-semibold mb-3 text-accent">Cloud & Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                <Pill color="accent">Microsoft Azure</Pill><Pill color="accent">Azure Synapse Analytics</Pill><Pill color="accent">Docker</Pill><Pill color="accent">Kubernetes</Pill><Pill color="accent">CI/CD</Pill><Pill color="accent">AWS</Pill>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <Section id="experience" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-heading">Work Experience</h2>

          <div className="space-y-8">
            {[
              { id: 'wisr', color: 'border-primary', title: 'Data Scientist, R&D', date: 'Feb 2025 – Present', company: 'Wisr AI', loc: 'Vancouver, BC',
                pills: ['Python', 'PostgreSQL', 'LangChain', 'Docker', 'OpenClaw', 'NLP'],
                bullets: [
                  'Designed ETL pipelines and backend data services connecting PostgreSQL to operationalize threat intelligence data',
                  'Developed analytical models to identify CVE similarity patterns and analyze KEV conversion timelines',
                  'Architected an autonomous multi-agent pentesting framework using OpenClaw with dynamic agent spawning',
                ],
                detail: 'Built a real-time CVE ingestion pipeline processing NVD, EPSS, and KEV feeds into a normalized PostgreSQL schema. The pentesting framework uses a coordinator agent that dynamically spawns specialist sub-agents (recon, exploit, report) inside Docker sandboxes with shared memory.',
              },
              { id: 'translink', color: 'border-accent', title: 'Data Engineer (CO-OP)', date: 'Jan 2024 – Sep 2024', company: 'TransLink', loc: 'Vancouver, BC',
                pills: ['SSIS', 'Azure Synapse', 'Azure Data Lake', 'SQL Server', 'Power BI', 'DAX'],
                bullets: [
                  'Supported migrating on-prem SQL Server databases to Azure Data Lakes using SSIS and Azure Synapse',
                  'Created interactive Power BI dashboards for real-time monitoring and analysis of device events',
                  'Automated fare infraction dispute reporting — eliminated 4 days of manual entry per quarter',
                ],
                detail: 'Migrated 10TB+ of transit operational data from on-prem SQL Server to Azure Data Lake Gen2 via SSIS packages orchestrated through Azure Synapse pipelines. Power BI dashboards tracked Compass card tap events across 20k+ devices.',
              },
              { id: 'zaveri', color: 'border-primary', title: 'Flutter Developer', date: 'Jun 2021 – Jul 2022', company: 'Zaveribazaar.co.in', loc: 'Mumbai, India',
                pills: ['Flutter', 'Firebase', 'TensorFlow', 'SQLite', 'REST APIs'],
                bullets: [
                  'Led UI revamp using Flutter — 30% increase in daily active users',
                  'Integrated REST APIs to develop features such as Expense Manager and Recommendation System',
                  'Deployed on Android and iOS with CI/CD pipeline using Codemagic',
                ],
                detail: 'Redesigned the jewellery marketplace app with a modern Material Design 3 UI. Built a TensorFlow Lite recommendation engine for product suggestions based on browsing patterns and purchase history.',
              },
              { id: 'bluepen', color: 'border-accent', title: 'Software Developer', date: 'Nov 2020 – May 2021', company: 'Bluepen.co.in', loc: 'Mumbai, India',
                pills: ['Flutter', 'Flask', 'MongoDB', 'TensorFlow', 'Razorpay'],
                bullets: [
                  'End-to-end UI development with TensorFlow-powered real-time object detection',
                  'Created microservice-based backend using Flask with MongoDB',
                  'Integrated Razorpay payments gateway to enable a subscription model',
                ],
                detail: 'Built an EdTech platform with real-time AR-based object detection for interactive learning. Flask microservices handled user auth, content delivery, and payment processing via Razorpay webhooks.',
              },
            ].map((exp) => (
              <div key={exp.id} className={`border-l-2 ${exp.color} pl-6`}>
                <div
                  className="cursor-pointer"
                  onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <span className="text-text-muted text-sm">{exp.date}</span>
                  </div>
                  <p className="text-primary mb-1">{exp.company}</p>
                  <p className="text-sm text-text-muted mb-3">{exp.loc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {exp.pills.map((p) => <Pill key={p}>{p}</Pill>)}
                </div>
                <ul className="space-y-2 text-text-muted text-sm">
                  {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <AnimatePresence>
                  {expandedExp === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm text-text-muted bg-surface2 border border-border rounded-lg p-4 italic">
                        {exp.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                  className="mt-2 text-xs text-primary hover:underline cursor-pointer"
                >
                  {expandedExp === exp.id ? 'Show less' : 'Show more'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <Section id="projects" className="bg-dots py-20 px-6 bg-surface overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-heading">Featured Projects</h2>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PROJECT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setProjectFilter(tag)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors cursor-pointer ${
                  projectFilter === tag
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-text-muted hover:border-primary/50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {[
              { tag: 'AI/ML', title: 'AI-Powered Job Search System', link: 'https://github.com/dhvl15/job-search', linkLabel: 'github.com/dhvl15/job-search',
                desc: 'Personal AI-powered automation system for targeted, thoughtful job applications',
                pills: ['Claude Code', 'Python', 'Obsidian', 'Markdown Skills', 'Git', 'Dataview'],
                bullets: [
                  'Architected a composable skill system with 8 modular markdown-based skills enabling focused context loading per task',
                  'Implemented structured scoring rubric with weighted dimensions, gate conditions, and role archetype classification',
                  'Built URL inbox capture pipeline with one-hotkey job URL queuing and batch evaluation processing',
                  'Integrated Kanban-based application tracking with analytics dashboards for pipeline health and skill gap analysis',
                ],
              },
              { tag: 'Security', title: 'OpenClaw Multi-Agent Pentesting Framework', link: null, linkLabel: 'Research Prototype',
                desc: 'Autonomous security testing framework with dynamic agent spawning and persistent memory',
                pills: ['Python', 'OpenClaw', 'Docker', 'Nmap', 'Nuclei', 'LLMs'],
                bullets: [
                  'Designed and prototyped an autonomous multi-agent pentesting framework using OpenClaw',
                  'Implemented dynamic agent spawning with reusable skills and Docker sandboxing',
                  'Built persistent memory system for agent state management across security testing sessions',
                  'Integrated security tools (Nmap, Nuclei) for automated vulnerability scanning and assessment',
                ],
              },
              { tag: 'AI/ML', title: 'WordOut — LLM Career Platform', link: null, linkLabel: 'Jan 2025 – Sep 2025',
                desc: 'Platform helping candidates showcase communication skills through portfolio-style videos for hiring teams',
                pills: ['LLMs', 'Firebase', 'Multi-Agent', 'LangChain', 'Python'],
                bullets: [
                  'Built LLM features for candidate communication skills showcase platform',
                  'Prototyped multi-agent resume & career-development workflows (profile ingest → critique → rewrite → video pitch prompts)',
                  'Hosted and orchestrated LLM services on Firebase with auth, data flow, and prompt/version management',
                  'Partnered in rapid product brainstorming and UX experiments',
                ],
              },
            ]
              .filter((p) => projectFilter === 'All' || p.tag === projectFilter)
              .map((proj) => (
                <motion.div
                  key={proj.title}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-surface2 border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{proj.title}</h3>
                    {proj.link
                      ? <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">{proj.linkLabel}</a>
                      : <span className="text-primary text-sm">{proj.linkLabel}</span>
                    }
                  </div>
                  <p className="text-sm text-text-muted mb-3">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.pills.map((p) => <Pill key={p}>{p}</Pill>)}
                  </div>
                  <ul className="space-y-2 text-text-muted text-sm">
                    {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </motion.div>
              ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <Section id="education" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-heading">Education</h2>

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
              <h3 className="text-xl font-semibold">Diploma in Computer Engineering</h3>
              <p className="text-primary">Shri Bhahubhai Mafatlal Polytechnic</p>
              <p className="text-sm text-text-muted">Mumbai, India · July 2014 – June 2017</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONFERENCES ═══════════ */}
      <Section id="conferences" className="py-20 px-6 bg-surface">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 font-heading">Conferences</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 border border-accent/30 rounded-lg bg-surface2 text-center relative">
              <span className="absolute -top-2 right-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-accent text-background rounded-full">Upcoming</span>
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
          <h2 className="text-3xl font-bold mb-8 font-heading">Continuous Learning</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border border-border rounded-lg bg-surface">
              <h3 className="text-lg font-semibold mb-3 text-primary">Kaggle x Google</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li>5-Day Generative AI Intensive — completed</li>
                <li>5-Day AI Agents Intensive — in progress</li>
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
          <h2 className="text-3xl font-bold mb-8 font-heading">GitHub Activity</h2>
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
      <Section id="contact" className="bg-glow py-20 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Let's Connect</h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            I'm open to opportunities in Data Engineering, Data Science, and AI Engineering roles.
            Based in Vancouver, BC — open to remote, hybrid, and on-site.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
            <a href="mailto:dhaval.jariwala98@gmail.com" aria-label="Email" className="p-3 rounded-full border border-border bg-surface hover:bg-surface2 hover:border-primary/50 transition-colors">
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
            <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full border border-border bg-surface hover:bg-surface2 hover:border-primary/50 transition-colors">
              <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
            <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full border border-border bg-surface hover:bg-surface2 hover:border-primary/50 transition-colors">
              <svg className="w-5 h-5 text-text-muted" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <button onClick={() => setResumeOpen(true)} className="px-6 py-3 bg-surface border border-primary/30 rounded-lg hover:bg-surface2 hover:border-primary/50 text-primary transition-colors cursor-pointer">
              Resume
            </button>
          </div>
        </div>
      </Section>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} Dhaval Jariwala. Built with React, Tailwind CSS & Framer Motion.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
