import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
   
    <nav className='Nav'>
    <ul>
      <li><Link to={'/'}>Home</Link></li>
      <li className='logButton'><Link to={'/login'}>Login</Link></li>
      
    </ul>
  </nav>
  )
}

export default Nav