import React from "react";
import "./styles/Footer.css";

const Footer: React.FC = () => (
  <footer className="footer-wrapper">
    <div className="footer-top-bar"></div>
    <div className="footer-content">

      {/* Sosyal */}
      <div className="footer-social">
        <div className="footer-icons">
          <a href="#" className="footer-icon">𝕏</a>
          <a href="#" className="footer-icon">in</a>
          <a href="#" className="footer-icon">◎</a>
        </div>
      </div>

      {/* Bilgi */}
      <div className="footer-col">
        <h4 className="footer-col-title">Bilgi</h4>
        <ul className="footer-links">
          <li><a href="#">Sıkça Sorulan Sorular</a></li>
          <li><a href="#">Şartlar ve Koşullar</a></li>
          <li><a href="#">Gizlilik Politikası</a></li>
        </ul>
      </div>

      {/* İlişkiler */}
      <div className="footer-col">
        <h4 className="footer-col-title">İlişkiler</h4>
        <ul className="footer-links">
          <li><a href="#">Ana Sayfa</a></li>
          <li><a href="#">Ortaklarımız</a></li>
          <li><a href="#">Hizmetler</a></li>
        </ul>
      </div>

      {/* Logo + Açıklama */}
      <div className="footer-brand">
        <div className="footer-logo">
          <span className="footer-logo-icon">⟫</span>
          <div className="footer-logo-text">
            <span className="footer-logo-ar">فزعة</span>
            <span className="footer-logo-en">FAZAA</span>
          </div>
        </div>
        <p className="footer-desc">
          Bir bakışta, mağazanızı nakliye şirketleriyle kolayca ve verimli bir şekilde
          bağlamanıza yardımcı olan akıllı bir platform — sevkiyatlarınızı sorunsuz
          yöneten entegre lojistik çözümleri
        </p>
      </div>

    </div>

    <div className="footer-bottom">
      <span>© 2025 Fazaa - Tüm Hakları Saklıdır</span>
    </div>
  </footer>
);

export default Footer;