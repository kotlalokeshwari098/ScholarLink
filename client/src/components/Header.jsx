import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/scholarshiplist'>Scholarship</Link>
      <Link to='/bookmark'>BookMark</Link>
      <Link to='/about'>About Us</Link>
      <Link to='/sign'>Sign</Link>
    </div>
  )
}

export default Header
