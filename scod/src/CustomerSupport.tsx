import React from 'react';
import './styles/CustomerSupport.css';

const CustomerSupport: React.FC = () => (
  <section id="hizmetlerimiz" className="cs-wrapper">
    {/* Sol — İki telefon */}
    <div className="cs-phones">

      {/* Arka telefon */}
      <div className="cs-phone cs-phone--back">
        <div className="cs-phone-body">
          <div className="cs-di" />
          <div className="cs-phone-screen cs-screen--chat">
            <div className="cs-screen-header">
              <span className="cs-screen-title">خدمة العملاء</span>
            </div>
            <div className="cs-chat">
              <div className="cs-chat-bubble cs-bubble--received">
                🎉 لقد بدأ تتبع مشكلتك بالضغط
              </div>
              <div className="cs-chat-bubble cs-bubble--sent">
                مرحبا! محتاج أعرف لأي غير إذا لا تستخدم التطبيق لو مشكلة لديك أسئلة تحتاج إلى مساعدة؟
              </div>
              <div className="cs-chat-bubble cs-bubble--received">
                مساعدتك في البداية هل عندك حساب عند التطلب وكيف أسئلة مشكلة إليك؟
              </div>
              <div className="cs-chat-user">Ps</div>
            </div>
            <div className="cs-keyboard">
              <div className="cs-keyboard-row">
                {['خ','ع','غ','ف','ق','ث','ص','ض'].map((k,i) => (
                  <div className="cs-key" key={i}>{k}</div>
                ))}
              </div>
              <div className="cs-keyboard-row">
                {['م','ن','ت','ا','ل','ب','ي','س'].map((k,i) => (
                  <div className="cs-key" key={i}>{k}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ön telefon */}
      <div className="cs-phone cs-phone--front">
        <div className="cs-phone-body">
          <div className="cs-di" />
          <div className="cs-phone-screen cs-screen--tracking">
            <div className="cs-track-header">
              <div className="cs-track-logo">
                <span className="cs-logo-icon">⟫</span>
                <span className="cs-logo-text">FAZAA</span>
              </div>
              <span className="cs-track-title">تابع الطلب</span>
              <span className="cs-track-arrow">→</span>
            </div>
            <div className="cs-map">
              <div className="cs-map-pin">
                <div className="cs-map-pin-icon">⚙</div>
                <div className="cs-map-pin-text">
                  <div className="cs-map-pin-title">تم تجهيز طلبك</div>
                  <div className="cs-map-pin-sub">سيتم عرض الخريطة في حال كان المندوب متجه إليك</div>
                </div>
              </div>
              <div className="cs-map-time">
                <span>⏰</span>
                <span>07:20 مساءاً</span>
              </div>
            </div>
            <div className="cs-track-bottom">
              <div className="cs-track-cta">لمحه يدور لك علي مندوب فوري لا تقلق</div>
              <div className="cs-track-id">Ps</div>
              <div className="cs-track-status-row">
                <span className="cs-status-dot cs-dot--active" />
                <span className="cs-status-text">تم دفع الطلب بنجاح</span>
              </div>
              <div className="cs-track-steps">
                {[
                  { text: 'جاري البحث عن مندوب متاح', active: true },
                  { text: 'جاري تحضير الطلب',          active: false },
                  { text: 'في الطريق إلى موقع التسليم', active: false },
                  { text: 'لقد تم وصول طلبك',           active: false },
                  { text: 'تم تسليم طلبات بنجاح',       active: false },
                ].map((step, i) => (
                  <div className="cs-step" key={i}>
                    <div className={`cs-step-dot ${step.active ? 'cs-step-dot--active' : ''}`} />
                    <span className={`cs-step-text ${step.active ? 'cs-step-text--active' : ''}`}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="cs-track-footer">
                لا يزال بإمكانك تعديل الطلب لدا لزم <span className="cs-track-link">خلال 4 دقائق</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    {/* Sağ — Metin */}
    <div className="cs-content">
      <p className="cs-subtitle">خدمة العملاء</p>
      <h2 className="cs-title">دعم طوال الوقت</h2>
      <p className="cs-desc">
        فريقنا جاهز لمساعدتك في أي وقت - لا تتردد في
        التواصل معنا لحل أي مشكلة أو استفسار.
      </p>
    </div>
  </section>
);

export default CustomerSupport;