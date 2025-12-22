import React from 'react'
import Navbar from './components/Navbar'
import Signup from "./components/Signup"
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import Admin from "./components/Admin"
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {
  return (
    <>
          <Navbar />
          <Routes>
              
             <Route path='/signup' element={<Signup />} />
              <Route path='/' element={<Home />} />
        
              <Route path='/login' element={<Login />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/dashboard' element={<Dashboard />} />
        
              
              
        </Routes>
    </>
  )
}

export default App
