import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const [theme, setTheme] = React.useState("light");
    const navigate = useNavigate()

    // Cambia la clase del body cada vez que se cambia el tema
    useEffect(() => {
        document.body.className = theme; // Cambia la clase del body
    }, [theme]);

    // Función para cambiar el tema
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <div className="container">
            <nav className={`navbar navbar-expand-lg navbar-light shadow-md ${theme}`}>
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
                                onClick={toggleTheme}
                            >
                                {theme === 'dark' ? <i className="fa-regular fa-sun"></i> : <i className="fa-regular fa-moon"></i>}
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
                                <ul className="dropdown-menu" aria-labelledby="dropdown-basic" style={{ right: 0, left: 'auto' }}>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-regular fa-id-badge me-2"></i>
                                                <span>Profile</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-sliders me-2"></i>
                                                <span>Settings</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" onClick={() => console.log("Logging out...")} href="#">
                                            <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                                <span>Log out</span>
                                            </div>
                                        </a>
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