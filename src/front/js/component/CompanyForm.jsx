import React, { useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
export const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    cif: "",
    email: "",
    phone: "",
    address: "",
    sector: "",
    employees: "",
    descripcion: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    try {
      const response = await fetch("/api/empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <div className="card-header bg-dark text-light text-center">
              <h2 className="mb-0">Registro de Empresa</h2>
            </div>
            <div className="card-body bg-dark">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">Nombre Empresa</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Ingrese el nombre de la empresa"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="adminName" className="form-label">Nombre De Encargado</label>
                  <input
                    type="text"
                    name="adminName"
                    id="adminName"
                    placeholder="Ingrese el nombre del encargado"
                    value={formData.adminName}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cif" className="form-label">CIF</label>
                  <input
                    type="text"
                    name="cif"
                    id="cif"
                    placeholder="Ingrese el CIF"
                    value={formData.cif}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Ingrese el email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Ingrese el teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Ingrese la dirección"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sector" className="form-label">Sector de empresa</label>
                  <select
                    name="sector"
                    id="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>Seleccione el sector</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Salud">Salud</option>
                    <option value="Educación">Educación</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Comercio">Comercio</option>
                    <option value="Manufactura">Manufactura</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="employees" className="form-label">Número de empleados</label>
                  <select
                    name="employees"
                    id="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="" disabled>Seleccione el rango</option>
                    <option value="1-20">1-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-200">101-200</option>
                    <option value="201+">201+</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    rows="4"
                    placeholder="Ingrese una descripción de la empresa"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <Button type="submit" className="w-100 btn btn-secondary">
                  Registrar Empresa
                </Button>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}