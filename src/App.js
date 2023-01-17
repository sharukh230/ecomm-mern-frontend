import './App.css';
import Header from './component/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
// import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import Resetpassword from './component/User/Resetpassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { BE_URL } from './config';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./component/Cart/OrderSuccess"
import OrderDetails from "./component/Order/OrderDetails"
import MyOrders from './component/Order/MyOrder';
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList"

function App() {
  const { isAuthenticatedUser, user } = useSelector((state) => state.user)
  // console.log(user)
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${BE_URL}/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticatedUser && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<LoginSignUp />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/me/update' element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
        <Route path='/password/forgot' element={<ForgotPassword />} />
        <Route path='/password/reset/:token' element={<Resetpassword />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/order/confirm' element={<ConfirmOrder />} />
        <Route path='/success' element={<OrderSuccess/>}/>
        <Route path='/order/:id' element={ <OrderDetails />}/>
        <Route path='/orders' element={ <MyOrders />}/>
        

        <Route path='/admin/dashboard' element={<Dashboard/>}/>

        <Route path='/process/payment' element=
          {
            // stripeApiKey && 
            (
            <Elements stripe={loadStripe(stripeApiKey)}>
              < Payment />
            </Elements>
          )
        }
        />
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;
