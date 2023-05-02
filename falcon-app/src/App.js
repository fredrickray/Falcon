import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ------->> AUTH(Registration, Login) <<---------
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login"
//------->> AUTH END <-----------


import Home from './pages/Home';
import Profile from './pages/Profile';

// ------>> STORE <<-------
import Products from './pages/store/Product';
import Orders from './pages/store/Order';
import NewProduct from './pages/store/NewProduct';
import Shipping from './pages/store/Shipping';
// ------>> STORE END <<-------


import "./assets/css/soft-ui-dashboard-tailwind.css"

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Products" element={<Products />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/store/Products/new" element={<NewProduct />} />
        <Route exact path="/store/shipping" element={<Shipping />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
