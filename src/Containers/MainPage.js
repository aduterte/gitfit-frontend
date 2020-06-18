import React from "react"
import Footer from "../Components/Footer"
import { Link } from "react-router-dom"

export default function MainPage () {
    

    return (
        <div className="main-page-container" >
            <div className="hero-image">
                <div className="hero-image-content">
                    <img src="/images/boxlogo.png" alt="hero image"/>
                    <div className="hero-image-text">
                        <div className="hero-image-slogan">Commit to be fit.</div>
                        <Link to="/login"><div className="hero-image-button">Git Started</div>
                        </Link>
                    </div>
                </div>
                <div className="video-container">
                    <video className="main-video" src="images/hero-image.webm" preload autoPlay loop/>
                </div>
                
            </div>
            <div className="main-page-about-container">
                <div className="about-header">
                    About Us
                </div>
                <div className="about-content">
                    We believe fitness should be fun and that social interaction is the key to achieving this. Whether it is a real-time pep talk from your significant other, an inspiring comment from your best friend or colleague, or likes from other friends in your social circle, the positive reinforcement will help you go that extra mile. That’s why the app is designed to make it easy for you to connect with your friends, and we recommend that you invite at least a couple of your close friends to try it out.
                </div>
            </div>
            <Footer/>
        </div>
    )
}