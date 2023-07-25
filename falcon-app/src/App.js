import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ------->> AUTH(Registration, Login) <<---------
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login"
//------->> AUTH END <-----------


import Home from './pages/Home';
import Profile from './pages/Profile';
import MyAI from './pages/MyAI';

// ------>> STORE <<-------
import Products from './pages/store/Product';
import Orders from './pages/store/Order';
import NewProduct from './pages/store/NewProduct';
import NewStore from './pages/store/NewStore';
import Shipping from './pages/store/Shipping';
import StorePreview from './pages/store/storePreview';
import StoreProductDetailed from './pages/store/storeProductDetails';
import StoreProduct from './pages/store/storeProduct';
// ------>> STORE END <<-------
import Test from './pages/Test';
import NotFound from './components/notFound';
import Tag from './pages/Tag';
import "./assets/css/soft-ui-dashboard-tailwind.css"

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
        <Route exact path="/Test" element={<Test />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Products" element={<Products />} />
        <Route exact path="/Store/new" element={<NewStore />} />
        <Route exact path="/Store/Product/:id" element={<StoreProduct />} />
        <Route exact path="/Store/:store" element={<StorePreview />} />
        <Route exact path="/Store/Product/Details/:id" element={<StoreProductDetailed />} />
        <Route exact path="/Orders" element={<Orders />} />
        <Route exact path="/store/Products/new" element={<NewProduct />} />
        <Route exact path="/store/shipping" element={<Shipping />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/MyAi" element={<MyAI />} />
        <Route exact path="/Tag" element={<Tag />} />
        {/* <Route exact path="/Store/View/:store" element={<StoreView />} /> */}
        <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
