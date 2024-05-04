import React from 'react'
import ReactDOM from 'react-dom/client'
import Signin from './Signin.jsx'
import Header from "./Header"
import Footer from "./Footer"


ReactDOM.createRoot(document.getElementById('signin')).render(
  <React.StrictMode>
    <Header />
    <Signin />
    <Footer />
  </React.StrictMode>
  
  
);