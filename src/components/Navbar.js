import React from 'react'
import {Link} from "react-router-dom"
import img1 from "./logoo.png"

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark py-2'>
       <Link to="/" className='navbar-brand ml-3 .font-weight-bolder '><h2><img src={img1} height="50px" width="50px" /> Droisys Contact Manager App</h2> </Link>
      
    </nav>
  )
}

export default Navbar