
import React from 'react'
import Cards from '../components/Cards'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousal from '../components/Carousal'
import '../styles/home.css'


export default function Home() {
    return (
        <div className='home-body'>
            <div><Navbar /></div>
                <div>
                    <Carousal/>
                </div>
                
                <div>
                    <Cards/>
                </div>
            
            <div><Footer /></div>
        </div>
    )
}

