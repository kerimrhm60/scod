import type { PageId } from "../types";
import { Avatar } from "./UI";

interface TopbarProps {
  page: PageId;
}

const PAGE_TITLES: Record<PageId, string> = {
  home:    "Ana Sayfa",
  waybill: "Kargo Etiketleri",
  cargo:   "Kargo Şirketleri",
  scod:    "SCOD",
  wallet:  "Cüzdan",
  account: "Hesabım",
  about:   "Hakkımızda",
};

export default function Topbar({ page }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">{PAGE_TITLES[page]}</div>
      <div className="topbar-right">
        <div className="progress-wrap">
          <span className="progress-label">80/100</span>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: "80%" }} />
          </div>
          <span style={{ fontSize: 11, color: "#7c3aed" }}>25 gün</span>
        </div>
        <button className="topbar-btn">🔔</button>
        <button className="topbar-btn">⚙️</button>
        <Avatar initial="A" />
      </div>
    </header>
  );
}