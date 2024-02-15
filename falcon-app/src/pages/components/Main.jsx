import React from 'react'
import "./styles/Main.css"
import { BsWifi, BsCash, BsBarChartFill } from "react-icons/bs";
import { Link } from 'react-router-dom'

//TO DO
// make mobile responsive
// set anchor routes for the navigation buttons

export default function Main() {
  return (
    <>
        <h2>The hassle free experience you deserve</h2>
        <div className='main_card'>
            <div>
                <div className='main_icons'>
                    <BsWifi />
                </div>
                <h3>Online</h3>
                <p>
                    Your store is online and available to anyone with an internet connection.
                </p>
            </div>
            <div>
                <div className='main_icons'>
                    <BsCash />
                </div>
                <h3>Flexible Payment Options</h3>
                <p>
                    Chhose from a list of the best payment processors that suits your business.
                </p>
            </div>
            <div>
                <div className='main_icons'>
                    <BsBarChartFill />
                </div>
                <h3>Detailed Records</h3>
                <p>
                    Get comprehensive reports and analytics on your store's performance.
                </p>
            </div>
        </div>
    </>
  )
}
