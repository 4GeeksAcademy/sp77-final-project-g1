import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../store/appContext.js';
export const ProfilePage = () => {
  const { store } = useContext(Context);
  const usuarioLogueado = store.users?.find(user => user.email === store.user);
  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 3)}${'*'.repeat(localPart.length - 3)}@${domain}`;
  };
  const maskPhone = (phone) => {
    return `${'*'.repeat(phone.length - 3)}${phone.slice(-3)}`;
  };
  if (!usuarioLogueado) {
    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <h2>No hay un usuario logueado.</h2>
      </div>
    );
  }
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card bg-dark text-white shadow-lg" style={{ maxWidth: '56rem' }}>
        <div className="d-flex flex-column flex-md-row p-4 align-items-center">
          <div className="text-center mb-4 mb-md-0">
            <div
              className="position-relative rounded-circle overflow-hidden border border-secondary"
              style={{ width: '12rem', height: '12rem' }}
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
            <h1 className="h4 mt-3">{usuarioLogueado.name}</h1>
            <span className="badge bg-success mt-2 fs-5">{usuarioLogueado.is_app_admin?"Administrador":"Empleado"}</span>
            <div className="w-100 ms-md-4">
              <div className="mb-3">
                <label className="form-label text-muted d-flex align-items-center">
                  <i className="fas fa-envelope me-2"></i>Correo electrónico
                </label>
                <input
                  type="text"
                  value={maskEmail(usuarioLogueado.email)}
                  readOnly
                  className="form-control bg-secondary text-white border-0"
                />
              </div>
              <button className="btn btn-secondary w-100 d-flex align-items-center justify-content-center mt-4">
                <i className="fas fa-lock me-2"></i>Cambiar contraseña
              </button>
            </div>
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
