import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EditApplication = () => {
  const { store, actions } = useContext(Context);
  const editTheApplications = store.currentApplications
  const navigate = useNavigate();
  const [amount, setAmount] = useState(editTheApplications.amount);
  const [description, setDescription] = useState(editTheApplications.description);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      "amount": amount,
      "description": description,
    };
    actions.editApplication(editTheApplications.id, dataToSend);
    actions.setCurrentApplication({});
    navigate('/applications-summary');
  };

  const handleCancel = () => {
    navigate("/applications-summary");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-dark text-light text-center">
              <h2 className="mb-0">Editar Solicitud</h2>
            </div>
            <div className="card-body bg-dark text-light">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12 my-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Importe"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
                <div className="col-12 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Descripción"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  />
                </div>
                <div className="col-12 d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-secondary me-3">
                    Enviar Solicitud <i className="fa-solid fa-paper-plane"></i>
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};