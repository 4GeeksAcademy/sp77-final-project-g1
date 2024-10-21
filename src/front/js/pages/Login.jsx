import React, { useState } from 'react';

export const Login = () => {
  const [activeTab, setActiveTab] = useState('login');

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
            <form className="space-y-4">
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control bg-dark text-white" id="email" placeholder="m@ejemplo.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control bg-dark text-white" id="password" required />
              </div>
              <button type="submit" className="btn btn-secondary w-100">Iniciar sesión</button>
            </form>
          )}

          {activeTab === 'register' && (
            <form className="space-y-4">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control bg-dark text-white" id="register-name" placeholder="Nombre Apellido" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control bg-dark text-white" id="register-email" placeholder="m@ejemplo.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control bg-dark text-white" id="register-password" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control bg-dark text-white" id="register-confirm-password" required />
              </div>
              <button type="submit" className="btn btn-secondary w-100">Registrarse</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};