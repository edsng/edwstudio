import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./landscaping.css";

import heroImg from "./assets/hero.jpg";
import imgTemecula from "./assets/temecula.jpg";
import imgMurrieta from "./assets/murrieta.jpg";
import imgMenifee from "./assets/menifee.jpg";
import imgTemeculaPool from "./assets/temecula-pool.jpg";
import imgWildomar from "./assets/wildomar.jpg";
import imgLakeElsinore from "./assets/lake-elsinore.jpg";
import imgTurf from "./assets/artificial-turf.jpg";
import imgPavers from "./assets/pavers.jpg";
import imgKitchen from "./assets/outdoor-kitchen.jpg";
import imgLighting from "./assets/lighting.jpg";
import imgPatioCover from "./assets/patio-cover.jpg";
import imgFullYard from "./assets/full-yard.jpg";

// ─── Data ───

const pillars = [
  { word: "Design", description: "3D renderings and custom plans tailored to your property, lifestyle, and budget." },
  { word: "Build", description: "One crew from demolition to final walkthrough. No subcontractor runaround." },
  { word: "Sustain", description: "Low-maintenance materials and drought-tolerant solutions built for SoCal." },
];

const services = [
  { title: "Artificial Turf", description: "Premium synthetic grass that looks and feels real — no mowing, no watering, no maintenance. Perfect for Southern California.", img: imgTurf },
  { title: "Pavers & Hardscape", description: "Driveways, patios, walkways, and pool decks. Custom patterns and materials to match your home's style.", img: imgPavers },
  { title: "Outdoor Kitchens", description: "Built-in grills, countertops, bar seating, and fire features. Your backyard becomes the best room in the house.", img: imgKitchen },
  { title: "Landscape Lighting", description: "Path lights, uplighting, string lights, and accent lighting. Extend your outdoor living into the night.", img: imgLighting },
  { title: "Patio Covers", description: "Solid roof, lattice, and pergola structures. Year-round shade and weather protection.", img: imgPatioCover },
  { title: "Full Yard Design", description: "Complete backyard or front yard transformation from concept to completion. We handle everything.", img: imgFullYard },
];

const projects = [
  { title: "Modern Backyard Retreat", location: "Temecula", scope: "Turf, pavers, fire pit, lighting", img: imgTemecula },
  { title: "Front Yard Curb Appeal", location: "Murrieta", scope: "Drought-tolerant design, pavers, lighting", img: imgMurrieta },
  { title: "Outdoor Kitchen Build", location: "Menifee", scope: "Built-in grill, bar, countertops, pergola", img: imgMenifee },
  { title: "Pool Deck Renovation", location: "Temecula", scope: "Pavers, turf border, landscape lighting", img: imgTemeculaPool },
  { title: "Complete Yard Makeover", location: "Wildomar", scope: "Turf, hardscape, patio cover, lighting", img: imgWildomar },
  { title: "Entertainment Patio", location: "Lake Elsinore", scope: "Pavers, fire feature, seating wall, lighting", img: imgLakeElsinore },
];

const whyUs = [
  { title: "Design-Build Team", description: "We design it and we build it. One team from start to finish — no miscommunication, no finger-pointing." },
  { title: "Licensed & Insured", description: "Fully licensed California contractor (CSLB #1087654) with full liability and workers' comp insurance." },
  { title: "3D Renderings", description: "See your project before a single shovel hits the ground. We provide photorealistic 3D renders of every design." },
  { title: "5-Year Warranty", description: "Every project comes with a 5-year workmanship warranty. We stand behind everything we build." },
];

const steps = [
  { number: "01", title: "Discovery Call", description: "We visit your property, discuss your vision, and take measurements. No pressure, no commitment — just an honest conversation about what's possible." },
  { number: "02", title: "Custom Design", description: "Our design team creates a detailed plan with 3D renderings, material selections, and a transparent quote. You see everything before we start." },
  { number: "03", title: "Build", description: "Our crew handles everything — demolition, grading, installation, and cleanup. Most projects complete in 1-3 weeks." },
  { number: "04", title: "Enjoy", description: "Walk through with our team, get care instructions, and start living in your new outdoor space." },
];

const testimonials = [
  { name: "Lisa & Mark H.", text: "They turned our dead grass backyard into something out of a magazine. The turf looks incredible and the paver patio is exactly what we wanted. The 3D rendering matched the final result almost perfectly.", location: "Temecula", expanded: false },
  { name: "Carlos D.", text: "Professional from start to finish. What sold us was the 3D rendering — we could see exactly what our backyard would look like before committing. The crew was respectful, clean, and finished a day early. We've already referred two neighbors.", location: "Murrieta", expanded: false },
  { name: "Jennifer W.", text: "We've gotten so many compliments on our outdoor kitchen. Friends come over just to hang out in the backyard now. The whole process was smooth and they finished ahead of schedule. Worth every penny.", location: "Menifee", expanded: false },
];

const serviceAreas = ["Temecula", "Murrieta", "Menifee", "Wildomar", "Lake Elsinore", "Fallbrook", "Winchester", "French Valley"];

const faqs = [
  { q: "How much does a backyard transformation cost?", a: "Most full backyard projects range from $15,000 to $60,000+ depending on size, materials, and features. We provide detailed, transparent quotes after your free consultation — no hidden fees." },
  { q: "How long does a typical project take?", a: "Most projects complete in 1-3 weeks after materials arrive. Larger projects with outdoor kitchens or custom features may take 3-5 weeks. We'll give you a clear timeline upfront." },
  { q: "Do you offer financing?", a: "Yes. We partner with GreenSky to offer flexible financing options with payments as low as $199/month. Apply during your consultation — most approvals take minutes." },
  { q: "Do I need a permit?", a: "Some projects require permits (patio covers, outdoor kitchens, electrical). We handle the entire permit process for you — it's included in our service." },
  { q: "What areas do you serve?", a: "We serve all of Southwest Riverside County including Temecula, Murrieta, Menifee, Wildomar, Lake Elsinore, Fallbrook, Winchester, and French Valley." },
  { q: "Can I see examples of your work?", a: "Absolutely. Check out our project gallery on this page, or ask us during your consultation — we'll show you completed projects similar to what you're envisioning." },
];

// ─── Hooks ───

function useReveal(desktopThreshold = 0.45, mobileThreshold = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const threshold = window.innerWidth <= 768 ? mobileThreshold : desktopThreshold;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [desktopThreshold, mobileThreshold]);
  return [ref, visible] as const;
}

function useParallax() {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom > 0 && rect.top < windowH) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 60);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return [ref, offset] as const;
}

// ─── Icons ───

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4" /></svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

// ─── Small Components ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`eg-faq-item ${open ? "eg-faq-item--open" : ""}`}>
      <button className="eg-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`eg-faq-chevron ${open ? "eg-faq-chevron--open" : ""}`}><ChevronDown /></span>
      </button>
      <div className={`eg-faq-answer ${open ? "eg-faq-answer--open" : ""}`}><p>{a}</p></div>
    </div>
  );
};

const ExpandableTestimonial: React.FC<{ t: typeof testimonials[number] }> = ({ t }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.text.length > 150;
  const displayText = isLong && !expanded ? t.text.slice(0, 150) + "..." : t.text;

  return (
    <div className="eg-review-card">
      <div className="eg-review-stars">{"★".repeat(5)}</div>
      <p className="eg-review-text">"{displayText}"</p>
      {isLong && (
        <button className="eg-review-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
      <div className="eg-review-author">
        <span className="eg-review-name">{t.name}</span>
        <span className="eg-review-location">{t.location}</span>
      </div>
    </div>
  );
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Estimate Modal ───

const estimateSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Email", field: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "Property Address", field: "address", type: "text", placeholder: "Street address, city" },
  { label: "What Are You Interested In?", field: "service", type: "select", placeholder: "Select services", options: [
    { value: "turf", label: "Artificial Turf" },
    { value: "pavers", label: "Pavers & Hardscape" },
    { value: "kitchen", label: "Outdoor Kitchen" },
    { value: "lighting", label: "Landscape Lighting" },
    { value: "patio", label: "Patio Cover" },
    { value: "full", label: "Full Yard Design" },
    { value: "other", label: "Something else" },
  ]},
  { label: "Anything Else", field: "notes", type: "textarea", placeholder: "Tell us about your vision, budget, or timeline..." },
];

const EstimateModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = estimateSteps.length;
  const current = estimateSteps[step];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const canProceed = () => {
    const val = data[current.field] || "";
    if (current.type === "textarea") return true;
    return val.trim().length > 0;
  };

  const handleNext = () => { if (step < totalSteps - 1) setStep(step + 1); else setSubmitted(true); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && canProceed()) { e.preventDefault(); handleNext(); } };

  return (
    <div className="eg-modal-overlay" onClick={onClose}>
      <div className="eg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="eg-modal_close" onClick={onClose}>&times;</button>
        {!submitted ? (
          <>
            <div className="eg-modal_progress"><div className="eg-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
            <div className="eg-modal_header">
              <span className="eg-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="eg-modal_title">{current.label}</h2>
            </div>
            <div className="eg-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="eg-modal_options">
                  {current.options!.map((opt) => (
                    <button key={opt.value} className={`eg-modal_option ${data[current.field] === opt.value ? "eg-modal_option--active" : ""}`} onClick={() => setData({ ...data, [current.field]: opt.value })}>{opt.label}</button>
                  ))}
                </div>
              ) : current.type === "textarea" ? (
                <textarea className="eg-input eg-textarea eg-modal_input" placeholder={current.placeholder} rows={4} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              ) : (
                <input className="eg-input eg-modal_input" type={current.type} placeholder={current.placeholder} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              )}
            </div>
            <div className="eg-modal_actions">
              {step > 0 && <button className="eg-btn eg-btn--outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="eg-btn eg-btn--primary" onClick={handleNext} disabled={!canProceed()} style={{ marginLeft: "auto" }}>{step === totalSteps - 1 ? "Submit" : "Continue"}</button>
            </div>
            <p className="eg-modal_hint">{current.type !== "select" && current.type !== "textarea" && "Press Enter to continue"}</p>
          </>
        ) : (
          <div className="eg-modal_success">
            <span className="eg-modal_success-icon">✓</span>
            <h2 className="eg-modal_success-title">Estimate requested!</h2>
            <p className="eg-modal_success-desc">We'll reach out within 24 hours to schedule your free on-site consultation. We're excited to help you transform your outdoor space.</p>
            <button className="eg-btn eg-btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Sections ───

const Nav: React.FC<{ onEstimate: () => void }> = ({ onEstimate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const nav = (id: string) => { setMobileOpen(false); scrollTo(id); };

  return (
    <nav className={`eg-nav ${scrolled ? "eg-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="eg-nav_inner">
        <button className="eg-nav_logo" onClick={() => nav("eg-hero")}>
          <span className="eg-nav_logo-name">Evergreen</span>
          <span className="eg-nav_logo-sub">Outdoor Design</span>
        </button>
        <div className="eg-nav_links">
          {["services", "projects", "process", "reviews"].map((item) => (
            <button key={item} onClick={() => nav(`eg-${item}`)} className={`eg-nav_link ${!scrolled ? "eg-nav_link--hero" : ""}`}>{item}</button>
          ))}
          <button onClick={onEstimate} className="eg-nav_cta">Free Estimate</button>
        </div>
        <button className="eg-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`eg-nav_hamburger-line ${!scrolled ? "eg-nav_hamburger-line--light" : ""} ${mobileOpen ? "eg-nav_hamburger-line--top-open" : "eg-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className={`eg-nav_hamburger-line ${!scrolled ? "eg-nav_hamburger-line--light" : ""}`} />}
          <div className={`eg-nav_hamburger-line ${!scrolled ? "eg-nav_hamburger-line--light" : ""} ${mobileOpen ? "eg-nav_hamburger-line--bottom-open" : "eg-nav_hamburger-line--bottom"}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="eg-nav_mobile-menu">
          {["services", "projects", "process", "reviews"].map((item) => (
            <button key={item} onClick={() => nav(`eg-${item}`)} className="eg-nav_mobile-link">{item}</button>
          ))}
          <button onClick={() => { setMobileOpen(false); onEstimate(); }} className="eg-nav_mobile-cta">Free Estimate</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onEstimate: () => void }> = ({ onEstimate }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const v = loaded ? "eg-reveal--visible" : "";
  return (
    <section id="eg-hero" className="eg-hero">
      <img src={heroImg} alt="" className="eg-hero_bg" />
      <div className="eg-hero_overlay" />
      <div className="eg-hero_content">
        <p className={`eg-hero_tagline eg-reveal ${v}`}>Landscaping & Hardscaping · Temecula, CA</p>
        <h1 className={`eg-hero_title eg-reveal eg-reveal--d1 ${v}`}>
          You didn't build this life<br />to come home to an<br /><span className="eg-hero_accent">ordinary backyard</span>
        </h1>
        <p className={`eg-hero_desc eg-reveal eg-reveal--d2 ${v}`}>
          Custom turf, pavers, outdoor kitchens, and lighting — designed and built by one team from start to finish.
        </p>
        <div className={`eg-hero_ctas eg-reveal eg-reveal--d3 ${v}`}>
          <button className="eg-btn eg-btn--primary eg-btn--lg" onClick={onEstimate}>Schedule Your Discovery Call</button>
          <button className="eg-btn eg-btn--outline-light" onClick={() => scrollTo("eg-projects")}>View Our Projects <ArrowRight size={12} /></button>
        </div>
        <p className={`eg-hero_scarcity eg-reveal eg-reveal--d3 ${v}`}>
          Currently accepting projects for Summer 2026. Limited availability.
        </p>
      </div>
    </section>
  );
};

const Pillars = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section ref={ref} className="eg-pillars">
      <div className="eg-pillars_inner">
        {pillars.map((p, i) => (
          <div key={p.word} className={`eg-pillar eg-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <h2 className="eg-pillar_word">{p.word}</h2>
            <p className="eg-pillar_desc">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ServicesSection: React.FC<{ onEstimate: () => void }> = ({ onEstimate }) => {
  const [ref, visible] = useReveal(0.45, 0.15);
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section id="eg-services" ref={ref} className="eg-services">
      <p className={`eg-section-label eg-reveal ${cls}`}>What We Do</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>Services built for <em>outdoor living</em></h2>
      <div className="eg-services_grid">
        {services.map((s, i) => (
          <div key={s.title} className={`eg-service-card eg-reveal ${cls}`} style={{ transitionDelay: `${0.15 * (i + 1)}s` }}>
            <div className="eg-service-card_img-wrap">
              <img src={s.img} alt={s.title} className="eg-service-card_img" />
            </div>
            <h3 className="eg-service-card_title">{s.title}</h3>
            <p className="eg-service-card_desc">{s.description}</p>
          </div>
        ))}
      </div>
      <div className={`eg-services_cta eg-reveal ${cls}`} style={{ transitionDelay: "0.6s" }}>
        <button className="eg-btn eg-btn--primary" onClick={onEstimate}>Get a Free Estimate</button>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="eg-projects" ref={ref} className="eg-projects">
      <p className={`eg-section-label eg-reveal ${cls}`}>Our Work</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>Recent <em>projects</em></h2>
      <div className="eg-projects_grid">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`eg-project-card eg-reveal ${cls}`}
            style={{ transitionDelay: `${0.12 * (i + 1)}s` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="eg-project-card_img">
              <img src={p.img} alt={p.title} className="eg-project-card_photo" />
            </div>
            <div className={`eg-project-card_overlay ${hovered === i ? "eg-project-card_overlay--visible" : ""}`}>
              <h3 className="eg-project-card_title">{p.title}</h3>
              <p className="eg-project-card_location">{p.location}</p>
              <p className="eg-project-card_scope">{p.scope}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── 3D Modeling Section — GSAP + ScrollTrigger Isometric Pavers ───

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Isometric projection
const ISO_A = Math.PI / 6;
const ISO_C = Math.cos(ISO_A);
const ISO_S = Math.sin(ISO_A);
const iso = (x: number, y: number, z: number) => ({
  x: (x - y) * ISO_C,
  y: (x + y) * ISO_S - z,
});

// Paver geometry generator
function makePaver(row: number, col: number, bw: number, bl: number, bh: number, gap: number) {
  const offX = row % 2 === 1 ? (bw + gap) / 2 : 0;
  const ox = col * (bw + gap) + offX;
  const oy = row * (bl + gap);
  const A = iso(ox, oy, bh), B = iso(ox + bw, oy, bh);
  const C = iso(ox + bw, oy + bl, bh), D = iso(ox, oy + bl, bh);
  const E = iso(ox, oy + bl, 0), F = iso(ox + bw, oy + bl, 0);
  const G = iso(ox + bw, oy, 0);
  const pt = (v: { x: number; y: number }) => `${v.x.toFixed(1)},${v.y.toFixed(1)}`;
  return {
    outline: `M${pt(A)} L${pt(B)} L${pt(G)} L${pt(F)} L${pt(E)} L${pt(D)} Z`,
    eBC: `M${pt(B)} L${pt(C)}`,
    eCD: `M${pt(C)} L${pt(D)}`,
    eCF: `M${pt(C)} L${pt(F)}`,
    vs: [A, B, C, D, E, F, G],
  };
}

// Layout: 5 pavers — straight walkway, alternating stagger
const PAVER_CFG = { bw: 28, bl: 52, bh: 16, gap: 26 };
const PAVER_GRID = [
  { row: 0, col: 0 },
  { row: 1, col: 0 }, { row: 1, col: 1 },
  { row: 2, col: 0 }, { row: 2, col: 1 },
];

const PAVER_DATA = PAVER_GRID.map((p) => ({
  ...p,
  geo: makePaver(p.row, p.col, PAVER_CFG.bw, PAVER_CFG.bl, PAVER_CFG.bh, PAVER_CFG.gap),
}));

// Compute viewBox from all vertices
const ALL_PTS = PAVER_DATA.flatMap((p) => p.geo.vs);
const VB = {
  x: Math.min(...ALL_PTS.map((v) => v.x)) - 20,
  y: Math.min(...ALL_PTS.map((v) => v.y)) - 40,
  x2: Math.max(...ALL_PTS.map((v) => v.x)) + 20,
  y2: Math.max(...ALL_PTS.map((v) => v.y)) + 20,
};
const VB_STR = `${VB.x} ${VB.y} ${VB.x2 - VB.x} ${VB.y2 - VB.y}`;

// Stagger order — randomised placement feel
const STAGGER_ORDER = [2, 0, 4, 1, 3];

const BrickDrawSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const groups = svg.querySelectorAll<SVGGElement>(".eg-paver-g");
    if (!groups.length) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      groups.forEach((g) => gsap.set(g, { opacity: 1, y: 0, rotation: 0 }));
      return;
    }

    // Set initial hidden state immediately (before GSAP timeline)
    gsap.set(groups, {
      opacity: 0,
      y: -25,
      rotation: -2,
      transformOrigin: "50% 50%",
    });

    // Delay GSAP initialization so RouteChangeHandler scroll-to-top runs first
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sorted = STAGGER_ORDER.map((idx) => groups[idx]);

        gsap.to(sorted, {
          opacity: 1,
          y: 0,
          rotation: 0,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            end: "top 10%",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      // Store context for cleanup
      (section as unknown as Record<string, unknown>).__gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(initTimer);
      const ctx = (section as unknown as Record<string, { revert: () => void }>).__gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="eg-brick-section">
      <div className="eg-brick-section_inner">
        <div className="eg-brick-section_text">
          <p className="eg-section-label">Visualize Before You Build</p>
          <h2 className="eg-section-heading">See your project in<br /><em>photorealistic 3D</em></h2>
          <p className="eg-brick-section_desc">
            No guessing, no surprises. Before we break ground, you'll walk through a photorealistic 3D rendering of your finished project — every paver, every plant, every light placement.
          </p>
          <p className="eg-brick-section_desc">
            We use industry-leading design software to model your exact property, test material combinations, and refine the layout until it's perfect. You approve the design before a single shovel hits the ground.
          </p>
          <div className="eg-brick-section_stats">
            <div className="eg-brick-section_stat">
              <span className="eg-brick-section_stat-value">100%</span>
              <span className="eg-brick-section_stat-label">of projects get 3D renders</span>
            </div>
            <div className="eg-brick-section_stat">
              <span className="eg-brick-section_stat-value">97%</span>
              <span className="eg-brick-section_stat-label">render-to-reality match rate</span>
            </div>
          </div>
        </div>

        <div className="eg-brick-section_visual">
          <svg
            ref={svgRef}
            viewBox={VB_STR}
            className="eg-brick-svg"
            fill="none"
          >
            {PAVER_DATA.map((p, i) => (
              <g key={i} className="eg-paver-g">
                <path d={p.geo.outline} stroke="rgba(62,88,50,0.6)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
                <path d={p.geo.eBC} stroke="rgba(62,88,50,0.35)" strokeWidth={1} strokeLinecap="round" />
                <path d={p.geo.eCD} stroke="rgba(62,88,50,0.35)" strokeWidth={1} strokeLinecap="round" />
                <path d={p.geo.eCF} stroke="rgba(62,88,50,0.45)" strokeWidth={1} strokeLinecap="round" />
              </g>
            ))}
          </svg>
          <p className="eg-brick-section_svg-label">Paver by paver. Designed with precision.</p>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section ref={ref} className="eg-why">
      <p className={`eg-section-label eg-reveal ${cls}`}>Why Choose Us</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>Built on <em>trust</em></h2>
      <div className="eg-why_grid">
        {whyUs.map((r, i) => (
          <div key={r.title} className={`eg-why_card eg-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <h3 className="eg-why_card-title">{r.title}</h3>
            <p className="eg-why_card-desc">{r.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  const [parallaxRef, offset] = useParallax();
  return (
    <section id="eg-process" ref={ref} className="eg-process">
      <div className="eg-process_bg" ref={parallaxRef as React.RefObject<HTMLDivElement>} style={{ transform: `translateY(${offset}px)` }} />
      <div className="eg-process_content">
        <p className={`eg-section-label eg-section-label--light eg-reveal ${cls}`}>Our Process</p>
        <h2 className={`eg-section-heading eg-section-heading--light eg-reveal eg-reveal--d1 ${cls}`}>Four steps to your <em>dream yard</em></h2>
        <div className="eg-process_grid">
          {steps.map((s, i) => (
            <div key={s.number} className={`eg-process_step eg-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
              <span className="eg-process_number">{s.number}</span>
              <h3 className="eg-process_title">{s.title}</h3>
              <p className="eg-process_desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section id="eg-reviews" ref={ref} className="eg-reviews">
      <p className={`eg-section-label eg-reveal ${cls}`}>Testimonials</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>What homeowners <em>say</em></h2>
      <div className="eg-reviews_grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`eg-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <ExpandableTestimonial t={t} />
          </div>
        ))}
      </div>
    </section>
  );
};

const Financing: React.FC<{ onEstimate: () => void }> = ({ onEstimate }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section ref={ref} className="eg-financing">
      <div className={`eg-financing_inner eg-reveal ${cls}`}>
        <div className="eg-financing_text">
          <p className="eg-section-label">Financing Available</p>
          <h2 className="eg-financing_heading">Payments as low as $199/mo</h2>
          <p className="eg-financing_desc">Don't let budget hold you back. We partner with GreenSky to offer flexible financing on all projects over $5,000. Most approvals take minutes.</p>
          <button className="eg-btn eg-btn--primary" onClick={onEstimate}>Get Started</button>
        </div>
        <div className="eg-financing_features">
          <div className="eg-financing_feature"><span className="eg-financing_feature-title">0% APR Options</span><span className="eg-financing_feature-desc">Promotional periods up to 18 months</span></div>
          <div className="eg-financing_feature"><span className="eg-financing_feature-title">Quick Approval</span><span className="eg-financing_feature-desc">Apply online in 2 minutes</span></div>
          <div className="eg-financing_feature"><span className="eg-financing_feature-title">No Prepayment Penalty</span><span className="eg-financing_feature-desc">Pay it off early with no fees</span></div>
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section ref={ref} className="eg-faq">
      <p className={`eg-section-label eg-reveal ${cls}`}>FAQ</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>Common <em>questions</em></h2>
      <div className={`eg-faq_list eg-reveal eg-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "eg-reveal--visible" : "";
  return (
    <section ref={ref} className="eg-areas">
      <p className={`eg-section-label eg-reveal ${cls}`}>Service Areas</p>
      <h2 className={`eg-section-heading eg-reveal eg-reveal--d1 ${cls}`}>Serving <em>Southwest Riverside County</em></h2>
      <div className={`eg-areas_grid eg-reveal eg-reveal--d2 ${cls}`}>
        {serviceAreas.map((area) => <span key={area} className="eg-area-pill">{area}</span>)}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="eg-footer">
    <div className="eg-footer_inner">
      <div className="eg-footer_brand">
        <span className="eg-footer_logo">Evergreen</span>
        <p className="eg-footer_sub">Outdoor Design · Temecula, CA</p>
        <p className="eg-footer_license">CSLB #1087654</p>
      </div>
      <div className="eg-footer_links">
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#eg-services" onClick={(e) => { e.preventDefault(); scrollTo("eg-services"); }}>Artificial Turf</a></li>
            <li><a href="#eg-services" onClick={(e) => { e.preventDefault(); scrollTo("eg-services"); }}>Pavers & Hardscape</a></li>
            <li><a href="#eg-services" onClick={(e) => { e.preventDefault(); scrollTo("eg-services"); }}>Outdoor Kitchens</a></li>
            <li><a href="#eg-services" onClick={(e) => { e.preventDefault(); scrollTo("eg-services"); }}>Landscape Lighting</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#eg-projects" onClick={(e) => { e.preventDefault(); scrollTo("eg-projects"); }}>Our Work</a></li>
            <li><a href="#eg-process" onClick={(e) => { e.preventDefault(); scrollTo("eg-process"); }}>Process</a></li>
            <li><a href="#eg-reviews" onClick={(e) => { e.preventDefault(); scrollTo("eg-reviews"); }}>Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19515550476">(951) 555-0476</a></li>
            <li><a href="mailto:hello@evergreenoutdoor.com">hello@evergreenoutdoor.com</a></li>
            <li>Mon–Sat · 7am–5pm</li>
          </ul>
        </div>
      </div>
      <div className="eg-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Evergreen Outdoor Design. All rights reserved.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="eg-footer_portfolio">Site by edwstudio</Link>
      </div>
    </div>
  </footer>
);

const StickyCta: React.FC<{ onEstimate: () => void }> = ({ onEstimate }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`eg-sticky-cta ${visible ? "eg-sticky-cta--visible" : ""}`}>
      <button className="eg-btn eg-btn--primary eg-btn--full" onClick={onEstimate}>Get a Free Estimate</button>
    </div>
  );
};

// ─── Main ───

const Landscaping = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => { window.scrollTo(0, 0); }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="eg-page">
      <Link to="/" state={{ scrollTo: "work" }} className="eg-back-link">&larr; Portfolio</Link>
      <Nav onEstimate={openModal} />
      <Hero onEstimate={openModal} />
      <Pillars />
      <ServicesSection onEstimate={openModal} />
      <Projects />
      <BrickDrawSection />
      <WhyUs />
      <Process />
      <Reviews />
      <Financing onEstimate={openModal} />
      <Faq />
      <ServiceAreas />
      <Footer />
      <StickyCta onEstimate={openModal} />
      {modalOpen && <EstimateModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Landscaping;
