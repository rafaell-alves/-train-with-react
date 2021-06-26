import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Routes from './Routes'

import { ToastContainer } from 'react-toastify';
import './App.css'
export default props =>
   <BrowserRouter>
        <div className="App">
            <Routes></Routes>  
           <ToastContainer></ToastContainer>
         </div>
   </BrowserRouter>