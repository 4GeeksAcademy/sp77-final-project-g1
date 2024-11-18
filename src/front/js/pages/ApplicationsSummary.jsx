import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import { ReceiptText, HandCoins } from 'lucide-react';

export const ApplicationsSummary = () => {
  const { store, actions } = useContext(Context);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('es-ES');
  };

  const navigate = useNavigate();

  const showAddRequest = () => {
    navigate("/create-application");
  };

  const handleApproveApplication = async (id) => {
    const approvedBy = store.user.id;
    await actions.approveApplication(id, approvedBy);
  };

  const handleEditApplication = async (application) => {
    actions.setCurrentApplication(application);
    navigate('/edit-application');
  };

  useEffect(() => {
    const fetchApplications = async () => {
      await actions.getApplications();
    };
    fetchApplications();
  }, []);

  return (
    <div className="m-2 d-flex flex-column align-items-center">
      <div className="mb-8 col-12 mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-success">
          <h2 className="mb-1 pb-3 text-center flex-grow-1">
            <ReceiptText className="text-success me-2" />
            Solicitudes
          </h2>
          <button
            className="btn btn-secondary mb-2"
            onClick={() => showAddRequest()}
          >
            <i className="fa fa-plus me-2"></i> Add Request
          </button>
        </div>

        {store.applications && store.applications.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="text-success"></th>
                <th className="text-success">Monto</th>
                <th className="text-success">Descripción</th>
                <th className="text-success">Fecha de Creación</th>
                <th className="text-success">Creado por</th>
                <th className="text-success">Aprobado</th>
              </tr>
            </thead>
            <tbody>
              {store.applications.map((item) => (
                <tr key={item.id}>
                  <td><HandCoins className="text-success h-6 w-6" /></td>
                  <td className="text-light">{item.amount} €</td>
                  <td className="text-light">{item.description}</td>
                  <td className="text-light">{formatDate(item.creation_date)}</td>
                  <td className="text-light">{item.employee_name} {item.employee_last_name}</td>
                  <td className="text-light">
                    {item.is_approved ? (
                      <>
                        Sí <i
                          className="fa-regular fa-check-circle text-success"
                          style={{ marginLeft: '11px' }}
                        ></i>
                      </>
                    ) : (
                      <>
                        <span>Pendiente</span>
                      </>
                    )}

                    {(store.user.is_app_admin || store.user.is_company_admin) && !item.is_approved && (
                      <span onClick={() => handleApproveApplication(item.id)}>
                        <i
                          className="fa-regular fa-check-circle text-success"
                          style={{ marginLeft: '11px', cursor: 'pointer' }}
                        ></i>
                      </span>
                    )}

                    {!item.is_approved && !store.user.is_app_admin && !store.user.is_company_admin && (
                      <span onClick={() => handleEditApplication(item)}>
                        <i
                          className="fa-regular fa-pen-to-square text-warning"
                          style={{ marginLeft: '11px', cursor: 'pointer' }}
                        ></i>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No applications found</p>
        )}
      </div>
    </div>
  );
};