import React from "react";
import { Link } from "react-router-dom";

export const ButtonCreateAdmin = ()=>{
    return(
        <div className="collapse navbar-collapse">
        <Link to="/admin-form" className="nav-link">
        <i className="fa-solid fa-user-tie me-1"><sup>+</sup></i>
            Create Admin
        </Link>
    </div>
    )
}