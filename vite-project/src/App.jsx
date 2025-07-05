
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import RouteHandle from "./routes/RouteHandle";
 


const App = () => {

  return (
    <AuthProvider>
    <RouteHandle/>
    </AuthProvider>
  );
};

export default App;
