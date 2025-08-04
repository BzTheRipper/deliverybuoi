import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/login.css'


export default function Dashboard() {
  return (
    <div className='dashboard-body'>
      <div><Navbar /></div>

      <div><Footer /></div>
    </div>
  )
}
