import React, { useState } from 'react';
import './styles/Integrations.css';

const integrations = [
  { label: '✦ zid',        color: '#7c3aed' },
  { label: 'سلة salla',    color: '#111'    },
  { label: 'متجري matjry', color: '#111'    },
  { label: 'WooCommerce',  color: '#7c3aed' },
  { label: 'Shopify',      color: '#3e9e49' },
  { label: 'ربح ◈',        color: '#06b6d4' },
];

const faqs = [
  'Nakliye şirketleriyle sözleşme imzalamaya bir göz atmak ister misiniz?',
  'Alınmayan emirler için ücret var mı?',
  'Bireysel gönderim yerine toplu faturalar alabilir miyim?',
];

const Integrations: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="sss" className="int-wrapper">
      {/* Entegrasyon */}
      <div className="int-top">
        <p className="int-subtitle">En iyi çevrimiçi mağazalarla entegrasyon</p>
        <h2 className="int-title">Tüm işletmeler ve işletmeler için uygundur</h2>
        <div className="int-grid">
          {integrations.map((item, i) => (
            <div className="int-card" key={i}>
              <span className="int-card-label" style={{ color: item.color }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ + Açıklama */}
      <div className="int-bottom">
        {/* Sol — Sorular */}
        <div className="int-faq">
          {faqs.map((q, i) => (
            <div
              className={`int-faq-item ${openIndex === i ? 'int-faq-item--open' : ''}`}
              key={i}
              onClick={() => toggle(i)}
            >
              <span className="int-faq-icon">{openIndex === i ? '−' : '+'}</span>
              <span className="int-faq-q">{q}</span>
            </div>
          ))}
        </div>

        {/* Sağ — Açıklama */}
        <div className="int-info">
          <h3 className="int-info-title">SSS soruları nelerdir?</h3>
          <p className="int-info-desc">
            Glimpse platformunu kullanmak ve şirketlerle nasıl iletişim kuracağınız
            hakkında bilmeniz gereken her şey Denizcilik
          </p>
        </div>
      </div>
    </section>
  );
};

export default Integrations;