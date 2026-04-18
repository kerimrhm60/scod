import { useState } from "react";
import { SECURITY_OPTIONS, DEFAULT_PROFILE } from "../data";
import type { UserProfile } from "../types";
import { Toggle } from "../components/UI";

export default function AccountPage() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="page">
      <div className="page-header">
        <h2>👤 Hesabım</h2>
        <p>Kişisel bilgilerinizi ve güvenlik ayarlarınızı yönetin</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Profile */}
        <div className="card">
          <div className="card-title">Mağaza & Kişisel Bilgiler</div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Ad</label>
              <input
                className="form-input"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Soyad</label>
              <input
                className="form-input"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Mağaza Adı</label>
              <input
                className="form-input"
                value={profile.storeName}
                onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">E-posta</label>
              <input
                className="form-input"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Telefon</label>
              <input
                className="form-input"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="form-label">Adres</label>
              <input
                className="form-input"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button className="btn-primary">💾 Kaydet</button>
            <button
              className="btn-outline"
              onClick={() => setProfile(DEFAULT_PROFILE)}
            >
              İptal
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="card">
          <div className="card-title">Güvenlik Ayarları</div>
          {SECURITY_OPTIONS.map((s) => (
            <div className="security-row" key={s.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div className="security-label">{s.label}</div>
                  <div className="security-desc">{s.description}</div>
                </div>
              </div>
              {s.type === "toggle"
                ? <Toggle on={twoFactor} onChange={setTwoFactor} />
                : <button className="btn-outline" style={{ fontSize: 12, padding: "7px 14px" }}>Güncelle</button>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Yasal</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-outline">📄 Program Politikaları</button>
          <button className="btn-outline">📋 Şartlar ve Koşullar</button>
        </div>
      </div>
    </div>
  );
}