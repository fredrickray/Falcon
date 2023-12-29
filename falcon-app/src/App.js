import './App.css';
import React from 'react';
import { PaymentContextProvider } from './context/PaymentContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// ------->> AUTH(Registration, Login) <<---------
import Register from './pages/auth/Register';
import Login from "./pages/auth/Login"
import PasswordReset from './pages/auth/PasswordReset';
import VerifyEmail from './pages/auth/VerifyEmail';
//------->> AUTH END <-----------

import Index from './pages/Index';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyAI from './pages/MyAI';
import ManageStore from './pages/store/ManageStore';
import ManageStoreEdit from './pages/store/ManageStoreEdit';
import Blank from './pages/store/Blank';
// ------>> STORE <<-------
import Products from './pages/store/Product';
import Payments from './pages/store/Payments';
import Orders from './pages/store/Order';
import OrderDetail from './pages/store/OrderDetail';
import NewProduct from './pages/store/NewProduct';
import NewStore from './pages/store/NewStore';
import Shipping from './pages/store/Shipping';
import StorePreview from './pages/store/storePreview';
import StoreProductDetailed from './pages/store/storeProductDetails';
import SuccessPayment from './components/SuccessPayment';
import StoreProduct from './pages/store/storeProduct';
// ------>> STORE END <<-------
import ServerError from './components/ServerError';
import NotFound from './components/notFound';
import Tag from './pages/Tag';
import "./assets/css/soft-ui-dashboard-tailwind.css"

const App = () => {
  return (
    <>
      <PaymentContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/oauth/google/callback" element={<Blank />} />
            <Route exact path="/" element={<Index />} />
            <Route exact path="/Register" element={<Register />} />
            <Route exact path="/Verify" element={<VerifyEmail />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Reset-password" element={<PasswordReset />} />
            <Route exact path="/Products" element={<Products />} />
            <Route exact path="/Store/new" element={<NewStore />} />
            <Route exact path="/Store/Product/:id" element={<StoreProduct />} />
            <Route exact path="/Store/:store" element={<StorePreview />} />
            <Route exact path="/Store/Product/Details/:id" element={<StoreProductDetailed />} />
            <Route exact path="/Success" element={<SuccessPayment />} />
            <Route exact path="/Payments" element={<Payments />} />
            <Route exact path="/Orders" element={<Orders />} />
            <Route exact path="/Orders/detail/:tx_ref" element={<OrderDetail />} />
            <Route exact path="/store/Products/new" element={<NewProduct />} />
            <Route exact path="/store/shipping" element={<Shipping />} />
            <Route exact path="/Profile" element={<Profile />} />
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/Store/setup" element={<ManageStore />} />
            <Route exact path="/Store/setup/edit" element={<ManageStoreEdit />} />
            <Route exact path="/MyAi" element={<MyAI />} />
            <Route exact path="/Tag" element={<Tag />} />
            {/* <Route exact path="/Store/View/:store" element={<StoreView />} /> */}
            <Route exact path="*" element={<NotFound />} />
            <Route exact path="/err505in" element={<ServerError />} />
          </Routes>
        </BrowserRouter>
      </PaymentContextProvider>
    </>
  );
}

export default App;
