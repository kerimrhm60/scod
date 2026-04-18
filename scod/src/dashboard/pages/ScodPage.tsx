import { useState } from "react";
import { ORDERS } from "../data";
import { Toggle, StatusBadge } from "../components/UI";

const SCOD_STEPS = [
  { num: "1", icon: "📦", title: "Sipariş Gönderilir",   desc: "Müşteriye kargo ile sipariş iletilir"      },
  { num: "2", icon: "🚪", title: "Müşteri Teslim Almaz", desc: "Kapıda ödeme siparişi reddedilir"          },
  { num: "3", icon: "💰", title: "Kargo Bedeli İade",    desc: "Kargo ücreti cüzdanınıza iade edilir"      },
];

export default function ScodPage() {
  const [scodActive, setScodActive] = useState(true);

  const scodOrders = ORDERS.filter((o) => o.status === "İade" || o.status === "İptal");

  return (
    <div className="page">
      <div className="page-header">
        <h2>🛡️ SCOD Hizmeti</h2>
        <p>Cash on Delivery kayıplarına karşı koruma — teslim almayan müşterilerden doğan zararı önleyin</p>
      </div>

      <div className="scod-hero">
        <div className="scod-icon-wrap">🛡️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 8 }}>
            SCOD Koruma Hizmeti
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 20, lineHeight: 1.6 }}>
            Kapıda ödeme siparişlerinde müşteri teslim almazsa oluşan kargo zararını önler.
            Siparişi teslim almayan müşterilerden doğan kargo bedelini cüzdanınıza iade eder.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Toggle on={scodActive} onChange={setScodActive} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>
              SCOD Hizmeti: {scodActive ? "✅ Aktif" : "❌ Pasif"}
            </span>
          </div>
        </div>
        <div style={{ textAlign: "center", background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 28px" }}>
          <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>₺12,480</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>Bu ay korunan tutar</div>
        </div>
      </div>

      <div className="scod-steps">
        {SCOD_STEPS.map((s, i) => (
          <div className="scod-step" key={i}>
            <div className="scod-step-num">{s.num}</div>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">SCOD Korunan Siparişler</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Sipariş</th><th>Müşteri</th><th>Adres</th><th>Tutar</th><th>Tarih</th><th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {scodOrders.map((o) => (
                <tr key={o.id}>
                  <td><strong style={{ color: "#7c3aed" }}>{o.id}</strong></td>
                  <td>{o.customer}</td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{o.address}</td>
                  <td><strong>{o.amount}</strong></td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{o.date}</td>
                  <td><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}