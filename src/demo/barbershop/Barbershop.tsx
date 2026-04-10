import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./barbershop.css";

import heroBg from "./assets/background.jpg";
import marcoImg from "./assets/marco.jpg";
import dreImg from "./assets/dre.jpg";
import eliasImg from "./assets/elias.jpg";
import storefrontImg from "./assets/storefront.jpg";
import imgSkinfade from "./assets/skinfade.jpg";
import imgTexturedcrop from "./assets/texturedcrop.jpg";
import imgBeard from "./assets/beard.jpg";
import imgMidfade from "./assets/midfade.jpg";
import imgTheworks from "./assets/theworks.jpg";
import imgLowtaper from "./assets/lowtaper.jpg";



// ─── Data ───

const services = [
  { name: "Classic Fade", price: "$35", duration: "30 min", description: "Skin, low, mid, or high fade — tailored to your style." },
  { name: "Fade + Beard", price: "$50", duration: "45 min", description: "Full fade with a lined and shaped beard trim." },
  { name: "Premium Cut", price: "$45", duration: "40 min", description: "Detailed cut with hot towel, shampoo, and styling." },
  { name: "Beard Sculpt", price: "$25", duration: "20 min", description: "Precision beard trim, line-up, and razor edge." },
  { name: "Kid's Cut", price: "$25", duration: "25 min", description: "Ages 12 and under. Patient, clean cuts every time." },
  { name: "The Works", price: "$70", duration: "60 min", description: "Premium cut, beard sculpt, hot towel, and styling product." },
];

const barbers = [
  { name: "Marco V.", title: "Owner / Lead Barber", specialty: "Fades & skin work", years: "12 years", img: marcoImg },
  { name: "Dre T.", title: "Senior Barber", specialty: "Beard design & sculpting", years: "8 years", img: dreImg },
  { name: "Elias R.", title: "Barber", specialty: "Textured crops & tapers", years: "5 years", img: eliasImg },
];

const whyReasons = [
  { title: "Walk-ins welcome", description: "No appointment? No problem. We take walk-ins all day — but booking guarantees your spot." },
  { title: "Premium products only", description: "We use Layrite, Reuzel, and Bevel — no cheap products touching your hair or skin." },
  { title: "Consistent results", description: "Your barber keeps notes on your cut. Same look, every visit, no guessing." },
  { title: "Clean shop, always", description: "Hospital-grade sanitation between every client. Fresh cape, fresh blade, every time." },
];

const testimonials = [
  { name: "Chris M.", text: "Best barbershop in the IE. Marco always gets my fade right — I've been coming here every two weeks for three years.", rating: 5 },
  { name: "Andre P.", text: "I drove 40 minutes to try this place and now I won't go anywhere else. The vibe, the cut, the whole experience is top tier.", rating: 5 },
  { name: "Tyler K.", text: "Got a cut here before my wedding and the groomsmen came back the next day to get theirs done too. That says everything.", rating: 5 },
];

const faqs = [
  { q: "Do I need an appointment?", a: "Walk-ins are welcome, but booking online guarantees your time slot. We recommend booking for weekends and evenings." },
  { q: "What forms of payment do you accept?", a: "We accept cash, all major credit/debit cards, Apple Pay, and Venmo. No checks." },
  { q: "Do you do kids' cuts?", a: "Yes — ages 12 and under. We're patient and experienced with younger clients. Same quality, smaller heads." },
  { q: "What's your cancellation policy?", a: "We ask for at least 2 hours notice for cancellations. No-shows may be required to prepay for future bookings." },
  { q: "Do you offer wedding or event packages?", a: "Absolutely. We do group bookings for weddings, proms, and events. Reach out to us directly and we'll set up a custom package." },
];

const galleryItems = [
  { label: "Skin Fade", sub: "Clean lines, sharp taper", img: imgSkinfade, pos: "center 30%" },
  { label: "Textured Crop", sub: "Movement on top, tight sides", img: imgTexturedcrop, pos: "60% 30%" },
  { label: "Beard Sculpt", sub: "Precision shape-up", img: imgBeard, pos: "40% center" },
  { label: "Mid Fade", sub: "Classic and clean", img: imgMidfade, pos: "center 25%" },
  { label: "The Works", sub: "Full premium service", img: imgTheworks, pos: "center 40%" },
  { label: "Low Taper", sub: "Subtle and sharp", img: imgLowtaper, pos: "center center" },
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
    const delay = setTimeout(() => io.observe(el), 400);
    return () => { clearTimeout(delay); io.disconnect(); };
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
    <div className={`cf-faq-item ${open ? "cf-faq-item--open" : ""}`}>
      <button className="cf-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`cf-faq-chevron ${open ? "cf-faq-chevron--open" : ""}`}><ChevronDown /></span>
      </button>
      <div className={`cf-faq-answer ${open ? "cf-faq-answer--open" : ""}`}><p>{a}</p></div>
    </div>
  );
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Booking Modal ───

const bookingSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "Service", field: "service", type: "select", placeholder: "What are you booking?", options: [
    { value: "classic", label: "Classic Fade — $35" },
    { value: "fade-beard", label: "Fade + Beard — $50" },
    { value: "premium", label: "Premium Cut — $45" },
    { value: "beard", label: "Beard Sculpt — $25" },
    { value: "kids", label: "Kid's Cut — $25" },
    { value: "works", label: "The Works — $70" },
  ]},
  { label: "Preferred Barber", field: "barber", type: "select", placeholder: "Who do you want?", options: [
    { value: "marco", label: "Marco V." },
    { value: "dre", label: "Dre T." },
    { value: "elias", label: "Elias R." },
    { value: "any", label: "No preference" },
  ]},
  { label: "Date & Time", field: "datetime", type: "calendar", placeholder: "When works best?" },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const CalendarPicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const selectedDate = value ? value.split(" | ")[0] : "";
  const selectedTime = value ? value.split(" | ")[1] || "" : "";
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long", year: "numeric" });
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); } else setViewMonth(viewMonth - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); } else setViewMonth(viewMonth + 1); };
  const selectDate = (day: number) => { const d = `${viewMonth + 1}/${day}/${viewYear}`; onChange(selectedTime ? `${d} | ${selectedTime}` : d); };
  const selectTime = (t: string) => { onChange(selectedDate ? `${selectedDate} | ${t}` : `| ${t}`); };
  const isDisabled = (day: number) => { const d = new Date(viewYear, viewMonth, day); return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 0; };

  return (
    <div className="cf-calendar">
      <div className="cf-calendar_nav">
        <button className="cf-calendar_arrow" onClick={prevMonth}>&lsaquo;</button>
        <span className="cf-calendar_month">{monthName}</span>
        <button className="cf-calendar_arrow" onClick={nextMonth}>&rsaquo;</button>
      </div>
      <div className="cf-calendar_grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <span key={d} className="cf-calendar_day-label">{d}</span>)}
        {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1; const ds = `${viewMonth + 1}/${day}/${viewYear}`; const dis = isDisabled(day);
          return <button key={day} className={`cf-calendar_day ${selectedDate === ds ? "cf-calendar_day--active" : ""} ${dis ? "cf-calendar_day--disabled" : ""}`} onClick={() => !dis && selectDate(day)} disabled={dis}>{day}</button>;
        })}
      </div>
      {selectedDate && (
        <div className="cf-calendar_times">
          <p className="cf-calendar_times-label">Pick a time</p>
          <div className="cf-calendar_time-grid">
            {timeSlots.map((t) => <button key={t} className={`cf-calendar_time ${selectedTime === t ? "cf-calendar_time--active" : ""}`} onClick={() => selectTime(t)}>{t}</button>)}
          </div>
        </div>
      )}
    </div>
  );
};

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
    if (current.type === "calendar") return val.includes(" | ") && val.split(" | ").every((s) => s.trim().length > 0);
    return val.trim().length > 0;
  };

  const handleNext = () => { if (step < totalSteps - 1) setStep(step + 1); else setSubmitted(true); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && canProceed()) { e.preventDefault(); handleNext(); } };

  return (
    <div className="cf-modal-overlay" onClick={onClose}>
      <div className="cf-modal" onClick={(e) => e.stopPropagation()}>
        <button className="cf-modal_close" onClick={onClose}>&times;</button>
        {!submitted ? (
          <>
            <div className="cf-modal_progress"><div className="cf-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} /></div>
            <div className="cf-modal_header">
              <span className="cf-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="cf-modal_title">{current.label}</h2>
            </div>
            <div className="cf-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="cf-modal_options">
                  {current.options!.map((opt) => (
                    <button key={opt.value} className={`cf-modal_option ${data[current.field] === opt.value ? "cf-modal_option--active" : ""}`} onClick={() => setData({ ...data, [current.field]: opt.value })}>{opt.label}</button>
                  ))}
                </div>
              ) : current.type === "calendar" ? (
                <CalendarPicker value={data[current.field] || ""} onChange={(val) => setData({ ...data, [current.field]: val })} />
              ) : (
                <input className="cf-input cf-modal_input" type={current.type} placeholder={current.placeholder} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              )}
            </div>
            <div className="cf-modal_actions">
              {step > 0 && <button className="cf-btn cf-btn--outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="cf-btn cf-btn--primary" onClick={handleNext} disabled={!canProceed()} style={{ marginLeft: "auto" }}>{step === totalSteps - 1 ? "Book It" : "Continue"}</button>
            </div>
            <p className="cf-modal_hint">{current.type !== "select" && current.type !== "calendar" && "Press Enter to continue"}</p>
          </>
        ) : (
          <div className="cf-modal_success">
            <span className="cf-modal_success-icon">✓</span>
            <h2 className="cf-modal_success-title">You're booked</h2>
            <p className="cf-modal_success-desc">We'll see you at Crown & Fade. Show up 5 minutes early and we'll have the chair ready.</p>
            <button className="cf-btn cf-btn--primary" onClick={onClose}>Done</button>
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
    <nav className={`cf-nav ${scrolled ? "cf-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="cf-nav_inner">
        <button className="cf-nav_logo" onClick={() => nav("cf-hero")}>
          <span className="cf-nav_logo-top">Crown</span>
          <span className="cf-nav_logo-amp">&</span>
          <span className="cf-nav_logo-bottom">Fade</span>
        </button>
        <div className="cf-nav_links">
          {["services", "barbers", "gallery", "reviews"].map((item) => (
            <button key={item} onClick={() => nav(`cf-${item}`)} className="cf-nav_link">{item}</button>
          ))}
          <button onClick={onBook} className="cf-nav_cta">Book Now</button>
        </div>
        <button className="cf-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`cf-nav_hamburger-line ${mobileOpen ? "cf-nav_hamburger-line--top-open" : "cf-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="cf-nav_hamburger-line" />}
          <div className={`cf-nav_hamburger-line ${mobileOpen ? "cf-nav_hamburger-line--bottom-open" : "cf-nav_hamburger-line--bottom"}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="cf-nav_mobile-menu">
          {["services", "barbers", "gallery", "reviews"].map((item) => (
            <button key={item} onClick={() => nav(`cf-${item}`)} className="cf-nav_mobile-link">{item}</button>
          ))}
          <button onClick={() => { setMobileOpen(false); onBook(); }} className="cf-nav_mobile-cta">Book Now</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const v = loaded ? "cf-reveal--visible" : "";
  return (
    <section id="cf-hero" className="cf-hero">
      <img src={heroBg} alt="" className="cf-hero_bg" />
      <div className="cf-hero_overlay" />
      <div className="cf-hero_content">
        <p className={`cf-hero_tagline cf-reveal ${v}`}>Premium Barbershop · Pomona, CA</p>
        <h1 className={`cf-hero_title cf-reveal cf-reveal--d1 ${v}`}>
          Look sharp.<br /><span className="cf-hero_accent">Feel sharper.</span>
        </h1>
        <p className={`cf-hero_desc cf-reveal cf-reveal--d2 ${v}`}>
          Fades, beard sculpts, and premium grooming — by barbers who take their craft seriously.
        </p>
        <div className={`cf-hero_ctas cf-reveal cf-reveal--d3 ${v}`}>
          <button className="cf-btn cf-btn--primary" onClick={onBook}>Book Your Cut</button>
          <button className="cf-btn cf-btn--outline" onClick={() => scrollTo("cf-services")}>View Services</button>
        </div>
      </div>
    </section>
  );
};

const Services: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section id="cf-services" ref={ref} className="cf-services">
      <p className={`cf-section-label cf-reveal ${cls}`}>Services & Pricing</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>What we <em>offer</em></h2>
      <div className="cf-services_grid">
        {services.map((s, i) => (
          <div key={s.name} className={`cf-service-card cf-reveal ${cls}`} style={{ transitionDelay: `${0.15 * (i + 1)}s` }}>
            <div className="cf-service-card_top">
              <div>
                <h3 className="cf-service-card_name">{s.name}</h3>
                <p className="cf-service-card_desc">{s.description}</p>
              </div>
              <div className="cf-service-card_meta">
                <span className="cf-service-card_price">{s.price}</span>
                <span className="cf-service-card_duration">{s.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`cf-services_cta cf-reveal ${cls}`} style={{ transitionDelay: "0.6s" }}>
        <button className="cf-btn cf-btn--primary" onClick={onBook}>Book Your Cut</button>
      </div>
    </section>
  );
};

const Barbers = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section id="cf-barbers" ref={ref} className="cf-barbers">
      <p className={`cf-section-label cf-reveal ${cls}`}>The Team</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>Meet the <em>barbers</em></h2>
      <div className="cf-barbers_grid">
        {barbers.map((b, i) => (
          <div key={b.name} className={`cf-barber-card cf-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <div className="cf-barber-card_photo">
              <img src={b.img} alt={b.name} className="cf-barber-card_img" />
            </div>
            <div className="cf-barber-card_info">
              <h3 className="cf-barber-card_name">{b.name}</h3>
              <p className="cf-barber-card_title">{b.title}</p>
              <div className="cf-barber-card_details">
                <span>{b.specialty}</span>
                <span>{b.years}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section id="cf-gallery" ref={ref} className="cf-gallery">
      <p className={`cf-section-label cf-reveal ${cls}`}>Recent Cuts</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>Our <em>work</em></h2>
      <div className="cf-gallery_grid">
        {galleryItems.map((item, i) => (
          <div key={i} className={`cf-gallery_item cf-reveal ${cls}`} style={{ transitionDelay: `${0.12 * (i + 1)}s` }}>
            <img src={item.img} alt={item.label} className="cf-gallery_img" style={{ objectPosition: item.pos }} />
            <div className="cf-gallery_info">
              <span className="cf-gallery_label">{item.label}</span>
              <span className="cf-gallery_sub">{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyUs = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section ref={ref} className="cf-why">
      <p className={`cf-section-label cf-reveal ${cls}`}>Why Clients Come Back</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>It's not just <em>a haircut</em></h2>
      <div className="cf-why_grid">
        {whyReasons.map((r, i) => (
          <div key={r.title} className={`cf-why_card cf-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <h3 className="cf-why_card-title">{r.title}</h3>
            <p className="cf-why_card-desc">{r.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Reviews = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section id="cf-reviews" ref={ref} className="cf-reviews">
      <p className={`cf-section-label cf-reveal ${cls}`}>Reviews</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>Straight from <em>the chair</em></h2>
      <div className="cf-reviews_grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`cf-review-card cf-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <div className="cf-review-stars">{"★".repeat(t.rating)}</div>
            <p className="cf-review-text">"{t.text}"</p>
            <p className="cf-review-name">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section ref={ref} className="cf-faq">
      <p className={`cf-section-label cf-reveal ${cls}`}>FAQ & Policies</p>
      <h2 className={`cf-section-heading cf-reveal cf-reveal--d1 ${cls}`}>Good to <em>know</em></h2>
      <div className={`cf-faq_list cf-reveal cf-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </section>
  );
};

const Contact = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "cf-reveal--visible" : "";
  return (
    <section ref={ref} className="cf-contact">
      <div className={`cf-contact_inner cf-reveal ${cls}`}>
        <div className="cf-contact_info">
          <p className="cf-section-label">Find Us</p>
          <h2 className="cf-contact_heading">Crown & Fade Barber Lounge</h2>
          <div className="cf-contact_details">
            <p>📍 Downtown Pomona, California</p>
            <p>📞 <a href="tel:+19095550812">(909) 555-0812</a></p>
            <p>✉️ <a href="mailto:hello@crownandfade.com">hello@crownandfade.com</a></p>
          </div>
          <div className="cf-contact_hours">
            <h4>Hours</h4>
            <p>Mon–Fri: 9am – 7pm</p>
            <p>Saturday: 8am – 6pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className="cf-contact_map">
          <img src={storefrontImg} alt="Crown & Fade storefront" className="cf-contact_map-img" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="cf-footer">
    <div className="cf-footer_inner">
      <div className="cf-footer_brand">
        <span className="cf-footer_logo">Crown & Fade</span>
        <p className="cf-footer_sub">Barber Lounge · Pomona, CA</p>
      </div>
      <div className="cf-footer_links">
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#cf-services" onClick={(e) => { e.preventDefault(); scrollTo("cf-services"); }}>Services</a></li>
            <li><a href="#cf-barbers" onClick={(e) => { e.preventDefault(); scrollTo("cf-barbers"); }}>Barbers</a></li>
            <li><a href="#cf-gallery" onClick={(e) => { e.preventDefault(); scrollTo("cf-gallery"); }}>Gallery</a></li>
            <li><a href="#cf-reviews" onClick={(e) => { e.preventDefault(); scrollTo("cf-reviews"); }}>Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19095550812">(909) 555-0812</a></li>
            <li><a href="mailto:hello@crownandfade.com">hello@crownandfade.com</a></li>
            <li>Pomona, California</li>
          </ul>
        </div>
      </div>
      <div className="cf-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Crown & Fade Barber Lounge</p>
        <Link to="/" state={{ scrollTo: "work" }} className="cf-footer_portfolio">Site by edwstudio</Link>
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
    <div className={`cf-sticky-cta ${visible ? "cf-sticky-cta--visible" : ""}`}>
      <button className="cf-btn cf-btn--primary cf-btn--full" onClick={onBook}>Book Your Cut</button>
    </div>
  );
};

// ─── Main ───

const Barbershop = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const preload = (src: string) => { const img = new Image(); img.src = src; };
    [marcoImg, dreImg, eliasImg, storefrontImg, imgSkinfade, imgTexturedcrop, imgBeard, imgMidfade, imgTheworks, imgLowtaper].forEach(preload);
  }, []);

  return (
    <div className="cf-page">
      <Link to="/" state={{ scrollTo: "work" }} className="cf-back-link">&larr; Portfolio</Link>
      <Nav onBook={openBooking} />
      <Hero onBook={openBooking} />
      <Services onBook={openBooking} />
      <Barbers />
      <Gallery />
      <WhyUs />
      <Reviews />
      <Faq />
      <Contact />
      <Footer />
      <StickyCta onBook={openBooking} />
      {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    </div>
  );
};

export default Barbershop;
