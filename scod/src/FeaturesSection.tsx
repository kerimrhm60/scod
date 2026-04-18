import "./styles/FeaturesSection.css";

export default function FeaturesSection() {
  const leftFeatures = [
    {
      icon: "📄",
      title: "Bir düğmeye basarak nakliye şirketlerini etkinleştirin",
      desc: "Tek bir kontrol paneli ile, herhangi bir nakliye şirketini bir düğmeye basarak etkinleştirebilirsiniz — sözleşme imzalamanıza gerek kalmadan. Müşterilerimiz için sorunsuz ve profesyonel bir deneyim için bağlantı bağlantısından takibe kadar her şeyi önemsiyoruz."
    },
    {
      icon: "🎧",
      title: "Sevkiyatlarınızı tek bir yerden yönetin",
      desc: "Her sevkiyatı takip edin, faturaları bastırın, iadeleri yönetin ve performansı izleyin — hepsi her şirketle iş yapma zahmetini ortadan kaldıran kullanımı kolay tek bir gösterge panelinden. Şarj işlemleri üzerinde tam kontrol, daha az zaman ve daha az çaba içinde."
    }
  ];

  const rightFeatures = [
    {
      icon: "🚚",
      title: "Alınmayan siparişlerde sıfır maliyet",
      desc: "Sipariş müşteriye teslim edilmezse, bir bakışta Son olarak, hiç ücret yok, teslimat yok Ve iade yok, bu özel özellik Nakit on Teslimat zararları ve size huzur sağlar Gerçek. (Uygun şirketler için geçerlidir)."
    },
    {
      icon: "📈",
      title: "Ön Gönderim veya Sonraki Faturalandırma",
      desc: "Sizin için en uygun olanı seçin: takviye yapın ve hemen başlayın Ya da aylık faturalandırmayı aktive edip sonra öde. Uygunluğunuz doğrulandıktan sonra bir şirket olup olmadığınızı Hızlı bir başlangıç ya da bir etkinlik arayan genç bir kadın Ticari olarak istikrarlı ve akışları düzenlemeye istekli Sana seçme özgürlüğü veriyoruz. Hiçbir Taahhüt Yok"
    }
  ];

  return (
    <section id="ozellikler" className="fs-section">
      <div className="fs-header">
        <h2 className="fs-title">Özellikler</h2>
        <p className="fs-subtitle">Tüm nakliye şirketlerini bir yere toplayın</p>
      </div>
      <div className="fs-container">

        <div className="fs-col">
          {leftFeatures.map((f, i) => (
            <div key={i} className="fs-card">
              <div className="fs-icon-box">{f.icon}</div>
              <h3 className="fs-card-title">{f.title}</h3>
              <p className="fs-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="fs-center">
          <div className="fs-phone-wrapper">
            <div className="fs-phone">
              <div className="fs-phone-screen">
                <div className="fs-phone-header">
                  <span className="fs-phone-dot" />
                  <span className="fs-phone-dot" />
                  <span className="fs-phone-dot" />
                </div>
                <div className="fs-chart-title">80.1%</div>
                <div className="fs-bars">
                  {[
                    { w: "75%", color: "#8B31E8" },
                    { w: "60%", color: "#A855F7" },
                    { w: "85%", color: "#6B1FC8" },
                    { w: "50%", color: "#C084FC" },
                    { w: "40%", color: "#8B31E8" },
                    { w: "30%", color: "#EF4444" },
                  ].map((bar, i) => (
                    <div key={i} className="fs-bar-row">
                      <span className="fs-bar-label">{i + 1} Day</span>
                      <div className="fs-bar-track">
                        <div className="fs-bar-fill" style={{ width: bar.w, background: bar.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fs-phone-footer">
                  <div className="fs-stat-row">
                    <span className="fs-stat-pink">0.88%</span>
                    <span className="fs-stat-gray">100.00%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="fs-crystal" />
          </div>
        </div>

        <div className="fs-col">
          {rightFeatures.map((f, i) => (
            <div key={i} className="fs-card">
              <div className="fs-icon-box">{f.icon}</div>
              <h3 className="fs-card-title">{f.title}</h3>
              <p className="fs-card-desc">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

