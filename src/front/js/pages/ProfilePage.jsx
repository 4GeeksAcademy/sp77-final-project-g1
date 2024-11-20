import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../store/appContext.js';

export const ProfilePage = () => {
  const { store, actions } = useContext(Context);
  const usuarioLogueado = store.users?.find(user => user.email === store.user.email);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 3)}${'*'.repeat(localPart.length - 3)}@${domain}`;
  };

  if (!usuarioLogueado) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <h2>No hay un usuario logueado.</h2>
      </div>
    );
  }

  useEffect(() => {
    actions.loadUsers();
  }, []);

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="card bg-dark text-white shadow-lg" style={{ maxWidth: '36rem', width: '100%' }}>
        <div className="d-flex flex-column align-items-center p-4">
          <div
            className="position-relative rounded-circle overflow-hidden border border-secondary mb-4"
            style={{ width: '10rem', height: '10rem' }}
          >
            <img
              src={
                usuarioLogueado.imagenUrl ||
                `https://ui-avatars.com/api/?name=${usuarioLogueado.name}&size=192&background=808080&color=fff`
              }
              alt={usuarioLogueado.name}
              className="w-100 h-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h2 className="h4 mt-2 mb-2 text-center">{usuarioLogueado.name}</h2>
          <span className="badge bg-success mb-3 fs-6">
            {usuarioLogueado.is_app_admin ? 'Administrador' : 'Empleado'}
          </span>
          <div className="w-100">
            <div className="mb-3">
              <label className="form-label text-muted d-flex align-items-center">
                <i className="fas fa-envelope me-2"></i>Correo electrónico
              </label>
              <input
                type="text"
                value={maskEmail(usuarioLogueado.email)}
                readOnly
                className="form-control bg-secondary text-white border-0 rounded-pill py-2 px-3"
                style={{ fontSize: '1rem' }} // Ajustar tamaño de la fuente
              />
            </div>
            <button className="btn btn-secondary w-100 d-flex align-items-center justify-content-center mt-4 py-2 rounded-pill">
              <i className="fas fa-lock me-2"></i>Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  nombre: PropTypes.string,
  imagenUrl: PropTypes.string,
  correo: PropTypes.string,
  telefono: PropTypes.string,
  role: PropTypes.string,
};
