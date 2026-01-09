//import useContext
import { useContext } from 'react';

//import context
import { AuthContext } from '../../context/AuthContext.tsx';

//import react router dom
import { Routes, Route, Navigate } from "react-router";

//import view home
import Home from "../views/home/index.tsx";

//import view register
import Register from "../views/auth/register.tsx";

//import view login
import Login from "../views/auth/login.tsx";

//import view dashboard
import Dashboard from "../views/admin/index.tsx";

//import view users
import UsersIndex from "../views/admin/users/index.tsx";

//import view users create
import UsersCreate from "../views/admin/users/create.tsx";

//import view users edit
import UsersEdit from "../views/admin/users/edit.tsx";

//import view products
import ProductsIndex from '../views/products/index.tsx';

//import view products create
import ProductsCreate from '../views/products/create.tsx';

//import view products edit
import ProductsEdit from '../views/products/edit.tsx';

//import view transactions
import TransactionsIndex from '../views/transactions/index.tsx';


export default function AppRoutes() {

    // Menggunakan useContext untuk mendapatkan nilai dari AuthContext
    const auth = useContext(AuthContext);

    // Menggunakan optional chaining untuk menghindari error jika auth tidak ada
    const isAuthenticated = auth?.isAuthenticated ?? false;

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/edit/:id" */}
            <Route path="/admin/users/edit/:id" element={
                isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
            } />

            {/* route "/products" */}
            <Route path="/admin/products" element={
                isAuthenticated ? <ProductsIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/products/create" */}
            <Route path="/admin/products/create" element={
                isAuthenticated ? <ProductsCreate /> : <Navigate to="/login" replace />
            } />

            {/* route "/products/update/:id" */}
            <Route path="/admin/products/update/:id" element={
                isAuthenticated ? <ProductsEdit /> : <Navigate to="/login" replace />
            } />

            {/* route "/transactions" */}
            <Route path="/admin/transactions" element={
                isAuthenticated ? <TransactionsIndex /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}
