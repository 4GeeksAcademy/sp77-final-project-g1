import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { email, password };
    console.log(dataToSend);
    await actions.login(dataToSend)
    console.log(store.isLoged)
    if (store.isLoged) {
      navigate("/dashboard")
    } else {
      navigate("/protected")
    }
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmail = (event) => setEmail(event.target.value)
  const handlePassword = (event) => setPassword(event.target.value)

  const signup = async () => {
    navigate('/sign-up')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#191919', backdropFilter: 'blur(5px)' }}>
      <div className="card bg-dark text-white border border-secondary shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <ul className="nav nav-tabs card-header-tabs mb-3 justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'login' ? 'active bg-white text-dark' : 'text-white'}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar sesión
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'register' ? 'active bg-white text-dark' : 'text-white'}`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </button>
          </li>
        </ul>
        <div className="card-body">
          {activeTab === 'login' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control bg-dark text-white"
                    placeholder="Password"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                  <span className="input-group-text" onClick={passwordVisibility} style={{ cursor: "pointer" }}>
                    <i
                      className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
                      style={{ fontSize: "1rem" }}
                    ></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-secondary w-100">Iniciar sesión</button>
            </form>
          )}

          {activeTab === 'register' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  placeholder="Nombre Apellido"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control bg-dark text-white" id="register-email" placeholder="m@ejemplo.com" required />
              </div>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-dark text-white"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
                <span className="input-group-text" onClick={passwordVisibility} style={{ cursor: "pointer" }}>
                  <i
                    className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}
                    style={{ fontSize: "1rem" }}
                  ></i>
                </span>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control bg-dark text-white" id="register-confirm-password" required />
              </div>
              <button type="submit" className="btn btn-secondary w-100" nClick={() => signup()}>Registrarse</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};