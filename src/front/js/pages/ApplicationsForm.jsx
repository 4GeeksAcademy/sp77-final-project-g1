import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicationsForm = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { amount, description };
    console.log("Datos del formulario:", formData);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-dark text-light text-center">
              <h2 className="mb-0">Registrar Solicitud</h2>
            </div>
            <div className="card-body bg-dark text-light">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Importe"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 my-2">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Motivo solicitud"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="col-12 d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-secondary me-3">Enviar Solicitud  <i class="fa-solid fa-paper-plane"></i></button>
                  <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};