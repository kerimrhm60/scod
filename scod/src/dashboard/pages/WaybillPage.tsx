import { useState } from "react";
import { ORDERS } from "../data";

export default function WaybillPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const waybillOptions = [
    { icon: "🏷️", title: "Kargo Etiketi (Barcode)", desc: "Siparişleriniz için kargo barkodu yazdırın",  count: 48   },
    { icon: "📋", title: "Aktif Siparişler",         desc: "Mevcut aktif siparişlerinizi yönetin",        count: 312  },
    { icon: "🗂️", title: "Önceki Siparişler",        desc: "Geçmiş sipariş kayıtlarınıza erişin",         count: 2483 },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h2>🏷️ Kargo Etiketleri (Waybill)</h2>
        <p>Siparişleriniz için kargo barkodlarını buradan yazdırabilirsiniz</p>
      </div>

      <div className="waybill-grid">
        {waybillOptions.map((opt, i) => (
          <div
            className="waybill-card" key={i}
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: 36 }}>{opt.icon}</span>
              <span className="badge badge-purple">{opt.count}</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 4 }}>{opt.title}</div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>{opt.desc}</div>
            </div>
            {hoveredCard === i && (
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button className="btn-primary" style={{ flex: 1, padding: "9px 12px", fontSize: 12 }}>🖨️ Yazdır</button>
                <button className="btn-outline" style={{ flex: 1, padding: "8px 12px", fontSize: 12 }}>👁️ Görüntüle</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="card-title" style={{ margin: 0 }}>Etiket Bekleyen Siparişler</div>
          <button className="btn-primary" style={{ fontSize: 13 }}>🖨️ Tümünü Yazdır</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Sipariş</th><th>Müşteri</th><th>Adres</th>
                <th>Kargo</th><th>Barkod</th><th>Tarih</th><th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td><strong style={{ color: "#7c3aed" }}>{o.id}</strong></td>
                  <td>{o.customer}</td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{o.address}</td>
                  <td>{o.cargo}</td>
                  <td>
                    <code style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>
                      {o.barcode}
                    </code>
                  </td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{o.date}</td>
                  <td>
                    <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12 }}>🖨️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      </div>
    </div>
  );
}