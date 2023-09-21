import React ,{useState,useContext}from 'react'
import './module1.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';




const Register = (e) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm_password: '', // Add this line
    email: '',


  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="styled-class">
        <form onSubmit={handleSubmit}>
        <h3>Signup Here</h3>
        {errorMessage && <p>{errorMessage}</p>}
        <label for="username">Username</label>
        <input type="text" placeholder="Username" name="username" id="username"  value={formData.username} onChange={handleChange}/>

        <label for="email">Email</label>
        <input type="email" placeholder="Email or Phone" name="email" id="email" value={formData.email} onChange={handleChange} />

        <label for="password1">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" value={formData.password} onChange={handleChange}/>


        <label for="password2">Confrom Password</label>
        <input type="password" placeholder="Confirm Password" id="password2" name="confirm_password" value={formData.confirm_password} onChange={handleChange}  />
        <button type="submit">Signup</button>
        <p>
            <Link to='/login'>Already have account</Link>
        </p>

        
        </form>
    </div>
  )
}

export default Register