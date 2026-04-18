import { useState } from "react";
import type { PageId, NavItem } from "../types";
import { NAV_ITEMS } from "../data";
import { Avatar } from "./UI";

interface SidebarProps {
  page: PageId;
  onNavigate: (p: PageId) => void;
}

export default function Sidebar({ page, onNavigate }: SidebarProps) {
  const [waybillOpen, setWaybillOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <span className="logo-dot" />
          ShipFlow
        </div>
      </div>

      <div className="nav-group-label">Menü</div>

      {NAV_ITEMS.map((item: NavItem) => (
        <div key={item.id}>
          <div
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => {
              onNavigate(item.id);
              if (item.submenu) setWaybillOpen((v) => !v);
            }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.submenu && (
              <span style={{ fontSize: 11, color: "inherit" }}>
                {waybillOpen ? "▲" : "▼"}
              </span>
            )}
          </div>

          {item.submenu && waybillOpen && (
            <div className="nav-submenu">
              {item.submenu.map((s: string) => (
                <div className="nav-submenu-item" key={s}>{s}</div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: "auto", padding: "16px 20px", borderTop: "1px solid #f3f4f6" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initial="A" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>Admin</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>admin@magazam.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}