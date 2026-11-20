import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Products from './pages/Products'
import ProductsDetails from './pages/ProductsDetails'
import AdminDash from './pages/AdminDash'
import ProductCard from './components/ProductCard'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Auth />} /> 
        <Route path="/products" element={<Products />} /> 
        <Route path="/productsdetails/:id" element={<ProductsDetails />} />
        <Route path="/adminDash" element={<AdminDash/>} /> 
        <Route path="/pc" element={<ProductCard/>} /> 
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App