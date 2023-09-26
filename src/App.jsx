import { useState } from 'react'
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
