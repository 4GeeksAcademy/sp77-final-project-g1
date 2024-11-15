import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        setIsLoading(true);
        const dataToSend = {
            company_name: 'segunda compañia',
            email: email,
            password: password,
            is_active: true
        };
        await actions.signUp(dataToSend);
        setIsLoading(false);
        if (store.isLoged) {
            console.log("Usuario registrado correctamente");
            navigate("/dashboard");
        } else {
            console.log("Error al registrar");
        }
    };

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmail = (event) => setEmail(event.target.value);
    const handlePassword = (event) => setPassword(event.target.value);
    const handleConfirmPassword = (event) => setConfirmPassword(event.target.value);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-header bg-dark text-center py-3">
                            <h3 className="mb-0">Registro</h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        <i className="fas fa-envelope me-2"></i>Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-dark text-white"
                                        value={email}
                                        onChange={handleEmail}
                                        placeholder="m@ejemplo.com"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        <i className="fas fa-lock me-2"></i>Contraseña
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control bg-dark text-white"
                                            placeholder="Contraseña"
                                            value={password}
                                            onChange={handlePassword}
                                            required
                                        />
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button" 
                                            onClick={passwordVisibility}
                                        >
                                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">
                                        <i className="fas fa-lock me-2"></i>Confirmar contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control bg-dark text-white"
                                        value={confirmPassword}
                                        onChange={handleConfirmPassword}
                                        placeholder="Confirmar contraseña"
                                        required
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 py-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <i className="fas fa-user-plus me-2"></i>
                                    )}
                                    {isLoading ? 'Registrando...' : 'Registrarse'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};