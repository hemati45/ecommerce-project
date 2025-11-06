
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
  const [products, setProducts] = useState([]);
  async function loadProducts() {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function loadCart() {
    try {
      const response = await axios.get('/api/cart-items?expand=product');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage products={products} cart={cart} loadCart={loadCart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path='orders' element={<Orders cart={cart} />} />
    </Routes>
  )
}


