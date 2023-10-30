import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Home from '../components/pages/Home';
import AdminDashboard from '../components/pages/AdminDashboard';
import Error from '../components/pages/Error';
import Category from '../components/components/Category';
import ProductDetails from '../components/pages/ProductDetails';
import UserDashboard from '../components/pages/UserDashboard';
import Navigation from '../components/components/Navigation';
import Contact from '../components/pages/Contact';
import Footer from '../components/components/Footer';
import Products from '../components/components/Products';
import UserProfile from '../components/components/UserProfile';
import Login from '../components/pages/Login';
import UsersList from '../components/components/UsersList';

export default function Routing() {
  return (
    <BrowserRouter>
    <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/user-dashboard" element={<UserDashboard/>} />
            <Route path="/productDetail" element={<ProductDetails/>} />
            <Route path="/dashboard/admin/category" element={<Category/>} />
            <Route path="/dashboard/admin/products" element={<Products/>} />
            <Route path="/dashboard/admin/userList" element={<UsersList/>} />
            <Route path="/dashboard/user/Userprofile" element={<UserProfile/>} />
            <Route path="*" element={<Error/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
