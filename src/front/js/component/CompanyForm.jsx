import React from "react";


export const CompanyForm = () => {
    return (
        <div className="container">
            <div className="min-vh-100 bg-dark d-flex align-items-center justify-content-center p-4">
                < div className="card w-100 max-w-2xl bg-secondary text-light" >
                    <div className="card-header">dg
                        <h2 className="card-title text-white">Registro de Empresa</h2>
                        <p className="card-text text-muted">Por favor, complete todos los campos del formulario</p>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="companyName" className="form-label">Nombre Empresa</label>
                            <input type="text" id="companyName" placeholder="Ingrese el nombre de la empresa" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="adminName" className="form-label">Nombre Administrador</label>
                            <input type="text" id="adminName" placeholder="Ingrese el nombre del administrador" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cif" className="form-label">CIF</label>
                            <input type="text" id="cif" placeholder="Ingrese el CIF" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" placeholder="Ingrese el email" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Teléfono</label>
                            <input type="tel" id="phone" placeholder="Ingrese el teléfono" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Dirección</label>
                            <input type="text" id="address" placeholder="Ingrese la dirección" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sector" className="form-label">Sector de empresa</label>
                            <input type="text" id="sector" placeholder="Ingrese el sector de la empresa" className="form-control bg-dark text-white border-secondary" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="employees" className="form-label">Número de empleados</label>
                            <select className="form-select bg-dark text-white border-secondary" id="employees">
                                <option value="" disabled selected>Seleccione el rango</option>
                                <option value="1-20">1-20</option>
                                <option value="21-50">21-50</option>
                                <option value="51-100">51-100</option>
                                <option value="101-200">101-200</option>
                            </select>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary w-100">Registrar Empresa</button>
                    </div>
                </div >
            </div >
        </div>
    )
}