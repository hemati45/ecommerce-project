
import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { Orders } from './pages/orders/Orders'

import './App.css'
import './i18n'

export default function App() {

  const [cart, setCart] = useState([]);

  const [username, setUsername] = useState("afshin");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState<string>('');
  const userState = {
    username,
    setUsername,
    isLoggedIn,
    setIsLoggedIn,
    userImage,
    setUserImage,
  };

  async function loadCart() {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} userState={userState} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='orders' element={<Orders cart={cart} userState={userState} />} />
    </Routes>
  )
}


