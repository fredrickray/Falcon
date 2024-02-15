import React from 'react'
import "./styles/Hero.css"
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div id='hero' className='hero_section'>
        <div className="coverImg">
            <h2>Get a <span>free online store</span> <br />in 5 minutes</h2>
            <div className="cta_btns">
                <Link to={"/register"} >
                    <button>Get Started</button>
                </Link>
                <Link to={"/contact"}>
                    <button>Learn More</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
