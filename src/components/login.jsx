import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); // Set dynamically if needed
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        login: credentials.username,
        email: '',
        password: credentials.password,
        role: '',
    });
      console.log('login', response);
      if (!response.data.success) {
        throw new Error('Login failed');
      }
      console.log('User logged in successfully');
      if(response.data.data.role !== "ADMIN"){
        navigate("/personal-page");
      }else{
        navigate("/admin");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Beniflix</h1>
        <p>Your ultimate movie streaming platform</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

        <div className="field">
          <span className="user"><i className="fas fa-user"></i></span>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <span className="lock"><i className="fas fa-lock"></i></span>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="forgotPassword">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="submit">Login</button>

        <div className="signup">
          Don’t have an account? <a href="/register">Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
