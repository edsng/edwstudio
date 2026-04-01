import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./real-estate.css";

import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img8 from "./assets/8.jpg";
import img9 from "./assets/9.jpg";
import img10 from "./assets/10.jpg";
import img11 from "./assets/11.jpg";
import img12 from "./assets/12.jpg";

const listingImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

// ─── Data ───

const allListings = [
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
    hoa: null,
    description: "Beautifully maintained 4-bedroom home in a quiet cul-de-sac near Victoria Gardens. Features an open-concept kitchen with granite countertops, stainless steel appliances, and a large center island. The backyard includes a covered patio and mature landscaping — perfect for entertaining.",
    features: ["Central A/C", "Hardwood floors", "Walk-in closets", "Covered patio", "2-car garage", "Near top-rated schools"],
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
    hoa: null,
    description: "Charming single-story home with vaulted ceilings and an open floor plan. Updated kitchen with quartz countertops and new cabinetry. Large master suite with ensuite bathroom. Low-maintenance front yard with drought-tolerant landscaping. Easy access to Ontario Mills and the 10 freeway.",
    features: ["Single story", "Updated kitchen", "Vaulted ceilings", "Low-maintenance yard", "Near Ontario Mills", "Quick freeway access"],
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
    description: "Stunning two-story home in a gated Chino Hills community. Grand foyer with soaring ceilings, formal living and dining rooms, and a chef's kitchen with double ovens. First-floor bedroom suite ideal for guests or multigenerational living. Resort-style backyard with pool, spa, and built-in BBQ.",
    features: ["Pool & spa", "Gated community", "3-car garage", "First-floor bedroom", "Built-in BBQ", "Solar panels"],
  },
  {
    address: "1023 Euclid Ave",
    city: "Ontario",
    price: "$540,000",
    beds: 3,
    baths: 2,
    sqft: "1,620",
    status: "Active",
    type: "Townhome",
    year: 2016,
    garage: 2,
    lot: "2,800 sqft",
    hoa: "$195/mo",
    description: "Modern townhome in a well-maintained complex near downtown Ontario. Open-concept main level with recessed lighting and luxury vinyl plank flooring. Kitchen features soft-close cabinets and a breakfast bar. Private patio with low-maintenance turf. Community pool and playground access.",
    features: ["Community pool", "Attached garage", "Modern finishes", "Private patio", "Near Ontario Airport", "Guest parking"],
  },
  {
    address: "8745 Base Line Rd",
    city: "Rancho Cucamonga",
    price: "$1,150,000",
    beds: 5,
    baths: 5,
    sqft: "4,200",
    status: "Just Listed",
    type: "Single Family",
    year: 2019,
    garage: 3,
    lot: "10,200 sqft",
    hoa: null,
    description: "Luxury estate at the base of the foothills with panoramic mountain views. Custom-built with high-end finishes throughout — imported tile, wide-plank oak floors, and floor-to-ceiling windows. Gourmet kitchen with Wolf range and Sub-Zero refrigerator. Resort backyard with infinity-edge pool, fire pit, and outdoor kitchen.",
    features: ["Mountain views", "Infinity pool", "Smart home", "Wine cellar", "Outdoor kitchen", "Premium appliances"],
  },
  {
    address: "3310 Grand Ave",
    city: "Chino Hills",
    price: "$710,000",
    beds: 4,
    baths: 3,
    sqft: "2,100",
    status: "Active",
    type: "Single Family",
    year: 2001,
    garage: 2,
    lot: "5,800 sqft",
    hoa: "$45/mo",
    description: "Well-kept family home in the desirable Grand Avenue corridor. Spacious kitchen with island seating opens to a sun-filled family room. Upstairs loft works perfectly as a home office or playroom. Private backyard with covered patio and mature fruit trees. Walking distance to trails and parks.",
    features: ["Loft/office space", "Fruit trees", "Near trails", "Covered patio", "Tile roof", "Top-rated schools"],
  },
  {
    address: "420 Indian Hill Blvd",
    city: "Claremont",
    price: "$875,000",
    beds: 3,
    baths: 2,
    sqft: "1,950",
    status: "Open House",
    type: "Single Family",
    year: 1956,
    garage: 2,
    lot: "7,400 sqft",
    hoa: null,
    description: "Classic Claremont charmer just blocks from the Village. Original hardwood floors, Craftsman-style built-ins, and a wood-burning fireplace. Tastefully updated kitchen and bathrooms while preserving mid-century character. Mature shade trees and a spacious backyard with a detached studio — perfect for an art space or home office.",
    features: ["Claremont Village", "Detached studio", "Hardwood floors", "Fireplace", "Mature trees", "Mid-century charm"],
  },
  {
    address: "6612 Mountain Ave",
    city: "Ontario",
    price: "$480,000",
    beds: 2,
    baths: 2,
    sqft: "1,280",
    status: "Active",
    type: "Condo",
    year: 2020,
    garage: 1,
    lot: "N/A",
    hoa: "$320/mo",
    description: "Like-new top-floor condo with mountain views and modern finishes. Open floor plan with quartz waterfall island, stainless steel appliances, and in-unit laundry. Primary bedroom with walk-in closet and ensuite bath. Secured building with elevator, fitness center, and rooftop lounge. Steps from Guasti Regional Park.",
    features: ["Top floor", "Mountain views", "In-unit laundry", "Fitness center", "Rooftop lounge", "Secured entry"],
  },
  {
    address: "7789 Foothill Blvd",
    city: "Rancho Cucamonga",
    price: "$650,000",
    beds: 3,
    baths: 3,
    sqft: "1,780",
    status: "New Price",
    type: "Townhome",
    year: 2018,
    garage: 2,
    lot: "3,200 sqft",
    hoa: "$175/mo",
    description: "End-unit townhome with extra windows and natural light throughout. Modern kitchen with shaker cabinets, quartz counters, and pendant lighting. All bedrooms upstairs with individual bathrooms — ideal for roommates or a growing family. Private fenced yard and a two-car attached garage.",
    features: ["End unit", "Extra windows", "All en-suite bedrooms", "Fenced yard", "Attached garage", "Community park"],
  },
  {
    address: "2250 Harrison Ave",
    city: "Claremont",
    price: "$960,000",
    beds: 4,
    baths: 3,
    sqft: "2,680",
    status: "Just Listed",
    type: "Single Family",
    year: 1978,
    garage: 2,
    lot: "9,100 sqft",
    hoa: null,
    description: "Reimagined mid-century home on a tree-lined street near the Colleges. Complete renovation in 2022 — new roof, plumbing, electrical, and HVAC. Designer kitchen with custom walnut cabinetry, Bosch appliances, and concrete countertops. Expansive backyard with saltwater pool and outdoor shower. ADU potential with existing permitted plans.",
    features: ["Fully renovated", "Saltwater pool", "ADU potential", "Designer kitchen", "Near Claremont Colleges", "New roof & HVAC"],
  },
  {
    address: "14500 Pipeline Ave",
    city: "Chino Hills",
    price: "$825,000",
    beds: 4,
    baths: 3,
    sqft: "2,450",
    status: "Active",
    type: "Single Family",
    year: 2007,
    garage: 3,
    lot: "6,800 sqft",
    hoa: "$60/mo",
    description: "Move-in ready family home backing to a greenbelt in the popular Pipeline community. Upgraded kitchen with white shaker cabinets, farmhouse sink, and a large pantry. Spacious master retreat with dual vanities and soaking tub. Low-maintenance backyard with pavers, artificial turf, and string lighting.",
    features: ["Greenbelt views", "Upgraded kitchen", "3-car garage", "Artificial turf", "Soaking tub", "Community trails"],
  },
  {
    address: "1180 W 4th St",
    city: "Ontario",
    price: "$395,000",
    beds: 2,
    baths: 1,
    sqft: "1,050",
    status: "Active",
    type: "Condo",
    year: 2015,
    garage: 1,
    lot: "N/A",
    hoa: "$285/mo",
    description: "Cozy ground-floor condo ideal for first-time buyers or investors. Open kitchen with breakfast bar and ample cabinet storage. Private covered patio opens to a shared courtyard. In-unit washer/dryer hookups. Community features include pool, spa, and BBQ area. Low Mello-Roos and close to Metrolink.",
    features: ["Ground floor", "Covered patio", "Pool & spa", "Near Metrolink", "Low Mello-Roos", "Washer/dryer hookups"],
  },
];

const cities = ["All", "Rancho Cucamonga", "Ontario", "Chino Hills", "Claremont"];

// ─── Modal ───

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
  const selectDate = (day: number) => { const d = `${viewMonth + 1}/${day}/${viewYear}`; onChange(selectedTime ? `${d} | ${selectedTime}` : d); };
  const selectTime = (t: string) => { onChange(selectedDate ? `${selectedDate} | ${t}` : `| ${t}`); };
  const isDisabled = (day: number) => { const d = new Date(viewYear, viewMonth, day); return d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 0; };

  return (
    <div className="mh-calendar">
      <div className="mh-calendar_month-nav">
        <button className="mh-calendar_arrow" onClick={prevMonth}>&lsaquo;</button>
        <span className="mh-calendar_month">{monthName}</span>
        <button className="mh-calendar_arrow" onClick={nextMonth}>&rsaquo;</button>
      </div>
      <div className="mh-calendar_grid">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <span key={d} className="mh-calendar_day-label">{d}</span>)}
        {Array.from({ length: firstDay }).map((_, i) => <span key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1; const ds = `${viewMonth + 1}/${day}/${viewYear}`; const dis = isDisabled(day);
          return <button key={day} className={`mh-calendar_day ${selectedDate === ds ? "mh-calendar_day--active" : ""} ${dis ? "mh-calendar_day--disabled" : ""}`} onClick={() => !dis && selectDate(day)} disabled={dis}>{day}</button>;
        })}
      </div>
      {selectedDate && (
        <div className="mh-calendar_times">
          <p className="mh-calendar_times-label">Select a time</p>
          <div className="mh-calendar_time-grid">
            {timeSlots.map((t) => <button key={t} className={`mh-calendar_time ${selectedTime === t ? "mh-calendar_time--active" : ""}`} onClick={() => selectTime(t)}>{t}</button>)}
          </div>
        </div>
      )}
    </div>
  );
};

const ListingModal: React.FC<{
  listing: typeof allListings[number];
  img: string;
  onClose: () => void;
}> = ({ listing, img, onClose }) => {
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
  const canProceed = () => {
    const val = scheduleData[currentField.field] || "";
    if (currentField.type === "calendar") return val.includes(" | ") && val.split(" | ").every((s) => s.trim().length > 0);
    return val.trim().length > 0;
  };
  const handleNext = () => { if (scheduleStep < scheduleFields.length - 1) setScheduleStep(scheduleStep + 1); else setSubmitted(true); };
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && canProceed()) { e.preventDefault(); handleNext(); } };

  if (submitted) {
    return (
      <div className="mh-modal-overlay" onClick={onClose}>
        <div className="mh-modal" onClick={(e) => e.stopPropagation()}>
          <button className="mh-modal_close" onClick={onClose}>&times;</button>
          <div className="mh-modal_success">
            <span className="mh-modal_success-icon">✓</span>
            <h2 className="mh-modal_success-title">Showing scheduled!</h2>
            <p className="mh-modal_success-desc">We'll confirm your showing at {listing.address} within 24 hours.</p>
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
          <div className="mh-modal_progress"><div className="mh-modal_progress-bar" style={{ width: `${((scheduleStep + 1) / scheduleFields.length) * 100}%` }} /></div>
          <div className="mh-modal_header">
            <span className="mh-modal_step-count">Step {scheduleStep + 1} of {scheduleFields.length}</span>
            <h2 className="mh-modal_title">{currentField.label}</h2>
          </div>
          <p className="mh-listing-detail_schedule-for">{listing.address}, {listing.city}</p>
          <div className="mh-modal_body" key={scheduleStep}>
            {currentField.type === "calendar" ? (
              <CalendarPicker value={scheduleData[currentField.field] || ""} onChange={(val) => setScheduleData({ ...scheduleData, [currentField.field]: val })} />
            ) : (
              <input className="mh-input mh-modal_input" type={currentField.type} placeholder={currentField.placeholder} value={scheduleData[currentField.field] || ""} onChange={(e) => setScheduleData({ ...scheduleData, [currentField.field]: e.target.value })} onKeyDown={handleKeyDown} autoFocus />
            )}
          </div>
          <div className="mh-modal_actions">
            <button className="mh-btn mh-btn--outline" onClick={() => scheduleStep > 0 ? setScheduleStep(scheduleStep - 1) : setShowSchedule(false)}>Back</button>
            <button className="mh-btn mh-btn--primary" onClick={handleNext} disabled={!canProceed()} style={{ marginLeft: "auto" }}>{scheduleStep === scheduleFields.length - 1 ? "Confirm Showing" : "Continue"}</button>
          </div>
          <p className="mh-modal_hint">{currentField.type !== "calendar" && "Press Enter to continue"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mh-modal-overlay" onClick={onClose}>
      <div className="mh-modal mh-modal--listing" onClick={(e) => e.stopPropagation()}>
        <button className="mh-modal_close" onClick={onClose}>&times;</button>

        <div className="mh-modal_img-wrapper">
          <img src={img} alt={listing.address} className="mh-modal_img" />
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
            <ul className="mh-modal_features">{listing.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>

          <div className="mh-listing-modal_actions">
            <button className="mh-btn mh-btn--primary mh-btn--full" onClick={() => setShowSchedule(true)}>Schedule a Showing</button>
            <button className="mh-btn mh-btn--outline mh-btn--full" onClick={onClose}>Back to Listings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Component ───

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "All";
  const [activeCity, setActiveCity] = useState(initialCity);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedListing, setSelectedListing] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const city = searchParams.get("city");
    if (city && cities.includes(city)) {
      setActiveCity(city);
    }
  }, [searchParams]);

  const handleCityChange = (city: string) => {
    setActiveCity(city);
    if (city === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ city });
    }
  };

  let filtered = activeCity === "All"
    ? allListings
    : allListings.filter((l) => l.city === activeCity);

  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")));
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => parseInt(b.price.replace(/\D/g, "")) - parseInt(a.price.replace(/\D/g, "")));
  }

  return (
    <div className="mh-page">
      <Link to="/" state={{ scrollTo: "work" }} className="mh-back-link">&larr; Portfolio</Link>

      <header className="mh-listings-page_header">
        <div className="mh-listings-page_header-inner">
          <Link to="/demo/real-estate" className="mh-listings-page_back">
            &larr; Back to home
          </Link>
          <div className="mh-listings-page_brand">
            <span className="mh-nav_logo-name">Marquez</span>
            <span className="mh-nav_logo-sub">Home Group</span>
          </div>
        </div>
      </header>

      <div className="mh-listings-page">
        <div className="mh-listings-page_top">
          <div>
            <h1 className="mh-listings-page_title">
              {activeCity === "All" ? "All Listings" : activeCity}
            </h1>
            <p className="mh-listings-page_count">
              {filtered.length} {filtered.length === 1 ? "home" : "homes"} available
            </p>
          </div>

          <div className="mh-listings-page_controls">
            <select
              className="mh-input mh-select mh-listings-page_sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mh-listings-page_filters">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleCityChange(city)}
              className={`mh-filter-btn ${activeCity === city ? "mh-filter-btn--active" : ""}`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="mh-listings-page_grid">
          {filtered.map((l, i) => {
            const imgIndex = allListings.indexOf(l);
            return (
            <div key={i} className="mh-listing-card mh-listing-card--clickable" onClick={() => setSelectedListing(imgIndex)}>
              <div className="mh-listing-card_img">
                <img src={listingImages[imgIndex]} alt={l.address} className="mh-listing-card_photo" />
                <span className="mh-listing-badge">{l.status}</span>
              </div>
              <div className="mh-listing-card_body">
                <div className="mh-listing-card_top">
                  <p className="mh-listing-price">{l.price}</p>
                  <span className="mh-listing-type">{l.type}</span>
                </div>
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
          );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mh-listings-page_empty">
            <p>No listings found in this area. Check back soon.</p>
          </div>
        )}
      </div>

      <footer className="mh-footer" style={{ marginTop: 80 }}>
        <div className="mh-footer_inner">
          <div className="mh-footer_bottom">
            <p>&copy; {new Date().getFullYear()} Marquez Home Group. All rights reserved.</p>
            <Link to="/" state={{ scrollTo: "work" }} className="mh-footer_portfolio">Site by edwstudio</Link>
          </div>
        </div>
      </footer>

      {selectedListing !== null && (
        <ListingModal
          listing={allListings[selectedListing]}
          img={listingImages[selectedListing]}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
};

export default ListingsPage;
