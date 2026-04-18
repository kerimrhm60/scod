import { TRANSACTIONS, PAYMENT_METHODS } from "../data";

export default function WalletPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h2>💰 Cüzdan</h2>
        <p>SCOD bakiyenizi ve ödeme işlemlerinizi buradan yönetin</p>
      </div>

      <div className="wallet-hero">
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>SCOD Bakiyesi</div>
        <div className="wallet-amount">₺3.847,50</div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>Son güncelleme: 12 Mart 2026, 14:32</div>
      </div>

      <div style={{ marginBottom: 8, fontWeight: 700, fontSize: 14, color: "#111827" }}>
        Ödeme Yöntemi Ekle
      </div>
      <div className="payment-grid">
        {PAYMENT_METHODS.map((p) => (
          <button className="payment-btn" key={p.id}>
            <span className="payment-icon">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-title">Son İşlemler</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Açıklama</th><th>Yöntem</th><th>Tarih</th><th>Tutar</th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t) => (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{t.method}</td>
                  <td style={{ color: "#9ca3af", fontSize: 12 }}>{t.date}</td>
                  <td>
                    <strong style={{ color: t.type === "in" ? "#10b981" : "#ef4444" }}>
                      {t.amount}
                    </strong>
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