import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Login } from "./pages/Login.jsx";   
import { Expenses } from "./pages/Expenses.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { CompanyForm } from "./component/CompanyForm.jsx";
import { EmployeeForm } from "./pages/EmployeeForm.jsx";
import { ApplicationsForm } from "./pages/ApplicationsForm.jsx";
import { Context } from "./store/appContext"; 
import { AdminForm } from "./pages/AdminForm.jsx";
import {ProfilePage} from "./pages/ProfilePage.jsx";
import { EmployeesSumary } from "./pages/EmployeesSumary.jsx";
import { ApplicationsSummary } from "./pages/ApplicationsSummary.jsx";
import { EditApplication } from "./pages/EditApplication.jsx";


const Layout = () => {
    const { store } = useContext(Context); 
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    {store.isLoged && <Navbar />}
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route 
                            path="/" 
                            element={store.isLoged ? <Navigate to="/dashboard" /> : <Login />} 
                        />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Expenses />} path="/expenses" /> 
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<ProfilePage />} path="/profile-page" />
                        <Route element={<CompanyForm />} path="/company-register" />
                        <Route element={<EmployeeForm />} path="create-employee" />
                        <Route element={<ApplicationsForm />} path= "create-application" />
                        <Route element={<AdminForm />} path="/admin-form" />
                        <Route element={<EmployeesSumary/>} path="/employees-sumary"/>
                        <Route element={<ApplicationsSummary/>} path="/applications-summary"/>
                        <Route element={<EditApplication/>} path="/edit-application"/>
                        <Route element={<h1>No encontrado!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
