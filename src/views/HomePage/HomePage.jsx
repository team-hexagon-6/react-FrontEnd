import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../utils/auth'

export default function HomePage() {

    const auth=useAuth();
  return (
   
    <nav className='primary-nav'>
        <NavLink to='/'>
            Home
        </NavLink> <br/>
        <NavLink to='/about'>
            About
        </NavLink> <br/>
        <NavLink to='/products'>
            Products
        </NavLink><br/>
        <NavLink to='/profile'>
            Profile
        </NavLink> <br/>
        {
            !auth.user && (<NavLink to='/login'>
            Login
        </NavLink>)
        }
    </nav>

  )
}
