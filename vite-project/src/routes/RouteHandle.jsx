import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import { useAuth } from "../context/AuthContext";


const RouteHandle = () => {
     const { isAuthenticated ,loading} = useAuth();
    return (
<>
{!loading &&  <BrowserRouter>
      <Routes>
        <Route path="/" element={ <PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>}

</>


    
    );
};

export default RouteHandle;