import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import UserDash from './pages/UserDash'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Register/>}></Route>
        <Route path="/userDash" element={<UserDash/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
