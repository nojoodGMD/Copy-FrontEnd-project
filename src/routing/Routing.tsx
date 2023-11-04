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
import UserOrders from '../components/components/UserOrders';
import UserProtectedRoute from './UserProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import Register from '../components/pages/Register';
import AdminOrderList from '../components/pages/AdminOrderList';
import Cart from '../components/pages/Cart';


export default function Routing() {
  return (
    <BrowserRouter>
    <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product-details/:id" element={<ProductDetails/>} />

          <Route path='/user-dashboard' element={<UserProtectedRoute/>}>
            <Route path="user" element={<UserDashboard/>} />
            <Route path="user/Userprofile" element={<UserProfile/>} />
            <Route path="user/UserOrders" element={<UserOrders/>} />
          </Route>

          
          <Route path='/admin-dashboard' element={<AdminProtectedRoute/>}>
            <Route path="admin" element={<AdminDashboard/>} />
            <Route path="admin/category" element={<Category/>} />
            <Route path="admin/products" element={<Products/>} />
            <Route path="admin/userList" element={<UsersList/>} />
            <Route path="admin/Orders" element={<AdminOrderList/>} />
          </Route>
            <Route path="*" element={<Error/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
