import { HOME_STATS, MONTHLY_ORDERS, MONTHS, CARGO_DIST, ORDERS } from "../data";
import { StatusBadge } from "../components/UI";

export default function HomePage() {
  const maxVal = Math.max(...MONTHLY_ORDERS);

  const r = 52, cx = 60, cy = 60, circ = 2 * Math.PI * r;
  let offset = 0;
  const segments = CARGO_DIST.map((d) => {
    const dash = (d.value / 100) * circ;
    const seg = { ...d, dash, offset: circ - offset };
    offset += dash;
    return seg;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h2>📊 Genel Bakış</h2>
        <p>Mağazanızın performansına genel bakış — bugün güncellendi</p>
      </div>

      <div className="stats-grid">
        {HOME_STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-top">
              <div className="stat-icon">{s.icon}</div>
              <span className={`stat-trend ${s.trend > 0 ? "trend-up" : "trend-down"}`}>
                {s.trend > 0 ? "▲" : "▼"} {Math.abs(s.trend)}%
              </span>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label} · {s.sub}</div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="card">
          <div className="card-title">Aylık Sipariş Raporu</div>
          <div className="chart-bars">
            {MONTHLY_ORDERS.map((v, i) => (
              <div className="chart-bar-wrap" key={i}>
                <div
                  className={`chart-bar ${i === 11 ? "" : "dimmed"}`}
                  style={{ height: `${(v / maxVal) * 100}%` }}
                  title={`${MONTHS[i]}: ${v}`}
                />
                <span className="chart-month">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Kargo Dağılımı</div>
          <div className="donut-wrap">
            <svg width="120" height="120" className="donut-svg">
              {segments.map((seg, i) => (
                <circle
                  key={i} cx={cx} cy={cy} r={r}
                  fill="none" stroke={seg.color} strokeWidth="14"
                  strokeDasharray={`${seg.dash} ${circ - seg.dash}`}
                  strokeDashoffset={seg.offset} strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 0.5s" }}
                />
              ))}
              <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#111827">
                {CARGO_DIST[0].value}%
              </text>
            </svg>
            <div className="donut-legend">
              {CARGO_DIST.map((d) => (
                <div className="donut-row" key={d.name}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className="donut-dot" style={{ background: d.color }} />
                    {d.name}
                  </div>
                  <strong>{d.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="card-title" style={{ margin: 0 }}>Son Siparişler</div>
          <button className="btn-outline" style={{ padding: "7px 16px", fontSize: 12 }}>Tümünü Gör</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Sipariş No</th><th>Müşteri</th><th>Kargo</th><th>Tutar</th><th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.id}>
                  <td><strong style={{ color: "#7c3aed" }}>{o.id}</strong></td>
                  <td>{o.customer}</td>
                  <td>{o.cargo}</td>
                  <td><strong>{o.amount}</strong></td>
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