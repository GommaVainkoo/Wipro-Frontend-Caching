import React,{useContext} from 'react'
import './module.css';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
  return (
    <div className="styled-class">
        <form onSubmit={loginUser}>
            <h3>Login Here</h3>
            <label for="username">Username</label>
            <input type="text" name="username" placeholder="Enter Username" />
            <label for="password">Password</label>
            <input type="password" name="password" placeholder="Enter Password" />
            <button type="submit"id="clickBtn">Log In</button>
        </form>
    </div>
  )
}

export default LoginPage