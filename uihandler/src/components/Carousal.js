import React, { useEffect, useState } from 'react';

import Slide1Food from "../images/Slide1Food.png"
import DroneDelivery from "../images/DroneDelivery.png"
import Slide3 from "../images/Slide3.png"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../styles/carousel.css'



export default function () {
    var delayTime = 5000;
    useEffect(() => {
        let interval
        const nextButton = document.querySelector('.carousel-control-next');

        function handleClick() {
            clearInterval(interval);

            interval = setInterval(() => {
                if(nextButton)
                {
                    nextButton.click();
                }
            }, delayTime);
        }

        if (nextButton) {
            nextButton.addEventListener('click', handleClick);

        }
        interval = setInterval(() => {

            nextButton.click();

        }, delayTime);

        

        return () => {  
            clearInterval(interval);  
        };
    }, []);

    return (
        
        <div className="carousel-container">
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval={delayTime}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="carousel-bottom-button active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" className="carousel-bottom-button" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="carousel-bottom-button" aria-label="Slide 3"></button>

                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="carousel-plate">
                            <img src={Slide1Food} className="carousalImage" alt="..." />
                        </div>
                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className="carousel-plate">
                            <img src={DroneDelivery} className="carousalImage" alt="..." />
                        </div>

                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div className="carousel-item ">
                        <div className="carousel-plate">
                            <img src={Slide3} className="carousalImage" alt="..." />
                        </div>
                        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                </div>
                <div className="nextPrevButton">
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </div>
    )
}
