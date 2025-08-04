import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Cards from '../screens/Home'
import '../styles/login.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default function Login() {
  return (
    <div className='login-body'>
      <div><Navbar /></div>
      
      <div><Footer /></div>
    </div>
  )
}
