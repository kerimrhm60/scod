import { useState } from "react";
import type { PageId } from "./types";
import Sidebar from "./components/Sidebar";
import Topbar  from "./components/Topbar";
import HomePage    from "./pages/HomePage";
import WaybillPage from "./pages/WaybillPage";
import CargoPage   from "./pages/CargoPage";
import ScodPage    from "./pages/ScodPage";
import WalletPage  from "./pages/WalletPage";
import AccountPage from "./pages/AccountPage";
import AboutPage   from "./pages/AboutPage";

function renderPage(page: PageId) {
  switch (page) {
    case "home":    return <HomePage />;
    case "waybill": return <WaybillPage />;
    case "cargo":   return <CargoPage />;
    case "scod":    return <ScodPage />;
    case "wallet":  return <WalletPage />;
    case "account": return <AccountPage />;
    case "about":   return <AboutPage />;
  }
}

export default function Dashboard() {
  const [page, setPage] = useState<PageId>("home");

  return (
    <div className="dash-root">
      <Sidebar page={page} onNavigate={setPage} />
      <main className="main">
        <Topbar page={page} />
        <div key={page}>{renderPage(page)}</div>
      </main>
    </div>
  );
}