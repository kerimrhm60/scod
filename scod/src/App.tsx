import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import BusinessTypes from "./BusinessTypes";
import CustomerSupport from "./CustomerSupport";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import HomeLanding from "./HomeLanding";
import Integrations from "./Integrations";
import MainHero from "./MainHero";
import Partners from "./Partners";
import ShippingStats from "./ShippingStats";

function LandingPage() {
  return (
    <div>
      <HomeLanding />
      <FeaturesSection />
      <ShippingStats />
      <Partners />
      <MainHero />
      <BusinessTypes />
      <Integrations />
      <CustomerSupport />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;