import React from 'react';
import './styles/BusinessTypes.css';

const cards = [
  { label: 'Tüccarlar',          bg: '/images/tuccarlar.jpg' },
  { label: 'Online Mağazalar',   bg: '/images/online-magazalar.jpg' },
  { label: 'Lojistik Şirketleri',bg: '/images/lojistik.jpg' },
  { label: 'Küçük Girişimciler', bg: '/images/girisimciler.jpg' },
];

const BusinessTypes: React.FC = () => (
  <section className="bt-wrapper">
    <p className="bt-subtitle">İş Türleri</p>
    <h2 className="bt-title">Tüm işletmeler ve işletmeler için uygundur</h2>
    <div className="bt-grid">
      {cards.map((card, i) => (
        <div
          className="bt-card"
          key={i}
          style={{ backgroundImage: `url(${card.bg})` }}
        >
          <div className="bt-card-overlay" />
          <span className="bt-card-label">{card.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default BusinessTypes;