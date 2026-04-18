import { useNavigate } from "react-router-dom";
import tavsan from "./assets/tavsan_temiz.png";
import "./styles/HomeLanding.css";

export default function FazaaLanding() {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-box">
            <span className="logo-arabic">فزعة</span>
          </div>
          <span className="logo-text">FAZAA</span>
        </div>

        <div className="nav-links">
          {[
            { label: "Ana Sayfa", id: "hero" },
            { label: "Özellikler", id: "ozellikler" },
            { label: "Hizmetlerimiz", id: "hizmetlerimiz" },
            { label: "Ortaklar", id: "ortaklar" },
            { label: "Sıkça Sorulan Sorular", id: "sss" },
          ].map(link => (
            <button key={link.label} onClick={() => scrollTo(link.id)} className="nav-link">
              {link.label}
            </button>
          ))}
        </div>

        <div className="nav-buttons">
          <button className="btn-primary">Şimdi Kayd Olun</button>
          <button className="btn-outline" onClick={() => navigate("/dashboard")}>GIRIŞ</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="hero-content">
          <div className="badge"><span>✦ Lojistik Platformu</span></div>
          <h1 className="hero-title">
            Tüm nakliye şirketleri tek bir yerde,{" "}
            <span className="hero-gradient-text">her adım bir bakışta</span>{" "}
            sizin kontrolünüzde
          </h1>
          <p className="hero-desc">
            Sevkiyatlarınızı yönetmek, tüm ihtiyaçlarınızı karşılayan akıllı araçlarla her zamankinden daha kolay hale geldi
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-large">Şimdi Kayd Olun</button>
            <button className="btn-white btn-large" onClick={() => navigate("/dashboard")}>GIRIŞ</button>
          </div>
          <div className="hero-trust">
            <span className="trust-number">500+</span>
            <span className="trust-text">Dükkan Sahibi Bir Bakışta Güveniyor</span>
          </div>
        </div>
        <div className="hero-card-wrapper">
          <div className="hero-card">
            <div className="card-inner">
              <div className="card-icon">
                <img src={tavsan} alt="Teslimat" />
              </div>
              <div className="card-info">
                <div className="card-title">Teslimat Takibi</div>
                <div className="card-subtitle">Tüm gönderilerinizi tek panelden yönetin</div>
              </div>
              <div className="card-stats">
                {[["98%", "Teslimat"], ["500+", "Ortak"], ["24/7", "Destek"]].map(([val, label]) => (
                  <div key={label} className="stat-item">
                    <div className="stat-value">{val}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          {[
            { icon: "📦", title: "Kolay Entegrasyon", desc: "Tüm kargo firmalarını tek panelden yönetin" },
            { icon: "📊", title: "Anlık Takip", desc: "Sevkiyatlarınızı gerçek zamanlı izleyin" },
            { icon: "⚡", title: "Akıllı Raporlama", desc: "Veriye dayalı kararlar için detaylı analizler" }
          ].map(({ icon, title, desc }) => (
            <div key={title} className="feature-card">
              <div className="feature-icon">{icon}</div>
              <div className="feature-title">{title}</div>
              <div className="feature-desc">{desc}</div>
              <div className="feature-link">Detaylar →</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}