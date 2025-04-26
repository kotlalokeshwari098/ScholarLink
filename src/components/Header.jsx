import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/scholarshiplist'>Scholarship</Link>
      <Link to='/about'>About Us</Link>
    </div>
  )
}

export default Header
