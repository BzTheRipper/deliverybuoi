
import React from 'react'
import { Link } from 'react-router-dom'
import Pizza from '../images/Pizza.png'
import '../styles/cards.css'


function sizeType(n) {
    let st = ["Small", "Medium", "Large", "Family"];
    return st[n];
}

export default function Cards() {
    return (
        <div>
            
                <div className="card m-5" style={{ width: "24rem", height: "450px"}}>
                    <div className="card-whole"  style={{ height: "250px", backgroundColor: "#ff0000"}}>
                        <img
                            src={Pizza}
                            className="card-img-top img-fluid"
                            alt="Pizza"
                            style={{
                                objectFit: 'contain',
                                height: '100%',
                                width: '100%',
                                
                            }}
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="Pizza">Pizza</h5>
                        <p className="card-text">This is Description</p>
                        <div className='container w-100'>
                            <select style={{ background: "#f02424" }} id='PizzaSize' className='m-2 h-100 w-50 rounded'
                                onChange={(e) => {
                                    console.log('User Hitted Size', e.target.value);
                                }}
                            >
                                {Array.from(Array(4), (e, i) => {
                                    return (

                                        <option key={(i + 2) * 3} value={(i + 2) * 3}>{(i + 2) * 3} inch {sizeType(i)}</option>
                                    )
                                })}
                            </select>
                            <select style={{ background: "#f02424" }} id='PizzaQuantity' className='m-2 h-100 w-20 rounded'
                                onChange={(e) => {
                                    console.log('User Hitted Quantity', e.target.value);
                                }}>
                                {
                                    Array.from(Array(7), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <div style={{ textAlign: 'center' }} className='d-inline h-100 fs-5 m-1 align-items-center'>
                                Total Price
                            </div>
                        </div>
                        <Link to="/login" class="btn btn-primary m-3">Go somewhere</Link>
                    </div>
                </div>
            
        </div>
    )
}
