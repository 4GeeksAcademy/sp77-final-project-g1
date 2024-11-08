import React, {useContext,useState} from "react";
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
            email: email,
            password: password,
            is_active: true
        };
        await actions.newSignUp(dataToSend);
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
        <div>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        type="email"
                        className="form-control bg-dark text-white"
                        value={email}
                        onChange={handleEmail}
                        placeholder="m@ejemplo.com"
                        required
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control bg-dark text-white"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePassword}
                        required
                    />
                    <span className="input-group-text" onClick={passwordVisibility} style={{ cursor: "pointer" }}>
                        <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                    </span>
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirmar contraseña</label>
                    <input
                        type="password"
                        className="form-control bg-dark text-white"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        placeholder="Confirmar contraseña"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-secondary w-100">
                    Registrarse
                </button>
            </form>
        </div>
    )

}