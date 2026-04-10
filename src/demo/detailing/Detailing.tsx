import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./detailing.css";

import heroRevuelto from "./assets/revuelto.jpg";
import imgBmw from "./assets/bmwm4.jpg";
import imgPorsche from "./assets/porsche.jpg";
import imgSclass from "./assets/sclass.jpg";
import imgRs6 from "./assets/rs6.jpg";
import imgTesla from "./assets/tesla.jpg";
import imgCorvette from "./assets/corvette.jpg";

// ─── Data ───

const services = [
  {
    title: "Ceramic Coating",
    description:
      "Long-lasting hydrophobic protection that keeps your paint glossy and shielded from the elements. We use professional-grade coatings with up to 5 years of durability.",
    icon: "shield",
  },
  {
    title: "Paint Correction",
    description:
      "Multi-stage polishing to remove swirl marks, scratches, and oxidation. Restore your paint to a mirror-like finish that looks better than new.",
    icon: "sparkle",
  },
  {
    title: "Interior Detailing",
    description:
      "Deep cleaning, leather conditioning, and fabric protection for every surface inside your vehicle. We treat your interior like our own.",
    icon: "interior",
  },
  {
    title: "Maintenance Wash",
    description:
      "Hand wash with premium products to safely maintain your coating or protection. No automated brushes — ever.",
    icon: "droplet",
  },
];

const packages = [
  {
    name: "Essential",
    price: "149",
    description: "Perfect for regular upkeep",
    features: [
      "Hand wash & dry",
      "Wheel & tire cleaning",
      "Interior vacuum",
      "Dashboard & console wipe",
      "Window cleaning",
    ],
  },
  {
    name: "Premium",
    price: "299",
    description: "Our most popular package",
    features: [
      "Everything in Essential",
      "Clay bar treatment",
      "One-step polish",
      "Leather conditioning",
      "Engine bay cleaning",
      "Tire dressing",
    ],
    popular: true,
  },
  {
    name: "Signature",
    price: "549",
    description: "The full transformation",
    features: [
      "Everything in Premium",
      "Two-stage paint correction",
      "Ceramic spray sealant",
      "Headlight restoration",
      "Trim restoration",
      "Interior deep extraction",
    ],
  },
];

const testimonials = [
  {
    name: "Marcus R.",
    vehicle: "BMW M4",
    text: "I've taken my car to a lot of places but Diamond Touch is on a completely different level. The ceramic coating still beads water perfectly after 8 months.",
  },
  {
    name: "Sarah L.",
    vehicle: "Tesla Model 3",
    text: "They treated my car like it was their own. The paint correction removed every swirl mark and the interior looks brand new. Can't recommend them enough.",
  },
  {
    name: "David K.",
    vehicle: "Porsche 911",
    text: "Professional, detail-oriented, and genuinely passionate about what they do. My 911 has never looked this good — not even when I picked it up from the dealer.",
  },
];

const faqs = [
  {
    q: "How long does a ceramic coating last?",
    a: "Our professional-grade ceramic coatings last between 2 to 5 years depending on the package and maintenance. We offer annual inspections to ensure your coating stays in peak condition.",
  },
  {
    q: "How long does a full detail take?",
    a: "An Essential detail takes about 2-3 hours. Our Premium package runs 4-5 hours, and the Signature detail is a full-day service. We never rush — quality takes time.",
  },
  {
    q: "Do you offer mobile detailing?",
    a: "We operate out of our climate-controlled studio in Ontario, CA. This allows us to control lighting, dust, and temperature for the best possible results.",
  },
  {
    q: "Is paint correction safe for my car?",
    a: "Absolutely. We use paint depth gauges and professional-grade compounds to ensure safe, controlled correction. Your paint is in experienced hands.",
  },
  {
    q: "Do I need to prepare my car before dropping it off?",
    a: "Just remove personal belongings. We handle everything else — including a full pre-wash inspection before any work begins.",
  },
];

// ─── Hooks ───

function useReveal(desktopThreshold = 0.45, mobileThreshold = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const threshold = window.innerWidth <= 768 ? mobileThreshold : desktopThreshold;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    const t = setTimeout(() => io.observe(el), 400);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [desktopThreshold, mobileThreshold]);

  return [ref, visible] as const;
}

// ─── Icons ───

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3.5 3.5L13 4" />
  </svg>
);

const DiamondLogo: React.FC<{ size?: "sm" | "lg" }> = ({ size = "sm" }) => {
  const s = size === "lg" ? 1.4 : 1;
  return (
    <span className="dt-logo-mark" style={{ transform: `scale(${s})` }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="dt-logo-diamond">
        <path d="M14 1L26.5 10L14 27L1.5 10Z" stroke="#d4af37" strokeWidth="1.4" />
        <path d="M1.5 10H26.5" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
        <path d="M14 1L8 10L14 27L20 10Z" stroke="#d4af37" strokeWidth="0.8" opacity="0.35" />
      </svg>
      <span className="dt-logo-wordmark">
        <span className="dt-logo-primary">Diamond Touch</span>
        <span className="dt-logo-sub">Detailing</span>
      </span>
    </span>
  );
};

const ServiceIcon: React.FC<{ type: string }> = ({ type }) => {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    sparkle: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
      </svg>
    ),
    interior: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 3v18" />
      </svg>
    ),
    droplet: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  };
  return <span className="dt-service-icon">{icons[type]}</span>;
};

// ─── FAQ Item ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`dt-faq-item ${open ? "dt-faq-item--open" : ""}`}>
      <button className="dt-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`dt-faq-chevron ${open ? "dt-faq-chevron--open" : ""}`}>
          <ChevronDown />
        </span>
      </button>
      <div className={`dt-faq-answer ${open ? "dt-faq-answer--open" : ""}`}>
        <p>{a}</p>
      </div>
    </div>
  );
};

// ─── Sections ───

const Nav: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`dt-nav ${scrolled ? "dt-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="dt-nav_inner">
        <button className="dt-nav_logo" onClick={() => scrollTo("dt-hero")}>
          <DiamondLogo />
        </button>

        <div className="dt-nav_links">
          {["services", "gallery", "packages", "reviews", "faq"].map((item) => (
            <button key={item} onClick={() => scrollTo(`dt-${item}`)} className="dt-nav_link">
              {item}
            </button>
          ))}
          <button onClick={onQuote} className="dt-nav_cta">
            Get a Quote
          </button>
        </div>

        <button className="dt-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`dt-nav_hamburger-line ${mobileOpen ? "dt-nav_hamburger-line--top-open" : "dt-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="dt-nav_hamburger-line" />}
          <div className={`dt-nav_hamburger-line ${mobileOpen ? "dt-nav_hamburger-line--bottom-open" : "dt-nav_hamburger-line--bottom"}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="dt-nav_mobile-menu">
          {["services", "gallery", "packages", "reviews", "faq"].map((item) => (
            <button key={item} onClick={() => scrollTo(`dt-${item}`)} className="dt-nav_mobile-link">
              {item}
            </button>
          ))}
          <button onClick={() => { setMobileOpen(false); onQuote(); }} className="dt-nav_mobile-cta">
            Get a Quote
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);
  const v = loaded ? "dt-reveal--visible" : "";

  return (
    <section id="dt-hero" className="dt-hero">
      <img src={heroRevuelto} alt="" className="dt-hero_bg" />
      <div className="dt-hero_overlay" />
      <div className="dt-hero_content">
        <p className={`dt-hero_tagline dt-reveal ${v}`}>Premium Auto Detailing · Ontario, CA</p>
        <h1 className={`dt-hero_title dt-reveal dt-reveal--d1 ${v}`}>
          Your car deserves<br />
          <span className="dt-hero_title-accent">the perfect finish</span>
        </h1>
        <p className={`dt-hero_desc dt-reveal dt-reveal--d2 ${v}`}>
          Ceramic coatings, paint correction, and meticulous interior detailing — for owners who demand the best.
        </p>
        <div className={`dt-hero_ctas dt-reveal dt-reveal--d3 ${v}`}>
          <button className="dt-btn dt-btn--primary" onClick={onQuote}>
            Get a Free Quote
          </button>
          <button className="dt-btn dt-btn--outline" onClick={() => document.getElementById("dt-gallery")?.scrollIntoView({ behavior: "smooth" })}>
            See Our Work
          </button>
        </div>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  const stats = [
    { value: "500+", label: "Cars Detailed" },
    { value: "4.9", label: "Google Rating" },
    { value: "5yr", label: "Coating Warranty" },
    { value: "100%", label: "Satisfaction" },
  ];
  return (
    <section ref={ref} className="dt-trust">
      <div className="dt-trust_inner">
        {stats.map((s, i) => (
          <div key={s.label} className={`dt-trust_stat dt-reveal ${cls}`} style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="dt-trust_value">{s.value}</span>
            <span className="dt-trust_label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  return (
    <section id="dt-services" ref={ref} className="dt-services">
      <p className={`dt-section-label dt-reveal ${cls}`}>What We Do</p>
      <h2 className={`dt-section-heading dt-reveal dt-reveal--d1 ${cls}`}>
        Services built around <em>perfection</em>
      </h2>
      <div className="dt-services_grid">
        {services.map((s, i) => (
          <div key={s.title} className={`dt-service-card dt-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <ServiceIcon type={s.icon} />
            <h3 className="dt-service-card_title">{s.title}</h3>
            <p className="dt-service-card_desc">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  const items = [
    { label: "Ceramic Coating", sub: "BMW M4 — Full exterior coating", img: imgBmw },
    { label: "Paint Correction", sub: "Porsche 911 — Two-stage polish", img: imgPorsche },
    { label: "Interior Detail", sub: "Mercedes S-Class — Full restoration", img: imgSclass },
    { label: "Wheel Detail", sub: "Audi RS6 — Ceramic wheel coating", img: imgRs6 },
    { label: "Full Detail", sub: "Tesla Model 3 — Signature package", img: imgTesla },
    { label: "Paint Protection", sub: "Corvette C8 — Coating + PPF", img: imgCorvette },
  ];
  return (
    <section id="dt-gallery" ref={ref} className="dt-gallery">
      <p className={`dt-section-label dt-reveal ${cls}`}>Our Work</p>
      <h2 className={`dt-section-heading dt-reveal dt-reveal--d1 ${cls}`}>
        Results that <em>speak for themselves</em>
      </h2>
      <div className="dt-gallery_grid">
        {items.map((item, i) => (
          <div key={i} className={`dt-gallery_item dt-reveal ${cls}`} style={{ transitionDelay: `${0.15 * (i + 1)}s` }}>
            <img src={item.img} alt={item.label} className="dt-gallery_img" />
            <div className="dt-gallery_info">
              <span className="dt-gallery_label">{item.label}</span>
              <span className="dt-gallery_sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Packages: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  return (
    <section id="dt-packages" ref={ref} className="dt-packages">
      <p className={`dt-section-label dt-reveal ${cls}`}>Packages</p>
      <h2 className={`dt-section-heading dt-reveal dt-reveal--d1 ${cls}`}>
        Choose your level of <em>detail</em>
      </h2>
      <div className="dt-packages_grid">
        {packages.map((pkg, i) => (
          <div
            key={pkg.name}
            className={`dt-package-card ${pkg.popular ? "dt-package-card--popular" : ""} dt-reveal ${cls}`}
            style={{ transitionDelay: `${0.2 * (i + 1)}s` }}
          >
            {pkg.popular && <span className="dt-package-badge">Most Popular</span>}
            <h3 className="dt-package-name">{pkg.name}</h3>
            <p className="dt-package-price">
              <span className="dt-package-dollar">$</span>{pkg.price}
            </p>
            <p className="dt-package-desc">{pkg.description}</p>
            <ul className="dt-package-features">
              {pkg.features.map((f) => (
                <li key={f}><CheckIcon /> {f}</li>
              ))}
            </ul>
            <button className={`dt-btn ${pkg.popular ? "dt-btn--primary" : "dt-btn--outline"} dt-btn--full`} onClick={onQuote}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Reviews = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  return (
    <section id="dt-reviews" ref={ref} className="dt-reviews">
      <p className={`dt-section-label dt-reveal ${cls}`}>Testimonials</p>
      <h2 className={`dt-section-heading dt-reveal dt-reveal--d1 ${cls}`}>
        What our clients <em>say</em>
      </h2>
      <div className="dt-reviews_grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`dt-review-card dt-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <div className="dt-review-stars">{"★".repeat(5)}</div>
            <p className="dt-review-text">"{t.text}"</p>
            <div className="dt-review-author">
              <span className="dt-review-name">{t.name}</span>
              <span className="dt-review-vehicle">{t.vehicle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  return (
    <section id="dt-faq" ref={ref} className="dt-faq">
      <p className={`dt-section-label dt-reveal ${cls}`}>FAQ</p>
      <h2 className={`dt-section-heading dt-reveal dt-reveal--d1 ${cls}`}>
        Common <em>questions</em>
      </h2>
      <div className={`dt-faq_list dt-reveal dt-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
};

const Quote: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "dt-reveal--visible" : "";
  return (
    <section id="dt-quote" ref={ref} className="dt-quote">
      <div className={`dt-quote_inner dt-reveal ${cls}`}>
        <div className="dt-quote_text">
          <p className="dt-section-label">Ready?</p>
          <h2 className="dt-quote_heading">Get your free quote today</h2>
          <p className="dt-quote_desc">
            Tell us about your vehicle and what you're looking for. We'll get back to you within 24 hours with a custom quote.
          </p>
        </div>
        <form className="dt-quote_form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your name" className="dt-input" />
          <input type="email" placeholder="Email address" className="dt-input" />
          <input type="tel" placeholder="Phone number" className="dt-input" />
          <input type="text" placeholder="Vehicle (year, make, model)" className="dt-input" />
          <select className="dt-input dt-select" defaultValue="">
            <option value="" disabled>Select a service</option>
            <option value="ceramic">Ceramic Coating</option>
            <option value="paint">Paint Correction</option>
            <option value="interior">Interior Detailing</option>
            <option value="wash">Maintenance Wash</option>
            <option value="full">Full Detail Package</option>
          </select>
          <select className="dt-input dt-select" defaultValue="">
            <option value="" disabled>Preferred package</option>
            <option value="essential">Essential — $149</option>
            <option value="premium">Premium — $299</option>
            <option value="signature">Signature — $549</option>
            <option value="unsure">Not sure yet</option>
          </select>
          <textarea placeholder="Anything else we should know?" className="dt-input dt-textarea" rows={3} />
          <button type="submit" className="dt-btn dt-btn--primary dt-btn--full" onClick={(e) => { e.preventDefault(); onQuote(); }}>
            Submit Quote Request
          </button>
        </form>
      </div>
    </section>
  );
};

// ─── Multi-Step Quote Modal ───

const quoteSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Email", field: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "Your Vehicle", field: "vehicle", type: "text", placeholder: "Year, make, model" },
  { label: "Service", field: "service", type: "select", placeholder: "What are you looking for?", options: [
    { value: "ceramic", label: "Ceramic Coating" },
    { value: "paint", label: "Paint Correction" },
    { value: "interior", label: "Interior Detailing" },
    { value: "wash", label: "Maintenance Wash" },
    { value: "full", label: "Full Detail Package" },
  ]},
  { label: "Package", field: "package", type: "program-select", placeholder: "Preferred package", options: [
    { value: "essential", label: "Essential — $149", features: ["Hand wash & dry", "Wheel & tire cleaning", "Interior vacuum", "Window cleaning"] },
    { value: "premium", label: "Premium — $299", features: ["Clay bar treatment", "One-step polish", "Leather conditioning", "Engine bay cleaning"] },
    { value: "signature", label: "Signature — $549", features: ["Two-stage paint correction", "Ceramic spray sealant", "Headlight restoration", "Interior deep extraction"] },
    { value: "unsure", label: "Not sure yet" },
  ]},
  { label: "Preferred Date & Time", field: "datetime", type: "calendar", placeholder: "When works best for you?" },
  { label: "Anything Else", field: "notes", type: "textarea", placeholder: "Anything else we should know about your vehicle?" },
];

// ─── Calendar Picker ───

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const CalendarPicker: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const selectedDate = value ? value.split(" | ")[0] : "";
  const selectedTime = value ? value.split(" | ")[1] || "" : "";

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const selectDate = (day: number) => {
    const dateStr = `${viewMonth + 1}/${day}/${viewYear}`;
    onChange(selectedTime ? `${dateStr} | ${selectedTime}` : dateStr);
  };

  const selectTime = (time: string) => {
    onChange(selectedDate ? `${selectedDate} | ${time}` : `| ${time}`);
  };

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 0;
  };

  return (
    <div className="dt-calendar">
      <div className="dt-calendar_month-nav">
        <button className="dt-calendar_arrow" onClick={prevMonth}>&lsaquo;</button>
        <span className="dt-calendar_month">{monthName}</span>
        <button className="dt-calendar_arrow" onClick={nextMonth}>&rsaquo;</button>
      </div>

      <div className="dt-calendar_grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="dt-calendar_day-label">{d}</span>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${viewMonth + 1}/${day}/${viewYear}`;
          const disabled = isDisabled(day);
          return (
            <button
              key={day}
              className={`dt-calendar_day ${selectedDate === dateStr ? "dt-calendar_day--active" : ""} ${disabled ? "dt-calendar_day--disabled" : ""}`}
              onClick={() => !disabled && selectDate(day)}
              disabled={disabled}
            >
              {day}
            </button>
          );
        })}
      </div>

      {selectedDate && (
        <div className="dt-calendar_times">
          <p className="dt-calendar_times-label">Select a time</p>
          <div className="dt-calendar_time-grid">
            {timeSlots.map((t) => (
              <button
                key={t}
                className={`dt-calendar_time ${selectedTime === t ? "dt-calendar_time--active" : ""}`}
                onClick={() => selectTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const QuoteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = quoteSteps.length;
  const current = quoteSteps[step];

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
    if (current.type === "calendar") return val.includes(" | ") && val.split(" | ").every((s) => s.trim().length > 0);
    return val.trim().length > 0;
  };

  const handleNext = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else setSubmitted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed()) { e.preventDefault(); handleNext(); }
  };

  return (
    <div className="dt-modal-overlay" onClick={onClose}>
      <div className="dt-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dt-modal_close" onClick={onClose}>&times;</button>

        {!submitted ? (
          <>
            <div className="dt-modal_progress">
              <div className="dt-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
            </div>

            <div className="dt-modal_header">
              <span className="dt-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="dt-modal_title">{current.label}</h2>
            </div>

            <div className="dt-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="dt-modal_options">
                  {current.options!.map((opt) => (
                    <button
                      key={opt.value}
                      className={`dt-modal_option ${data[current.field] === opt.value ? "dt-modal_option--active" : ""}`}
                      onClick={() => setData({ ...data, [current.field]: opt.value })}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : current.type === "program-select" ? (
                <div className="dt-modal_options">
                  {current.options!.map((opt) => {
                    const isActive = data[current.field] === opt.value;
                    return (
                      <div key={opt.value} className={`dt-modal_program ${isActive ? "dt-modal_program--active" : ""}`}>
                        <button
                          className="dt-modal_program-btn"
                          onClick={() => setData({ ...data, [current.field]: opt.value })}
                        >
                          <span>{opt.label}</span>
                          <span className={`dt-modal_program-check ${isActive ? "dt-modal_program-check--visible" : ""}`}>✓</span>
                        </button>
                        {"features" in opt && isActive && (
                          <ul className="dt-modal_program-features">
                            {(opt as { features: string[] }).features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : current.type === "calendar" ? (
                <CalendarPicker
                  value={data[current.field] || ""}
                  onChange={(val) => setData({ ...data, [current.field]: val })}
                />
              ) : current.type === "textarea" ? (
                <textarea
                  className="dt-input dt-textarea dt-modal_input"
                  placeholder={current.placeholder}
                  rows={4}
                  value={data[current.field] || ""}
                  onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <input
                  className="dt-input dt-modal_input"
                  type={current.type}
                  placeholder={current.placeholder}
                  value={data[current.field] || ""}
                  onChange={(e) => setData({ ...data, [current.field]: e.target.value })}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              )}
            </div>

            <div className="dt-modal_actions">
              {step > 0 && (
                <button className="dt-btn dt-btn--outline" onClick={() => setStep(step - 1)}>Back</button>
              )}
              <button
                className="dt-btn dt-btn--primary"
                onClick={handleNext}
                disabled={!canProceed()}
                style={{ marginLeft: "auto" }}
              >
                {step === totalSteps - 1 ? "Submit" : "Continue"}
              </button>
            </div>

            <p className="dt-modal_hint">
              {current.type !== "select" && current.type !== "program-select" && current.type !== "textarea" && "Press Enter to continue"}
            </p>
          </>
        ) : (
          <div className="dt-modal_success">
            <span className="dt-modal_success-icon">✓</span>
            <h2 className="dt-modal_success-title">Quote requested!</h2>
            <p className="dt-modal_success-desc">
              We'll review your vehicle details and get back to you within 24 hours with a custom quote. Thanks for choosing Diamond Touch.
            </p>
            <button className="dt-btn dt-btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="dt-footer">
    <div className="dt-footer_inner">
      <div className="dt-footer_brand">
        <DiamondLogo size="lg" />
        <p className="dt-footer_address">Ontario, California</p>
      </div>
      <div className="dt-footer_links">
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="#dt-services" onClick={(e) => { e.preventDefault(); document.getElementById("dt-services")?.scrollIntoView({ behavior: "smooth" }); }}>Ceramic Coating</a></li>
            <li><a href="#dt-services" onClick={(e) => { e.preventDefault(); document.getElementById("dt-services")?.scrollIntoView({ behavior: "smooth" }); }}>Paint Correction</a></li>
            <li><a href="#dt-services" onClick={(e) => { e.preventDefault(); document.getElementById("dt-services")?.scrollIntoView({ behavior: "smooth" }); }}>Interior Detailing</a></li>
            <li><a href="#dt-services" onClick={(e) => { e.preventDefault(); document.getElementById("dt-services")?.scrollIntoView({ behavior: "smooth" }); }}>Maintenance Wash</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#dt-gallery" onClick={(e) => { e.preventDefault(); document.getElementById("dt-gallery")?.scrollIntoView({ behavior: "smooth" }); }}>Gallery</a></li>
            <li><a href="#dt-reviews" onClick={(e) => { e.preventDefault(); document.getElementById("dt-reviews")?.scrollIntoView({ behavior: "smooth" }); }}>Reviews</a></li>
            <li><a href="#dt-packages" onClick={(e) => { e.preventDefault(); document.getElementById("dt-packages")?.scrollIntoView({ behavior: "smooth" }); }}>Packages</a></li>
            <li><a href="#dt-faq" onClick={(e) => { e.preventDefault(); document.getElementById("dt-faq")?.scrollIntoView({ behavior: "smooth" }); }}>FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19095550147">(909) 555-0147</a></li>
            <li><a href="mailto:hello@diamondtouchdetailing.com">hello@diamondtouchdetailing.com</a></li>
            <li>Mon–Sat · 8am–6pm</li>
          </ul>
        </div>
      </div>
      <div className="dt-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Diamond Touch Detailing. All rights reserved.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="dt-footer_portfolio">
          Site by edwstudio
        </Link>
      </div>
    </div>
  </footer>
);

// ─── Mobile Sticky CTA ───

const StickyCta: React.FC<{ onQuote: () => void }> = ({ onQuote }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className={`dt-sticky-cta ${visible ? "dt-sticky-cta--visible" : ""}`}>
      <button className="dt-btn dt-btn--primary dt-btn--full" onClick={onQuote}>
        Get a Free Quote
      </button>
    </div>
  );
};

// ─── Main ───

const Detailing = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const preload = (src: string) => { const img = new Image(); img.src = src; };
    [imgBmw, imgPorsche, imgSclass, imgRs6, imgTesla, imgCorvette].forEach(preload);
  }, []);

  return (
    <div className="dt-page">
      <Link to="/" state={{ scrollTo: "work" }} className="dt-back-link">&larr; Portfolio</Link>
      <Nav onQuote={openQuote} />
      <Hero onQuote={openQuote} />
      <TrustBar />
      <Services />
      <Gallery />
      <Packages onQuote={openQuote} />
      <Reviews />
      <Faq />
      <Quote onQuote={openQuote} />
      <Footer />
      <StickyCta onQuote={openQuote} />
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </div>
  );
};

export default Detailing;
