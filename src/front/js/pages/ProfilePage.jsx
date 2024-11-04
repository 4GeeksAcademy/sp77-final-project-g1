import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ProfilePage = ({
  nombre = "Nombre del Usuario",
  imagenUrl = "",
  correo = "usuario@ejemplo.com",
  telefono = "+1 234 567 8900"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const maskEmail = (email) => {
    const [localPart, domain] = email.split('@');
    return `${localPart.slice(0, 3)}${'*'.repeat(localPart.length - 3)}@${domain}`;
  };

  const maskPhone = (phone) => {
    return `${'*'.repeat(phone.length - 3)}${phone.slice(-3)}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-image-container">
            <div 
              className="profile-image-wrapper"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src={imagenUrl || `https://ui-avatars.com/api/?name=${nombre}&size=192&background=808080&color=fff`} alt={nombre} className="profile-image" />
              {isHovered && (
                <div className="profile-image-overlay">
                  <i className="fas fa-camera camera-icon"></i>
                </div>
              )}
            </div>
            <div className="profile-name-container">
              <h1 className="profile-name">{nombre}</h1>
              <span className="profile-badge">Admin</span>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <label htmlFor="email" className="profile-label">
                <i className="fas fa-envelope profile-icon"></i>
                Correo electrónico
              </label>
              <input id="email" value={maskEmail(correo)} readOnly className="profile-input" />
            </div>
            <div className="profile-field">
              <label htmlFor="phone" className="profile-label">
                <i className="fas fa-phone profile-icon"></i>
                Número de teléfono
              </label>
              <input id="phone" value={maskPhone(telefono)} readOnly className="profile-input" />
            </div>
            <div className="profile-button-container">
              <button className="profile-button">
                <i className="fas fa-lock profile-icon"></i>
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background-color: ;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .profile-card {
          width: 100%;
          max-width: 56rem;
          background-color: #2d3748;
          border-radius: 0.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .profile-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .profile-image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }
        .profile-image-wrapper {
          position: relative;
          width: 12rem;
          height: 12rem;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #4a5568;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-image-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .camera-icon {
          font-size: 3rem;
          color: white;
        }
        .profile-name-container {
          text-align: center;
          margin-top: 1rem;
        }
        .profile-name {
          font-size: 1.875rem;
          font-weight: bold;
          color: white;
          margin: 0;
        }
        .profile-badge {
          display: inline-block;
          margin-top: 0.5rem;
          padding: 0.25rem 0.75rem;
          background-color: #48bb78;
          color: #22543d;
          font-weight: 600;
          border-radius: 9999px;
          font-size: 1.125rem;
        }
        .profile-details {
          width: 100%;
          max-width: 32rem;
        }
        .profile-field {
          margin-bottom: 2rem;
        }
        .profile-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          font-weight: 500;
          color: #a0aec0;
          margin-bottom: 0.5rem;
        }
        .profile-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        .profile-input {
          width: 100%;
          padding: 1.5rem 1rem;
          font-size: 1.125rem;
          background-color: #4a5568;
          color: white;
          border: 1px solid #4a5568;
          border-radius: 0.375rem;
        }
        .profile-button-container {
          margin-top: 1.5rem;
        }
        .profile-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          font-size: 1.125rem;
          font-weight: 500;
          color: white;
          background-color: #4a5568;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .profile-button:hover {
          background-color: #718096;
        }
        @media (min-width: 768px) {
          .profile-content {
            flex-direction: row;
            align-items: flex-start;
          }
          .profile-image-container {
            margin-right: 2rem;
            margin-bottom: 0;
          }
        }
      `}</style>
    </div>
  );
}

ProfilePage.propTypes = {
  nombre: PropTypes.string,
  imagenUrl: PropTypes.string,
  correo: PropTypes.string,
  telefono: PropTypes.string,
};
