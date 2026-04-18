import React from 'react';
import './styles/Partners.css';

const partners = [
  { name: 'Mrsool',           label: 'M',                color: '#a855f7' },
  { name: 'Deliver Now',      label: 'Deliver Now\nLogistics', color: '#a855f7' },
  { name: 'Saee',             label: 'سعى\nSaee',        color: '#f97316' },
  { name: 'J&T Express',      label: 'J&T EXPRESS',      color: '#e11d48' },
  { name: 'SMSA Express',     label: 'SMSA\nExpress',    color: '#7c3aed' },
  { name: 'Aramex',           label: 'aramex',           color: '#e11d48' },
];

const Partners: React.FC = () => (
  <section id="ortaklar" className="partners-wrapper">
    <p className="partners-subtitle">Bazı ortaklarımız</p>
    <h2 className="partners-title">Başarı Görüşündeki Ortaklar</h2>
    <div className="partners-grid">
      {partners.map((p, i) => (
        <div className="partner-card" key={i}>
          <span className="partner-label" style={{ color: p.color }}>
            {p.label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default Partners;