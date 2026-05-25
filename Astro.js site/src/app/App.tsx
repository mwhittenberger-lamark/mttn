import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import {
  Globe,
  Cpu,
  Target,
  Mail,
  TrendingUp,
  ArrowRight,
  Check,
  MapPin,
  Users,
  Zap,
  DollarSign,
  BarChart3,
  Layers,
  ChevronDown,
  MonitorX,
  TrendingDown,
  LayoutTemplate,
  UserX,
  BrainCircuit,
  Activity,
  Unplug,
  SearchX,
  Laptop,
  Bot,
  Code,
  Search,
  LineChart
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import logo from "../imports/mike_the_tech_ninja_logo_2026.png";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <div ref={ref}>{count.toLocaleString()}</div>;
}

// Floating Shape Component
function FloatingShape({ delay = 0, duration = 20 }: { delay?: number; duration?: number }) {
  return (
    <motion.div
      className="absolute size-32 rounded-full bg-gradient-to-br from-accent/10 to-accent-light/10 blur-2xl"
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-light to-accent-green origin-left z-50"
        style={{ scaleX }}
      />

      {/* Noise Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }} />

      <div className="relative">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src={logo}
                alt="Mike the Tech Ninja"
                className="h-8 w-8"
              />
              <span className="text-sm font-semibold">Mike the Tech Ninja</span>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <a href="#services" className="relative text-xs text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full">Services</a>
              <a href="#how-it-works" className="relative text-xs text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full">How It Works</a>
              <a href="#packages" className="relative text-xs text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full">Packages</a>
              <a href="#faq" className="relative text-xs text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full">FAQ</a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-gradient-to-r from-accent to-accent-light px-4 py-1.5 text-xs font-medium text-accent-foreground shadow-sm transition-all hover:shadow-md"
            >
              Book Free Gut Check
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-12">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-accent-light/5">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-accent-green/5 via-transparent to-accent/5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating Shapes */}
        <div className="absolute left-10 top-20">
          <FloatingShape delay={0} duration={25} />
        </div>
        <div className="absolute right-20 bottom-32">
          <FloatingShape delay={2} duration={20} />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px]">
                <MapPin className="size-3 text-accent" />
                <span>Raleigh • Cary • Durham • Chapel Hill • The Triangle</span>
              </div>
              <h1 className="mb-4 text-[28px] font-bold leading-[1.2] tracking-tight sm:text-[34px] lg:text-[40px]">
                Small business budget.
                <br />
                <span className="text-accent">Big business digital moves.</span>
              </h1>
              <p className="mb-5 text-[14px] text-muted-foreground leading-relaxed">
                Mike the Tech Ninja helps Triangle small businesses build better websites, use practical AI, run smarter marketing, and turn limited budgets into real digital momentum.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(37, 99, 235, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="relative">Book a Free Digital Gut Check</span>
                  <ArrowRight className="relative size-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group rounded-md border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-accent/50 hover:bg-secondary hover:shadow-md"
                >
                  <span className="transition-colors group-hover:text-accent">See What I Can Help With</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Logo with Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative flex justify-center py-10">
                {/* Top Right Card - Stats */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)" }}
                  className="absolute right-4 top-0 w-40 rounded-lg border border-border bg-card/80 p-3 shadow-lg backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center gap-1.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent/20 to-accent/10">
                      <Users className="size-3.5 text-accent" />
                    </div>
                    <span className="text-[10px] font-medium">Active Users</span>
                  </div>
                  <div className="mb-2 text-xl font-bold inline-flex items-baseline gap-0">
                    <AnimatedCounter target={50} /><span>k+</span>
                  </div>
                  <div className="space-y-1">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-1 text-[9px] text-muted-foreground"
                    >
                      <Check className="size-2.5 text-accent-green" />
                      <span>Fast growth</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-1 text-[9px] text-muted-foreground"
                    >
                      <Check className="size-2.5 text-accent-green" />
                      <span>High engagement</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-center gap-1 text-[9px] text-muted-foreground"
                    >
                      <Check className="size-2.5 text-accent-green" />
                      <span>Trusted by local businesses</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Top Left Card - Services */}
                <div className="absolute left-4 top-8 w-32 rounded-lg border border-border bg-card p-2.5 shadow-sm">
                  <div className="mb-1.5 flex items-center gap-1">
                    <div className="flex size-6 items-center justify-center rounded-md bg-accent-light/10">
                      <Zap className="size-3 text-accent-light" />
                    </div>
                    <span className="text-[9px] font-medium">Services</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[9px] text-muted-foreground">• AI & Automation</div>
                    <div className="text-[9px] text-muted-foreground">• Web Development</div>
                    <div className="text-[9px] text-muted-foreground">• Digital Marketing</div>
                  </div>
                </div>

                {/* Center Logo */}
                <div className="flex items-center justify-center">
                  <ImageWithFallback
                    src={logo}
                    alt="Mike the Tech Ninja"
                    className="h-48 w-48"
                  />
                </div>

                {/* Bottom Left Card - Growth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(163,230,53,0.2)" }}
                  className="absolute bottom-0 left-4 w-36 rounded-lg border border-border bg-card/80 p-3 shadow-lg backdrop-blur-sm"
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent-green/20 to-accent-green/10">
                      <BarChart3 className="size-3.5 text-accent-green" />
                    </div>
                    <span className="text-[10px] font-medium">Growth</span>
                  </div>
                  <div className="bg-gradient-to-r from-accent-green to-accent-green/80 bg-clip-text text-2xl font-bold text-transparent inline-flex items-baseline gap-0">
                    <span>+</span><AnimatedCounter target={127} /><span>%</span>
                  </div>
                  <div className="mt-1.5 text-[9px] text-muted-foreground">Year over year</div>
                </motion.div>

                {/* Bottom Right Card - Location */}
                <div className="absolute bottom-8 right-4 w-36 rounded-lg border border-border bg-card p-2.5 shadow-sm">
                  <div className="mb-1 flex items-center gap-1">
                    <div className="flex size-6 items-center justify-center rounded-md bg-accent/10">
                      <MapPin className="size-3 text-accent" />
                    </div>
                    <span className="text-[9px] font-medium">Local Focus</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground">Serving the Triangle area</div>
                  <div className="mt-1.5 flex items-center gap-1">
                    <div className="h-1 flex-1 rounded-full bg-accent/20">
                      <div className="h-1 w-4/5 rounded-full bg-accent"></div>
                    </div>
                    <span className="text-[8px] font-medium">80%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro / Local Trust Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-light/5"></div>
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">
                You do not need a giant agency
                <br />
                <span className="text-accent">to make serious digital progress.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-8 max-w-3xl space-y-4 text-[13px] text-muted-foreground leading-relaxed"
            >
              <p>
                Most small businesses do not need a bloated marketing retainer, a 60-page strategy deck, or a website project that takes six months. They need someone experienced enough to see the whole picture and practical enough to fix the next right thing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green px-6 py-3"
            >
              <span className="text-sm font-semibold text-primary">That is where Mike the Tech Ninja comes in.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-3xl rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm"
            >
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                I help small businesses across the Triangle improve the digital pieces that actually affect growth: websites, landing pages, paid traffic, SEO, email marketing, conversion paths, analytics, and AI-powered workflows.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 max-w-2xl">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">Small businesses are being asked to compete like big businesses.</h2>
            <p className="text-[14px] text-muted-foreground">
              You do not need everything at once. You need the right digital moves, in the right order, for your budget.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MonitorX, title: "Outdated Website", description: "Looks dated or doesn't work on mobile." },
              { icon: TrendingDown, title: "Wasted Ad Spend", description: "Clicks but no leads or missed opportunities." },
              { icon: LayoutTemplate, title: "Weak Landing Pages", description: "Low conversions and missed opportunities." },
              { icon: UserX, title: "No Follow-Up", description: "Leads fall through the cracks." },
              { icon: BrainCircuit, title: "Confusing AI Tools", description: "Overwhelming options without a clear plan." },
              { icon: Activity, title: "Unclear Tracking", description: "Can't see what's working, what's not." },
              { icon: SearchX, title: "Missing SEO", description: "Can't be found when customers search." },
              { icon: Unplug, title: "Disconnected Tools", description: "Systems don't talk. You waste time and money." }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(212, 24, 61, 0.2)" }}
                className="group relative overflow-hidden rounded-md border border-border bg-card p-4 transition-all duration-300 hover:border-destructive/30 hover:bg-destructive/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative mb-2 flex items-center gap-2 text-foreground transition-colors group-hover:text-destructive">
                  <problem.icon className="size-4 transition-transform group-hover:scale-110" />
                  <h3 className="text-xs font-bold">{problem.title}</h3>
                </div>
                <p className="relative text-[11px] text-muted-foreground">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-border bg-card px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col items-end justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold sm:text-3xl"
              >
                Practical digital help for small businesses that need results, not jargon.
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.a
                href="#packages"
                whileHover={{ x: 5 }}
                className="group inline-flex items-center font-semibold text-primary transition-colors hover:text-primary/80"
              >
                <span className="relative">
                  See all services
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all group-hover:w-full" />
                </span>
                <ArrowRight className="ml-2 size-4 transform transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Laptop,
                title: "Websites & Landing Pages",
                description: "Modern websites and landing pages built to explain what you do, build trust, and turn visitors into leads or customers.",
                tags: ["Custom Design", "Mobile-First", "SEO Ready"]
              },
              {
                icon: Bot,
                title: "Custom AI & Automation",
                description: "AI tools that solve real business problems, save time, and help you do more without hiring a full team.",
                tags: ["AI Workflows", "Chatbots", "Integrations"]
              },
              {
                icon: Code,
                title: "Apps & Digital Tools",
                description: "Custom tools and web apps that solve real business problems.",
                tags: ["Dashboards", "Portals", "Internal Tools"]
              },
              {
                icon: Search,
                title: "Paid Media & SEO",
                description: "Focused traffic strategies that help people find you when they are searching, comparing, or ready to buy.",
                tags: ["Google Ads", "Local SEO", "Reporting"]
              },
              {
                icon: Mail,
                title: "Lifecycle & Email Marketing",
                description: "Email systems that help you follow up, nurture leads, recover opportunities, and stay in front of customers.",
                tags: ["Automations", "Segmentation", "Retention"]
              },
              {
                icon: LineChart,
                title: "CRO & Digital Strategy",
                description: "A clear look at where your digital presence is leaking attention, trust, leads, or revenue.",
                tags: ["Audits", "Testing", "Optimization"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-light/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative mb-4 flex size-10 items-center justify-center rounded-lg border border-border bg-gradient-to-br from-card to-secondary/50 text-foreground backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-lg">
                  <service.icon className="size-5 transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="relative mb-2 text-base font-bold transition-colors group-hover:text-primary">{service.title}</h3>
                <p className="relative mb-4 min-h-[60px] text-[11px] leading-relaxed text-muted-foreground">{service.description}</p>
                <div className="relative flex flex-wrap gap-1.5">
                  {service.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex rounded-md bg-gradient-to-r from-secondary to-secondary/80 px-2 py-0.5 text-[10px] font-medium text-secondary-foreground shadow-sm transition-all hover:shadow-md"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl">How I make a small budget feel bigger</h2>
          <p className="mb-8 text-center text-[13px] text-muted-foreground">
            A bigger budget is helpful, but a smarter plan usually matters more.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Zap,
                title: "I prioritize before I build",
                description: "We figure out what will matter most before spending money on tools, ads, or development."
              },
              {
                icon: Layers,
                title: "I connect the pieces",
                description: "Your website, ads, email, SEO, AI tools, and analytics should support each other instead of living in separate silos."
              },
              {
                icon: Target,
                title: "I build useful systems",
                description: "The goal is not just a better website or campaign. The goal is a business that can respond faster and market more consistently."
              },
              {
                icon: DollarSign,
                title: "I keep it practical",
                description: "No bloated retainers. No mystery dashboards. No tech for tech's sake."
              }
            ].map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="flex gap-3"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                  <point.icon className="size-4" />
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-semibold">{point.title}</h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Triangle */}
      <section className="border-y border-border bg-gradient-to-br from-accent/5 to-accent-light/5 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-card px-3 py-1 text-[10px]">
                <MapPin className="size-3 text-accent" />
                <span className="font-medium">Local to the Triangle</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Built for Triangle businesses</h2>
              <div className="mb-6 space-y-3 text-[13px] text-muted-foreground leading-relaxed">
                <p>
                  If you run a business in Raleigh, Cary, Apex, Durham, Chapel Hill, Morrisville, Holly Springs, Wake Forest, Fuquay-Varina, or anywhere nearby, I can help remotely or in person.
                </p>
                <p className="font-medium text-foreground">
                  Sometimes the best marketing starts by seeing the business through a customer's eyes.
                </p>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-accent to-accent-light px-6 py-3 text-sm font-medium text-accent-foreground shadow-lg transition-all hover:shadow-xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Let's Grow Your Business</span>
                <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Right - Triangle Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative mx-auto overflow-hidden rounded-2xl border border-border shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415698.0173815952!2d-79.13320893750001!3d35.87471795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ace6c6c9b5b7f3%3A0x13ff1d85d601c1e2!2sResearch%20Triangle%20Park%2C%20NC!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="500"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Research Triangle Park Map"
                  className="w-full"
                ></iframe>

                {/* Overlay with cities */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent p-4">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {["Raleigh", "Durham", "Chapel Hill", "Cary", "Apex"].map((city) => (
                      <div key={city} className="flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1 backdrop-blur-sm">
                        <MapPin className="size-3 text-accent" />
                        <span className="text-[10px] font-medium">{city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 text-2xl font-bold sm:text-3xl"
            >
              Start with the next right move.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[14px] text-muted-foreground"
            >
              Choose the option that fits where you are today.
            </motion.p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Free Digital Gut Check",
                description: "A short call where we talk through your business, your current digital setup, and where you may be leaving opportunities on the table.",
                price: "Free",
                cta: "Get Started",
                highlighted: false
              },
              {
                title: "Triangle Digital Tune-Up",
                description: "A review of your digital presence with practical recommendations.",
                price: "Starting at $750",
                cta: "Learn More",
                highlighted: false
              },
              {
                title: "Small Business Growth Sprint",
                description: "Focused 4–6 week sprint to fix, launch, or improve one high-impact area.",
                price: "Starting at $2,500",
                cta: "Learn More",
                highlighted: true
              },
              {
                title: "Fractional Digital Partner",
                description: "Ongoing strategic and execution support — without the full-time price.",
                price: "Starting at $1,750/mo",
                cta: "Learn More",
                highlighted: false
              }
            ].map((pkg, index) => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  scale: pkg.highlighted ? 1.02 : 1,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className={`group relative flex flex-col overflow-hidden rounded-xl border p-6 transition-all duration-300 ${
                  pkg.highlighted
                    ? "border-primary bg-gradient-to-br from-card to-accent/5 shadow-xl hover:shadow-2xl"
                    : "border-border bg-background shadow-sm hover:border-accent/30 hover:shadow-lg"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-light/10 opacity-50" />
                )}
                {pkg.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-lg"
                  >
                    {pkg.badge}
                  </motion.div>
                )}
                <h3 className="relative mb-3 text-base font-bold">{pkg.title}</h3>
                <p className="relative mb-6 flex-grow text-[11px] leading-relaxed text-muted-foreground">{pkg.description}</p>
                <div className="relative mt-auto">
                  <div className="mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-base font-semibold text-transparent">{pkg.price}</div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 text-xs font-medium transition-all ${
                      pkg.highlighted
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg"
                        : "border border-border bg-background hover:border-accent/50 hover:bg-secondary"
                    }`}
                  >
                    <span className={pkg.highlighted ? "absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity group-hover/btn:opacity-100" : ""} />
                    <span className="relative">{pkg.cta}</span>
                    <ArrowRight className="relative size-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="how-it-works" className="bg-secondary/10 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">A simple process that keeps the work focused</h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Diagnose",
                description: "We look at where you are now, what you are trying to accomplish, and what is getting in the way."
              },
              {
                step: "2",
                title: "Prioritize",
                description: "We decide which digital moves are most likely to create progress within your actual budget."
              },
              {
                step: "3",
                title: "Build",
                description: "I build or improve the website, landing page, AI tool, campaign, email system, or strategy we agreed on."
              },
              {
                step: "4",
                title: "Improve",
                description: "We review what is working, what is not, and what should happen next."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="text-center"
              >
                <div className="mb-2.5 inline-flex size-11 items-center justify-center rounded-full bg-accent text-base font-bold text-accent-foreground">
                  {item.step}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold">{item.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <ImageWithFallback
              src={logo}
              alt="Mike the Tech Ninja"
              className="h-16 w-16"
            />
          </div>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Meet Mike, your local Tech Ninja</h2>
          <div className="space-y-3 text-[13px] text-muted-foreground leading-relaxed">
            <p>
              I have spent my career building websites, digital tools, marketing systems, and AI-powered solutions for businesses that need the web to do more than simply exist.
            </p>
            <p>
              My background spans web development, custom AI, apps, lifecycle and email marketing, paid media, SEO, CRO, and digital strategy.
            </p>
            <p className="font-medium text-foreground">
              If you are in the Triangle, I can work with you remotely or meet in person to understand your business, your customers, and the opportunities hiding in plain sight.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border bg-secondary/10 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <div className="space-y-2.5">
            {[
              {
                question: "Do you only work with businesses in North Carolina?",
                answer: "No. I can work with small businesses anywhere. But I am especially focused on helping businesses in the Triangle because local access can make the work more practical and personal."
              },
              {
                question: "What kind of businesses do you help?",
                answer: "I can help many types of small businesses, including local service providers, professional services, health and wellness businesses, restaurants, retailers, ecommerce brands, consultants, creators, and side hustlers."
              },
              {
                question: "Do I need to know exactly what I need before contacting you?",
                answer: "No. Many business owners know something needs to improve, but they are not sure whether the answer is a better website, SEO, ads, email, AI, or a clearer strategy. We can figure that out together."
              },
              {
                question: "Can you help with AI even if I am not technical?",
                answer: "Yes. The best AI projects for small businesses are usually practical and specific: saving time, answering common questions, improving follow-up, organizing knowledge, creating content workflows, or helping qualify leads."
              },
              {
                question: "Do you offer ongoing support?",
                answer: "Yes. Some businesses need a one-time project. Others need ongoing help with campaigns, improvements, email, SEO, AI tools, and strategy."
              },
              {
                question: "Are you cheaper than an agency?",
                answer: "Usually, yes. More importantly, the work is structured around what makes sense for your business and budget instead of forcing you into a large retainer."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="overflow-hidden rounded-md border border-border bg-card"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-secondary/40"
                >
                  <span className="text-xs font-medium">{faq.question}</span>
                  <ChevronDown className={`size-3.5 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-border px-3.5 pb-3.5 pt-2.5 text-[11px] text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-primary p-8 text-center text-primary-foreground">
            <h2 className="mb-2.5 text-2xl font-bold text-primary-foreground sm:text-3xl">Ready to make your digital presence work harder?</h2>
            <p className="mb-5 text-[13px] text-primary-foreground/90">
              Bring the business problem. I will help you figure out the smartest digital move.
            </p>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-medium text-accent-foreground transition-all hover:bg-accent/90">
              Book a Free Digital Gut Check
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border bg-background px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <ImageWithFallback
                src={logo}
                alt="Mike the Tech Ninja"
                className="h-8 w-8"
              />
              <div>
                <div className="text-xs font-semibold">Mike the Tech Ninja</div>
                <div className="text-[10px] text-muted-foreground">Serving the Triangle, NC</div>
              </div>
            </div>
            <div className="flex gap-2.5">
              <a href="#" className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary">
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
              </a>
              <a href="#" className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary">
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary">
                <svg className="size-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path></svg>
              </a>
            </div>
          </div>
          <div className="mt-5 text-center text-[10px] text-muted-foreground">
            <p>&copy; 2026 Mike the Tech Ninja. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
