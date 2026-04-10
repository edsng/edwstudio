import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./flowsync.css";

import imgGmail from "./assets/gmail.png";
import imgCalendar from "./assets/googlecalendar.png";
import imgOutlook from "./assets/outlook.png";
import imgQuickbooks from "./assets/quickbooks.png";
import imgSheets from "./assets/sheets.svg";
import imgSlack from "./assets/slack.png";
import imgStripe from "./assets/stripe.png";
import imgTwilio from "./assets/twilio.png";
import imgZapier from "./assets/zapier.svg";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───

const heroWords = ["leads", "follow-ups", "pipelines", "workflows", "clients"];

const trustLogos = ["Apex Roofing", "Summit HVAC", "Greenline Painting", "Cascade Plumbing", "Ironclad Electric", "Meridian Realty"];

const metrics = [
  { value: "2,400+", label: "Active Teams" },
  { value: "1.2M", label: "Leads Managed" },
  { value: "98%", label: "Uptime SLA" },
  { value: "4.8★", label: "G2 Rating" },
];

const painPoints = [
  { icon: "leak", title: "Leads slip through cracks", description: "New inquiries get buried in text threads, voicemails, and email inboxes. No system means no follow-up." },
  { icon: "clock", title: "Manual follow-up kills time", description: "Your team spends hours copying info between apps, sending reminders manually, and updating spreadsheets." },
  { icon: "scatter", title: "Tools don't talk to each other", description: "CRM here, texting there, notes somewhere else. Your customer data lives in 5+ disconnected places." },
];

const features = [
  { title: "Lead Pipeline", description: "Drag-and-drop pipeline boards to track every lead from first touch to closed deal. Custom stages for your exact workflow.", tag: "Core" },
  { title: "Automated Follow-Up", description: "Rules that trigger texts, emails, or task assignments based on lead status, time, or activity. Never miss a follow-up.", tag: "Automation" },
  { title: "Unified Inbox", description: "All texts, emails, and calls in one timeline. Full conversation history attached to every contact.", tag: "Communication" },
  { title: "Team Tasks", description: "Assign tasks, set deadlines, track completion. Everyone knows what they own.", tag: "Collaboration" },
  { title: "Live Dashboard", description: "Real-time analytics on pipeline velocity, conversion rates, and revenue. No spreadsheets.", tag: "Analytics" },
  { title: "Contact CRM", description: "Notes, tags, activity timeline, custom fields. Your entire client history in one place.", tag: "CRM" },
];

const useCases = [
  { role: "For Owners", desc: "See your full pipeline, team performance, and revenue metrics in one dashboard. Stop guessing, start knowing.", icon: "chart" },
  { role: "For Sales Teams", desc: "Manage leads, automate follow-up sequences, and close faster with a pipeline built for velocity.", icon: "target" },
  { role: "For Ops Managers", desc: "Assign work, track progress, and build repeatable processes that scale with your team.", icon: "gear" },
];

const integrations = [
  { name: "Google Calendar", img: imgCalendar },
  { name: "Outlook", img: imgOutlook },
  { name: "Slack", img: imgSlack },
  { name: "Zapier", img: imgZapier },
  { name: "QuickBooks", img: imgQuickbooks },
  { name: "Stripe", img: imgStripe },
  { name: "Twilio", img: imgTwilio },
  { name: "Gmail", img: imgGmail },
  { name: "Sheets", img: imgSheets },
];

const testimonials = [
  { name: "Marcus Reeves", title: "Owner, Apex Roofing", text: "We went from losing 30% of our leads to closing 40% more in the first quarter. FlowSync replaced our spreadsheet chaos overnight.", metric: "40% more closes" },
  { name: "Sarah Kim", title: "Ops Manager, Greenline Painting", text: "My team used to spend 2 hours a day on follow-up texts. Now it's automated. We got that time back and our response rate doubled.", metric: "2hrs saved/day" },
  { name: "David Okafor", title: "Sales Lead, Cascade Plumbing", text: "The pipeline view changed everything. I can see exactly where every lead is and what needs to happen next. No more sticky notes.", metric: "Zero leads lost" },
];

const pricing = [
  { name: "Starter", price: "$29", period: "/user/mo", desc: "For solo operators getting organized", features: ["500 contacts", "1 pipeline", "Email follow-ups", "Basic reporting", "Mobile app"], cta: "Start Free Trial" },
  { name: "Growth", price: "$59", period: "/user/mo", desc: "For growing teams that need automation", features: ["Unlimited contacts", "5 pipelines", "SMS + email automation", "Team task board", "Advanced reporting", "Integrations"], popular: true, cta: "Start Free Trial" },
  { name: "Pro", price: "$99", period: "/user/mo", desc: "For teams that need everything", features: ["Everything in Growth", "Unlimited pipelines", "Custom workflows", "API access", "Priority support", "Dedicated onboarding"], cta: "Book a Demo" },
];

const faqs = [
  { q: "How long does setup take?", a: "Most teams are up and running in under 30 minutes. We import your contacts, set up your first pipeline, and walk you through the basics — live if you want." },
  { q: "Can I try it before committing?", a: "Every plan includes a 14-day free trial with full access. No credit card required." },
  { q: "Does it work on mobile?", a: "Fully. Native iOS and Android apps, plus a responsive web app. Your pipeline goes wherever you go." },
  { q: "What integrations do you support?", a: "Google Calendar, Outlook, Slack, Zapier, QuickBooks, Stripe, Twilio, Gmail, and Sheets. Zapier opens up 5,000+ additional connections." },
  { q: "Is my data secure?", a: "SOC 2 Type II certified, 256-bit encryption, daily backups, 99.9% uptime SLA. Your data is safer with us than in a spreadsheet." },
  { q: "Can I cancel anytime?", a: "No contracts, no cancellation fees. Export all your data at any time." },
];

// ─── Hooks ───

function useReveal(dt = 0.45, mt = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = window.innerWidth <= 768 ? mt : dt;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: t });
    const delay = setTimeout(() => io.observe(el), 400);
    return () => { clearTimeout(delay); io.disconnect(); };
  }, [dt, mt]);
  return [ref, vis] as const;
}

// Mouse-tracked gradient glow
function useMouseGlow(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.innerWidth <= 768) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--glow-x", `${x}%`);
      el.style.setProperty("--glow-y", `${y}%`);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [ref]);
}

// ─── Icons ───

const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l4 4 4-4" /></svg>;
const Check = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.5 3.5L13 4" /></svg>;
const ArrowRight = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>;

// Clean minimal SVG icons
const Icon: React.FC<{ name: string }> = ({ name }) => {
  const icons: Record<string, React.ReactNode> = {
    leak: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" /></svg>,
    clock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    scatter: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" /><path d="M10 6h4M14 10v4M6 14v4M10 18h4" /></svg>,
    chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-5 4 3 5-6" /></svg>,
    target: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    gear: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  };
  return <span className="fs-icon">{icons[name] || null}</span>;
};

// ─── Small Components ───

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`fs-faq-item ${open ? "fs-faq-item--open" : ""}`}>
      <button className="fs-faq-q" onClick={() => setOpen(!open)}><span>{q}</span><span className={`fs-faq-chev ${open ? "fs-faq-chev--open" : ""}`}><ChevronDown /></span></button>
      <div className={`fs-faq-a ${open ? "fs-faq-a--open" : ""}`}><p>{a}</p></div>
    </div>
  );
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ─── Demo Modal ───

const demoSteps = [
  { label: "Your Name", field: "name", type: "text", placeholder: "Full name" },
  { label: "Work Email", field: "email", type: "email", placeholder: "you@company.com" },
  { label: "Company", field: "company", type: "text", placeholder: "Company name" },
  { label: "Team Size", field: "size", type: "select", options: [
    { value: "1", label: "Just me" }, { value: "2-5", label: "2–5 people" },
    { value: "6-20", label: "6–20 people" }, { value: "21+", label: "21+ people" },
  ]},
  { label: "Biggest Challenge", field: "challenge", type: "select", options: [
    { value: "leads", label: "Tracking & managing leads" }, { value: "followup", label: "Automating follow-up" },
    { value: "tools", label: "Too many disconnected tools" }, { value: "visibility", label: "Pipeline visibility" },
  ]},
];

const DemoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const total = demoSteps.length;
  const cur = demoSteps[step];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);

  const ok = () => (data[cur.field] || "").trim().length > 0;
  const next = () => { if (step < total - 1) setStep(step + 1); else setDone(true); };
  const kd = (e: React.KeyboardEvent) => { if (e.key === "Enter" && ok()) { e.preventDefault(); next(); } };

  return (
    <div className="fs-modal-overlay" onClick={onClose}>
      <div className="fs-modal" onClick={(e) => e.stopPropagation()}>
        <button className="fs-modal_close" onClick={onClose}>&times;</button>
        {!done ? (
          <>
            <div className="fs-modal_progress"><div className="fs-modal_bar" style={{ width: `${((step + 1) / total) * 100}%` }} /></div>
            <div className="fs-modal_header"><span className="fs-modal_step">Step {step + 1} of {total}</span><h2 className="fs-modal_title">{cur.label}</h2></div>
            <div className="fs-modal_body" key={step}>
              {cur.type === "select" ? (
                <div className="fs-modal_opts">{cur.options!.map((o) => (<button key={o.value} className={`fs-modal_opt ${data[cur.field] === o.value ? "fs-modal_opt--on" : ""}`} onClick={() => setData({ ...data, [cur.field]: o.value })}>{o.label}</button>))}</div>
              ) : (
                <input className="fs-input fs-modal_input" type={cur.type} placeholder={cur.placeholder} value={data[cur.field] || ""} onChange={(e) => setData({ ...data, [cur.field]: e.target.value })} onKeyDown={kd} autoFocus />
              )}
            </div>
            <div className="fs-modal_actions">
              {step > 0 && <button className="fs-btn fs-btn--ghost" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="fs-btn fs-btn--primary" onClick={next} disabled={!ok()} style={{ marginLeft: "auto" }}>{step === total - 1 ? "Submit" : "Continue"}</button>
            </div>
          </>
        ) : (
          <div className="fs-modal_done"><span className="fs-modal_done-icon">✓</span><h2>You're in!</h2><p>We'll reach out within 24 hours to schedule your personalized demo.</p><button className="fs-btn fs-btn--primary" onClick={onClose}>Done</button></div>
        )}
      </div>
    </div>
  );
};

// ─── Animated Counter ───

const Counter: React.FC<{ value: string; visible: boolean }> = ({ value, visible }) => {
  const numMatch = value.match(/^([\d,.]+)/);
  const num = numMatch ? numMatch[1] : value;
  const suffix = value.replace(num, "");
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!visible) return;
    const target = parseFloat(num.replace(/,/g, ""));
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      setDisplay(current.toLocaleString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, num]);

  return <>{visible ? display : "0"}{suffix}</>;
};

// ─── Interactive Dashboard Mock ───

const pipelineData = {
  "New Leads": [
    { name: "Sarah Mitchell", company: "Greenline Painting", value: "$4,200", tag: "new" },
    { name: "James Cooper", company: "Summit HVAC", value: "$8,500", tag: "hot" },
    { name: "Maria Lopez", company: "Cascade Plumbing", value: "$3,100", tag: "new" },
  ],
  "Contacted": [
    { name: "David Park", company: "Ironclad Electric", value: "$6,700", tag: "" },
    { name: "Lisa Chen", company: "Apex Roofing", value: "$12,400", tag: "hot" },
  ],
  "Proposal": [
    { name: "Tom Richards", company: "Meridian Realty", value: "$9,800", tag: "" },
    { name: "Ana Garcia", company: "Crown Landscaping", value: "$5,500", tag: "" },
  ],
  "Won": [
    { name: "Kevin Wright", company: "Summit HVAC", value: "$15,200", tag: "won" },
  ],
};

const taskData = [
  { task: "Follow up with Sarah Mitchell", due: "Today", status: "pending" },
  { task: "Send proposal to Tom Richards", due: "Today", status: "pending" },
  { task: "Call Lisa Chen — hot lead", due: "Tomorrow", status: "pending" },
  { task: "Review Meridian Realty contract", due: "Wed", status: "done" },
  { task: "Update pricing for Crown Landscaping", due: "Thu", status: "done" },
];

const analyticsData = [
  { label: "New Leads", value: "47", change: "+12%" },
  { label: "Conversion", value: "34%", change: "+5%" },
  { label: "Revenue", value: "$48.2K", change: "+18%" },
  { label: "Avg. Close", value: "8 days", change: "-2 days" },
];

const sidebarTabs = [
  { id: "pipeline", label: "Pipeline", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg> },
  { id: "tasks", label: "Tasks", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg> },
  { id: "analytics", label: "Analytics", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16l4-5 4 3 5-6" /></svg> },
];

const HeroDashboard: React.FC<{ loaded: boolean }> = ({ loaded }) => {
  const [activeTab, setActiveTab] = useState("pipeline");
  const v = loaded ? "fs-reveal--visible" : "";

  const urls: Record<string, string> = { pipeline: "app.flowsync.io/pipeline", tasks: "app.flowsync.io/tasks", analytics: "app.flowsync.io/analytics" };

  return (
    <div className={`fs-hero_product fs-reveal fs-reveal--d2 ${v}`}>
      <div className="fs-mock">
        <div className="fs-mock_bar">
          <div className="fs-mock_dots"><span /><span /><span /></div>
          <span className="fs-mock_url">{urls[activeTab]}</span>
        </div>
        <div className="fs-mock_body">
          <div className="fs-mock_sidebar">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                className={`fs-mock_sidebar-btn ${activeTab === tab.id ? "fs-mock_sidebar-btn--active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                title={tab.label}
              >
                {tab.icon}
              </button>
            ))}
          </div>
          <div className="fs-mock_main">
            {activeTab === "pipeline" && (
              <div className="fs-mock_view" key="pipeline">
                <div className="fs-mock_cols-header">
                  {Object.keys(pipelineData).map((col) => (
                    <span key={col} className="fs-mock_col-label">{col} <span className="fs-mock_col-count">{pipelineData[col as keyof typeof pipelineData].length}</span></span>
                  ))}
                </div>
                <div className="fs-mock_cols">
                  {Object.values(pipelineData).map((cards, ci) => (
                    <div key={ci} className="fs-mock_col">
                      {cards.map((card, i) => (
                        <div key={i} className={`fs-mock_card ${card.tag === "hot" ? "fs-mock_card--hot" : ""} ${card.tag === "won" ? "fs-mock_card--won" : ""} ${card.tag === "new" && i === 0 ? "fs-mock_card--pulse" : ""}`}>
                          <span className="fs-mock_card-name">{card.name}</span>
                          <span className="fs-mock_card-company">{card.company}</span>
                          <span className="fs-mock_card-value">{card.value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "tasks" && (
              <div className="fs-mock_view" key="tasks">
                <div className="fs-mock_tasks">
                  {taskData.map((t, i) => (
                    <div key={i} className={`fs-mock_task ${t.status === "done" ? "fs-mock_task--done" : ""}`}>
                      <span className={`fs-mock_task-check ${t.status === "done" ? "fs-mock_task-check--done" : ""}`}>{t.status === "done" ? "✓" : ""}</span>
                      <span className="fs-mock_task-text">{t.task}</span>
                      <span className="fs-mock_task-due">{t.due}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "analytics" && (
              <div className="fs-mock_view" key="analytics">
                <div className="fs-mock_analytics">
                  {analyticsData.map((a) => (
                    <div key={a.label} className="fs-mock_analytic">
                      <span className="fs-mock_analytic-label">{a.label}</span>
                      <span className="fs-mock_analytic-value">{a.value}</span>
                      <span className="fs-mock_analytic-change">{a.change}</span>
                    </div>
                  ))}
                </div>
                <div className="fs-mock_chart">
                  <svg viewBox="0 0 200 60" fill="none" className="fs-mock_chart-svg">
                    <path d="M0 50 L30 42 L60 45 L90 30 L120 25 L150 15 L180 18 L200 8" stroke="#6366f1" strokeWidth="2" fill="none" />
                    <path d="M0 50 L30 42 L60 45 L90 30 L120 25 L150 15 L180 18 L200 8 L200 60 L0 60Z" fill="url(#chartGrad)" />
                    <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(99,102,241,0.15)" /><stop offset="100%" stopColor="rgba(99,102,241,0)" /></linearGradient></defs>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sections ───

const Nav: React.FC<{ onDemo: () => void }> = ({ onDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const nav = (id: string) => { setMobileOpen(false); scrollTo(id); };

  return (
    <nav className={`fs-nav ${scrolled ? "fs-nav--scrolled" : ""}`}>
      <div className="fs-nav_inner">
        <button className="fs-nav_logo" onClick={() => nav("fs-hero")}><span className="fs-nav_logo-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></span><span className="fs-nav_logo-text">FlowSync</span></button>
        <div className="fs-nav_links">
          {["features", "pricing", "faq"].map((item) => (<button key={item} onClick={() => nav(`fs-${item}`)} className="fs-nav_link">{item}</button>))}
          <button className="fs-nav_link">Log in</button>
          <button onClick={onDemo} className="fs-nav_cta">Book a Demo</button>
        </div>
        <button className="fs-nav_hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className={`fs-nav_hamburger-line ${mobileOpen ? "fs-nav_hamburger-line--top-open" : "fs-nav_hamburger-line--top"}`} />
          {!mobileOpen && <div className="fs-nav_hamburger-line" />}
          <div className={`fs-nav_hamburger-line ${mobileOpen ? "fs-nav_hamburger-line--bottom-open" : "fs-nav_hamburger-line--bottom"}`} />
        </button>
      </div>
      {mobileOpen && (
        <div className="fs-nav_mobile-menu">
          {["features", "pricing", "faq"].map((item) => (<button key={item} onClick={() => nav(`fs-${item}`)} className="fs-nav_mobile-link">{item}</button>))}
          <button className="fs-nav_mobile-link">Log in</button>
          <button onClick={() => { setMobileOpen(false); onDemo(); }} className="fs-nav_mobile-cta">Book a Demo</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC<{ onDemo: () => void }> = ({ onDemo }) => {
  const [loaded, setLoaded] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useMouseGlow(heroRef);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  useEffect(() => { const i = setInterval(() => setWordIdx((n) => (n + 1) % heroWords.length), 2400); return () => clearInterval(i); }, []);

  const v = loaded ? "fs-reveal--visible" : "";

  return (
    <section id="fs-hero" ref={heroRef} className="fs-hero">
      <div className="fs-hero_glow" />
      <div className="fs-hero_grid-bg" />
      <div className="fs-hero_content">
        <div className="fs-hero_text">
          <div className={`fs-hero_badge fs-reveal ${v}`}><span className="fs-hero_badge-dot" />Now in public beta — start free today</div>
          <h1 className={`fs-hero_title fs-reveal fs-reveal--d1 ${v}`}>
            Stop losing<br /><span className="fs-hero_swap" key={wordIdx}>{heroWords[wordIdx]}</span>
          </h1>
          <p className={`fs-hero_desc fs-reveal fs-reveal--d2 ${v}`}>
            FlowSync replaces your spreadsheets, scattered texts, and disconnected tools with one platform to manage leads, automate follow-up, and grow your business.
          </p>
          <div className={`fs-hero_ctas fs-reveal fs-reveal--d3 ${v}`}>
            <button className="fs-btn fs-btn--primary fs-btn--lg fs-btn--glow" onClick={onDemo}>Book a Demo</button>
            <button className="fs-btn fs-btn--ghost fs-btn--lg">Start Free Trial <ArrowRight s={14} /></button>
          </div>
          <p className={`fs-hero_sub fs-reveal fs-reveal--d3 ${v}`}>No credit card · 14-day trial · Setup in minutes</p>
        </div>
        <HeroDashboard loaded={loaded} />
      </div>
    </section>
  );
};

const TrustBar = () => {
  const [ref, vis] = useReveal(0.3, 0.15);
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="fs-trust">
      <p className={`fs-trust_label fs-reveal ${c}`}>Trusted by 2,400+ service businesses</p>
      <div className={`fs-trust_ticker fs-reveal fs-reveal--d1 ${c}`}>
        <div className="fs-trust_ticker-track">
          {[...trustLogos, ...trustLogos, ...trustLogos, ...trustLogos].map((name, i) => <span key={i} className="fs-trust_logo">{name}</span>)}
        </div>
      </div>
      <div className={`fs-trust_metrics fs-reveal fs-reveal--d2 ${c}`}>
        {metrics.map((m) => (
          <div key={m.label} className="fs-trust_metric">
            <span className="fs-trust_metric-value"><Counter value={m.value} visible={vis} /></span>
            <span className="fs-trust_metric-label">{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const Problem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".fs-problem_card");
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", end: "top 30%", scrub: 1, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fs-problem">
      <p className="fs-section-label">The Problem</p>
      <h2 className="fs-section-heading">Your business runs on duct tape<br />and <em>good intentions</em></h2>
      <div className="fs-problem_grid">
        {painPoints.map((p) => (
          <div key={p.title} className="fs-problem_card">
            <Icon name={p.icon} />
            <h3 className="fs-problem_title">{p.title}</h3>
            <p className="fs-problem_desc">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".fs-feature-card");
      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.to(cards, {
        opacity: 1, y: 0,
        stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 65%", end: "top 25%", scrub: 1.2, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="fs-features" ref={sectionRef} className="fs-features">
      <p className="fs-section-label">Platform</p>
      <h2 className="fs-section-heading">Everything you need.<br /><em>Nothing you don't.</em></h2>
      <div className="fs-features_grid">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`fs-feature-card ${activeIdx === i ? "fs-feature-card--active" : ""}`}
            onMouseEnter={() => setActiveIdx(i)}
          >
            <span className="fs-feature-tag">{f.tag}</span>
            <h3 className="fs-feature-title">{f.title}</h3>
            <p className="fs-feature-desc">{f.description}</p>
            <div className="fs-feature-card_glow" />
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Animated Reporting View ───

const reportStats = [
  { target: 48200, prefix: "$", suffix: "K", decimal: 1, label: "Revenue (MTD)" },
  { target: 34, prefix: "", suffix: "%", decimal: 0, label: "Close Rate" },
  { target: 47, prefix: "", suffix: "", decimal: 0, label: "New Leads" },
];

const ReportingView = () => {
  const [counts, setCounts] = useState(reportStats.map(() => 0));
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Animate counters
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounts(reportStats.map((s) => s.target * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Animate chart line draw-in
    const line = lineRef.current;
    const fill = fillRef.current;
    if (line) {
      const len = line.getTotalLength();
      // Set initial state synchronously — no transition yet
      line.style.transition = "none";
      line.style.strokeDasharray = `${len}`;
      line.style.strokeDashoffset = `${len}`;
      // Force browser to commit the initial paint
      line.getBoundingClientRect();
      // Now enable transition and animate to 0
      line.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s";
      line.style.strokeDashoffset = "0";
    }
    if (fill) {
      fill.style.transition = "none";
      fill.style.opacity = "0";
      fill.getBoundingClientRect();
      fill.style.transition = "opacity 0.8s ease 1s";
      fill.style.opacity = "1";
    }
  }, []);

  const formatCount = (val: number, stat: typeof reportStats[number]) => {
    if (stat.decimal > 0) {
      const scaled = val / 1000;
      return `${stat.prefix}${scaled.toFixed(stat.decimal)}${stat.suffix}`;
    }
    return `${stat.prefix}${Math.floor(val)}${stat.suffix}`;
  };

  return (
    <div className="fs-pv-reporting">
      <div className="fs-pv-report-row">
        {reportStats.map((s, i) => (
          <div key={s.label} className="fs-pv-report-stat" style={{ animationDelay: `${i * 0.15}s` }}>
            <span className="fs-pv-report-num">{formatCount(counts[i], s)}</span>
            <span className="fs-pv-report-label">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="fs-pv-report-chart">
        <svg viewBox="0 0 240 70" fill="none">
          <path d="M0 55 L40 50 L80 48 L120 44 L160 40 L200 38 L240 35" stroke="rgba(250,250,250,0.06)" strokeWidth="1" strokeDasharray="4 4" />
          <path
            ref={fillRef}
            d="M0 60 L40 48 L80 52 L120 35 L160 28 L200 18 L240 10 L240 70 L0 70Z"
            fill="url(#pvGrad2)"
          />
          <path
            ref={lineRef}
            d="M0 60 L40 48 L80 52 L120 35 L160 28 L200 18 L240 10"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="pvGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const productSteps = [
  { label: "Drag-and-drop pipeline", key: "pipeline" },
  { label: "One-click automations", key: "automation" },
  { label: "Real-time team activity", key: "activity" },
  { label: "Built-in reporting", key: "reporting" },
];

const ProductPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps
  useEffect(() => {
    const i = setInterval(() => setActiveStep((n) => (n + 1) % productSteps.length), 4000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const text = el.querySelector(".fs-product_text");
      const visual = el.querySelector(".fs-product_visual");
      if (text) {
        gsap.set(text, { opacity: 0, x: -40 });
        gsap.to(text, { opacity: 1, x: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 65%", end: "top 35%", scrub: 1, invalidateOnRefresh: true } });
      }
      if (visual) {
        gsap.set(visual, { opacity: 0, x: 40, rotateY: 8 });
        gsap.to(visual, { opacity: 1, x: 0, rotateY: 0, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 65%", end: "top 30%", scrub: 1, invalidateOnRefresh: true } });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fs-product">
      <div className="fs-product_inner">
        <div className="fs-product_text">
          <p className="fs-section-label">Product</p>
          <h2 className="fs-section-heading">One dashboard.<br /><em>Zero guesswork.</em></h2>
          <p className="fs-product_desc">See every lead, every task, and every conversation in one place. Drag cards between stages, automate follow-ups, and get real-time reporting without touching a spreadsheet.</p>
          <div className="fs-product_steps">
            {productSteps.map((s, i) => (
              <button
                key={s.key}
                className={`fs-product_step ${activeStep === i ? "fs-product_step--active" : ""}`}
                onClick={() => setActiveStep(i)}
              >
                <span className="fs-product_step-indicator">
                  <span className="fs-product_step-dot" />
                  {activeStep === i && <span className="fs-product_step-progress" />}
                </span>
                <span className="fs-product_step-label">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="fs-product_visual">
          <div className="fs-product_screen">
            <div className="fs-product_screen-bar">
              <div className="fs-mock_dots"><span /><span /><span /></div>
            </div>
            <div className="fs-product_screen-body" key={activeStep}>
              {activeStep === 0 && (
                <div className="fs-pv-pipeline">
                  <div className="fs-pv-col">
                    <span className="fs-pv-col-label">New</span>
                    <div className="fs-pv-card">Sarah M. · $4.2K</div>
                    <div className="fs-pv-card fs-pv-card--moving">James C. · $8.5K</div>
                  </div>
                  <div className="fs-pv-arrow">→</div>
                  <div className="fs-pv-col">
                    <span className="fs-pv-col-label">Contacted</span>
                    <div className="fs-pv-card">David P. · $6.7K</div>
                    <div className="fs-pv-card fs-pv-card--landing">James C. · $8.5K</div>
                  </div>
                  <div className="fs-pv-arrow">→</div>
                  <div className="fs-pv-col">
                    <span className="fs-pv-col-label">Won</span>
                    <div className="fs-pv-card fs-pv-card--won">Kevin W. · $15.2K</div>
                  </div>
                </div>
              )}
              {activeStep === 1 && (
                <div className="fs-pv-automation">
                  <div className="fs-pv-auto-trigger">
                    <span className="fs-pv-auto-label">When</span>
                    <span className="fs-pv-auto-value">Lead status → Contacted</span>
                  </div>
                  <div className="fs-pv-auto-line" />
                  <div className="fs-pv-auto-action fs-pv-auto-action--1">
                    <span className="fs-pv-auto-label">Then</span>
                    <span className="fs-pv-auto-value">Send SMS: "Thanks for your interest..."</span>
                  </div>
                  <div className="fs-pv-auto-line" />
                  <div className="fs-pv-auto-action fs-pv-auto-action--2">
                    <span className="fs-pv-auto-label">Wait 2 days, then</span>
                    <span className="fs-pv-auto-value">Send email: Follow-up template</span>
                  </div>
                  <div className="fs-pv-auto-line" />
                  <div className="fs-pv-auto-action fs-pv-auto-action--3">
                    <span className="fs-pv-auto-label">If no reply</span>
                    <span className="fs-pv-auto-value">Assign task to sales rep</span>
                  </div>
                </div>
              )}
              {activeStep === 2 && (
                <div className="fs-pv-activity">
                  {[
                    { who: "Sarah K.", action: "moved lead to Proposal", time: "2m ago", dot: "#6366f1" },
                    { who: "Marcus R.", action: "completed task: Send proposal", time: "8m ago", dot: "#22c55e" },
                    { who: "System", action: "auto-sent SMS to James Cooper", time: "12m ago", dot: "#818cf8" },
                    { who: "David O.", action: "added note on Meridian Realty", time: "25m ago", dot: "#6366f1" },
                    { who: "Sarah K.", action: "logged call with Lisa Chen", time: "1hr ago", dot: "#f59e0b" },
                  ].map((a, i) => (
                    <div key={i} className="fs-pv-activity-item" style={{ animationDelay: `${i * 0.15}s` }}>
                      <span className="fs-pv-activity-dot" style={{ background: a.dot }} />
                      <span className="fs-pv-activity-text"><strong>{a.who}</strong> {a.action}</span>
                      <span className="fs-pv-activity-time">{a.time}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeStep === 3 && (
                <ReportingView />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  const [ref, vis] = useReveal();
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="fs-usecases">
      <p className={`fs-section-label fs-reveal ${c}`}>Solutions</p>
      <h2 className={`fs-section-heading fs-reveal fs-reveal--d1 ${c}`}>Built for every role on your team</h2>
      <div className="fs-usecases_grid">
        {useCases.map((u, i) => (
          <div key={u.role} className={`fs-usecase-card fs-reveal ${c}`} style={{ transitionDelay: `${0.2 * (i + 1)}s` }}>
            <Icon name={u.icon} />
            <h3 className="fs-usecase-role">{u.role}</h3>
            <p className="fs-usecase-desc">{u.desc}</p>
            <span className="fs-usecase-link">Learn more <ArrowRight s={12} /></span>
          </div>
        ))}
      </div>
    </section>
  );
};

const IntegrationsSection = () => {
  const [ref, vis] = useReveal();
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="fs-integrations">
      <p className={`fs-section-label fs-reveal ${c}`}>Integrations</p>
      <h2 className={`fs-section-heading fs-reveal fs-reveal--d1 ${c}`}>Works with your stack</h2>
      <div className={`fs-integrations_grid fs-reveal fs-reveal--d2 ${c}`}>
        {integrations.map((intg) => (
          <img key={intg.name} src={intg.img} alt={intg.name} className="fs-integration-logo" title={intg.name} />
        ))}
      </div>
      <p className={`fs-integrations_note fs-reveal fs-reveal--d2 ${c}`}>+ 5,000 more via Zapier</p>
    </section>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll(".fs-testimonial-card");
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.97 });
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 65%", end: "top 30%", scrub: 1.2, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="fs-testimonials">
      <p className="fs-section-label">Customer Stories</p>
      <h2 className="fs-section-heading">Real results from <em>real teams</em></h2>
      <div className="fs-testimonials_grid">
        {testimonials.map((t, i) => (
          <div key={i} className="fs-testimonial-card">
            <span className="fs-testimonial-metric">{t.metric}</span>
            <p className="fs-testimonial-text">"{t.text}"</p>
            <div className="fs-testimonial-author"><span className="fs-testimonial-name">{t.name}</span><span className="fs-testimonial-role">{t.title}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PricingSection = () => {
  const [ref, vis] = useReveal(0.3, 0.15);
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section id="fs-pricing" ref={ref as React.RefObject<HTMLElement>} className="fs-pricing">
      <p className={`fs-section-label fs-reveal ${c}`}>Pricing</p>
      <h2 className={`fs-section-heading fs-reveal fs-reveal--d1 ${c}`}>Simple pricing. No surprises.</h2>
      <div className="fs-pricing_grid">
        {pricing.map((p, i) => (
          <div key={p.name} className={`fs-pricing-card ${p.popular ? "fs-pricing-card--pop" : ""} fs-reveal ${c}`} style={{ transitionDelay: `${0.15 * (i + 1)}s` }}>
            {p.popular && <span className="fs-pricing-badge">Most Popular</span>}
            <h3 className="fs-pricing-name">{p.name}</h3>
            <p className="fs-pricing-price"><span className="fs-pricing-amount">{p.price}</span>{p.period}</p>
            <p className="fs-pricing-desc">{p.desc}</p>
            <ul className="fs-pricing-features">{p.features.map((f) => <li key={f}><Check /> {f}</li>)}</ul>
            <button className={`fs-btn ${p.popular ? "fs-btn--primary" : "fs-btn--ghost"} fs-btn--full`}>{p.cta}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

const FaqSection = () => {
  const [ref, vis] = useReveal();
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section id="fs-faq" ref={ref as React.RefObject<HTMLElement>} className="fs-faq">
      <p className={`fs-section-label fs-reveal ${c}`}>FAQ</p>
      <h2 className={`fs-section-heading fs-reveal fs-reveal--d1 ${c}`}>Questions? <em>Answered.</em></h2>
      <div className={`fs-faq_list fs-reveal fs-reveal--d2 ${c}`}>{faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}</div>
    </section>
  );
};

const FinalCta: React.FC<{ onDemo: () => void }> = ({ onDemo }) => {
  const ref = useRef<HTMLDivElement>(null);
  useMouseGlow(ref);
  const [rRef, vis] = useReveal();
  const c = vis ? "fs-reveal--visible" : "";
  return (
    <section ref={rRef as React.RefObject<HTMLElement>} className="fs-final-cta">
      <div ref={ref} className={`fs-final-cta_inner fs-reveal ${c}`}>
        <h2 className="fs-final-cta_heading">Ready to replace the chaos?</h2>
        <p className="fs-final-cta_desc">Join 2,400+ teams already using FlowSync to manage leads, automate follow-up, and grow faster.</p>
        <div className="fs-final-cta_btns">
          <button className="fs-btn fs-btn--primary fs-btn--lg fs-btn--glow" onClick={onDemo}>Book a Demo</button>
          <button className="fs-btn fs-btn--ghost fs-btn--lg">Start Free Trial <ArrowRight s={14} /></button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="fs-footer">
    <div className="fs-footer_inner">
      <div className="fs-footer_brand">
        <span className="fs-footer_logo"><span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></span>FlowSync</span>
        <p className="fs-footer_tagline">The operating system for growing service businesses.</p>
      </div>
      <div className="fs-footer_links">
        <div><h4>Product</h4><ul>
          <li><a href="#fs-features" onClick={(e) => { e.preventDefault(); scrollTo("fs-features"); }}>Features</a></li>
          <li><a href="#fs-pricing" onClick={(e) => { e.preventDefault(); scrollTo("fs-pricing"); }}>Pricing</a></li>
          <li><a href="#fs-faq" onClick={(e) => { e.preventDefault(); scrollTo("fs-faq"); }}>FAQ</a></li>
        </ul></div>
        <div><h4>Company</h4><ul><li>About</li><li>Blog</li><li>Careers</li></ul></div>
        <div><h4>Legal</h4><ul><li>Privacy</li><li>Terms</li><li>Security</li></ul></div>
      </div>
      <div className="fs-footer_bottom">
        <p>&copy; {new Date().getFullYear()} FlowSync, Inc.</p>
        <Link to="/" state={{ scrollTo: "work" }} className="fs-footer_portfolio">Site by edwstudio</Link>
      </div>
    </div>
  </footer>
);

// ─── Main ───

const FlowSync = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => { window.scrollTo(0, 0); }, 250);
    const preload = (src: string) => { const img = new Image(); img.src = src; };
    [imgGmail, imgCalendar, imgOutlook, imgQuickbooks, imgSlack, imgStripe, imgTwilio].forEach(preload);
    return () => clearTimeout(t);
  }, []);

  // Global parallax — elements with data-speed move at different scroll rates
  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hero parallax only on desktop (parallax on small screens feels janky)
      if (window.innerWidth > 768) {
        gsap.to(".fs-hero_product", {
          y: 80, ease: "none",
          scrollTrigger: { trigger: ".fs-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".fs-hero_text", {
          y: -30, ease: "none",
          scrollTrigger: { trigger: ".fs-hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Hero glow expands
      gsap.to(".fs-hero_glow", {
        scale: 1.3, opacity: 0, ease: "none",
        scrollTrigger: { trigger: ".fs-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Section headings slide in slightly from left
      gsap.utils.toArray<HTMLElement>(".fs-section-heading").forEach((heading) => {
        gsap.fromTo(heading,
          { x: -20, opacity: 0.3 },
          { x: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: heading, start: "top 85%", end: "top 55%", scrub: 1, invalidateOnRefresh: true },
          }
        );
      });

      // Section labels fade in from above
      gsap.utils.toArray<HTMLElement>(".fs-section-label").forEach((label) => {
        gsap.fromTo(label,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: label, start: "top 90%", end: "top 70%", scrub: 1, invalidateOnRefresh: true },
          }
        );
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
        window.scrollTo(0, 0);
      }, 200);
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <div className="fs-page" ref={pageRef}>
      <Link to="/" state={{ scrollTo: "work" }} className="fs-back-link">&larr; Portfolio</Link>
      <Nav onDemo={openDemo} />
      <Hero onDemo={openDemo} />
      <TrustBar />
      <Problem />
      <Features />
      <ProductPreview />
      <UseCases />
      <IntegrationsSection />
      <Testimonials />
      <PricingSection />
      <FaqSection />
      <FinalCta onDemo={openDemo} />
      <Footer />
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
};

export default FlowSync;
