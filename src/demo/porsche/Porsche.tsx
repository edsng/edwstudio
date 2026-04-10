import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './porsche.css';
import logo from './logo.png';

/* ── Imagery ── */
const HERO   = 'https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/603076532_18548021245050680_5927660580651961697_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzc5MzM3Njc1ODczMzk3MDkwNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4OTYwLnNkci5DMyJ9&_nc_ohc=9TlVwj72NecQ7kNvwFTXtc0&_nc_oc=Adru632Obcr4RRhQiNJdNnse29DlUath_MkpdlYKamMhV_s2j7GfiWU3hn3XvqMtLlw&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=uFnOEJ92FxxRJxZ_37Wpug&_nc_ss=7a32e&oh=00_Af27uMYjH42D_ZPBDUMAy7HvhFIY_ZwTntoRK6fLcspYUg&oe=69DE1D2F';
const SHOT_1 = 'https://scontent-lax7-1.cdninstagram.com/v/t51.82787-15/656295640_18144432307489423_626174770494962913_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzUzOTY3MjgyODU0ODU3OTY1OQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=KP_OepjSdFcQ7kNvwG4yUSC&_nc_oc=AdpLoc_-JjLdmNm6muc38K6sozg3hwjhmgWciqw8bV5LSZM3u1_t0VhjM4ZjgxLnNHA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax7-1.cdninstagram.com&_nc_gid=psWLUAJUmVyX9EuUM9yBbg&_nc_ss=7a32e&oh=00_Af2mmz0rMEVPK8-pmNyCkFuen4-6xo1uj7VJ5R7ZYCxLJQ&oe=69DE2B7E';
const SHOT_2 = 'https://scontent-lax7-1.cdninstagram.com/v/t51.82787-15/519436198_18277200724276255_1273435081441145667_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzY3NDYzOTc3ODM0NDQ1ODY2OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=HUOVAwP5j1cQ7kNvwFq_iKQ&_nc_oc=AdokGkIE7VY6Tq1lYtcRpDIJ4AmNJMy-cyZnyRPVdhxt2w9ukJgg2WE3rHROPBR0pFs&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax7-1.cdninstagram.com&_nc_gid=psWLUAJUmVyX9EuUM9yBbg&_nc_ss=7a32e&oh=00_Af3vXSL2z_0bcnpUCnR4vskaMfAb8XhQehIDbrV7_Hef-g&oe=69DE1CE8';
const SHOT_3 = 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/568483622_17973751490944035_6700623790270215315_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=Mzc0Njg5Mzk2NTg3NTI0MDUwMQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxOS5zZHIuQzMifQ%3D%3D&_nc_ohc=bHvjjnrf6YMQ7kNvwETvrus&_nc_oc=Adq1a0MTvKbSmAC0XLHsWYG6CRJOj6TUHews77LMCh9HSbtnWIqRJVUWS5gruJZ7kl8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=pP81zrZhIgmTJSel2nFCcQ&_nc_ss=7a32e&oh=00_Af1mxkpppC5ylaHDcM_fV7H2wCllSijVlKnMOPTwLutpIA&oe=69DE14E3';
const TRACK  = 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/567138517_17973751508944035_2816379543722476192_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzc0Njg5Mzk2NTg2Njg3MjI4Ng%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxOS5zZHIuQzMifQ%3D%3D&_nc_ohc=CoCmgnE5iHIQ7kNvwEQ8VOl&_nc_oc=AdpnRPWoZmZhXKtCFTzzDwAldISLmVdshbZS-RTweX653HIxQLjosxDBjAcqu4cWCRM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_gid=b3sedsBGEtGs-Hd3qdR_lw&_nc_ss=7a32e&oh=00_Af3OUkFxzJjPJ4kx10Ut2iRKINyN1vhi8vHx5mVtGqYQwg&oe=69DE26D5';
const DETAIL = 'https://scontent-lax3-2.cdninstagram.com/v/t51.82787-15/566617630_17973751460944035_5132228497507698494_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzc0Njg5Mzk2NTg2Njg3NzkzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkxOS5zZHIuQzMifQ%3D%3D&_nc_ohc=igWWnaM7NLgQ7kNvwFF5eC0&_nc_oc=Adohr-iQkIJjuUNHy4jtRRV_5z6hCCjqeovX4fzoWHxU5rBo5bnhVQuJpTNQYboPp_0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lax3-2.cdninstagram.com&_nc_gid=wRore_kdzz8vW5LOlm5SVQ&_nc_ss=7a32e&oh=00_Af1CEU4pOIAa5MdrBdZ49S3bG-xnthhLSXAZXii4a_JfNQ&oe=69DE1910';

const SPECS = [
  { label: '0\u201360 MPH',  value: 3.2,  unit: 's' },
  { label: 'Top Track', value: 196,  unit: 'mph' },
  { label: 'Power',     value: 493,  unit: 'hp' },
  { label: 'Redline',   value: 9000, unit: 'rpm' },
];

const ENGINEERING_STEPS = [
  {
    title: 'Flat-Six Engine',
    desc: 'At the heart of the GT4 RS sits a 4.0-litre naturally aspirated flat-six, shared with the legendary 911 GT3. It produces 493 hp at 8,300 rpm and screams to a 9,000 rpm redline \u2014 a mechanical symphony that no turbocharger could replicate. Individual throttle bodies sharpen response to razor-thin margins, while dry-sump lubrication keeps oil pressure stable through sustained high-g cornering.',
    image: SHOT_1,
    imagePos: 'center',
  },
  {
    title: '7-Speed PDK',
    desc: 'The dual-clutch transmission has been recalibrated with shorter ratios optimised for track use. Shifts happen in milliseconds \u2014 upshifts with a sharp bark, downshifts with automatic rev-matching blips that keep the rear axle composed under heavy braking. Paddle shifters with a shortened throw let you stay in the moment between braking zones, apex, and full-throttle exit.',
    image: SHOT_2,
    imagePos: 'center 10%',
  },
  {
    title: 'Aerodynamics',
    desc: 'The GT4 RS generates 25% more downforce than the standard GT4. A swan-neck rear wing keeps airflow undisturbed across the underside of the element. NACA ducts on the hood channel cooling air to the front brakes, while the enlarged front diffuser and rear venturi extract ground effect at speed. At 200 km/h, the car produces enough downforce to noticeably compress the suspension \u2014 the faster you go, the harder it grips.',
    image: TRACK,
    imagePos: 'center',
  },
  {
    title: 'Lightweight Build',
    desc: 'Carbon-fibre reinforced plastic replaces steel and aluminium across the hood, front fenders, and rear wing supports \u2014 saving over 20 kg at the highest points of the car, lowering the centre of gravity where it matters most. The optional Weissach Package goes further: titanium roll cage, magnesium wheels, and carbon-weave interior trim strip additional mass for a dry weight of just 1,415 kg.',
    image: DETAIL,
    imagePos: 'center',
  },
];

/* ── Hooks ── */

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold });
    const delay = setTimeout(() => io.observe(el), 150);
    return () => { clearTimeout(delay); io.disconnect(); };
  }, [threshold]);
  return { ref, visible };
}

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - rect.top / vh;
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    calc();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return { ref, progress };
}

/* ── Components ── */

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`gt4-reveal ${visible ? 'gt4-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function TextReveal({ text, tag: Tag = 'h2', className = '' }: { text: string; tag?: 'h1' | 'h2' | 'h3' | 'p'; className?: string }) {
  const { ref, visible } = useInView(0.2);
  const lines = text.split('\n');
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement & HTMLParagraphElement>} className={`gt4-text-reveal ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="gt4-tr-line">
          <span className={`gt4-tr-inner ${visible ? 'gt4-in' : ''}`} style={{ transitionDelay: `${i * 140 + 100}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function ImageReveal({ src, alt = '', aspect = '16/9', direction = 'left' }: { src: string; alt?: string; aspect?: string; direction?: 'left' | 'right' | 'up' }) {
  const { ref, visible } = useInView(0.15);
  return (
    <div ref={ref} className={`gt4-img-reveal ${visible ? 'gt4-in' : ''} gt4-dir-${direction}`} style={{ aspectRatio: aspect }}>
      <div className="gt4-img-reveal-curtain" />
      <img src={src} alt={alt} loading="lazy" />
    </div>
  );
}

function Counter({ to, duration = 1600 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const isInt = Number.isInteger(to);
  return <span ref={ref}>{isInt ? Math.round(val).toLocaleString() : val.toFixed(1)}</span>;
}

/* ── Pinned Engineering Section ── */

function EngineeringSection({ steps }: { steps: typeof ENGINEERING_STEPS }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionH = section.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / sectionH));
        setProgress(p);
        const idx = Math.min(steps.length - 1, Math.floor(p * steps.length));
        setActiveIndex(idx);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="gt4-eng-section" style={{ height: `${steps.length * 45 + 40}vh` }}>
      <div className="gt4-eng-sticky">
        <div className="gt4-eng-image-wrap">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`gt4-eng-image ${i === activeIndex ? 'gt4-active' : ''}`}
              style={{ backgroundImage: `url(${step.image})`, backgroundPosition: step.imagePos }}
            />
          ))}
        </div>

        <div className="gt4-eng-steps">
          <p className="gt4-kicker">Engineering</p>
          <h2 className="gt4-section-title gt4-light gt4-eng-heading">What makes it relentless.</h2>
          <div className="gt4-eng-list">
            {steps.map((step, i) => (
              <div key={i} className={`gt4-eng-step ${i === activeIndex ? 'gt4-active' : ''}`}>
                <div className="gt4-eng-step-header">
                  <span className="gt4-eng-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="gt4-eng-step-title">{step.title}</h3>
                </div>
                <div className="gt4-eng-step-body">
                  <p>{step.desc}</p>
                </div>
                <div className="gt4-eng-step-line" />
              </div>
            ))}
          </div>
        </div>

        <div className="gt4-eng-progress">
          <div className="gt4-eng-progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}

/* ──────────── MAIN COMPONENT ──────────── */

export default function Porsche() {
  const scrollY = useScrollY();
  const navSolid = scrollY > 80;
  const perfSection = useScrollProgress();

  useEffect(() => {
    const preload = (src: string) => { const img = new Image(); img.src = src; };
    [SHOT_1, SHOT_2, SHOT_3, TRACK, DETAIL].forEach(preload);
  }, []);

  return (
    <div className="gt4-app">
      <Link to="/" state={{ scrollTo: 'work' }} className="gt4-back-link">&larr; Portfolio</Link>

      {/* NAV */}
      <nav className={`gt4-nav ${navSolid ? 'gt4-solid' : ''}`}>
        <div className="gt4-nav-inner">
          <img src={logo} alt="Porsche" className="gt4-brand" />
          <ul className="gt4-nav-links">
            <li><a href="#gt4-model">Model</a></li>
            <li><a href="#gt4-performance">Performance</a></li>
            <li><a href="#gt4-engineering">Engineering</a></li>
            <li><a href="#gt4-design">Design</a></li>
          </ul>
          <button className="gt4-cta-btn gt4-small">Configure</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="gt4-hero">
        <div
          className="gt4-hero-bg"
          style={{
            backgroundImage: `url(${HERO})`,
            transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        <div className="gt4-hero-overlay" style={{ opacity: Math.min(0.85, 0.45 + scrollY * 0.0008) }} />
        <div
          className="gt4-hero-content"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
            opacity: Math.max(0, 1 - scrollY / 500),
          }}
        >
          <p className="gt4-kicker gt4-hero-kicker">Introducing</p>
          <h1 className="gt4-hero-title">
            <span className="gt4-hero-line"><span className="gt4-hero-line-inner" style={{ animationDelay: '0.3s' }}>718 Cayman</span></span>
            <span className="gt4-hero-line"><span className="gt4-hero-line-inner gt4-rs" style={{ animationDelay: '0.5s' }}>GT4 RS</span></span>
          </h1>
          <p className="gt4-hero-sub">Born on the track. Built for the road.</p>
          <div className="gt4-hero-actions">
            <button className="gt4-cta-btn gt4-primary">Reserve Now</button>
            <button className="gt4-cta-btn gt4-ghost">Watch Film &rarr;</button>
          </div>
        </div>
        <div className="gt4-scroll-hint"><span>SCROLL</span></div>
      </header>

      {/* SPECS */}
      <section id="gt4-model" className="gt4-section gt4-dark">
        <Reveal>
          <p className="gt4-kicker gt4-center">The Numbers</p>
          <TextReveal text="Engineered without compromise." className="gt4-section-title gt4-light gt4-center" />
        </Reveal>
        <div className="gt4-specs">
          {SPECS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <div className="gt4-spec">
                <div className="gt4-spec-value">
                  <Counter to={s.value} />
                  <span className="gt4-spec-unit">{s.unit}</span>
                </div>
                <div className="gt4-spec-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="gt4-performance" className="gt4-parallax-section" ref={perfSection.ref as React.Ref<HTMLElement>}>
        <div
          className="gt4-parallax-bg"
          style={{
            backgroundImage: `url(${TRACK})`,
            transform: `translate3d(0, ${(perfSection.progress - 0.5) * -120}px, 0) scale(${1 + perfSection.progress * 0.08})`,
          }}
        />
        <div className="gt4-parallax-content">
          <Reveal>
            <p className="gt4-kicker">Performance</p>
            <TextReveal text={"A 4.0L naturally aspirated flat-six.\nRevving to nine thousand."} className="gt4-section-title gt4-light" />
            <p className="gt4-lede">Derived directly from the 911 GT3, the high-revving heart of the GT4 RS delivers
              an unfiltered, mechanical symphony &mdash; paired with a 7-speed PDK calibrated for the apex.</p>
          </Reveal>
        </div>
        <div className="gt4-section-progress">
          <div className="gt4-section-progress-fill" style={{ transform: `scaleX(${perfSection.progress})` }} />
        </div>
      </section>

      {/* ENGINEERING */}
      <div id="gt4-engineering">
        <EngineeringSection steps={ENGINEERING_STEPS} />
      </div>

      {/* DESIGN */}
      <section id="gt4-design" className="gt4-section">
        <div className="gt4-split">
          <Reveal>
            <div className="gt4-split-text">
              <p className="gt4-kicker">Design</p>
              <TextReveal text="Form follows downforce." className="gt4-section-title" />
              <p className="gt4-lede gt4-dark-text">
                Every vent, every duct, every line is in service of speed. NACA ducts on the hood feed cool air
                to the front brakes. The swan-neck rear wing generates the kind of downforce once reserved for
                pure race cars.
              </p>
              <ul className="gt4-feature-list">
                {['CFRP hood & front fenders', 'Process air intakes behind the windows', 'Forged magnesium wheels (optional)', 'Weissach Package available'].map((item, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <li>&mdash; {item}</li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
          <div>
            <ImageReveal src={SHOT_3} direction="left" aspect="3/4" />
          </div>
        </div>

        <div className="gt4-split" style={{ marginTop: '8rem' }}>
          <div>
            <ImageReveal src={DETAIL} direction="left" aspect="3/4" />
          </div>
          <Reveal delay={100}>
            <div className="gt4-split-text">
              <p className="gt4-kicker">Interior</p>
              <TextReveal text="Purpose, without excess." className="gt4-section-title" />
              <p className="gt4-lede gt4-dark-text">
                Carbon-weave bucket seats, an Alcantara-wrapped wheel, and a
                driver-centric cockpit stripped of distraction. The GT4 RS puts everything
                you need at your fingertips &mdash; and nothing you don&rsquo;t.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="gt4-final-cta">
        <Reveal>
          <TextReveal text="Your GT4 RS awaits." className="gt4-section-title gt4-light gt4-center" />
          <p className="gt4-lede gt4-center gt4-muted">Starting at $143,050. Limited allocation.</p>
          <div className="gt4-hero-actions gt4-center">
            <button className="gt4-cta-btn gt4-primary">Reserve Yours</button>
            <button className="gt4-cta-btn gt4-ghost">Find a Dealer</button>
          </div>
        </Reveal>
      </section>

      <footer className="gt4-footer">
        <div className="gt4-footer-inner">
          <img src={logo} alt="Porsche" className="gt4-brand" />
          <div className="gt4-footer-links">
            <a href="#">Legal</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Contact</a>
          </div>
          <div className="gt4-copy">&copy; 2026 Dr. Ing. h.c. F. Porsche AG</div>
        </div>
      </footer>
    </div>
  );
}
