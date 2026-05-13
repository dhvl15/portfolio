import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">DJ</span>
            <div className="flex gap-6 text-sm">
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#conferences" className="hover:text-primary transition-colors">Conferences</a>
              <a href="#learning" className="hover:text-primary transition-colors">Learning</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Dhaval Jariwala</h1>
          <p className="text-xl md:text-2xl text-textMuted mb-2">Data Engineer · Data Scientist · AI Engineer</p>
          <p className="text-textMuted mb-8">Vancouver, BC, Canada</p>
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-surface border border-border rounded hover:bg-surface2 transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-surface border border-border rounded hover:bg-surface2 transition-colors">
              LinkedIn
            </a>
          </div>
          <a href="#about" className="inline-block animate-bounce">
            <svg className="w-6 h-6 mx-auto text-textMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="space-y-4 text-textMuted leading-relaxed">
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
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Languages</h3>
              <ul className="space-y-2 text-textMuted">
                <li>Python (Proficient)</li>
                <li>SQL (Proficient)</li>
                <li>R (Familiar)</li>
                <li>Java (Familiar)</li>
                <li>Dart (Familiar)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Data Engineering</h3>
              <ul className="space-y-2 text-textMuted">
                <li>Apache Spark / PySpark (Familiar)</li>
                <li>Apache Airflow (Familiar)</li>
                <li>ETL pipeline design (Proficient)</li>
                <li>Azure Synapse / Data Lakes (Proficient)</li>
                <li>SSIS (Proficient)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Cloud & Infrastructure</h3>
              <ul className="space-y-2 text-textMuted">
                <li>Azure (Synapse, Data Lake, Power BI) (Proficient)</li>
                <li>AWS (Exposure)</li>
                <li>Docker (Familiar)</li>
                <li>Kubernetes (Exposure)</li>
                <li>CI/CD (GitHub Actions, Codemagic) (Familiar)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Machine Learning & AI</h3>
              <ul className="space-y-2 text-textMuted">
                <li>Scikit-learn (Familiar)</li>
                <li>PyTorch (Familiar)</li>
                <li>TensorFlow (Familiar)</li>
                <li>LLMs / prompt engineering (Proficient)</li>
                <li>LangChain (Proficient)</li>
                <li>Agent orchestration (Proficient)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Databases</h3>
              <ul className="space-y-2 text-textMuted">
                <li>SQL Server (Proficient)</li>
                <li>PostgreSQL (Familiar)</li>
                <li>MongoDB (Familiar)</li>
                <li>SQLite (Familiar)</li>
                <li>Snowflake (Exposure)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Web & Mobile</h3>
              <ul className="space-y-2 text-textMuted">
                <li>Flask (Familiar)</li>
                <li>Streamlit (Proficient)</li>
                <li>Flutter (Proficient)</li>
                <li>Firebase (Familiar)</li>
                <li>REST API design (Familiar)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Data Scientist, R&D</h3>
                <span className="text-textMuted text-sm">Feb 2025 – Present</span>
              </div>
              <p className="text-primary mb-2">Wisr AI</p>
              <p className="text-sm text-textMuted mb-3">Vancouver, BC</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Built ETL pipelines and backend data services connecting PostgreSQL to operationalize threat intelligence data</li>
                <li>• Built analytical models to identify CVE similarity patterns and analyze KEV conversion timelines</li>
                <li>• Designed and prototyped an autonomous multi-agent pentesting framework using OpenClaw with dynamic agent spawning</li>
              </ul>
            </div>

            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Data Engineer, CO-OP</h3>
                <span className="text-textMuted text-sm">Jan 2024 – Sep 2024</span>
              </div>
              <p className="text-primary mb-2">TransLink</p>
              <p className="text-sm text-textMuted mb-3">Vancouver, BC</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Supported migrating on-prem SQL Server databases to Azure Data Lakes using SSIS and Azure Synapse</li>
                <li>• Created interactive Power BI dashboards for real-time monitoring and detailed analysis of device events</li>
                <li>• Automated fare infraction dispute reporting by building ETL pipelines from Excel to SQL Server</li>
              </ul>
            </div>

            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Flutter Developer</h3>
                <span className="text-textMuted text-sm">Jun 2021 – Jul 2022</span>
              </div>
              <p className="text-primary mb-2">Zaveribazaar.co.in</p>
              <p className="text-sm text-textMuted mb-3">Mumbai, India</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Led UI revamp using Flutter, improving user experience and engagement (30% increase in daily active users)</li>
                <li>• Integrated REST APIs to develop features such as Expense Manager and Content-Based Recommendation System</li>
                <li>• Deployed on Android and iOS with a CI/CD pipeline using Codemagic</li>
              </ul>
            </div>

            <div className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Software Developer</h3>
                <span className="text-textMuted text-sm">Nov 2020 – May 2021</span>
              </div>
              <p className="text-primary mb-2">Bluepen.co.in</p>
              <p className="text-sm text-textMuted mb-3">Mumbai, India</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• End-to-end UI development using Flutter with TensorFlow-powered real-time object detection</li>
                <li>• Created microservice-based backend using Flask to serve APIs for account management and data from MongoDB</li>
                <li>• Integrated Razorpay payments gateway to enable a subscription model</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          
          <div className="space-y-6">
            <div className="bg-surface2 border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Job Search System</h3>
              <p className="text-primary text-sm mb-4">github.com/dhvl15/job-search</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Designed and built a personal AI-powered job search automation system using Claude Code as the automation engine and Obsidian as the command center</li>
                <li>• Architected a composable skill system with 8 modular markdown-based skills enabling focused context loading per task</li>
                <li>• Implemented a structured scoring rubric with weighted dimensions, gate conditions, and role archetype classification</li>
                <li>• Built URL inbox capture pipeline using Obsidian QuickAdd for one-hotkey job URL queuing with batch evaluation processing</li>
                <li>• Integrated Kanban-based application tracking with Dataview-powered analytics dashboards for pipeline health and skill gap analysis</li>
              </ul>
            </div>

            <div className="bg-surface2 border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">OpenClaw Autonomous Multi-Agent Pentesting Framework</h3>
              <p className="text-primary text-sm mb-4">Wisr AI · Research Prototype</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Designed and prototyped an autonomous multi-agent pentesting framework using OpenClaw</li>
                <li>• Implemented dynamic agent spawning with reusable skills and Docker sandboxing</li>
                <li>• Built persistent memory system for agent state management across security testing sessions</li>
                <li>• Integrated security tools (Nmap, Nuclei) for automated vulnerability scanning and assessment</li>
                <li>• Created research-grade prototype demonstrating potential for automated security analysis workflows</li>
              </ul>
            </div>

            <div className="bg-surface2 border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">WordOut</h3>
              <p className="text-primary text-sm mb-4">Data Scientist · Jan 2025 – Sep 2025</p>
              <ul className="space-y-2 text-textMuted text-sm">
                <li>• Built LLM features for a platform that helps candidates showcase communication skills through portfolio-style videos for hiring teams</li>
                <li>• Prototyped multi-agent resume & career-development workflows (profile ingest → critique → rewrite → video pitch prompts → recruiter summary)</li>
                <li>• Hosted and orchestrated LLM services on Firebase, handling auth, data flow, and prompt/version management</li>
                <li>• Partnered in rapid product brainstorming and UX experiments to improve candidate storytelling and hiring-manager signal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          
          <div className="space-y-6">
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Master of Science, Data Analytics Engineering</h3>
              <p className="text-primary">Northeastern University, College of Engineering</p>
              <p className="text-sm text-textMuted">Vancouver, BC · Sep 2022 – Dec 2024</p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Bachelor of Engineering, Computer Engineering</h3>
              <p className="text-primary">University of Mumbai, Shah & Anchor Kutchhi Engineering College</p>
              <p className="text-sm text-textMuted">Mumbai, India · Aug 2017 – Oct 2020</p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Diploma, Computer Engineering</h3>
              <p className="text-primary">Shri Bhagubhai Mafatlal Polytechnic</p>
              <p className="text-sm text-textMuted">Mumbai, India · Aug 2014 – Jun 2017</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conferences Section */}
      <section id="conferences" className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Conferences</h2>
          
          <div className="space-y-6">
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Web Summit 2026</h3>
              <p className="text-sm text-textMuted">Vancouver, BC</p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">All In 2025</h3>
              <p className="text-sm text-textMuted">Montreal, QC</p>
            </div>

            <div className="border-l-2 border-border pl-6">
              <h3 className="text-xl font-semibold">Web Summit 2025</h3>
              <p className="text-sm text-textMuted">Vancouver, BC</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-surface2 border border-border rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Conference Booth Presentations</h3>
            <p className="text-textMuted text-sm leading-relaxed">
              Represented Wisr AI at booth for both 2025 conferences (Web Summit Vancouver, All In Montreal), demoing the threat intelligence platform to attendees ranging from technical practitioners to business executives. Explained complex cybersecurity concepts in accessible language for non-technical audiences, including CEOs, CTOs, and business owners. Gathered market feedback and product insights from hundreds of conversations.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section id="learning" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Continuous Learning</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Books</h3>
              <ul className="space-y-2 text-textMuted">
                <li>• Agentic Design Patterns — Antonio Gulli (in progress)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Kaggle × Google</h3>
              <ul className="space-y-2 text-textMuted">
                <li>• 5-Day Generative AI Intensive — completed</li>
                <li>• 5-Day AI Agents Intensive — in progress</li>
                <li>• 5-Day Intensive Vibe Coding — planned</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Claude Academy</h3>
              <ul className="space-y-2 text-textMuted">
                <li>• AI Fluency — completed</li>
                <li>• Claude Code 101 — completed</li>
                <li>• Claude Code in Action — completed</li>
                <li>• Subagents, MCP — completed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Other Courses</h3>
              <ul className="space-y-2 text-textMuted">
                <li>• Apache Airflow 101 & DAG Authoring — in progress</li>
                <li>• Databricks Foundations — in progress</li>
                <li>• AWS Cloud Practitioner — in progress</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-textMuted mb-8">
            I'm open to opportunities in Data Engineering, Data Science, and AI Engineering roles.
            Based in Vancouver, BC, open to remote, hybrid, and on-site positions.
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <a href="mailto:dhaval.jariwala98@gmail.com" className="px-6 py-3 bg-surface2 border border-border rounded hover:bg-surface transition-colors">
              Email
            </a>
            <a href="https://github.com/dhvl15" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/dhavaljariwala15/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface2 border border-border rounded hover:bg-surface transition-colors">
              LinkedIn
            </a>
          </div>
          <p className="text-sm text-textMuted">dhaval.jariwala98@gmail.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-sm text-textMuted">
          <p>© 2025 Dhaval Jariwala. Built with React & TailwindCSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
