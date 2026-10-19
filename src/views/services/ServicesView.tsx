import React, { useState } from 'react';
import {
  Code,
  Globe,
  Smartphone,
  Sparkles,
  Palette,
  Layers,
  Zap,
  Cloud,
  RefreshCw,
  Cpu,
  Rocket,
  Wrench,
  Compass,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Send,
  MessageSquare,
  ShieldCheck,
  Search,
  ExternalLink,
  Laptop,
  Database,
  Lock,
  Flame,
  Star,
  Users,
  Clock
} from 'lucide-react';
import { Footer } from '../../components/common/Footer';
import { GlobalEcosystemSwitcher } from '../../components/common/GlobalEcosystemSwitcher';
import { InteractiveCosmos } from '../../components/common/InteractiveCosmos';
import { SupportedLanguage } from '../../services/i18n';
import { SITE, contactMailto, hasContactEmail } from '../../config/site';

interface ServicesViewProps {
  currentLanguage?: SupportedLanguage;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth?: (view: 'join-choice' | 'creator-signup' | 'client-signup' | 'login') => void;
  onOpenCommandPalette?: () => void;
}

export interface ServiceArea {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  category: 'engineering' | 'ai' | 'design' | 'strategy';
  icon: any;
  problem: string;
  approach: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
}

export const CREZORA_SERVICES_14: ServiceArea[] = [
  {
    id: 'software-development',
    number: '01',
    title: 'Software Development',
    shortDesc: 'End-to-end full-stack systems engineered for resilient scale, uptime, and high concurrency.',
    category: 'engineering',
    icon: Code,
    problem: 'Off-the-shelf software fails when your operations scale or have unique workflow requirements.',
    approach: 'We architect domain-driven, modular backends and clean frontends using typed languages, microservices, and continuous test coverage.',
    deliverables: ['Custom Web Architecture', 'REST & GraphQL APIs', 'Event-Driven Microservices', 'Enterprise RBAC & Auditing'],
    techStack: ['TypeScript', 'Node.js / Go', 'PostgreSQL', 'Docker', 'Redis', 'GraphQL'],
    idealFor: 'Mid-market & enterprise companies replacing fragmented legacy software.'
  },
  {
    id: 'web-applications',
    number: '02',
    title: 'Web Applications',
    shortDesc: 'Blazing-fast, responsive web apps with Linear-level fluid interactions and sub-second loads.',
    category: 'engineering',
    icon: Globe,
    problem: 'Slow, clunky web experiences destroy conversion and user retention.',
    approach: 'We treat web apps like high-performance desktop software—client-side state caching, optimistic UI, edge rendering, and smooth 60fps animations.',
    deliverables: ['Responsive Web Apps', 'Real-time Dashboards', 'PWAs with Offline Support', 'SEO & Performance Audits'],
    techStack: ['React 18 / Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'WebSockets', 'Zustand'],
    idealFor: 'Product companies and SaaS platforms wanting Apple/Linear-grade interaction speed.'
  },
  {
    id: 'mobile-applications',
    number: '03',
    title: 'Mobile Applications',
    shortDesc: 'Native-feel iOS and Android applications with offline-first sync and silky gesture physics.',
    category: 'engineering',
    icon: Smartphone,
    problem: 'Cross-platform mobile apps often feel sluggish, battery-draining, and alien on device hardware.',
    approach: 'We craft native iOS (Swift/SwiftUI) and React Native / Flutter apps with deep OS integration, background tasking, and biometric security.',
    deliverables: ['iOS & Android App Store Releases', 'Offline-First Data Sync', 'Push Notification Architecture', 'In-App Subscriptions (StoreKit / Play Billing)'],
    techStack: ['React Native', 'Flutter', 'SwiftUI', 'Kotlin', 'SQLite / WatermelonDB', 'Fastlane'],
    idealFor: 'B2C consumer products and field-force enterprise mobile workforces.'
  },
  {
    id: 'ai-integration-agents',
    number: '04',
    title: 'AI Integration & Agents',
    shortDesc: 'Autonomous LLM agents, private RAG pipelines, voice companions, and fine-tuned embeddings.',
    category: 'ai',
    icon: Sparkles,
    problem: 'Generic chat wrappers offer zero proprietary advantage and hallucinate on domain-specific facts.',
    approach: 'We build sovereign AI pipelines: proprietary vector embeddings, hybrid semantic search, custom guardrails, and autonomous agentic workflows.',
    deliverables: ['Domain RAG Search Systems', 'Multi-Agent Tool Use Systems', 'Real-time Voice/Speech AI', 'Custom LLM Fine-Tuning & Evaluation'],
    techStack: ['Python', 'LangChain / LlamaIndex', 'Qdrant / Pinecone', 'Gemini / Claude / OpenAI API', 'Ollama / Local LLMs', 'Whisper / ElevenLabs'],
    idealFor: 'Teams wanting AI embedded deeply into their workflow rather than an external gimmick.'
  },
  {
    id: 'ui-ux-product-design',
    number: '05',
    title: 'UI/UX & Product Design',
    shortDesc: 'Design systems, micro-interactions, information architecture, and obsessive usability testing.',
    category: 'design',
    icon: Palette,
    problem: 'Products built without rigorous design architecture suffer high user confusion and churn.',
    approach: 'We build comprehensive Figma design tokens, high-fidelity clickable prototypes, and test user mental models before touching a line of production code.',
    deliverables: ['Figma Design System Tokens', 'Clickable Hi-Fi Prototypes', 'Information Architecture Maps', 'User Journey Testing & Heuristics'],
    techStack: ['Figma', 'Framer', 'Protopie', 'Tokens Studio', 'Zeroheight', 'Accessibility WCAG AAA'],
    idealFor: 'New ventures needing an unforgettable product identity and intuitive workflows.'
  },
  {
    id: 'creative-technology',
    number: '06',
    title: 'Creative Technology',
    shortDesc: '3D WebGL interactive canvas, generative audio, WebGPU shaders, and immersive spatial portals.',
    category: 'design',
    icon: Layers,
    problem: 'Standard templates make your brand indistinguishable from ten thousand competitors.',
    approach: 'We push the frontier of browser graphics: real-time physics shaders, audio synthesis, camera vision tracking, and three-dimensional web experiences.',
    deliverables: ['Three.js / WebGL 3D Experiences', 'Interactive Canvas Visualizations', 'Generative Art Engines', 'Spatial & WebXR Micro-sites'],
    techStack: ['Three.js', 'GLSL Shaders', 'Web Audio API', 'GSAP', 'Pixi.js', 'Canvas API'],
    idealFor: 'Luxury brands, studios, entertainment franchises, and boundary-pushing tech products.'
  },
  {
    id: 'automation-workflows',
    number: '07',
    title: 'Automation & Workflows',
    shortDesc: 'Zero-touch operational pipelines, automated reconciliation, and webhook-driven orchestration.',
    category: 'engineering',
    icon: Zap,
    problem: 'Knowledge workers waste 40% of their day manually copying data across disparate platforms.',
    approach: 'We build resilient background pipelines that link ERPs, CRMs, payment gateways, and databases with error retries, dead-letter queues, and Slack alerts.',
    deliverables: ['Autonomous Workflow Pipelines', 'Custom Webhook Connectors', 'Data Extraction & OCR Bots', 'Real-time Anomaly Slack Notifications'],
    techStack: ['n8n', 'Temporal.io', 'Zapier / Make', 'BullMQ / Redis', 'Python Celery', 'AWS Lambda'],
    idealFor: 'Fast-scaling operations drowned in manual administrative tasks.'
  },
  {
    id: 'cloud-infrastructure',
    number: '08',
    title: 'Cloud Solutions & Infrastructure',
    shortDesc: 'Cloud-native infrastructure with Terraform, Kubernetes, automated CI/CD, and compliance-ready architecture.',
    category: 'engineering',
    icon: Cloud,
    problem: 'Unoptimized cloud architecture leads to runaway AWS bills, surprise downtime, and security holes.',
    approach: 'We design Infrastructure as Code (IaC), zero-trust networking, multi-region failover, and automated autoscaling triggers.',
    deliverables: ['Terraform IaC Repositories', 'Zero-Downtime GitHub Actions CI/CD', 'Multi-Region Kubernetes Deployments', 'Cloud Cost Optimization Audits'],
    techStack: ['AWS', 'GCP', 'Terraform', 'Kubernetes / Helm', 'GitHub Actions', 'Cloudflare Workers'],
    idealFor: 'Startups preparing for enterprise compliance reviews or high-traffic product launches.'
  },
  {
    id: 'digital-transformation',
    number: '09',
    title: 'Digital Transformation',
    shortDesc: 'Modernizing legacy paper, Excel, or antiquated on-prem monoliths into modern cloud systems.',
    category: 'strategy',
    icon: RefreshCw,
    problem: 'Established businesses are held hostage by 15-year-old monolithic software nobody knows how to modify.',
    approach: 'We use the strangler fig pattern: incrementally carving out micro-services without disrupting daily operational cash flow.',
    deliverables: ['Legacy Audit & Strangler Roadmap', 'Data Migration Pipelines', 'Modern Cloud Dashboard', 'Internal Staff Training & Documentation'],
    techStack: ['Enterprise SQL Migration', 'REST Adapters', 'Next.js Admin Panels', 'Auth0 / Okta SSO'],
    idealFor: 'Manufacturing, logistics, supply chain, and retail enterprises modernizing core software.'
  },
  {
    id: 'custom-software',
    number: '10',
    title: 'Custom Software Solutions',
    shortDesc: 'Tailor-made internal tools, proprietary ERPs, and bespoke business operating engines.',
    category: 'engineering',
    icon: Cpu,
    problem: 'SaaS monthly subscription sprawl with software that still only does 60% of what your team needs.',
    approach: 'We build sovereign internal operating systems that you own 100%—no per-seat monthly license fees, built exactly to your team’s playbook.',
    deliverables: ['Bespoke Internal Operating System', 'Role-Based Granular Permissions', 'Custom Reporting & Exports', '100% Source Code IP Ownership'],
    techStack: ['React', 'NestJS', 'PostgreSQL', 'Retool / Custom UI', 'Tailwind', 'Docker'],
    idealFor: 'Companies whose competitive advantage lies in proprietary operational processes.'
  },
  {
    id: 'mvp-development',
    number: '11',
    title: 'MVP Development for Startups',
    shortDesc: 'From validated concept to production-grade launch in 6 to 8 weeks, ready for seed funding.',
    category: 'strategy',
    icon: Rocket,
    problem: 'Startups waste 9 months and ₹30L+ with sluggish agencies before getting their first user test.',
    approach: 'We strip every idea to its sharpest value proposition, execute in high-velocity agile sprints, and deliver a production-ready product with live payments and analytics.',
    deliverables: ['Working Production MVP (Web + Mobile)', 'Payment & Billing Gateways', 'User Auth & Onboarding Flow', 'Mixpanel / PostHog Analytics Setup'],
    techStack: ['Next.js / Supabase / Prisma', 'Stripe / Razorpay', 'Tailwind CSS', 'Vercel / AWS', 'PostHog'],
    idealFor: 'Funded founders and domain experts launching high-velocity new software ventures.'
  },
  {
    id: 'prototype-to-production',
    number: '12',
    title: 'Prototype to Production',
    shortDesc: 'Hardening fragile hackathon demos or prototype codebases into battle-tested production systems.',
    category: 'engineering',
    icon: Wrench,
    problem: 'Founders test a scrappy prototype that attracts initial traction, but the code begins breaking under 100 concurrent users.',
    approach: 'We refactor spaghetti code, normalize databases, eliminate memory leaks, add comprehensive integration tests, and establish staging/production environments.',
    deliverables: ['Codebase Architecture Refactoring', 'Database Indexing & Normalization', 'Automated Test Coverage', 'Production Monitoring & Error Sentry'],
    techStack: ['TypeScript', 'Vitest / Playwright', 'Sentry', 'PostgreSQL Indexing', 'Docker Compose'],
    idealFor: 'Founders with a validated prototype who now need to scale reliably without crashing.'
  },
  {
    id: 'technical-consulting',
    number: '13',
    title: 'Technical Consulting & Architecture',
    shortDesc: 'Fractional CTO advisory, architecture reviews, vendor due diligence, and scalability roadmaps.',
    category: 'strategy',
    icon: Compass,
    problem: 'Non-technical founders and executives make fatal technology decisions that cost millions later.',
    approach: 'Our senior architects review PRDs, audit third-party codebases, advise on build vs. buy, and structure tech roadmaps that align with business EBITDA.',
    deliverables: ['Architecture Blueprint Report', 'Tech Debt & Vulnerability Audit', 'Vendor / Agency Code Evaluation', 'Hiring Framework for Internal Engineers'],
    techStack: ['System Architecture Diagrams', 'Threat Modeling', 'Cloud Cost Benchmarking', 'RFC Specifications'],
    idealFor: 'Investors, non-technical founders, and leadership teams making high-stakes tech bets.'
  },
  {
    id: 'growth-engineering',
    number: '14',
    title: 'Growth Engineering',
    shortDesc: 'Data-driven funnel optimization, viral loops, algorithmic referral mechanics, and conversion lifts.',
    category: 'strategy',
    icon: TrendingUp,
    problem: 'Great products stall because user acquisition and product mechanics operate in isolated silos.',
    approach: 'We engineer growth into the product itself: frictionless onboarding, programmatic SEO pages, viral invite mechanics, and automated reactivation emails.',
    deliverables: ['Automated Onboarding Experimentation', 'Programmatic SEO Engines', 'Gamified Referral Mechanics', 'Custom Retention Funnel Dashboards'],
    techStack: ['Next.js SSG / ISR', 'Segment / PostHog', 'Resend / Customer.io', 'A/B Testing Harness'],
    idealFor: 'Growth-stage companies wanting systematic, reproducible user acquisition.'
  }
];

export const PROCESS_STEPS_7 = [
  {
    step: '01',
    name: 'DISCOVER',
    headline: 'Listen, analyze, and clarify the core challenge.',
    desc: 'We immerse ourselves in your domain. We interview stakeholders, dissect existing bottlenecks, evaluate competitor landscapes, and extract the real underlying problem rather than superficial symptoms.',
    output: 'Executive Problem Brief & Technical Feasibility Matrix'
  },
  {
    step: '02',
    name: 'DEFINE',
    headline: 'Scope, product roadmap, and system architecture.',
    desc: 'We translate ambiguity into crystal-clear engineering specifications. We establish technical stacks, database schemas, API boundaries, security standards, and sprint milestones.',
    output: 'Architecture Blueprint & Fixed-Timeline Milestone Roadmap'
  },
  {
    step: '03',
    name: 'DESIGN',
    headline: 'Wireframes, design systems, and tactile prototypes.',
    desc: 'Every screen is conceived with Apple-level intention. We build modular Figma design tokens, fluid micro-interactions, and high-fidelity clickable models before writing a single line of backend logic.',
    output: 'Interactive Design Prototype & Tokenized Design System'
  },
  {
    step: '04',
    name: 'BUILD',
    headline: 'Agile sprints, clean code, and modular architecture.',
    desc: 'We execute in two-week transparent sprints. You receive staging previews, automated test suites, and clean, documented source code that your future team can build upon without friction.',
    output: 'Weekly Staging Deploys & Clean Production-Ready Codebase'
  },
  {
    step: '05',
    name: 'TEST',
    headline: 'Quality assurance, penetration testing, and load stress.',
    desc: 'We rigorously stress test under real-world conditions: sub-second latency targets, edge-case validation, cross-device responsiveness, security audits, and peak load concurrency simulations.',
    output: 'Comprehensive QA Report & Performance Benchmark Sign-off'
  },
  {
    step: '06',
    name: 'LAUNCH',
    headline: 'Deployment, observability, and zero-downtime release.',
    desc: 'Go-live is engineered for zero panic. We configure multi-region cloud infrastructure, rollback triggers, real-time Sentry observability, and automated CDN caching.',
    output: 'Public Production Release & Live Real-Time Telemetry Dashboard'
  },
  {
    step: '07',
    name: 'EVOLVE',
    headline: 'Continuous iteration, feature expansion, and dedicated SLA.',
    desc: 'Shipping is just day one. We analyze real user telemetry, optimize conversion funnels, ship iterative feature updates, and provide high-availability infrastructure maintenance.',
    output: 'Post-Launch Optimization & Dedicated Monthly Engineering SLA'
  }
];

export const ServicesView: React.FC<ServicesViewProps> = ({
  currentLanguage = 'en',
  onNavigate,
  onOpenAuth,
  onOpenCommandPalette
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'engineering' | 'ai' | 'design' | 'strategy'>('all');
  const [activeServiceId, setActiveServiceId] = useState<string>(CREZORA_SERVICES_14[0].id);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);

  // Consultation / Project brief modal
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Web & Mobile Application',
    budget: '$10k - $25k (₹8L - ₹20L)',
    timeline: '2 - 3 Months',
    message: ''
  });
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const activeService = CREZORA_SERVICES_14.find((s) => s.id === activeServiceId) || CREZORA_SERVICES_14[0];

  const filteredServices = CREZORA_SERVICES_14.filter(
    (s) => selectedCategory === 'all' || s.category === selectedCategory
  );

  const handleOpenConsult = (serviceTitle?: string) => {
    if (serviceTitle) {
      setConsultForm((prev) => ({ ...prev, projectType: serviceTitle }));
    }
    setIsConsultModalOpen(true);
  };

  const handleSubmitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasContactEmail()) return;

    const body = [
      `Name: ${consultForm.name}`,
      `Email: ${consultForm.email}`,
      consultForm.company ? `Company: ${consultForm.company}` : '',
      `Discipline: ${consultForm.projectType}`,
      `Budget: ${consultForm.budget}`,
      `Timeline: ${consultForm.timeline}`,
      '',
      'Project summary:',
      consultForm.message,
    ]
      .filter(Boolean)
      .join('\n');

    window.location.href = contactMailto(`CREZORA project brief — ${consultForm.projectType}`, body);
    setConsultSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200 relative overflow-x-hidden">
      {/* Background Interactive Cosmic Canvas */}
      <InteractiveCosmos accent="crezora" particleCount={60} />

      {/* ═══ 1. GLOBAL STICKY HEADER ══════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#050507]/90 backdrop-blur-xl border-b border-slate-800/80 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => onNavigate('crezora')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                    CREZORA<span className="text-purple-400">.CO</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                    SERVICES
                  </span>
                </div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-slate-400 leading-none">
                  Technology & Product Studio
                </span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <button onClick={() => onNavigate('crezora')} className="hover:text-white transition-colors cursor-pointer">
              Ecosystem
            </button>
            <a href="#services" className="text-purple-400 hover:text-white transition-colors">
              Services
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Process
            </a>
            <a href="#capabilities" className="hover:text-white transition-colors">
              Capabilities
            </a>
            <button onClick={() => onNavigate('labs')} className="hover:text-cyan-300 transition-colors cursor-pointer">
              Labs
            </button>
            <button onClick={() => onNavigate('stories')} className="hover:text-purple-300 transition-colors cursor-pointer">
              Stories
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <GlobalEcosystemSwitcher currentView="crezora" onNavigate={onNavigate} />

            <button
              onClick={() => handleOpenConsult()}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ 2. HERO SECTION ══════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-left">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-300 text-xs font-mono tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            <span>CREZORA STUDIO & CONSULTING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] uppercase">
            WE DESIGN, BUILD & SCALE <br />
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">
              DIGITAL PRODUCTS
            </span> <br />
            THAT SHAPE INDUSTRIES.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
            From zero-to-one startup MVPs to sovereign enterprise platforms. We combine world-class
            design aesthetics, robust system engineering, and cutting-edge AI architecture to deliver
            products that drive meaningful commercial and cultural impact.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleOpenConsult()}
              className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>WORK WITH CREZORA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
            >
              EXPLORE 14 CAPABILITIES ↓
            </a>
          </div>

          {/* Client Targets Grid */}
          <div className="pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono text-slate-400">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-purple-400 font-bold block mb-1">01 / STARTUPS</span>
              <span>Fast 6-8 week MVP to market</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-indigo-400 font-bold block mb-1">02 / BRANDS</span>
              <span>Bespoke creative technology</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-pink-400 font-bold block mb-1">03 / CREATORS</span>
              <span>Sovereign storefronts & apps</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">04 / ENTERPRISES</span>
              <span>Cloud & AI modernization</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-amber-400 font-bold block mb-1">05 / TRADITIONAL</span>
              <span>End-to-end digitizing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. THE 14 SERVICES EXPLORER ═════════════════════════════════ */}
      <section id="services" className="relative z-10 py-20 bg-[#08080E]/90 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-bold">
                PRACTICE AREAS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mt-1">
                OUR 14 SERVICE DISCIPLINES
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-light mt-2 max-w-2xl">
                Every service addresses a concrete business bottleneck with battle-tested technical
                architecture and transparent deliverables.
              </p>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
              {[
                { id: 'all', label: 'All (14)' },
                { id: 'engineering', label: 'Engineering' },
                { id: 'ai', label: 'AI & Data' },
                { id: 'design', label: 'Design' },
                { id: 'strategy', label: 'Strategy' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive 2-Column Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left list of service buttons */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredServices.map((svc) => {
                const Icon = svc.icon;
                const isSelected = svc.id === activeServiceId;
                return (
                  <button
                    key={svc.id}
                    onClick={() => setActiveServiceId(svc.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-900/20'
                        : 'bg-slate-900/40 border-slate-800/70 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-purple-400 font-bold">{svc.number}</span>
                          <span className="text-sm font-bold text-white">{svc.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{svc.shortDesc}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-purple-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Deep-Dive Card */}
            <div className="lg:col-span-7 bg-[#0C0C14] border border-slate-800/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      SERVICE {activeService.number}
                    </span>
                    <span className="text-xs font-mono uppercase text-slate-400">
                      {activeService.category}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeService.title}
                  </h3>
                </div>
                <button
                  onClick={() => handleOpenConsult(activeService.title)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <span>Inquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Problem vs Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/30 space-y-1.5">
                  <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
                    The Problem
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeService.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-1.5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                    Our Solution & Approach
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeService.approach}
                  </p>
                </div>
              </div>

              {/* What We Deliver */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  What We Deliver
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.deliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack & Capabilities */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Core Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeService.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-purple-300 text-xs font-mono border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ideal For */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>
                  <strong className="text-slate-300">Ideal For:</strong> {activeService.idealFor}
                </span>
                <button
                  onClick={() => handleOpenConsult(activeService.title)}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 4. THE 7-STEP INTERACTIVE PROCESS ═══════════════════════════ */}
      <section id="process" className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 font-bold">
            HOW WE OPERATE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            OUR 7-STEP PRODUCT ENGINE
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light">
            No endless meetings or opaque black boxes. A proven, transparent execution framework
            designed to take ideas from whiteboard to high-uptime production.
          </p>
        </div>

        {/* Step Selector Horizontal Bar */}
        <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-800 no-scrollbar">
          {PROCESS_STEPS_7.map((step, idx) => {
            const isActive = idx === activeProcessStep;
            return (
              <button
                key={step.step}
                onClick={() => setActiveProcessStep(idx)}
                className={`flex-1 min-w-[140px] p-3 text-left border-b-2 transition-all cursor-pointer rounded-t-lg ${
                  isActive
                    ? 'border-purple-500 bg-purple-950/20 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <div className="text-[10px] font-mono text-purple-400 font-bold">{step.step}</div>
                <div className="text-xs font-bold uppercase mt-0.5">{step.name}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase */}
        {(() => {
          const currentStep = PROCESS_STEPS_7[activeProcessStep];
          return (
            <div className="bg-[#0A0A10] border border-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-6xl font-extrabold text-purple-500/40 font-mono">
                    {currentStep.step}
                  </span>
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
                      PHASE {currentStep.step}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">
                      {currentStep.name}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-purple-300 font-medium leading-snug">
                  "{currentStep.headline}"
                </p>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {currentStep.desc}
                </p>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3 text-xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">
                      Core Tangible Deliverable:
                    </span>
                    <span className="text-white font-semibold">{currentStep.output}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    disabled={activeProcessStep === 0}
                    onClick={() => setActiveProcessStep((prev) => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      activeProcessStep === 0
                        ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer'
                    }`}
                  >
                    ← Previous Phase
                  </button>
                  <button
                    disabled={activeProcessStep === PROCESS_STEPS_7.length - 1}
                    onClick={() => setActiveProcessStep((prev) => Math.min(PROCESS_STEPS_7.length - 1, prev + 1))}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      activeProcessStep === PROCESS_STEPS_7.length - 1
                        ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'border-purple-600 bg-purple-600/20 text-purple-300 hover:bg-purple-600 hover:text-white cursor-pointer'
                    }`}
                  >
                    Next Phase →
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ═══ 5. TECHNOLOGY CAPABILITIES MATRIX ════════════════════════════ */}
      <section id="capabilities" className="relative z-10 py-20 bg-[#08080E]/90 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-purple-400 font-bold">
              OUR ARSENAL
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              TECHNOLOGY CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-light">
              We do not chase transient tech fads. We invest in deeply reliable, high-performance
              standards with strong ecosystem longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Frontend & Web */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Frontend & UI</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• React 18, Next.js, Remix</li>
                <li>• TypeScript (Strict Type Safety)</li>
                <li>• Tailwind CSS, CSS Modules</li>
                <li>• Framer Motion & GSAP Physics</li>
                <li>• WebGL, Three.js & Canvas 2D</li>
                <li>• WCAG 2.1 AAA Accessibility</li>
              </ul>
            </div>

            {/* Backend & Scalable APIs */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Backend & APIs</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Node.js, NestJS, Bun, Go</li>
                <li>• PostgreSQL, Redis, ClickHouse</li>
                <li>• GraphQL, REST, gRPC</li>
                <li>• Event-Driven BullMQ & Kafka</li>
                <li>• Row-Level Security & Encrypted Auth</li>
                <li>• High-Concurrency Microservices</li>
              </ul>
            </div>

            {/* AI, Voice & Agents */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">AI, Voice & Agents</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• Python, LangChain, LlamaIndex</li>
                <li>• Private Vector DBs (Qdrant, Pinecone)</li>
                <li>• Multi-Modal Vision & Whisper Audio</li>
                <li>• Local Offline Models (Ollama, vLLM)</li>
                <li>• Fine-Tuning & Custom LoRA Weights</li>
                <li>• Agentic Tool Invocation Pipelines</li>
              </ul>
            </div>

            {/* Cloud & Security */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Cloud & DevOps</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• AWS, Google Cloud, Vercel, Fly.io</li>
                <li>• Terraform Infrastructure as Code</li>
                <li>• Docker & Multi-Node Kubernetes</li>
                <li>• GitHub Actions Automated CI/CD</li>
                <li>• Cloudflare Edge CDN & DDoS Defense</li>
                <li>• High-Availability Architecture</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ 6. CTA BANNER: START A PROJECT ═══════════════════════════════ */}
      <section className="relative z-10 py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-950/30 to-[#0C0C14] border border-purple-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">
              READY TO BUILD?
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              LET'S CREATE SOMETHING UNFORGETTABLE.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light">
              Tell us what you are envisioning. We will review your requirements and
              reply with a feasibility breakdown and next steps.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenConsult()}
              className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/40 transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>SCHEDULE A TECHNICAL CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('crezora')}
              className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
            >
              RETURN TO ECOSYSTEM
            </button>
          </div>
        </div>
      </section>

      {/* ═══ 7. CONSULTATION BOOKING MODAL ════════════════════════════════ */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0E0E18] border border-slate-700 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Start a Project with Crezora</h3>
                <p className="text-xs text-slate-400">Direct consultation with senior engineering leads</p>
              </div>
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {consultSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Brief ready to send</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Your email app should open with the brief pre-filled. Nothing is sent
                  automatically — you stay in control of what you send.
                </p>
                {hasContactEmail() && (
                  <p className="text-xs text-slate-400">
                    You can also write to{' '}
                    <a href={`mailto:${SITE.contactEmail}`} className="text-purple-300 underline">
                      {SITE.contactEmail}
                    </a>
                    .
                  </p>
                )}
                <button
                  onClick={() => {
                    setIsConsultModalOpen(false);
                    setConsultSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : !hasContactEmail() ? (
              <div className="py-10 text-center space-y-3">
                <h4 className="text-base font-bold text-white">Contact channel not configured</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  No contact address has been configured for this build yet, so the brief cannot be
                  sent. Please try again once a contact channel has been published.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitConsult} className="space-y-4 text-left text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravya Reddy"
                    value={consultForm.name}
                    onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="sravya@company.com"
                      value={consultForm.email}
                      onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Reddy Labs / Stealth"
                      value={consultForm.company}
                      onChange={(e) => setConsultForm({ ...consultForm, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Primary Discipline</label>
                    <select
                      value={consultForm.projectType}
                      onChange={(e) => setConsultForm({ ...consultForm, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                    >
                      {CREZORA_SERVICES_14.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Estimated Budget</label>
                    <select
                      value={consultForm.budget}
                      onChange={(e) => setConsultForm({ ...consultForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                    >
                      <option>&lt; $10k (&lt; ₹8 Lakhs)</option>
                      <option>$10k - $25k (₹8L - ₹20L)</option>
                      <option>$25k - $50k (₹20L - ₹40L)</option>
                      <option>$50k+ (₹40 Lakhs+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Project Summary / Goals *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe what you're building, target timeline, or core challenge..."
                    value={consultForm.message}
                    onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* ═══ 8. FOOTER WITH CREZORA.CO ATTRIBUTION ═══════════════════════ */}
      <Footer currentLanguage={currentLanguage} onNavigate={onNavigate} />
    </div>
  );
};
