import { useState } from "react";
import { CARGO_COMPANIES } from "../data";
import type { CargoCompany } from "../types";
import { Toggle } from "../components/UI";

export default function CargoPage() {
  const [companies, setCompanies] = useState<CargoCompany[]>(CARGO_COMPANIES);

  const toggle = (id: number) =>
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  const summary = [
    { label: "Aktif Firma",   value: companies.filter((c) => c.active).length, icon: "✅" },
    { label: "SCOD Destekli", value: companies.filter((c) => c.scod).length,   icon: "🛡️" },
    { label: "Toplam Firma",  value: companies.length,                          icon: "🏢" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>🚚 Kargo Şirketleri</h2>
        <p>Çalıştığınız kargo firmalarını yönetin, fiyatları ve SCOD desteğini görüntüleyin</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        {summary.map((s) => (
          <div className="card" key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="stat-icon">{s.icon}</div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Kargo Firmaları</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Firma</th><th>Fiyat</th><th>Teslimat Süresi</th><th>SCOD</th><th>Durum</th><th>Aktif/Pasif</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{c.logo}</span>
                      <strong>{c.name}</strong>
                    </div>
                  </td>
                  <td><strong style={{ color: "#7c3aed" }}>{c.price}</strong></td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{c.deliveryTime}</td>
                  <td>
                    {c.scod
                      ? <span className="badge badge-green">✓ Destekli</span>
                      : <span className="badge badge-red">✗ Yok</span>}
                  </td>
                  <td>
                    {c.active
                      ? <span className="badge badge-green">Aktif</span>
                      : <span className="badge badge-red">Pasif</span>}
                  </td>
                  <td><Toggle on={c.active} onChange={() => toggle(c.id)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}