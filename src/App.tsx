import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./portfolio";
import Detailing from "./demo/detailing/Detailing";
import RealEstate from "./demo/real-estate/RealEstate";
import ListingsPage from "./demo/real-estate/Listings";
import Fitness from "./demo/fitness/Fitness";
import Barbershop from "./demo/barbershop/Barbershop";
import Landscaping from "./demo/landscaping/Landscaping";
import MedSpa from "./demo/medspa/MedSpa";
import Roofing from "./demo/roofing/Roofing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/demo/detailing" element={<Detailing />} />
        <Route path="/demo/real-estate" element={<RealEstate />} />
        <Route path="/demo/real-estate/listings" element={<ListingsPage />} />
        <Route path="/demo/fitness" element={<Fitness />} />
        <Route path="/demo/barbershop" element={<Barbershop />} />
        <Route path="/demo/landscaping" element={<Landscaping />} />
        <Route path="/demo/medspa" element={<MedSpa />} />
        <Route path="/demo/roofing" element={<Roofing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
