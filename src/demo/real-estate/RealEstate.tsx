import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./real-estate.css";

import heroImg from "./assets/hero.jpg";
import teamImg from "./assets/team.jpg";
import valuationImg from "./assets/valuation.jpg";
import listing1 from "./assets/1.jpg";
import listing2 from "./assets/2.jpg";
import listing3 from "./assets/3.jpg";
import n1 from "./assets/n1.jpg";
import n2 from "./assets/n2.jpg";
import n3 from "./assets/n3.jpg";
import n4 from "./assets/n4.jpg";

// ─── Data ───

const listings = [
  {
    address: "12845 Magnolia Ave",
    city: "Rancho Cucamonga",
    price: "$785,000",
    beds: 4,
    baths: 3,
    sqft: "2,340",
    status: "Just Listed",
    type: "Single Family",
    year: 2004,
    garage: 2,
    lot: "6,200 sqft",
    hoa: null as string | null,
    description: "Beautifully maintained 4-bedroom home in a quiet cul-de-sac near Victoria Gardens. Features an open-concept kitchen with granite countertops, stainless steel appliances, and a large center island.",
    features: ["Central A/C", "Hardwood floors", "Walk-in closets", "Covered patio", "2-car garage", "Near top-rated schools"],
    img: listing1,
  },
  {
    address: "9421 Haven Ave",
    city: "Ontario",
    price: "$625,000",
    beds: 3,
    baths: 2,
    sqft: "1,870",
    status: "Open House",
    type: "Single Family",
    year: 1998,
    garage: 2,
    lot: "5,400 sqft",
    hoa: null as string | null,
    description: "Charming single-story home with vaulted ceilings and an open floor plan. Updated kitchen with quartz countertops and new cabinetry. Easy access to Ontario Mills and the 10 freeway.",
    features: ["Single story", "Updated kitchen", "Vaulted ceilings", "Low-maintenance yard", "Near Ontario Mills", "Quick freeway access"],
    img: listing2,
  },
  {
    address: "5580 Riverside Dr",
    city: "Chino Hills",
    price: "$920,000",
    beds: 5,
    baths: 4,
    sqft: "3,100",
    status: "New Price",
    type: "Single Family",
    year: 2012,
    garage: 3,
    lot: "8,500 sqft",
    hoa: "$85/mo",
    description: "Stunning two-story home in a gated Chino Hills community. Grand foyer with soaring ceilings, formal living and dining rooms, and a chef's kitchen with double ovens.",
    features: ["Pool & spa", "Gated community", "3-car garage", "First-floor bedroom", "Built-in BBQ", "Solar panels"],
    img: listing3,
  },
];

const stats = [
  { value: "200+", label: "Homes Sold" },
  { value: "$150M+", label: "In Sales Volume" },
  { value: "4.9", label: "Google Rating" },
  { value: "15+", label: "Years Experience" },
];

const neighborhoods = [
  {
    name: "Rancho Cucamonga",
    description: "Family-friendly streets, top-rated schools, and a growing downtown scene.",
    img: n1,
  },
  {
    name: "Ontario",
    description: "Affordable living with easy freeway access and rapid development.",
    img: n2,
  },
  {
    name: "Chino Hills",
    description: "Rolling hills, premium homes, and a tight-knit suburban community.",
    img: n3,
  },
  {
    name: "Claremont",
    description: "College-town charm, walkable village, and tree-lined neighborhoods.",
    img: n4,
    imgPosition: "center 70%",
  },
];

const whyUs = [
  {
    title: "Local Market Experts",
    description: "We live and work in the Inland Empire. We know every neighborhood, every school district, and every market shift.",
  },
  {
    title: "Bilingual Team",
    description: "Our team speaks English and Spanish fluently — we make sure every client feels heard and understood.",
  },
  {
    title: "Full-Service Support",
    description: "From your first search to closing day, we handle staging, inspections, negotiations, and everything in between.",
  },
  {
    title: "Proven Track Record",
    description: "200+ homes sold and $150M+ in volume. Our results speak for themselves.",
  },
];

const testimonials = [
  {
    name: "Maria & Carlos G.",
    text: "As first-time buyers, we had no idea where to start. The Marquez team walked us through everything and found us our dream home in Rancho Cucamonga. We couldn't be happier.",
    location: "Rancho Cucamonga",
  },
  {
    name: "James T.",
    text: "I needed to sell fast due to a relocation. They had my home staged, listed, and under contract in 9 days — above asking price. Incredibly professional.",
    location: "Ontario",
  },
  {
    name: "Sandra L.",
    text: "We've bought and sold three homes with the Marquez team over the years. They always go above and beyond. They're not just our agents, they're family at this point.",
    location: "Chino Hills",
  },
];

const faqs = [
  {
    q: "How do I know if I'm ready to buy?",
    a: "If you have stable income, manageable debt, and some savings for a down payment, you may be more ready than you think. We offer free consultations to help you assess your position and explore your options.",
  },
  {
    q: "What does it cost to work with a buyer's agent?",
    a: "In most cases, the seller pays the buyer's agent commission — so our services come at no direct cost to you as a buyer.",
  },
  {
    q: "How long does the home selling process take?",
    a: "From listing to closing, most homes sell within 30-60 days in the current IE market. With our staging and marketing, many of our listings go under contract in under two weeks.",
  },
  {
    q: "Do you help with first-time buyer programs?",
    a: "Absolutely. We work with lenders who specialize in FHA, VA, and down payment assistance programs. We'll connect you with the right people from day one.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve the entire Inland Empire including Rancho Cucamonga, Ontario, Chino Hills, Claremont, Upland, Fontana, and surrounding cities.",
  },
];

// ─── Hooks ───

function useReveal(threshold = 0.45) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

// ─── Icons ───

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

// ─── FAQ ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mh-faq-item ${open ? "mh-faq-item--open" : ""}`}>
      <button className="mh-faq-question" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`mh-faq-chevron ${open ? "mh-faq-chevron--open" : ""}`}>
          <ChevronDown />
        </span>
      </button>
      <div className={`mh-faq-answer ${open ? "mh-faq-answer--open" : ""}`}>
        <p>{a}</p>
      </div>
    </div>
  );
};

// ─── Sections ───

const Nav: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
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
    <nav className={`mh-nav ${scrolled ? "mh-nav--scrolled" : ""}`} aria-label="Main navigation">
      <div className="mh-nav_inner">
        <button className="mh-nav_logo" onClick={() => scrollTo("mh-hero")}>
          <span className="mh-nav_logo-name">Marquez</span>
          <span className="mh-nav_logo-sub">Home Group</span>
        </button>

        <div className="mh-nav_links">
          {["listings", "about", "neighborhoods", "reviews"].map((item) => (
            <button key={item} onClick={() => scrollTo(`mh-${item}`)} className="mh-nav_link">
              {item}
            </button>
          ))}
          <button onClick={onConsult} className="mh-nav_cta">
            Get Home Value
          </button>
        </div>

        <button className="mh-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`mh-nav_hamburger-line ${mobileOpen ? "mh-nav_hamburger-line--top-open" : "mh-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="mh-nav_hamburger-line" />}
          <div className={`mh-nav_hamburger-line ${mobileOpen ? "mh-nav_hamburger-line--bottom-open" : "mh-nav_hamburger-line--bottom"}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="mh-nav_mobile-menu">
          {["listings", "about", "neighborhoods", "reviews"].map((item) => (
            <button key={item} onClick={() => scrollTo(`mh-${item}`)} className="mh-nav_mobile-link">
              {item}
            </button>
          ))}
          <button onClick={() => { setMobileOpen(false); onConsult(); }} className="mh-nav_mobile-cta">
            Get Home Value
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);
  const v = loaded ? "mh-reveal--visible" : "";

  return (
    <section id="mh-hero" className="mh-hero">
      <img src={heroImg} alt="" className="mh-hero_bg" />
      <div className="mh-hero_overlay" />
      <div className="mh-hero_content">
        <p className={`mh-hero_tagline mh-reveal ${v}`}>Inland Empire Real Estate</p>
        <h1 className={`mh-hero_title mh-reveal mh-reveal--d1 ${v}`}>
          Find your place in the<br />
          <span className="mh-hero_title-accent">Inland Empire</span>
        </h1>
        <p className={`mh-hero_desc mh-reveal mh-reveal--d2 ${v}`}>
          Whether you're buying your first home or selling your forever home, the Marquez team is here to guide you every step of the way.
        </p>
        <div className={`mh-hero_ctas mh-reveal mh-reveal--d3 ${v}`}>
          <button className="mh-btn mh-btn--primary" onClick={onConsult}>
            Schedule a Consultation
          </button>
          <button className="mh-btn mh-btn--outline" onClick={() => document.getElementById("mh-listings")?.scrollIntoView({ behavior: "smooth" })}>
            View Listings <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Listings: React.FC<{ onSelectListing: (i: number) => void }> = ({ onSelectListing }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-listings" ref={ref} className="mh-listings">
      <div className="mh-listings_header">
        <div>
          <p className={`mh-section-label mh-reveal ${cls}`}>Featured Listings</p>
          <h2 className={`mh-section-heading mh-reveal mh-reveal--d1 ${cls}`}>
            Homes on the market <em>right now</em>
          </h2>
        </div>
      </div>
      <div className="mh-listings_grid">
        {listings.map((l, i) => (
          <div key={i} className={`mh-listing-card mh-listing-card--clickable mh-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }} onClick={() => onSelectListing(i)}>
            <div className="mh-listing-card_img">
              <img src={l.img} alt={l.address} className="mh-listing-card_photo" />
              <span className="mh-listing-badge">{l.status}</span>
            </div>
            <div className="mh-listing-card_body">
              <p className="mh-listing-price">{l.price}</p>
              <p className="mh-listing-address">{l.address}</p>
              <p className="mh-listing-city">{l.city}</p>
              <div className="mh-listing-meta">
                <span>{l.beds} bd</span>
                <span className="mh-listing-sep" />
                <span>{l.baths} ba</span>
                <span className="mh-listing-sep" />
                <span>{l.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={`mh-listings_cta mh-reveal ${cls}`} style={{ transitionDelay: "0.4s" }}>
        <Link to="/demo/real-estate/listings" className="mh-btn mh-btn--outline">
          View All Listings <ArrowRight size={12} />
        </Link>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-about" ref={ref} className="mh-about">
      <div className="mh-about_grid">
        <div className={`mh-reveal ${cls}`}>
          <p className="mh-section-label">About Us</p>
          <h2 className="mh-section-heading">
            Your neighbors, <em>your agents</em>
          </h2>
          <p className="mh-about_text">
            The Marquez Home Group is a family-run real estate team rooted in the Inland Empire. We've helped over 200 families buy, sell, and invest in this community — the same community where we raise our own kids. We bring local expertise, bilingual service, and a genuine commitment to making your real estate experience smooth from start to finish.
          </p>
          <div className="mh-about_stats">
            {stats.map((s, i) => (
              <div key={i} className="mh-about_stat">
                <span className="mh-about_stat-value">{s.value}</span>
                <span className="mh-about_stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`mh-about_photo mh-reveal mh-reveal--d2 ${cls}`}>
          <img src={teamImg} alt="Marquez Home Group" className="mh-about_photo-img" />
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section ref={ref} className="mh-why">
      <p className={`mh-section-label mh-reveal ${cls}`}>Why Work With Us</p>
      <h2 className={`mh-section-heading mh-reveal mh-reveal--d1 ${cls}`}>
        What sets us <em>apart</em>
      </h2>
      <div className="mh-why_grid">
        {whyUs.map((item, i) => (
          <div key={i} className={`mh-why_card mh-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <h3 className="mh-why_card-title">{item.title}</h3>
            <p className="mh-why_card-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Neighborhoods = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-neighborhoods" ref={ref} className="mh-neighborhoods">
      <p className={`mh-section-label mh-reveal ${cls}`}>Explore the Area</p>
      <h2 className={`mh-section-heading mh-reveal mh-reveal--d1 ${cls}`}>
        Neighborhood <em>guides</em>
      </h2>
      <div className="mh-neighborhoods_grid">
        {neighborhoods.map((n, i) => (
          <Link
            key={i}
            to={`/demo/real-estate/listings?city=${encodeURIComponent(n.name)}`}
            className={`mh-neighborhood-card mh-reveal ${cls}`}
            style={{ transitionDelay: `${0.1 * (i + 1)}s`, textDecoration: "none", color: "inherit" }}
          >
            <div className="mh-neighborhood-card_img">
              <img
                src={n.img}
                alt={n.name}
                className="mh-neighborhood-card_photo"
                style={"imgPosition" in n ? { objectPosition: n.imgPosition } : undefined}
              />
            </div>
            <div className="mh-neighborhood-card_body">
              <h3 className="mh-neighborhood-card_name">{n.name}</h3>
              <p className="mh-neighborhood-card_desc">{n.description}</p>
              <span className="mh-neighborhood-card_link">
                Explore area <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const Reviews = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-reviews" ref={ref} className="mh-reviews">
      <p className={`mh-section-label mh-reveal ${cls}`}>Testimonials</p>
      <h2 className={`mh-section-heading mh-reveal mh-reveal--d1 ${cls}`}>
        What our clients <em>say</em>
      </h2>
      <div className="mh-reviews_grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`mh-review-card mh-reveal ${cls}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <div className="mh-review-stars">{"★".repeat(5)}</div>
            <p className="mh-review-text">"{t.text}"</p>
            <div className="mh-review-author">
              <span className="mh-review-name">{t.name}</span>
              <span className="mh-review-location">{t.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Faq = () => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section ref={ref} className="mh-faq">
      <p className={`mh-section-label mh-reveal ${cls}`}>FAQ</p>
      <h2 className={`mh-section-heading mh-reveal mh-reveal--d1 ${cls}`}>
        Common <em>questions</em>
      </h2>
      <div className={`mh-faq_list mh-reveal mh-reveal--d2 ${cls}`}>
        {faqs.map((f, i) => (
          <FaqItem key={i} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
};

const Valuation: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-valuation" ref={ref} className="mh-valuation">
      <div className={`mh-valuation_inner mh-reveal ${cls}`}>
        <img src={valuationImg} alt="" className="mh-valuation_bg" />
        <div className="mh-valuation_bg-overlay" />
        <div className="mh-valuation_text">
          <p className="mh-section-label">For Sellers</p>
          <h2 className="mh-valuation_heading">What's your home worth?</h2>
          <p className="mh-valuation_desc">
            Get a free, no-obligation home valuation from our team. We'll analyze recent sales in your area and provide a detailed market report within 24 hours.
          </p>
        </div>
        <form className="mh-valuation_form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Property address" className="mh-input" />
          <input type="text" placeholder="Your name" className="mh-input" />
          <input type="email" placeholder="Email address" className="mh-input" />
          <input type="tel" placeholder="Phone number" className="mh-input" />
          <button type="submit" className="mh-btn mh-btn--primary mh-btn--full" onClick={(e) => { e.preventDefault(); onConsult(); }}>
            Get My Home Value
          </button>
        </form>
      </div>
    </section>
  );
};

const Contact: React.FC<{ onConsult: () => void }> = ({ onConsult }) => {
  const [ref, visible] = useReveal();
  const cls = visible ? "mh-reveal--visible" : "";

  return (
    <section id="mh-contact" ref={ref} className="mh-contact">
      <div className={`mh-contact_inner mh-reveal ${cls}`}>
        <div className="mh-contact_text">
          <p className="mh-section-label">Get in Touch</p>
          <h2 className="mh-contact_heading">Ready to make a move?</h2>
          <p className="mh-contact_desc">
            Whether you're buying, selling, or just exploring — we'd love to hear from you.
          </p>
          <div className="mh-contact_details">
            <p>(909) 555-0234</p>
            <p>hello@marquezhomegroup.com</p>
            <p>Inland Empire, California</p>
          </div>
        </div>
        <form className="mh-contact_form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your name" className="mh-input" />
          <input type="email" placeholder="Email address" className="mh-input" />
          <input type="tel" placeholder="Phone number" className="mh-input" />
          <select className="mh-input mh-select" defaultValue="">
            <option value="" disabled>I'm interested in...</option>
            <option value="buying">Buying a home</option>
            <option value="selling">Selling my home</option>
            <option value="valuation">Home valuation</option>
            <option value="consultation">General consultation</option>
          </select>
          <textarea placeholder="Tell us about your situation" className="mh-input mh-textarea" rows={3} />
          <button type="submit" className="mh-btn mh-btn--primary mh-btn--full" onClick={(e) => { e.preventDefault(); onConsult(); }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

// ─── Listing Detail Modal ───

const ListingDetailModal: React.FC<{
  listing: typeof listings[number];
  onClose: () => void;
}> = ({ listing, onClose }) => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(0);
  const [scheduleData, setScheduleData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const scheduleFields = [
    { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
    { label: "Email", field: "email", type: "email", placeholder: "Email address" },
    { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
    { label: "Preferred Date & Time", field: "datetime", type: "calendar", placeholder: "When works best?" },
  ];

  const currentField = scheduleFields[scheduleStep];

  const canProceedSchedule = () => {
    const val = scheduleData[currentField.field] || "";
    if (currentField.type === "calendar") return val.includes(" | ") && val.split(" | ").every((s) => s.trim().length > 0);
    return val.trim().length > 0;
  };

  const handleScheduleNext = () => {
    if (scheduleStep < scheduleFields.length - 1) setScheduleStep(scheduleStep + 1);
    else setSubmitted(true);
  };

  const handleScheduleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceedSchedule()) { e.preventDefault(); handleScheduleNext(); }
  };

  if (submitted) {
    return (
      <div className="mh-modal-overlay" onClick={onClose}>
        <div className="mh-modal" onClick={(e) => e.stopPropagation()}>
          <button className="mh-modal_close" onClick={onClose}>&times;</button>
          <div className="mh-modal_success">
            <span className="mh-modal_success-icon">✓</span>
            <h2 className="mh-modal_success-title">Showing scheduled!</h2>
            <p className="mh-modal_success-desc">
              We'll confirm your showing at {listing.address} within 24 hours. See you soon!
            </p>
            <button className="mh-btn mh-btn--primary" onClick={onClose}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  if (showSchedule) {
    return (
      <div className="mh-modal-overlay" onClick={onClose}>
        <div className="mh-modal" onClick={(e) => e.stopPropagation()}>
          <button className="mh-modal_close" onClick={onClose}>&times;</button>
          <div className="mh-modal_progress">
            <div className="mh-modal_progress-bar" style={{ width: `${((scheduleStep + 1) / scheduleFields.length) * 100}%` }} />
          </div>
          <div className="mh-modal_header">
            <span className="mh-modal_step-count">Step {scheduleStep + 1} of {scheduleFields.length}</span>
            <h2 className="mh-modal_title">{currentField.label}</h2>
          </div>
          <p className="mh-listing-detail_schedule-for">{listing.address}, {listing.city}</p>
          <div className="mh-modal_body" key={scheduleStep}>
            {currentField.type === "calendar" ? (
              <CalendarPicker value={scheduleData[currentField.field] || ""} onChange={(val) => setScheduleData({ ...scheduleData, [currentField.field]: val })} />
            ) : (
              <input className="mh-input mh-modal_input" type={currentField.type} placeholder={currentField.placeholder} value={scheduleData[currentField.field] || ""} onChange={(e) => setScheduleData({ ...scheduleData, [currentField.field]: e.target.value })} onKeyDown={handleScheduleKeyDown} autoFocus />
            )}
          </div>
          <div className="mh-modal_actions">
            <button className="mh-btn mh-btn--outline" onClick={() => scheduleStep > 0 ? setScheduleStep(scheduleStep - 1) : setShowSchedule(false)}>Back</button>
            <button className="mh-btn mh-btn--primary" onClick={handleScheduleNext} disabled={!canProceedSchedule()} style={{ marginLeft: "auto" }}>
              {scheduleStep === scheduleFields.length - 1 ? "Confirm Showing" : "Continue"}
            </button>
          </div>
          <p className="mh-modal_hint">
            {currentField.type !== "calendar" && "Press Enter to continue"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mh-modal-overlay" onClick={onClose}>
      <div className="mh-modal mh-modal--listing" onClick={(e) => e.stopPropagation()}>
        <button className="mh-modal_close" onClick={onClose}>&times;</button>

        <div className="mh-modal_img-wrapper">
          <img src={listing.img} alt={listing.address} className="mh-modal_img" />
          <span className="mh-listing-badge">{listing.status}</span>
        </div>

        <div className="mh-modal_body">
          <div className="mh-modal_header">
            <div>
              <p className="mh-modal_price">{listing.price}</p>
              <p className="mh-modal_address">{listing.address}</p>
              <p className="mh-modal_city">{listing.city}, CA</p>
            </div>
            <span className="mh-listing-type">{listing.type}</span>
          </div>

          <div className="mh-modal_stats">
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.beds}</span><span className="mh-modal_stat-label">Beds</span></div>
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.baths}</span><span className="mh-modal_stat-label">Baths</span></div>
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.sqft}</span><span className="mh-modal_stat-label">Sqft</span></div>
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.year}</span><span className="mh-modal_stat-label">Built</span></div>
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.garage}</span><span className="mh-modal_stat-label">Garage</span></div>
            <div className="mh-modal_stat"><span className="mh-modal_stat-value">{listing.lot}</span><span className="mh-modal_stat-label">Lot</span></div>
          </div>

          {listing.hoa && <p className="mh-modal_hoa">HOA: {listing.hoa}</p>}

          <div className="mh-modal_section">
            <h3 className="mh-modal_section-title">About This Property</h3>
            <p className="mh-modal_desc">{listing.description}</p>
          </div>

          <div className="mh-modal_section">
            <h3 className="mh-modal_section-title">Key Features</h3>
            <ul className="mh-modal_features">
              {listing.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>

          <div className="mh-listing-modal_actions">
            <button className="mh-btn mh-btn--primary mh-btn--full" onClick={() => setShowSchedule(true)}>
              Schedule a Showing
            </button>
            <button className="mh-btn mh-btn--outline mh-btn--full" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Multi-Step Consultation Modal ───

interface ConsultStep {
  label: string;
  field: string;
  type: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}

const baseSteps: ConsultStep[] = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Email", field: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", field: "phone", type: "tel", placeholder: "Phone number" },
  { label: "I'm Interested In", field: "interest", type: "select", placeholder: "What can we help with?", options: [
    { value: "buying", label: "Buying a home" },
    { value: "selling", label: "Selling my home" },
    { value: "valuation", label: "Home valuation" },
    { value: "consultation", label: "General consultation" },
  ]},
];

const areaStep: ConsultStep = { label: "Preferred Area", field: "area", type: "select", placeholder: "Where are you looking?", options: [
  { value: "rancho", label: "Rancho Cucamonga" },
  { value: "ontario", label: "Ontario" },
  { value: "chino", label: "Chino Hills" },
  { value: "claremont", label: "Claremont" },
  { value: "other", label: "Other / Not sure" },
]};

const finalSteps: ConsultStep[] = [
  { label: "Preferred Date & Time", field: "datetime", type: "calendar", placeholder: "When works best?" },
  { label: "Anything Else", field: "notes", type: "textarea", placeholder: "Tell us about your situation, timeline, or anything else..." },
];

function getConsultSteps(interest: string) {
  const showArea = interest === "buying" || interest === "consultation";
  return showArea ? [...baseSteps, areaStep, ...finalSteps] : [...baseSteps, ...finalSteps];
}

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

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
    <div className="mh-calendar">
      <div className="mh-calendar_month-nav">
        <button className="mh-calendar_arrow" onClick={prevMonth}>&lsaquo;</button>
        <span className="mh-calendar_month">{monthName}</span>
        <button className="mh-calendar_arrow" onClick={nextMonth}>&rsaquo;</button>
      </div>
      <div className="mh-calendar_grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="mh-calendar_day-label">{d}</span>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${viewMonth + 1}/${day}/${viewYear}`;
          const disabled = isDisabled(day);
          return (
            <button key={day} className={`mh-calendar_day ${selectedDate === dateStr ? "mh-calendar_day--active" : ""} ${disabled ? "mh-calendar_day--disabled" : ""}`} onClick={() => !disabled && selectDate(day)} disabled={disabled}>
              {day}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mh-calendar_times">
          <p className="mh-calendar_times-label">Select a time</p>
          <div className="mh-calendar_time-grid">
            {timeSlots.map((t) => (
              <button key={t} className={`mh-calendar_time ${selectedTime === t ? "mh-calendar_time--active" : ""}`} onClick={() => selectTime(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ConsultModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const steps = getConsultSteps(data.interest || "");
  const totalSteps = steps.length;
  const current = steps[step];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const canProceed = () => {
    const val = data[current.field] || "";
    if (current.type === "textarea") return true;
    if (current.type === "calendar") return val.includes(" | ") && val.split(" | ").every((s) => s.trim().length > 0);
    return val.trim().length > 0;
  };

  const handleNext = () => { if (step < totalSteps - 1) setStep(step + 1); else setSubmitted(true); };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed()) { e.preventDefault(); handleNext(); }
  };

  return (
    <div className="mh-modal-overlay" onClick={onClose}>
      <div className="mh-modal" onClick={(e) => e.stopPropagation()}>
        <button className="mh-modal_close" onClick={onClose}>&times;</button>

        {!submitted ? (
          <>
            <div className="mh-modal_progress">
              <div className="mh-modal_progress-bar" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
            </div>

            <div className="mh-modal_header">
              <span className="mh-modal_step-count">Step {step + 1} of {totalSteps}</span>
              <h2 className="mh-modal_title">{current.label}</h2>
            </div>

            <div className="mh-modal_body" key={step}>
              {current.type === "select" ? (
                <div className="mh-modal_options">
                  {current.options!.map((opt) => (
                    <button key={opt.value} className={`mh-modal_option ${data[current.field] === opt.value ? "mh-modal_option--active" : ""}`} onClick={() => setData({ ...data, [current.field]: opt.value })}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : current.type === "calendar" ? (
                <CalendarPicker value={data[current.field] || ""} onChange={(val) => setData({ ...data, [current.field]: val })} />
              ) : current.type === "textarea" ? (
                <textarea className="mh-input mh-textarea mh-modal_input" placeholder={current.placeholder} rows={4} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              ) : (
                <input className="mh-input mh-modal_input" type={current.type} placeholder={current.placeholder} value={data[current.field] || ""} onChange={(e) => setData({ ...data, [current.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
              )}
            </div>

            <div className="mh-modal_actions">
              {step > 0 && <button className="mh-btn mh-btn--outline" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="mh-btn mh-btn--primary" onClick={handleNext} disabled={!canProceed()} style={{ marginLeft: "auto" }}>
                {step === totalSteps - 1 ? "Submit" : "Continue"}
              </button>
            </div>

            <p className="mh-modal_hint">
              {current.type !== "select" && current.type !== "calendar" && current.type !== "textarea" && "Press Enter to continue"}
            </p>
          </>
        ) : (
          <div className="mh-modal_success">
            <span className="mh-modal_success-icon">✓</span>
            <h2 className="mh-modal_success-title">You're all set!</h2>
            <p className="mh-modal_success-desc">
              We'll reach out within 24 hours to confirm your consultation. Looking forward to helping you find your perfect home.
            </p>
            <button className="mh-btn mh-btn--primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="mh-footer">
    <div className="mh-footer_inner">
      <div className="mh-footer_brand">
        <div className="mh-footer_logo">
          <span className="mh-footer_logo-name">Marquez</span>
          <span className="mh-footer_logo-sub">Home Group</span>
        </div>
        <p className="mh-footer_address">Inland Empire, California</p>
        <p className="mh-footer_license">DRE #01234567</p>
      </div>
      <div className="mh-footer_links">
        <div>
          <h4>For Buyers</h4>
          <ul>
            <li><a href="#mh-listings" onClick={(e) => { e.preventDefault(); document.getElementById("mh-listings")?.scrollIntoView({ behavior: "smooth" }); }}>Featured Listings</a></li>
            <li><a href="#mh-neighborhoods" onClick={(e) => { e.preventDefault(); document.getElementById("mh-neighborhoods")?.scrollIntoView({ behavior: "smooth" }); }}>Neighborhood Guides</a></li>
            <li><Link to="/demo/real-estate/listings">Browse All Listings</Link></li>
            <li><a href="#mh-contact" onClick={(e) => { e.preventDefault(); document.getElementById("mh-contact")?.scrollIntoView({ behavior: "smooth" }); }}>Schedule Consultation</a></li>
          </ul>
        </div>
        <div>
          <h4>For Sellers</h4>
          <ul>
            <li><a href="#mh-valuation" onClick={(e) => { e.preventDefault(); document.getElementById("mh-valuation")?.scrollIntoView({ behavior: "smooth" }); }}>Home Valuation</a></li>
            <li><a href="#mh-contact" onClick={(e) => { e.preventDefault(); document.getElementById("mh-contact")?.scrollIntoView({ behavior: "smooth" }); }}>Selling Process</a></li>
            <li><a href="#mh-contact" onClick={(e) => { e.preventDefault(); document.getElementById("mh-contact")?.scrollIntoView({ behavior: "smooth" }); }}>Market Reports</a></li>
            <li><a href="#mh-about" onClick={(e) => { e.preventDefault(); document.getElementById("mh-about")?.scrollIntoView({ behavior: "smooth" }); }}>About Our Team</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:+19095550234">(909) 555-0234</a></li>
            <li><a href="mailto:hello@marquezhomegroup.com">hello@marquezhomegroup.com</a></li>
            <li>Mon–Sat · 9am–7pm</li>
          </ul>
        </div>
      </div>
      <div className="mh-footer_bottom">
        <p>&copy; {new Date().getFullYear()} Marquez Home Group. All rights reserved.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="mh-footer_portfolio">Site by edwstudio</Link>
      </div>
    </div>
  </footer>
);

// ─── Main ───

const RealEstate = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const [selectedListing, setSelectedListing] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="mh-page">
      <Link to="/" state={{ scrollTo: "work" }} className="mh-back-link">&larr; Portfolio</Link>
      <Nav onConsult={openModal} />
      <Hero onConsult={openModal} />
      <Listings onSelectListing={setSelectedListing} />
      <About />
      <WhyUs />
      <Neighborhoods />
      <Reviews />
      <Faq />
      <Valuation onConsult={openModal} />
      <Contact onConsult={openModal} />
      <Footer />
      {selectedListing !== null && (
        <ListingDetailModal listing={listings[selectedListing]} onClose={() => setSelectedListing(null)} />
      )}
      {modalOpen && <ConsultModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default RealEstate;
