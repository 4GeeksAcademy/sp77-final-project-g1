import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext.js";

export const Navbar = () => {
    const {actions} = useContext(Context)
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light shadow-md">
                <div className="container-fluid">
                    <span className="navbar-brand text-2xl font-semibold">
                        <Link to="/" className="nav-link text-secondary">
                            AnDiGu Expenses Tracker
                        </Link>
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">
                                    <i className="fa-solid fa-house me-1"></i>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/expenses" className="nav-link">
                                    <i className="fa-regular fa-credit-card me-1"></i>
                                    Expenses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="fa-solid fa-chart-pie me-1"></i>
                                    Reports
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <i className="fa-regular fa-credit-card me-1"></i>
                                    Login
                                </Link>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn me-2"
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? (
                                    <i className="fa-regular fa-sun"></i>
                                ) : (
                                    <i className="fa-regular fa-moon"></i>
                                )}
                            </button>
                            <button className="btn me-2">
                                <i className="fa-regular fa-bell"></i>
                            </button>
                            <div className="dropdown">
                                <button
                                    className="btn dropdown-toggle"
                                    type="button"
                                    id="dropdown-basic"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <i className="fa-regular fa-user" style={{ fontSize: '20px' }}></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-basic">
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-regular fa-id-badge me-2"></i>
                                                <span>Profile</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/settings">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-sliders me-2"></i>
                                                <span>Settings</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <button className="dropdown-item" onClick={() => {
                                            console.log("Logging out...");
                                            navigate('/login');
                                        }}>
                                            <div className="d-flex align-items-center" onClick={actions.logout}>
                                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                                <span>Log out</span>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};