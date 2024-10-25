import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import { SignUp } from '../component/SignUp.jsx';
import { DollarSign, TrendingUp, PieChart, CreditCard, Briefcase, BarChart2, Activity, Percent } from 'lucide-react';
const icons = [DollarSign, TrendingUp, PieChart, CreditCard, Briefcase, BarChart2, Activity, Percent];
export const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="position-relative vh-100 d-flex justify-content-center align-items-center" style={{ backdropFilter: 'blur(5px)' }}>
      {/* Fondo animado */}
      {Array.from({ length: 100 }).map((_, index) => {
        const IconComponent = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 24 + 16;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        return (
          <div
            key={index}
            className="position-absolute text-light opacity-25 float-animation"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDuration: `${animationDuration}s`,
            }}
          >
            <IconComponent style={{ width: size, height: size }} />
          </div>
        );
      })}
      {/* Formulario de inicio de sesión */}
      <div className="card bg-dark text-white border border-secondary shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', height: '450px', zIndex: 1 }}>
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
            <form className="space-y-5 mt-3" onSubmit={handleSubmit}>
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
              <div className="mb-3 mt-4">
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
              <button type="submit" className="btn btn-secondary w-100 mt-3 p-2" disabled={isLoading}>
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </button>
            </form>
          )}
          {activeTab === 'register' && <SignUp />}
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .float-animation {
          animation: float 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};