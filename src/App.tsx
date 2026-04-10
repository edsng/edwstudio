import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Portfolio from "./portfolio";
import Detailing from "./demo/detailing/Detailing";
import RealEstate from "./demo/real-estate/RealEstate";
import ListingsPage from "./demo/real-estate/Listings";
import Fitness from "./demo/fitness/Fitness";
import Barbershop from "./demo/barbershop/Barbershop";
import Landscaping from "./demo/landscaping/Landscaping";
import MedSpa from "./demo/medspa/MedSpa";
import FlowSync from "./demo/saas/FlowSync";
import Porsche from "./demo/porsche/Porsche";

// Handles scroll reset and ScrollTrigger cleanup on every route change
function RouteChangeHandler() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Kill all ScrollTrigger instances from the previous page
    ScrollTrigger.getAll().forEach((t) => t.kill());
    // Scroll to top synchronously — runs before any useEffect in child components
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <RouteChangeHandler />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/demo/detailing" element={<Detailing />} />
        <Route path="/demo/real-estate" element={<RealEstate />} />
        <Route path="/demo/real-estate/listings" element={<ListingsPage />} />
        <Route path="/demo/fitness" element={<Fitness />} />
        <Route path="/demo/barbershop" element={<Barbershop />} />
        <Route path="/demo/landscaping" element={<Landscaping />} />
        <Route path="/demo/medspa" element={<MedSpa />} />
        <Route path="/demo/saas" element={<FlowSync />} />
        <Route path="/demo/porsche" element={<Porsche />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
