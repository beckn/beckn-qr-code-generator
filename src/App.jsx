import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormData from './components/FormData'
import UI from './components/UI'
import {Route, Routes } from "react-router-dom";

function App() {

  return (
    <Routes>
   <Route  path="/" element={<FormData />} />
   <Route path="/ui/:qrCodeDataURL" element={<UI />} />
    </Routes>
  )
}

export default App
