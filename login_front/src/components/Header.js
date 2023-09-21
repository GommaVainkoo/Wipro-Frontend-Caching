import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './module.css'
const Header = () => {
    let {user,logout}=useContext(AuthContext)

  return (
    <div className="styled-class">
        <nav>
        <ul className="list">

            <li className="items">
            <Link to='/'>Home</Link></li>
            <span className='brooo'> | </span>
            {user?(
                <li className="items">
                <Link onClick={logout}>Logout</Link></li>
            ):(
                <li className="items">
                <Link to='/login'>Login</Link></li>
            
            )
            
            }
            <span className='brooo'> | </span>
            <li className="items">
            <Link to='/register'>Register</Link></li>

        </ul>
        
        </nav>

    </div>
  )
}

export default Header