import React from "react";
import { Link } from "react-router-dom";

export const ButtonCreateEmployee = () => {
    return (
        <div className="collapse navbar-collapse">
            <Link to="/create-employee" className="nav-link">
                <i className="fa-solid fa-user-plus me-1"></i>
                Create Employee
            </Link>
        </div>
    );
}