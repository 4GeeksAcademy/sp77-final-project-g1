import React from "react";
import { Link } from "react-router-dom";

export const ButtonSumary = () => {
    return (
        <div className="collapse navbar-collapse">
            <Link to="/employees-sumary" className="nav-link">
                <i className="fa-solid fa-user me-1"></i>
                Lista de empleados
            </Link>
        </div>
    );
}