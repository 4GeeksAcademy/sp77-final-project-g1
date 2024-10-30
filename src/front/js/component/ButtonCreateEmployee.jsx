import React from "react";
import { Link } from "react-router-dom";

export const ButtonCreateEmployee = () => {
    return (
        <div className="collapse navbar-collapse">
            <Link to="/create-employee" className="nav-link">
                <i className="fa-solid fa-user me-1"><sup>+</sup></i>
                Create Employee
            </Link>
        </div>
    );
}