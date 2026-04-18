import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  return (
    <div className="container">
      {/* SOL TARAF */}
      <div className="left">
        <h1 className="logo">acjä</h1>
      </div>

      {/* SAĞ TARAF */}
      <div className="right">
        <div className="form-box">
          <h2>Kayıt Ol</h2>

          <div className="input-group">
            <label>Mağaza Adı</label>
            <input type="text" placeholder="Mağaza Adı" />
          </div>

          <div className="input-group">
            <label>Telefon</label>
            <input type="text" placeholder="Telefon" />
          </div>

          <div className="input-group">
            <label>E-posta</label>
            <input type="email" placeholder="E-posta" />
          </div>

          <div className="input-group">
            <label>Şifre</label>
            <input type="password" placeholder="Şifre" />
          </div>

          <button className="btn">Kayıt Ol</button>

          <p className="login-text">
            Zaten hesabın var mı? <span>Giriş Yap</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;