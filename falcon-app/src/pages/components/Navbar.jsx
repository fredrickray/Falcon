import React from 'react'
import "./styles/Navbar.css"
import { Link } from 'react-router-dom'


export default function Navbar() {
  return (
    <header>
        <nav>
            <Link to={"/"} >
                <h1>Falcon App</h1>
            </Link>
            <ul>
                <li>
                    <Link to={"/"} >Home</Link>
                </li>
                <li>
                    <Link to={"/about"} >About</Link>
                </li>
                <li>
                    <Link to={"/contact"} >Contact</Link>
                </li>
            </ul>
            <div>
                <Link to={"/register"} >
                    <button>Sign Up</button>
                </Link>
                <Link to={"/login"} >
                    <button>Login</button>
                </Link>
            </div>
        </nav>
    </header>
  )
}
