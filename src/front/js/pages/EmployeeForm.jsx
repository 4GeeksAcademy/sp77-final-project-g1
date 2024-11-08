import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [datecreate, setdatecreate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const {store,actions} = useContext(Context)
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { 
      name: name,
      last_name: lastname,
      budget_limit: budgetLimit
    };

   await actions.addEmployee(dataToSend);
    setIsLoading(false);
    if (store.isLoged) {
        console.log("Usuario registrado correctamente");
        navigate("/dashboard");
    } else {
        console.log("Error al registrar");
    }
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
              <h2 className="mb-0">Registro de Empleado</h2>
            </div>
            <div className="card-body bg-dark text-light">
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 my-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Límite de Gasto"
                    value={budgetLimit}
                    onChange={(e) => setBudgetLimit(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12 d-flex justify-content-end mt-3">
                  <button type="submit" className="btn btn-secondary me-3">Registrar Empleado</button>
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