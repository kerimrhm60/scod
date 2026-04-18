import { ABOUT_STATS } from "../data";

const ABOUT_CARDS = [
  { icon: "🚀", title: "Biz Kimiz",    desc: "Türkiye'nin lider e-ticaret lojistik yönetim platformu. Mağaza sahiplerine akıllı kargo çözümleri sunuyoruz." },
  { icon: "💡", title: "Ne Sunuyoruz", desc: "Çoklu kargo entegrasyonu, SCOD koruması, gerçek zamanlı takip ve gelişmiş raporlama özellikleri."            },
  { icon: "🎯", title: "Hedeflerimiz", desc: "2026 yılına kadar 50.000 mağazaya ulaşmak ve Türkiye'nin en güvenilir lojistik platformu olmak."              },
];

export default function AboutPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h2>ℹ️ Hakkımızda</h2>
        <p>Platformumuz hakkında detaylı bilgi edinin</p>
      </div>

      <div className="about-hero">
        <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 28, fontWeight: 800, color: "#1e1b4b", marginBottom: 10 }}>
          ShipFlow Platform
        </h2>
        <p style={{ fontSize: 15, color: "#6b7280", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          Mağazanızın kargo süreçlerini uçtan uca yönetin. Akıllı atama, gerçek zamanlı takip
          ve SCOD koruması ile lojistikte bir adım önde olun.
        </p>
      </div>

      <div className="about-grid">
        {ABOUT_CARDS.map((c) => (
          <div className="about-card" key={c.title}>
            <div className="about-card-icon">{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 8 }}>{c.title}</div>
            <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>{c.desc}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Platform İstatistikleri</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {ABOUT_STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#7c3aed" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}