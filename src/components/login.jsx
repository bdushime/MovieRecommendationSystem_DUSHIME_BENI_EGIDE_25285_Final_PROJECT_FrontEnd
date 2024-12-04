import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/Login.css";
import axios from 'axios';
import i18next from "i18next";

function Login() {
    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [error, setError] = useState('');
    // const [csrfToken, setCsrfToken] = useState(''); // Set dynamically if needed
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
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
            if (response.data.data.role !== "ADMIN") {
                navigate("/personal-page");
            } else {
                navigate("/admin");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <div className="language-switch">
                <a href="?lang=en">English</a> | <a href="?lang=fr">Français</a>
            </div>

            <div className="header">
                <h1>{i18next.t("login.welcome")}</h1>
                <p>{i18next.t("login.sub")}</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
                <h2>{i18next.t("login.helper")}</h2>

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

                <button type="submit" className="submit">{i18next.t("login.primary")}</button>

                <div className="signup">
                    {i18next.t("login.question")} <a href="/register">{i18next.t("login.secondary")}</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
