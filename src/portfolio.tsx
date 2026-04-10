import { useState, useEffect, useRef, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const logo = "/favi.svg";

// ─── Types ───
interface LinkMap {
  github: string;
  linkedin: string;
  x: string;
  instagram: string;
  email: string;
}

interface Service {
  title: string;
  description: string;
  tags: string[];
}

interface PortfolioProject {
  title: string;
  description: string;
  demoPath: string;
  tags: string[];
  featured: boolean;
  category: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

// ─── Data ───
const LINKS: LinkMap = {
  github: "https://github.com/edsng",
  linkedin: "https://linkedin.com/in/edwsng",
  x: "https://x.com/rxdlne",
  instagram: "https://www.instagram.com/rxdlne/",
  email: "mailto:edward@edwstudio.com",
};

const services: Service[] = [
  {
    title: "Custom Websites",
    description:
      "Fully responsive, hand-crafted websites tailored to your brand. From landing pages to multi-page sites — built with clean code and modern frameworks.",
    tags: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Front-End Development",
    description:
      "Pixel-perfect implementation of your designs. I turn Figma mockups and wireframes into fast, accessible, interactive interfaces.",
    tags: ["TypeScript", "Component Libraries", "Animations", "Accessibility"],
  },
  {
    title: "Full-Stack Applications",
    description:
      "End-to-end web applications with robust backends, databases, and APIs. From authentication to deployment — the whole stack.",
    tags: ["Node.js", "PostgreSQL", "REST APIs", "Cloud Hosting"],
  },
  {
    title: "UI/UX Design",
    description:
      "Clean, intuitive interfaces designed in Figma. I focus on user experience, visual hierarchy, and consistent design systems.",
    tags: ["Figma", "Prototyping", "Design Systems", "User Research"],
  },
];

const portfolioProjects: PortfolioProject[] = [
  {
    title: "FlowSync",
    description:
      "B2B SaaS product landing page with an interactive dashboard mock, scroll-driven animations, animated counters, parallax effects, and a multi-step demo booking flow. Built to feel like a real venture-backed startup.",
    demoPath: "/demo/saas",
    tags: ["React", "TypeScript", "GSAP"],
    featured: true,
    category: "SaaS",
  },
  {
    title: "Diamond Touch Detailing",
    description:
      "Premium auto detailing site for a high-end Ontario, CA business. Features a project gallery, tiered service packages, and a multi-step quote request with calendar scheduling. Dark, glossy aesthetic.",
    demoPath: "/demo/detailing",
    tags: ["React", "CSS", "Responsive"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Marquez Home Group",
    description:
      "Residential real estate team site for the Inland Empire market. Includes a searchable listings dashboard, interactive property detail modals, neighborhood guides, and a consultation booking flow with calendar.",
    demoPath: "/demo/real-estate",
    tags: ["React", "TypeScript", "CSS"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Forge Performance Coaching",
    description:
      "Personal training site for a Rancho Cucamonga fitness coach. Features a scroll-linked 3D stats panel, objection-handling content strategy, program pricing with expandable details, and a multi-step booking modal.",
    demoPath: "/demo/fitness",
    tags: ["React", "CSS", "Responsive"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Evergreen Outdoor Design",
    description:
      "Landscaping and hardscaping contractor site for Temecula, CA. Features scroll-animated isometric pavers, parallax sections, project gallery with hover reveals, and an estimate request flow.",
    demoPath: "/demo/landscaping",
    tags: ["React", "GSAP", "Responsive"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Crown & Fade Barber Lounge",
    description:
      "Premium barbershop site for Pomona, CA. Includes a cut gallery, service pricing list, barber team profiles, and a multi-step appointment booking with barber selection and calendar. Dark, urban aesthetic.",
    demoPath: "/demo/barbershop",
    tags: ["React", "CSS", "Mobile-First"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Radiant Skin Aesthetics",
    description:
      "Med spa website for a Corona, CA aesthetics clinic. Features treatment cards, provider credentials, a press authority bar, client testimonials, and a consultation booking modal. Soft, calming luxury design.",
    demoPath: "/demo/medspa",
    tags: ["React", "CSS", "Responsive"],
    featured: false,
    category: "Local Business",
  },
  {
    title: "Porsche 718 Cayman GT4 RS",
    description:
      "Premium automotive landing page with parallax hero, scroll-driven engineering section with pinned image crossfade, animated spec counters, red curtain image reveals, and text clip-mask animations. Dark luxury aesthetic inspired by Porsche's design language.",
    demoPath: "/demo/porsche",
    tags: ["React", "TypeScript", "Scroll Animations"],
    featured: true,
    category: "Concept",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We discuss your goals, audience, and vision. I learn about your brand and what success looks like for your project.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "I create wireframes and high-fidelity mockups in Figma. You review, give feedback, and we iterate until the design feels right.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "I build the site with clean, modern code. You get regular previews throughout development so there are no surprises.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Final testing across devices and browsers, performance optimization, and deployment. I provide documentation and post-launch support.",
  },
];

const techStack: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Figma",
  "Vite",
  "Git",
];

// ─── Hooks ───
function useReveal(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, visible];
}

// ─── Components ───

interface ArrowProps {
  size?: number;
}

const Arrow: React.FC<ArrowProps> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 13L13 3M13 3H5M13 3v8" />
  </svg>
);

// ─── Nav ───

interface NavProps {
  activeSection: string;
}

const Nav: React.FC<NavProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string): void => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["services", "work", "process", "contact"] as const;

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="nav_inner">
        <button className="nav_logo" onClick={() => scrollTo("hero")}>
          <img src={logo} alt="edw.studio" className="nav_logo-img" />
        </button>

        <div className="nav_links">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className={`nav_link ${activeSection === item ? "nav_link--active" : ""}`}
            >
              {item}
              {activeSection === item && <span className="nav_link-indicator" />}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="nav_resume"
          >
            get a quote
          </button>
        </div>

        <button
          className="nav_hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div
            className={`nav_hamburger-line ${
              mobileOpen ? "nav_hamburger-line--top-open" : "nav_hamburger-line--top"
            }`}
          />
          {!mobileOpen && <div className="nav_hamburger-line" />}
          <div
            className={`nav_hamburger-line ${
              mobileOpen ? "nav_hamburger-line--bottom-open" : "nav_hamburger-line--bottom"
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className="nav_mobile-menu">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="nav_mobile-link"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="nav_mobile-resume"
          >
            get a quote
          </button>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ───

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const v = loaded ? "hero-reveal--visible" : "";

  return (
    <section id="hero" className="hero">
      <div className="hero_glow" />
      <div className="hero_content">
        <div className={`hero-reveal hero-reveal--1 ${v}`}>
          <div className="hero_monogram-wrapper">
            <img src={logo} alt="edw.studio" className="hero_logo" />
          </div>
        </div>

        <p className={`hero_subtitle hero-reveal hero-reveal--2 ${v}`}>
          Freelance Web Developer
        </p>

        <h1 className={`hero_title hero-reveal hero-reveal--3 ${v}`}>
          <span className="hero_title-name">Websites</span> worth visiting
        </h1>

        <p className={`hero_description hero-reveal hero-reveal--4 ${v}`}>
          Los Angeles based developer crafting fast, responsive,
          <br />
          and visually striking web experiences.
        </p>

        <div className={`hero_cta-group hero-reveal hero-reveal--5 ${v}`}>
          <button
            className="hero_cta-primary"
            onClick={() =>
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View my work
          </button>
          <button
            className="hero_cta-secondary"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get in touch <Arrow size={10} />
          </button>
        </div>

        <div
          className={`hero_scroll-indicator ${loaded ? "hero_scroll-indicator--visible" : ""}`}
        >
          <div className="hero_scroll-line" />
        </div>
      </div>
    </section>
  );
};

// ─── Services ───

const Services: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  return (
    <section id="services" ref={ref as RefObject<HTMLElement>} className="services">
      <div className="services_header">
        <div className={`reveal ${cls}`}>
          <p className="services_label">What I Do</p>
          <h2 className="services_heading">
            From concept to launch — I handle everything your web project needs.
          </h2>
        </div>
        <div className={`reveal ${cls} reveal--delay-2`}>
          <p className="services_tech-label">Tech Stack</p>
          <div className="about_pills">
            {techStack.map((t) => (
              <span key={t} className="about_pill">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="services_grid">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`service-card reveal ${cls}`}
            style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <h3 className="service-card_title">{s.title}</h3>
              <p className="service-card_desc">{s.description}</p>
            </div>
            <div className="project-card_tags project-card_tags--standard">
              {s.tags.map((tag) => (
                <span key={tag} className="project-card_tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Portfolio / Work ───

const Work: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";
  const [filter, setFilter] = useState<string>("Featured");

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  const categories = ["Featured", ...new Set(portfolioProjects.map((p) => p.category))];
  const filtered =
    filter === "Featured"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === filter);

  const featured = filtered.filter((p) => p.featured);
  const standard = filtered.filter((p) => !p.featured);

  return (
    <section id="work" ref={ref as RefObject<HTMLElement>} className="projects">
      <div className="projects_header">
        <p className={`projects_label reveal ${cls}`}>Portfolio</p>
        <div className={`projects_filters reveal ${cls} reveal--delay-1`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-btn ${filter === cat ? "filter-btn--active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {featured.map((p) => (
        <div
          key={p.title}
          className={`project-card--featured reveal ${cls}`}
        >
          <div>
            <div className="project-card_featured-header">
              <p className="project-card_featured-label">
                Featured · {p.category}
              </p>
              <Link
                to={p.demoPath}
                className="project-action-btn project-action-btn--demo project-action-btn--featured-desktop"
              >
                Live Demo <Arrow size={10} />
              </Link>
            </div>
            <h3 className="project-card_featured-title">{p.title}</h3>
            <p className="project-card_featured-desc">{p.description}</p>
          </div>
          <div className="project-card_featured-bottom">
            <div className="project-card_tags project-card_tags--featured">
              {p.tags.map((tag) => (
                <span key={tag} className="project-card_tag project-card_tag--featured">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              to={p.demoPath}
              className="project-action-btn project-action-btn--demo project-action-btn--featured-mobile"
            >
              Demo <Arrow size={10} />
            </Link>
          </div>
        </div>
      ))}

      <div className="projects_grid">
        {standard.map((p, i) => (
          <div
            key={p.title}
            className={`project-card reveal ${cls}`}
            style={{ transitionDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <div className="project-card_header">
                <div>
                  <span className="project-card_category">{p.category}</span>
                  <h3 className="project-card_title">{p.title}</h3>
                </div>
              </div>
              <p className="project-card_desc">{p.description}</p>
            </div>
            <div className="project-card_footer">
              <div className="project-card_tags project-card_tags--standard">
                {p.tags.map((tag) => (
                  <span key={tag} className="project-card_tag">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                to={p.demoPath}
                className="project-action-btn project-action-btn--demo"
              >
                Demo <Arrow size={10} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Process ───

const Process: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reduced motion: show everything immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Animate the connecting line drawing in
      const line = el.querySelector(".process_line-fill") as SVGLineElement;
      if (line) {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 50%", end: "bottom 70%", scrub: 1, invalidateOnRefresh: true },
        });
      }

      // Animate each step
      const steps = el.querySelectorAll(".process_step");
      steps.forEach((step) => {
        const dot = step.querySelector(".process_dot-fill");
        const content = step.querySelector(".process_step-content");

        if (content) {
          gsap.set(content, { opacity: 0, x: -20 });
          gsap.to(content, {
            opacity: 1, x: 0, ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 75%", end: "top 55%", scrub: 1, invalidateOnRefresh: true },
          });
        }

        if (dot) {
          gsap.set(dot, { scale: 0 });
          gsap.to(dot, {
            scale: 1, ease: "back.out(2)",
            scrollTrigger: { trigger: step, start: "top 75%", end: "top 60%", scrub: 1, invalidateOnRefresh: true },
          });
        }
      });

      // Refresh after layout settles
      setTimeout(() => ScrollTrigger.refresh(), 200);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={(node) => { (ref as { current: HTMLElement | null }).current = node; sectionRef.current = node; }} className="process">
      <p className={`process_label reveal ${cls}`}>How I Work</p>

      <div className="process_timeline">
        {/* Connecting line */}
        <div className="process_line">
          <svg className="process_line-svg" preserveAspectRatio="none">
            <line className="process_line-bg" x1="50%" y1="0" x2="50%" y2="100%" />
            <line className="process_line-fill" x1="50%" y1="0" x2="50%" y2="100%" />
          </svg>
        </div>

        {processSteps.map((step) => (
          <div key={step.number} className="process_step">
            <div className="process_dot">
              <span className="process_dot-ring" />
              <span className="process_dot-fill" />
            </div>
            <div className="process_step-content">
              <span className="process_step-number">{step.number}</span>
              <h3 className="process_step-title">{step.title}</h3>
              <p className="process_step-desc">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Contact ───

const Contact: React.FC = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "reveal--visible" : "";

  const contactLinks = [
    { label: "Email", url: LINKS.email },
    { label: "LinkedIn", url: LINKS.linkedin },
    { label: "GitHub", url: LINKS.github },
    { label: "X", url: LINKS.x },
    { label: "Instagram", url: LINKS.instagram },
  ];

  return (
    <section id="contact" ref={ref as RefObject<HTMLElement>} className="contact">
      <div className={`reveal ${cls}`}>
        <p className="contact_label">Start a Project</p>
        <h2 className="contact_heading">Let's build something together</h2>
        <p className="contact_subtext">
          Have an idea for a website? Let's talk about how I can bring it to life.
          <br />
          I'm currently accepting new clients.
        </p>

        <a href={LINKS.email} className="contact_cta">
          Get a free quote <Arrow size={12} />
        </a>

        <div className="contact_links">
          {contactLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              {label} <Arrow size={11} />
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

// ─── Main App ───

const Portfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  useEffect(() => {
    if (location.state && (location.state as { scrollTo?: string }).scrollTo) {
      const id = (location.state as { scrollTo: string }).scrollTo;
      // Use instant scroll so user lands directly at the section without seeing a jump
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
          // Refresh ScrollTrigger positions after scroll settles
          setTimeout(() => ScrollTrigger.refresh(), 50);
        }
      }, 50);
    }
  }, [location.state]);

  useEffect(() => {
    const sections = ["hero", "services", "work", "process", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header>
        <Nav activeSection={activeSection} />
      </header>
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <footer className="footer">
        <p className="footer_text">© {new Date().getFullYear()} Edward Song</p>
      </footer>
    </>
  );
};

export default Portfolio;
