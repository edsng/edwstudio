import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./fitness.css";

import trainerImg from "./assets/trainer.jpg";

// ─── Data ───

const barriers = [
  { objection: "I don't have time", answer: "Most sessions are 45 minutes. We build your plan around your calendar — not the other way around." },
  { objection: "I don't know where to start", answer: "That's exactly what I'm here for. You don't need experience — you need a coach who meets you where you are." },
  { objection: "I've tried before and quit", answer: "You didn't fail. The program failed you. We focus on consistency over perfection, and I hold you accountable." },
  { objection: "Gyms feel intimidating", answer: "This isn't a gym. It's 1-on-1 coaching with someone in your corner. No mirrors, no judgment, no ego." },
];

const stats = [
  { value: "300+", label: "Clients Coached" },
  { value: "92%", label: "Client Retention" },
  { value: "8+", label: "Years Experience" },
  { value: "4.9★", label: "Avg. Client Rating" },
];

const methodology = [
  { title: "Evidence-Based Programming", description: "Every plan is built on exercise science — progressive overload, periodization, and recovery protocols. No fads, no guessing." },
  { title: "Nutrition That Fits Your Life", description: "Flexible macro guidance instead of rigid meal plans. Eat foods you enjoy, hit your targets, and stop feeling guilty about what's on your plate." },
  { title: "Accountability Systems", description: "Weekly check-ins, progress tracking, and direct messaging. You're never left wondering if you're on track — I'm watching the data with you." },
  { title: "Sustainable Results", description: "We don't do crash diets or unsustainable training volumes. The goal is a body and lifestyle you can maintain for decades — not weeks." },
];

const programs = [
  {
    title: "Kickstart",
    subtitle: "For beginners",
    price: "$99",
    period: "/mo",
    duration: "6 weeks",
    features: ["Custom beginner program", "Form video library", "Weekly check-in", "Starter nutrition guide", "Direct messaging support"],
  },
  {
    title: "Performance",
    subtitle: "Most popular",
    price: "$249",
    period: "/mo",
    duration: "12 weeks",
    popular: true,
    features: ["Fully custom programming", "Macro-based nutrition plan", "Weekly video check-ins", "Form review & corrections", "Unlimited messaging", "Program adjustments"],
  },
  {
    title: "Elite",
    subtitle: "For serious athletes",
    price: "$399",
    period: "/mo",
    duration: "Ongoing",
    features: ["Daily programming updates", "Advanced periodization", "Competition prep available", "Bi-weekly video calls", "Recovery & mobility protocols", "Priority response time"],
  },
];

const transformations = [
  { name: "Marcus T.", before: "228 lbs · 28% BF", after: "186 lbs · 16% BF", duration: "5 months", quote: "I stopped trying to out-exercise a bad diet. Coach helped me fix both." },
  { name: "Sarah K.", before: "Never lifted", after: "First pull-up at 34", duration: "4 months", quote: "I went from being afraid of the barbell to deadlifting my body weight." },
  { name: "David R.", before: "Deadlift: 225 lbs", after: "Deadlift: 405 lbs", duration: "8 months", quote: "The programming is methodical. Every week builds on the last. Zero injuries." },
];

const steps = [
  { number: "01", title: "Free Call", description: "15-minute conversation about where you are and where you want to be. Zero pressure." },
  { number: "02", title: "Your Plan", description: "I build your training and nutrition protocol from scratch. You review it before we start." },
  { number: "03", title: "Execute", description: "You train. I monitor, adjust, and keep you accountable through weekly check-ins." },
  { number: "04", title: "Evolve", description: "As you progress, your plan progresses. We're always moving toward the next goal." },
];

const faqs = [
  { q: "What makes this different from a regular gym membership?", a: "A gym gives you access to equipment. I give you a system — custom programming, nutrition guidance, weekly accountability, and someone who adjusts your plan based on real data. Most people don't need more equipment. They need better direction." },
  { q: "I can only train 3 days a week. Is that enough?", a: "Absolutely. Frequency matters less than consistency and intensity. I've built programs that deliver serious results on 3 sessions per week. We optimize every minute." },
  { q: "Do I need to eat chicken and rice every day?", a: "No. I use flexible dieting — you get macro targets, not a meal plan. Eat foods you actually enjoy. The best nutrition plan is one you can stick to." },
  { q: "Can I train at home?", a: "Yes. Tell me what equipment you have and I'll program around it. I've written effective plans for everything from a full gym to a pair of dumbbells." },
  { q: "How fast will I see results?", a: "Most clients notice improved energy, sleep, and strength within 2-3 weeks. Visible body composition changes typically happen around weeks 6-8. Sustainable transformation is a 12+ week process." },
  { q: "What if I need to cancel?", a: "Cancel anytime with 30 days notice. No contracts, no cancellation fees. If the coaching isn't working for you, I want to know why — not trap you into paying." },
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

// ─── Icons ───

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4" /></svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 4" /></svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

// ─── Small Components ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fp-faq-item ${open ? "fp-faq-item--open" : ""}`}>
      <button className="fp-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`fp-faq-chevron ${open ? "fp-faq-chevron--open" : ""}`}><ChevronDown /></span>
      </button>
      <div className={`fp-faq-answer ${open ? "fp-faq-answer--open" : ""}`}><p>{a}</p></div>
    </div>
  );
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Sections ───

const Nav: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const nav = (id: string) => { setMobileOpen(false); scrollTo(id); };

  return (
    <nav className={`fp-nav ${scrolled ? "fp-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="fp-nav_inner">
        <button className="fp-nav_logo" onClick={() => nav("fp-hero")}>
          <span className="fp-nav_logo-mark">FORGE</span>
        </button>
        <div className="fp-nav_links">
          {["approach", "programs", "results", "faq"].map((item) => (
            <button key={item} onClick={() => nav(`fp-${item}`)} className="fp-nav_link">{item}</button>
          ))}
          <button onClick={onBook} className="fp-nav_cta">Book a Call</button>
        </div>
        <button className="fp-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`fp-nav_hamburger-line ${mobileOpen ? "fp-nav_hamburger-line--top-open" : "fp-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="fp-nav_hamburger-line" />}
          <div className={`fp-nav_hamburger-line ${mobileOpen ? "fp-nav_hamburger-line--bottom-open" : "fp-nav_hamburger-line--bottom"}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="fp-nav_mobile-menu">
          {["approach", "programs", "results", "faq"].map((item) => (
            <button key={item} onClick={() => nav(`fp-${item}`)} className="fp-nav_mobile-link">{item}</button>
          ))}
          <button onClick={() => { setMobileOpen(false); onBook(); }} className="fp-nav_mobile-cta">Book a Call</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const v = loaded ? "fp-reveal--visible" : "";

  return (
    <section id="fp-hero" className="fp-hero">
      <div className="fp-hero_overlay" />
      <div className="fp-hero_content">
        <p className={`fp-hero_tagline fp-reveal ${v}`}>Personal Training · Rancho Cucamonga, CA</p>
        <h1 className={`fp-hero_title fp-reveal fp-reveal--d1 ${v}`}>
          You don't need<br />motivation.<br />
          <span className="fp-hero_accent">You need a system.</span>
        </h1>
        <p className={`fp-hero_desc fp-reveal fp-reveal--d2 ${v}`}>
          Evidence-based coaching for people who are done guessing. Custom programming, real accountability, and results you can measure.
        </p>
        <div className={`fp-hero_ctas fp-reveal fp-reveal--d3 ${v}`}>
          <button className="fp-btn fp-btn--primary" onClick={onBook}>Book a Free Call</button>
          <button className="fp-btn fp-btn--outline" onClick={() => scrollTo("fp-approach")}>How It Works <ArrowRight size={12} /></button>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section ref={ref} className="fp-trust">
      <div className="fp-trust_inner">
        {stats.map((s, i) => (
          <div key={s.label} className={`fp-trust_stat fp-reveal ${cls}`} style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="fp-trust_value">{s.value}</span>
            <span className="fp-trust_label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Barriers = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section ref={ref} className="fp-barriers">
      <div className="fp-barriers_inner">
        <div className={`fp-reveal ${cls}`}>
          <p className="fp-section-label">Sound Familiar?</p>
          <h2 className="fp-section-heading">The things that<br />have <em>stopped you</em></h2>
          <p className="fp-barriers_sub">
            Most people don't lack willpower. They lack a plan that actually fits their life. Here's what I hear from almost every new client:
          </p>
        </div>
        <div className="fp-barriers_list">
          {barriers.map((b, i) => (
            <div key={i} className={`fp-barrier fp-reveal ${cls}`} style={{ transitionDelay: `${0.1 * (i + 1)}s` }}>
              <p className="fp-barrier_objection">"{b.objection}"</p>
              <p className="fp-barrier_answer">{b.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 3D Stats Data ───

const impactStats = [
  { value: "2.4M", label: "Pounds lifted by clients", sub: "across all programs" },
  { value: "12,800+", label: "Sessions coached", sub: "and counting" },
  { value: "6x", label: "More likely to stick", sub: "vs. training alone" },
  { value: "94%", label: "Hit their goal weight", sub: "within 6 months" },
];

// ─── Option A: 3D Rotating Panel ───

const StatsOptionA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const raw = 1 - (rect.top - windowH * 0.15) / (windowH * 0.65);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rotateX = 35 * (1 - progress);
  const rotateY = -15 * (1 - progress);
  const scale = 0.85 + 0.15 * progress;
  const opacity = 0.3 + 0.7 * progress;

  return (
    <section ref={sectionRef} className="fp-stats3d">
      <div className="fp-stats3d_viewport">
        <div
          className="fp-stats3d_panel"
          style={{
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
          }}
        >
          <p className="fp-section-label" style={{ textAlign: "center" }}>The Impact</p>
          <h2 className="fp-stats3d_heading">Numbers that <em>matter</em></h2>
          <div className="fp-stats3d_grid">
            {impactStats.map((s, i) => (
              <div key={i} className="fp-stats3d_item" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="fp-stats3d_value">{s.value}</span>
                <span className="fp-stats3d_label">{s.label}</span>
                <span className="fp-stats3d_sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Approach = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section id="fp-approach" ref={ref} className="fp-approach">
      <p className={`fp-section-label fp-reveal ${cls}`}>The Approach</p>
      <h2 className={`fp-section-heading fp-reveal fp-reveal--d1 ${cls}`}>This isn't a workout plan.<br /><em>It's a coaching system.</em></h2>
      <div className="fp-approach_grid">
        {methodology.map((m, i) => (
          <div key={m.title} className={`fp-approach_card fp-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <span className="fp-approach_number">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="fp-approach_title">{m.title}</h3>
            <p className="fp-approach_desc">{m.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Coach = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section ref={ref} className="fp-coach">
      <div className="fp-coach_grid">
        <div className={`fp-coach_photo fp-reveal ${cls}`}>
          <img src={trainerImg} alt="Coach Marcus Reyes" className="fp-coach_photo-img" />
        </div>
        <div className={`fp-reveal fp-reveal--d2 ${cls}`}>
          <p className="fp-section-label">Your Coach</p>
          <h2 className="fp-coach_name">Marcus Reyes</h2>
          <p className="fp-coach_credentials">NASM-CPT · Precision Nutrition L1 · USAW L1</p>
          <p className="fp-coach_bio">
            8 years of coaching. 300+ clients. From complete beginners who'd never touched a barbell to competitive athletes chasing national records. I got into this because I watched people waste years following bad advice. My job is to give you the roadmap — and make sure you actually follow it.
          </p>
          <blockquote className="fp-coach_quote">
            "I don't believe in motivation. I believe in systems, consistency, and showing up for the people I coach."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

const ProgramsSection: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section id="fp-programs" ref={ref} className="fp-programs">
      <p className={`fp-section-label fp-reveal ${cls}`}>Programs</p>
      <h2 className={`fp-section-heading fp-reveal fp-reveal--d1 ${cls}`}>Pick your <em>level</em></h2>
      <div className="fp-programs_grid">
        {programs.map((p, i) => (
          <div key={p.title} className={`fp-program-card ${p.popular ? "fp-program-card--popular" : ""} fp-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            {p.popular && <span className="fp-program-badge">Most Popular</span>}
            <p className="fp-program-subtitle">{p.subtitle}</p>
            <h3 className="fp-program-card_title">{p.title}</h3>
            <p className="fp-program-card_price"><span className="fp-program-dollar">{p.price}</span>{p.period}</p>
            <p className="fp-program-card_duration">{p.duration} commitment</p>
            <ul className="fp-program-features">
              {p.features.map((f) => <li key={f}><CheckIcon /> {f}</li>)}
            </ul>
            <button className={`fp-btn ${p.popular ? "fp-btn--primary" : "fp-btn--outline"} fp-btn--full`} onClick={onBook}>Get Started</button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Results = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section id="fp-results" ref={ref} className="fp-results">
      <p className={`fp-section-label fp-reveal ${cls}`}>Client Results</p>
      <h2 className={`fp-section-heading fp-reveal fp-reveal--d1 ${cls}`}>The work <em>speaks</em></h2>
      <div className="fp-results_grid">
        {transformations.map((t, i) => (
          <div key={i} className={`fp-result-card fp-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <div className="fp-result-card_comparison">
              <div className="fp-result-card_before">
                <span className="fp-result-label">Before</span>
                <p className="fp-result-stat">{t.before}</p>
              </div>
              <div className="fp-result-card_arrow">→</div>
              <div className="fp-result-card_after">
                <span className="fp-result-label">After</span>
                <p className="fp-result-stat">{t.after}</p>
              </div>
            </div>
            <p className="fp-result-duration">{t.duration}</p>
            <p className="fp-result-quote">"{t.quote}"</p>
            <p className="fp-result-name">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Process = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section ref={ref} className="fp-process">
      <p className={`fp-section-label fp-reveal ${cls}`}>The Process</p>
      <h2 className={`fp-section-heading fp-reveal fp-reveal--d1 ${cls}`}>From call to <em>results</em></h2>
      <div className="fp-process_timeline">
        {steps.map((s, i) => (
          <div key={s.number} className={`fp-process_step fp-reveal ${cls}`} style={{ transitionDelay: `${0.25 * (i + 1)}s` }}>
            <div className="fp-process_marker">
              <span className="fp-process_number">{s.number}</span>
              {i < steps.length - 1 && <div className="fp-process_line" />}
            </div>
            <div className="fp-process_content">
              <h3 className="fp-process_title">{s.title}</h3>
              <p className="fp-process_desc">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section id="fp-faq" ref={ref} className="fp-faq">
      <p className={`fp-section-label fp-reveal ${cls}`}>FAQ</p>
      <h2 className={`fp-section-heading fp-reveal fp-reveal--d1 ${cls}`}>Straight <em>answers</em></h2>
      <div className={`fp-faq_list fp-reveal fp-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  );
};

const Book: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "fp-reveal--visible" : "";
  return (
    <section id="fp-book" ref={ref} className="fp-book">
      <div className={`fp-book_inner fp-reveal ${cls}`}>
        <div className="fp-book_text">
          <p className="fp-section-label">Let's Talk</p>
          <h2 className="fp-book_heading">15 minutes could change the next 12 months.</h2>
          <p className="fp-book_desc">No sales pitch. No commitment. Just an honest conversation about your goals and whether coaching is the right move for you.</p>
        </div>
        <form className="fp-book_form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your name" className="fp-input" />
          <input type="email" placeholder="Email address" className="fp-input" />
          <input type="tel" placeholder="Phone number" className="fp-input" />
          <select className="fp-input fp-select" defaultValue="">
            <option value="" disabled>What's your main goal?</option>
            <option value="fat-loss">Lose body fat</option>
            <option value="muscle">Build muscle</option>
            <option value="strength">Get stronger</option>
            <option value="start">Just getting started</option>
            <option value="other">Something else</option>
          </select>
          <textarea placeholder="Anything else I should know?" className="fp-input fp-textarea" rows={3} />
          <button type="submit" className="fp-btn fp-btn--primary fp-btn--full" onClick={(e) => { e.preventDefault(); onBook(); }}>Book My Free Call</button>
        </form>
      </div>
    </section>
  );
};

// ─── Multi-Step Booking Modal ───

const bookingSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Email", field: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "Your Goal", field: "goal", type: "select", placeholder: "What's your main goal?", options: [
    { value: "fat-loss", label: "Lose body fat" },
    { value: "muscle", label: "Build muscle" },
    { value: "strength", label: "Get stronger" },
    { value: "start", label: "Just getting started" },
    { value: "other", label: "Something else" },
  ]},
  { label: "Interested In", field: "program", type: "program-select", placeholder: "Which program interests you?", options: [
    { value: "kickstart", label: "Kickstart — $99/mo", features: ["Custom beginner program", "Form video library", "Weekly check-in", "Starter nutrition guide"] },
    { value: "performance", label: "Performance — $249/mo", features: ["Fully custom programming", "Macro-based nutrition plan", "Weekly video check-ins", "Unlimited messaging"] },
    { value: "elite", label: "Elite — $399/mo", features: ["Daily programming updates", "Advanced periodization", "Bi-weekly video calls", "Priority response time"] },
    { value: "unsure", label: "Not sure yet" },
  ]},
  { label: "Anything Else", field: "notes", type: "textarea", placeholder: "Tell me about your goals, schedule, or anything else I should know..." },
];

const BookingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = bookingSteps.length;
  const current = bookingSteps[step];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const canProceed = () => {
    const val = data[current.field] || "";
    if (current.type === "textarea") return true;
    return val.trim().length > 0;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed()) {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div className="fp-modal-overlay" onClick={onClose}>
      <div className="fp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="fp-modal_close" onClick={onClose}>&times;</button>

        {!submitted ? (
          <>
            <div className="fp-modal_progress">
              <div className="fp-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
            </div>

            <div className="fp-modal_header">
              <span className="fp-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="fp-modal_title">{current.label}</h2>
            </div>

            <div className="fp-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="fp-modal_options">
                  {current.options!.map((opt) => (
                    <button
                      key={opt.value}
                      className={`fp-modal_option ${data[current.field] === opt.value ? "fp-modal_option--active" : ""}`}
                      onClick={() => setData({ ...data, [current.field]: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : current.type === "program-select" ? (
                <div className="fp-modal_options">
                  {current.options!.map((opt) => {
                    const isActive = data[current.field] === opt.value;
                    return (
                      <div key={opt.value} className={`fp-modal_program ${isActive ? "fp-modal_program--active" : ""}`}>
                        <button
                          className="fp-modal_program-btn"
                          onClick={() => setData({ ...data, [current.field]: opt.value })}
                        >
                          <span className="fp-modal_program-label">{opt.label}</span>
                          <span className={`fp-modal_program-check ${isActive ? "fp-modal_program-check--visible" : ""}`}>✓</span>
                        </button>
                        {"features" in opt && isActive && (
                          <ul className="fp-modal_program-features">
                            {(opt as { features: string[] }).features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : current.type === "textarea" ? (
                <textarea
                  className="fp-input fp-textarea fp-modal_input"
                  placeholder={current.placeholder}
                  rows={4}
                  value={data[current.field] || ""}
                  onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <input
                  className="fp-input fp-modal_input"
                  type={current.type}
                  placeholder={current.placeholder}
                  value={data[current.field] || ""}
                  onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}
            </div>

            <div className="fp-modal_actions">
              {step > 0 && (
                <button className="fp-btn fp-btn--outline" onClick={() => setStep(step - 1)}>Back</button>
              )}
              <button
                className="fp-btn fp-btn--primary"
                onClick={handleNext}
                disabled={!canProceed()}
                style={{ marginLeft: "auto" }}
              >
                {step === totalSteps - 1 ? "Submit" : "Continue"}
              </button>
            </div>

            <p className="fp-modal_hint">
              {current.type !== "select" && current.type !== "textarea" && "Press Enter to continue"}
            </p>
          </>
        ) : (
          <div className="fp-modal_success">
            <span className="fp-modal_success-icon">✓</span>
            <h2 className="fp-modal_success-title">You're booked!</h2>
            <p className="fp-modal_success-desc">
              I'll reach out within 24 hours to schedule your free consultation. Looking forward to talking about your goals.
            </p>
            <button className="fp-btn fp-btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="fp-footer">
    <div className="fp-footer_inner">
      <div className="fp-footer_brand">
        <span className="fp-footer_logo">FORGE</span>
        <p className="fp-footer_sub">Performance Coaching</p>
        <p className="fp-footer_address">Rancho Cucamonga, California</p>
      </div>
      <div className="fp-footer_links">
        <div>
          <h4>Coaching</h4>
          <ul>
            <li><a href="#fp-programs" onClick={(e) => { e.preventDefault(); scrollTo("fp-programs"); }}>Kickstart</a></li>
            <li><a href="#fp-programs" onClick={(e) => { e.preventDefault(); scrollTo("fp-programs"); }}>Performance</a></li>
            <li><a href="#fp-programs" onClick={(e) => { e.preventDefault(); scrollTo("fp-programs"); }}>Elite</a></li>
            <li><a href="#fp-approach" onClick={(e) => { e.preventDefault(); scrollTo("fp-approach"); }}>Our Approach</a></li>
          </ul>
        </div>
        <div>
          <h4>Learn More</h4>
          <ul>
            <li><a href="#fp-results" onClick={(e) => { e.preventDefault(); scrollTo("fp-results"); }}>Client Results</a></li>
            <li><a href="#fp-faq" onClick={(e) => { e.preventDefault(); scrollTo("fp-faq"); }}>FAQ</a></li>
            <li><a href="#fp-book" onClick={(e) => { e.preventDefault(); scrollTo("fp-book"); }}>Book a Call</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19095550391">(909) 555-0391</a></li>
            <li><a href="mailto:coach@forgeperformance.com">coach@forgeperformance.com</a></li>
            <li>Mon–Sat · 6am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="fp-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Forge Performance Coaching. All rights reserved.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="fp-footer_portfolio">Site by edwstudio</Link>
      </div>
    </div>
  </footer>
);

const StickyCta: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`fp-sticky-cta ${visible ? "fp-sticky-cta--visible" : ""}`}>
      <button className="fp-btn fp-btn--primary fp-btn--full" onClick={onBook}>Book a Free Consultation</button>
    </div>
  );
};

// ─── Main ───

const Fitness = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="fp-page">
      <Link to="/" state={{ scrollTo: "work" }} className="fp-back-link">&larr; Portfolio</Link>
      <Nav onBook={openBooking} />
      <Hero onBook={openBooking} />
      <TrustBar />
      <Barriers />
      <StatsOptionA />
      <Approach />
      <Coach />
      <ProgramsSection onBook={openBooking} />
      <Results />
      <Process />
      <Faq />
      <Book onBook={openBooking} />
      <Footer />
      <StickyCta onBook={openBooking} />
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
};

export default Fitness;
