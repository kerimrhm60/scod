import React from 'react';
import './styles/MainHero.css';

const MainHero: React.FC = () => (
  <section className="mh-wrapper">
    <div className="mh-overlay" />

    {/* Sol */}
    <div className="mh-left">
      <h1 className="mh-title">
        Denizcilik Şirketlerinin İstatistikleri ve Performansı
      </h1>
      <p className="mh-desc">
        Garantili ve güvenli, tüm alışverişleri yüz yüze veya çevrimiçi olarak korkmadan kabul edin.
      </p>
      <button className="mh-btn">Şimdi Kayd Olun</button>
    </div>

    {/* Sağ */}
    <div className="mh-right">
      <h2 className="mh-right-title">Bir bakışta başka ne sunulur?</h2>

      <div className="mh-dashboard">
        {/* Top bar */}
        <div className="mh-db-topbar">
          <div className="mh-db-topbar-left">
            <span className="mh-db-chevron">▾</span>
            <span className="mh-db-topbar-text">يوجد رسوم شحن</span>
            <span className="mh-db-price">9.00</span>
            <span className="mh-db-badge">مفعل</span>
          </div>
          <div className="mh-db-topbar-right">
            <span className="mh-db-brand">SMSA</span>
            <div className="mh-db-avatar" />
          </div>
        </div>

        {/* Body */}
        <div className="mh-db-body">
          {/* Sol */}
          <div className="mh-db-left">
            <div className="mh-db-img" />
            <div className="mh-db-stat">
              <div className="mh-db-stat-num">1490</div>
              <div className="mh-db-stat-label">إجمالي الطلبات</div>
            </div>
          </div>

          {/* Sağ */}
          <div className="mh-db-right">
            <div className="mh-db-chart">
              <div className="mh-db-chart-header">
                <span className="mh-db-chart-title">وقت التوصيل</span>
                <div className="mh-db-tabs">
                  <span className="mh-db-tab mh-db-tab--active">تفصيلية</span>
                  <span className="mh-db-tab">يوم</span>
                  <span className="mh-db-tab">ساعة</span>
                </div>
              </div>
              <div className="mh-db-chart-sub">وقت التوصيل الطلبات</div>
              {[
                { label: '1 Day',  width: 55, color: '#3b82f6' },
                { label: '2 Day',  width: 75, color: '#3b82f6' },
                { label: '3 Day',  width: 90, color: '#7c3aed' },
                { label: '4 Day',  width: 70, color: '#eab308' },
                { label: '5 Day',  width: 50, color: '#06b6d4' },
                { label: '+5 Day', width: 20, color: '#ef4444' },
              ].map((bar, i) => (
                <div className="mh-db-bar-row" key={i}>
                  <span className="mh-db-bar-label">{bar.label}</span>
                  <div className="mh-db-bar-track">
                    <div
                      className="mh-db-bar-fill"
                      style={{ width: `${bar.width}%`, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="mh-db-scale">
                {[0, 8, 16, 24, 32].map(n => <span key={n}>{n}</span>)}
              </div>
            </div>

            <div className="mh-db-mini">
              <div className="mh-db-mini-num">5.54</div>
              <div className="mh-db-mini-label">ريال في المبيعات</div>
              <div className="mh-db-sparkline">
                <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                  <polyline
                    points="0,20 10,18 20,22 30,15 40,18 50,10 60,14 70,8 80,12 90,6 100,10"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MainHero;