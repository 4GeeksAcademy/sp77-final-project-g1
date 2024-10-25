import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { SignUp } from '../component/SignUp.jsx';

export const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Carga estado
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const dataToSend = { email, password };
    await actions.login(dataToSend);
    setIsLoading(false);
    if (store.isLoged) {
      navigate("/dashboard");
    } else {
      navigate("/protected");
    }
  };
  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
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
                    <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} style={{ fontSize: "1rem" }}></i>
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-secondary w-100" disabled={isLoading}>
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </form>
          )}
          {activeTab === 'register' && (
            <SignUp />
          )}
        </div>
      </div>
    </div>
  );
};