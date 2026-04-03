import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./medspa.css";

import heroImg from "./assets/hero.jpg";
import providerImg from "./assets/provider.jpg";
import ctaImg from "./assets/cta.jpg";
import imgBotox from "./assets/botox.jpg";
import imgDermal from "./assets/dermal.jpg";
import imgPeels from "./assets/peels.jpg";
import imgMicroneedling from "./assets/microneedling.jpg";
import imgHydrafacial from "./assets/hydrafacial.jpg";
import imgLed from "./assets/led.jpg";

// ─── Data ───

const stats = [
  { value: "10+", label: "Years in Aesthetics" },
  { value: "5,000+", label: "Treatments Performed" },
  { value: "4.9★", label: "Average Rating" },
  { value: "98%", label: "Client Satisfaction" },
];

const treatments = [
  { title: "Botox & Dysport", description: "Smooth fine lines and wrinkles with precision-placed neuromodulators. Natural results that let you look refreshed — never frozen.", category: "Injectables", img: imgBotox },
  { title: "Dermal Fillers", description: "Restore volume, enhance contours, and soften deep folds with Juvederm, Restylane, and RHA collections.", category: "Injectables", img: imgDermal },
  { title: "Chemical Peels", description: "Targeted peels for acne, hyperpigmentation, and texture. From gentle brightening to clinical-grade resurfacing.", category: "Skin Rejuvenation", img: imgPeels },
  { title: "Microneedling", description: "Stimulate collagen production and improve skin texture, tone, and scarring with SkinPen microneedling.", category: "Skin Rejuvenation", img: imgMicroneedling },
  { title: "HydraFacial", description: "Deep cleanse, extract, and hydrate in one treatment. Customizable boosters for your specific skin concerns.", category: "Facials", img: imgHydrafacial },
  { title: "LED Light Therapy", description: "Non-invasive light therapy to reduce inflammation, stimulate collagen, and accelerate healing.", category: "Facials", img: imgLed },
];

const whyUs = [
  { title: "Board-Certified Provider", description: "Every treatment is performed or supervised by a board-certified nurse practitioner with 10+ years of aesthetic experience." },
  { title: "Medical-Grade Products", description: "We use only FDA-cleared devices and medical-grade skincare — SkinMedica, ZO Skin Health, and SkinCeuticals." },
  { title: "Personalized Approach", description: "No cookie-cutter treatments. Every plan starts with a thorough skin assessment and honest consultation." },
  { title: "Comfortable Environment", description: "Our clinic is designed to feel calm, private, and welcoming. We want you to relax from the moment you walk in." },
];

const testimonials = [
  { name: "Michelle R.", text: "I was nervous about trying Botox for the first time, but the team here made me feel completely at ease. The results are so natural — my friends just think I look well-rested.", treatment: "Botox" },
  { name: "Priya K.", text: "The HydraFacial is now part of my monthly routine. My skin has never looked this clear and even. The staff remembers my preferences every visit.", treatment: "HydraFacial" },
  { name: "Lauren T.", text: "After years of dealing with acne scars, microneedling finally gave me the results I wanted. The provider took time to explain everything and set realistic expectations.", treatment: "Microneedling" },
];

const faqs = [
  { q: "Is Botox safe?", a: "Yes. Botox and Dysport are FDA-approved and have been used safely in aesthetic medicine for over 20 years. Side effects are rare and typically mild — small bruise or temporary redness at the injection site." },
  { q: "How do I know which treatment is right for me?", a: "That's what the consultation is for. We assess your skin, discuss your goals, and recommend a treatment plan tailored to you. No pressure to commit during your first visit." },
  { q: "How long do results last?", a: "It depends on the treatment. Botox typically lasts 3-4 months. Fillers can last 6-18 months. We'll give you a clear timeline during your consultation." },
  { q: "Is there downtime?", a: "Most treatments have minimal to no downtime. Botox and HydraFacials require none. Chemical peels and microneedling may involve 2-5 days of mild peeling or redness." },
  { q: "Do you offer financing?", a: "Yes. We offer CareCredit and Cherry financing for treatment plans over $500. We also run seasonal promotions — ask about current offers during your visit." },
  { q: "What should I do before my appointment?", a: "Avoid blood thinners, alcohol, and retinoids 24-48 hours before injectable treatments. Come with a clean face for facial treatments. We'll send detailed pre-care instructions after booking." },
];

const pressLogos = ["Allure", "Vogue", "Harper's Bazaar", "Elle", "Women's Health"];

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

// ─── Small Components ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rs-faq-item ${open ? "rs-faq-item--open" : ""}`}>
      <button className="rs-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`rs-faq-chevron ${open ? "rs-faq-chevron--open" : ""}`}><ChevronDown /></span>
      </button>
      <div className={`rs-faq-answer ${open ? "rs-faq-answer--open" : ""}`}><p>{a}</p></div>
    </div>
  );
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Booking Modal ───

const bookingSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Email", field: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "I'm Interested In", field: "treatment", type: "select", placeholder: "Select a treatment", options: [
    { value: "botox", label: "Botox / Dysport" },
    { value: "fillers", label: "Dermal Fillers" },
    { value: "peels", label: "Chemical Peels" },
    { value: "microneedling", label: "Microneedling" },
    { value: "hydrafacial", label: "HydraFacial" },
    { value: "consultation", label: "General Consultation" },
  ]},
  { label: "Anything Else", field: "notes", type: "textarea", placeholder: "Tell us about your skin concerns or goals..." },
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
    <div className="rs-modal-overlay" onClick={onClose}>
      <div className="rs-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rs-modal_close" onClick={onClose}>&times;</button>
        {!submitted ? (
          <>
            <div className="rs-modal_progress"><div className="rs-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
            <div className="rs-modal_header">
              <span className="rs-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="rs-modal_title">{current.label}</h2>
            </div>
            <div className="rs-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="rs-modal_options">
                  {current.options!.map((opt) => (
                    <button key={opt.value} className={`rs-modal_option ${data[current.field] === opt.value ? "rs-modal_option--active" : ""}`} onClick={() => setData({ ...data, [current.field]: opt.value })}>{opt.label}</button>
                  ))}
                </div>
              ) : current.type === "textarea" ? (
                <textarea className="rs-input rs-textarea rs-modal_input" placeholder={current.placeholder} rows={4} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              ) : (
                <input className="rs-input rs-modal_input" type={current.type} placeholder={current.placeholder} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              )}
            </div>
            <div className="rs-modal_actions">
              {step > 0 && <button className="rs-btn rs-btn--outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="rs-btn rs-btn--primary" onClick={handleNext} disabled={!canProceed()} style={{ marginLeft: "auto" }}>{step === totalSteps - 1 ? "Submit" : "Continue"}</button>
            </div>
            <p className="rs-modal_hint">{current.type !== "select" && current.type !== "textarea" && "Press Enter to continue"}</p>
          </>
        ) : (
          <div className="rs-modal_success">
            <span className="rs-modal_success-icon">✓</span>
            <h2 className="rs-modal_success-title">Consultation booked!</h2>
            <p className="rs-modal_success-desc">We'll reach out within 24 hours to confirm your appointment. We look forward to helping you feel your best.</p>
            <button className="rs-btn rs-btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

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
    <nav className={`rs-nav ${scrolled ? "rs-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="rs-nav_inner">
        <button className="rs-nav_logo" onClick={() => nav("rs-hero")}>
          <span className="rs-nav_logo-name">Radiant Skin</span>
          <span className="rs-nav_logo-sub">Aesthetics</span>
        </button>
        <div className="rs-nav_links">
          {["treatments", "about", "reviews", "faq"].map((item) => (
            <button key={item} onClick={() => nav(`rs-${item}`)} className="rs-nav_link">{item}</button>
          ))}
          <button onClick={onBook} className="rs-nav_cta">Book Consultation</button>
        </div>
        <button className="rs-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`rs-nav_hamburger-line ${mobileOpen ? "rs-nav_hamburger-line--top-open" : "rs-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="rs-nav_hamburger-line" />}
          <div className={`rs-nav_hamburger-line ${mobileOpen ? "rs-nav_hamburger-line--bottom-open" : "rs-nav_hamburger-line--bottom"}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="rs-nav_mobile-menu">
          {["treatments", "about", "reviews", "faq"].map((item) => (
            <button key={item} onClick={() => nav(`rs-${item}`)} className="rs-nav_mobile-link">{item}</button>
          ))}
          <button onClick={() => { setMobileOpen(false); onBook(); }} className="rs-nav_mobile-cta">Book Consultation</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const v = loaded ? "rs-reveal--visible" : "";
  return (
    <section id="rs-hero" className="rs-hero">
      <img src={heroImg} alt="" className="rs-hero_bg" />
      <div className="rs-hero_overlay" />
      <div className="rs-hero_content">
        <p className={`rs-hero_tagline rs-reveal ${v}`}>Medical Aesthetics · Corona, CA</p>
        <h1 className={`rs-hero_title rs-reveal rs-reveal--d1 ${v}`}>
          Elevating your<br /><span className="rs-hero_accent">natural beauty</span>
        </h1>
        <p className={`rs-hero_desc rs-reveal rs-reveal--d2 ${v}`}>
          Expert injectables, advanced facials, and results-driven skin treatments — delivered with care by a board-certified provider.
        </p>
        <div className={`rs-hero_ctas rs-reveal rs-reveal--d3 ${v}`}>
          <button className="rs-btn rs-btn--primary rs-btn--lg" onClick={onBook}>Book a Consultation</button>
          <button className="rs-btn rs-btn--outline" onClick={() => scrollTo("rs-treatments")}>Explore Treatments</button>
        </div>
        <div className={`rs-hero_credential rs-reveal rs-reveal--d3 ${v}`}>
          <span className="rs-hero_credential-stars">★★★★★</span>
          <span className="rs-hero_credential-text">4.9 rating · 200+ verified reviews</span>
        </div>
      </div>
    </section>
  );
};

const PressBar = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="rs-press">
      <p className={`rs-press_label rs-reveal ${cls}`}>As Recommended By</p>
      <div className={`rs-press_logos rs-reveal rs-reveal--d1 ${cls}`}>
        {pressLogos.map((name) => (
          <span key={name} className="rs-press_logo">{name}</span>
        ))}
      </div>
    </section>
  );
};

const StatsSection = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="rs-stats">
      <div className="rs-stats_inner">
        {stats.map((s, i) => (
          <div key={s.label} className={`rs-stat rs-reveal ${cls}`} style={{ transitionDelay: `${i * 0.12}s` }}>
            <span className="rs-stat_value">{s.value}</span>
            <span className="rs-stat_label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Treatments: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ref, visible] = useReveal(0.45, 0.15);
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section id="rs-treatments" ref={ref as React.RefObject<HTMLElement>} className="rs-treatments">
      <p className={`rs-section-label rs-reveal ${cls}`}>Treatments</p>
      <h2 className={`rs-section-heading rs-reveal rs-reveal--d1 ${cls}`}>Curated services for <em>every skin</em></h2>
      <div className="rs-treatments_grid">
        {treatments.map((t, i) => (
          <div key={t.title} className={`rs-treatment-card rs-reveal ${cls}`} style={{ transitionDelay: `${0.15 * (i + 1)}s` }}>
            <div className="rs-treatment-card_img">
              <img src={t.img} alt={t.title} className="rs-treatment-card_photo" />
            </div>
            <div className="rs-treatment-card_body">
              <span className="rs-treatment-card_category">{t.category}</span>
              <h3 className="rs-treatment-card_title">{t.title}</h3>
              <p className="rs-treatment-card_desc">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={`rs-treatments_cta rs-reveal ${cls}`} style={{ transitionDelay: "0.7s" }}>
        <button className="rs-btn rs-btn--primary" onClick={onBook}>Schedule a Consultation</button>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="rs-why">
      <div className="rs-why_inner">
        <div className={`rs-reveal ${cls}`}>
          <p className="rs-section-label">Why Radiant Skin</p>
          <h2 className="rs-section-heading">Care you can <em>trust</em></h2>
        </div>
        <div className="rs-why_grid">
          {whyUs.map((w, i) => (
            <div key={w.title} className={`rs-why_card rs-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
              <h3 className="rs-why_card-title">{w.title}</h3>
              <p className="rs-why_card-desc">{w.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Provider = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section id="rs-about" ref={ref as React.RefObject<HTMLElement>} className="rs-provider">
      <div className="rs-provider_grid">
        <div className={`rs-provider_photo rs-reveal ${cls}`}>
          <img src={providerImg} alt="Sarah Chen, NP-C" className="rs-provider_photo-img" />
        </div>
        <div className={`rs-reveal rs-reveal--d2 ${cls}`}>
          <p className="rs-section-label">Your Provider</p>
          <h2 className="rs-provider_name">Sarah Chen, NP-C</h2>
          <p className="rs-provider_credentials">Board-Certified Nurse Practitioner · Aesthetic Injector</p>
          <blockquote className="rs-provider_philosophy">
            "My philosophy is simple: enhance what you have, never change who you are."
          </blockquote>
          <p className="rs-provider_bio">
            With over 10 years in aesthetic medicine, Sarah combines clinical precision with a deep understanding of facial anatomy. Trained directly with Allergan, Galderma, and Revance — she continues to attend advanced injection workshops annually.
          </p>
          <div className="rs-provider_certs">
            <span className="rs-provider_cert">NP-C Board Certified</span>
            <span className="rs-provider_cert">Allergan Trained</span>
            <span className="rs-provider_cert">10+ Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section id="rs-reviews" ref={ref as React.RefObject<HTMLElement>} className="rs-reviews">
      <p className={`rs-section-label rs-reveal ${cls}`}>Testimonials</p>
      <h2 className={`rs-section-heading rs-reveal rs-reveal--d1 ${cls}`}>Real results, <em>real confidence</em></h2>
      <div className="rs-reviews_grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`rs-review-card rs-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <span className="rs-review-treatment">{t.treatment}</span>
            <p className="rs-review-text">"{t.text}"</p>
            <p className="rs-review-name">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section id="rs-faq" ref={ref as React.RefObject<HTMLElement>} className="rs-faq">
      <p className={`rs-section-label rs-reveal ${cls}`}>FAQ</p>
      <h2 className={`rs-section-heading rs-reveal rs-reveal--d1 ${cls}`}>Common <em>questions</em></h2>
      <div className={`rs-faq_list rs-reveal rs-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  );
};

const CtaBand: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "rs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="rs-cta-band">
      <div className={`rs-cta-band_inner rs-reveal ${cls}`} style={{ backgroundImage: `url(${ctaImg})` }}>
        <div className="rs-cta-band_overlay" />
        <h2 className="rs-cta-band_heading">Your skin journey starts here</h2>
        <p className="rs-cta-band_desc">Book a complimentary consultation. No pressure, no commitment — just expert advice tailored to your skin.</p>
        <button className="rs-btn rs-btn--primary rs-btn--lg" onClick={onBook}>Book Your Free Consultation</button>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="rs-footer">
    <div className="rs-footer_inner">
      <div className="rs-footer_brand">
        <span className="rs-footer_logo">Radiant Skin</span>
        <p className="rs-footer_sub">Aesthetics · Corona, CA</p>
      </div>
      <div className="rs-footer_links">
        <div>
          <h4>Treatments</h4>
          <ul>
            <li><a href="#rs-treatments" onClick={(e) => { e.preventDefault(); scrollTo("rs-treatments"); }}>Botox & Dysport</a></li>
            <li><a href="#rs-treatments" onClick={(e) => { e.preventDefault(); scrollTo("rs-treatments"); }}>Dermal Fillers</a></li>
            <li><a href="#rs-treatments" onClick={(e) => { e.preventDefault(); scrollTo("rs-treatments"); }}>HydraFacial</a></li>
            <li><a href="#rs-treatments" onClick={(e) => { e.preventDefault(); scrollTo("rs-treatments"); }}>Microneedling</a></li>
          </ul>
        </div>
        <div>
          <h4>Clinic</h4>
          <ul>
            <li><a href="#rs-about" onClick={(e) => { e.preventDefault(); scrollTo("rs-about"); }}>Meet Your Provider</a></li>
            <li><a href="#rs-reviews" onClick={(e) => { e.preventDefault(); scrollTo("rs-reviews"); }}>Reviews</a></li>
            <li><a href="#rs-faq" onClick={(e) => { e.preventDefault(); scrollTo("rs-faq"); }}>FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19515550923">(951) 555-0923</a></li>
            <li><a href="mailto:hello@radiantskinaesthetics.com">hello@radiantskinaesthetics.com</a></li>
            <li>Tue–Sat · 9am–5pm</li>
          </ul>
        </div>
      </div>
      <div className="rs-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Radiant Skin Aesthetics. All rights reserved.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="rs-footer_portfolio">Site by edwstudio</Link>
      </div>
    </div>
  </footer>
);

// ─── Main ───

const MedSpa = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="rs-page">
      <Link to="/" state={{ scrollTo: "work" }} className="rs-back-link">&larr; Portfolio</Link>
      <Nav onBook={openBooking} />
      <Hero onBook={openBooking} />
      <PressBar />
      <StatsSection />
      <Treatments onBook={openBooking} />
      <WhyUs />
      <Provider />
      <Reviews />
      <Faq />
      <CtaBand onBook={openBooking} />
      <Footer />
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
};

export default MedSpa;
