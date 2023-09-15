import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Merchants from "./pages/Merchants";
import Orders from "./pages/Orders";
import Transactions from "./pages/Transaction";
import OverView from "./pages/Overview";

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
        <Route exact path="/Overview" element={<OverView />} />
        {/* <Route exact path="/MyAi" element={<MyAI />} /> */}
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        {/* <Route exact path="/Reset-password" element={<PasswordReset />} /> */}
        {/* <Route exact path="/Products" element={<Products />} /> */}
        <Route exact path="/Transactions" element={<Transactions />} />
        <Route exact path="/Merchants" element={<Merchants />} />
        <Route exact path="/Orders" element={<Orders />} />
        {/* <Route exact path="/Profile" element={<Profile />} /> */}
        <Route exact path="/Store/setup" element={<OverView />} />
        {/* <Route exact path="*" element={<NotFound />} /> */}
        {/* <Route exact path="/err505in" element={<ServerError />} /> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}


export default App;
