import React from 'react';
import './styles/ShippingStats.css';
const statRows = [
  { city: 'الرياض', count: 'Count: 6 Order', badge: '↑ 38.27%', badgeType: 'up', pct: '22.22%' },
  { city: 'أبها', count: 'Count: 2 Order', badge: '0%', badgeType: 'zero', pct: '7.41%' },
  { city: 'المدينة المنورة', count: 'Count: 2 Order', badge: '↑ 107.56%', badgeType: 'up', pct: '7.41%' },
];

const SignalIcon: React.FC = () => (
  <svg width="13" height="10" viewBox="0 0 13 10">
    <rect x="0"   y="6.5" width="2"  height="3.5" rx="0.4" fill="#111" opacity="0.35" />
    <rect x="3"   y="4.5" width="2"  height="5.5" rx="0.4" fill="#111" opacity="0.6" />
    <rect x="6"   y="2"   width="2"  height="8"   rx="0.4" fill="#111" opacity="0.8" />
    <rect x="9.5" y="0"   width="2"  height="10"  rx="0.4" fill="#111" />
  </svg>
);

const WifiIcon: React.FC = () => (
  <svg width="12" height="9" viewBox="0 0 12 9">
    <circle cx="6" cy="8.2" r="1.1" fill="#111" />
    <path d="M3.8 5.8 Q6 3.2 8.2 5.8" stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M1.2 3 Q6 -0.8 10.8 3"   stroke="#111" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
  </svg>
);

const BatteryIcon: React.FC = () => (
  <svg width="22" height="11" viewBox="0 0 22 11">
    <rect x="0.5" y="0.5" width="18"  height="10" rx="2.5" stroke="#111" strokeWidth="1" fill="none" />
    <rect x="19"  y="3.5" width="2.5" height="4"  rx="1"   fill="#111" opacity="0.35" />
    <rect x="2"   y="2"   width="13"  height="7"  rx="1.5" fill="#111" />
  </svg>
);

const FazaaLogoSVG: React.FC = () => (
  <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" width="70" height="70">
    <defs>
      <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#6d28d9" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
    </defs>
    <path d="M18 35 L30 20 L36 20 L24 35 L36 50 L30 50 Z" fill="url(#lg1)" />
    <path d="M26 35 L38 20 L44 20 L32 35 L44 50 L38 50 Z" fill="url(#lg2)" opacity="0.85" />
    <path d="M44 26 L54 35 L44 44" stroke="url(#lg1)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="14" y1="30" x2="22" y2="30" stroke="url(#lg1)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="35" x2="20" y2="35" stroke="url(#lg2)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    <line x1="14" y1="40" x2="22" y2="40" stroke="url(#lg1)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const PhoneMockup: React.FC = () => (
  <div className="ss-phone-wrap">
    <div className="ss-phone-body">
      <div className="ss-phone-screen">
        <div className="ss-di" />
        <div className="ss-sbar">
          <span className="ss-sbar-time">9:41</span>
          <div className="ss-sbar-icons">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>
        <div className="ss-logo-area">
          <div className="ss-fazaa-logo-icon"><FazaaLogoSVG /></div>
          <div className="ss-fazaa-logo-text">فرصة</div>
          <div className="ss-fazaa-logo-sub">FAZAA</div>
        </div>
        <div className="ss-home-bar" />
      </div>
    </div>
  </div>
);

const TabletMockup: React.FC = () => (
  <div className="ss-tablet-body">
    <div className="ss-tablet-screen">
      <div className="ss-tab-dots">
        <div className="ss-dot ss-dot-r" />
        <div className="ss-dot ss-dot-y" />
        <div className="ss-dot ss-dot-g" />
      </div>
      <div className="ss-stat-title">عدد الطلبات حسب المدن</div>
      <div className="ss-stat-sub">على 6 مدن</div>
      <table>
        <tbody>
          {statRows.map((row, i) => (
            <tr key={i}>
              <td className="ss-pct">{row.pct}</td>
              <td><span className={`ss-badge ss-badge--${row.badgeType}`}>{row.badge}</span></td>
              <td>
                <span className="ss-city">{row.city}</span><br />
                <span className="ss-cnt">{row.count}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ShippingStats: React.FC = () => (
  <section className="ss-wrapper">
    <h2 className="ss-title">Denizcilik Şirketlerinin İstatistikleri ve Performansı</h2>
    <p className="ss-desc">
      Bir bakışla, nakliye şirketlerinin performansını değerlendirebilir ve hizmetlerinin
      kalitesini inceleyebilirsiniz. İşte avantaj — güvenilir verilere dayanarak akıllıca
      kararlar almanıza yardımcı olur ve kargo deneyiminizi iyileştirir.
    </p>
    <div className="ss-grid">
      <div className="ss-card">
        <PhoneMockup />
        <div>
          <div className="ss-card-label">Kapsamlı Sevkiyat Analizi</div>
          <p className="ss-card-sublabel">
            Sevkiyatlarınızın performansını ayrıntılı olarak görmenize olanak tanır;
            teslimat sürelerini, başarı ve başarısızlık oranlarını takip edebilirsiniz.
          </p>
        </div>
      </div>
      <div className="ss-card">
        <div>
          <div className="ss-card-label">Sürekli güncellenen veriler</div>
          <p className="ss-card-sublabel">
            Güncel kalmak için en güncel istatistikleri ve gerçek zamanlı verileri edinin.
          </p>
        </div>
        <TabletMockup />
      </div>
    </div>
  </section>
);

export default ShippingStats;