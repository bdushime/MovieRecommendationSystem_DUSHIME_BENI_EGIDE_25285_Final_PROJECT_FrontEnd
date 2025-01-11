import {useState} from 'react';
import axios from 'axios';
import "../styles/Register.css";
import i18next from "i18next";
// You can extract the CSS into a separate file

const Register = () => {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        role: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:8080/register', formData);
            console.log('registered', response);
            setSuccess('Account created successfully!');
            setError('');
        } catch (err) {
            console.error(err)
            setError('Failed to create account. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="container">
            <div className="language-switch">
                <a href="?lang=en">English</a> | <a href="?lang=fr">Français</a>
            </div>

            <div className="header">
                <h1>{i18next.t("register.welcome")}</h1>
                <p>{i18next.t("register.sub")}</p>
            </div>

            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}

            <form onSubmit={handleSubmit} className="register-form">
                <h2>{i18next.t("register.helper")}</h2>

                <div className="field">
                    <span className="user"><i className="fas fa-user"></i></span>
                    <input
                        type="text"
                        name="login"
                        placeholder="Username"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <span className="envelope"><i className="fas fa-envelope"></i></span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    <span className="lock"><i className="fas fa-lock"></i></span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="field">
                    {/*<label htmlFor="role">Select Role:</label>*/}
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="USER">Normal User</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>

                <button type="submit" className="submit">{i18next.t("register.primary")}</button>

                {/*<span className="login-alt">Or Sign Up with</span>*/}
                {/*<div className="socials">*/}
                {/*    <div className="social" id="instagram"><i className="fab fa-instagram"></i></div>*/}
                {/*    <div className="social" id="twitter"><i className="fab fa-twitter"></i></div>*/}
                {/*    <div className="social" id="google"><i className="fab fa-google"></i></div>*/}
                {/*</div>*/}

                <div className="signup">
                    <p>
                        {i18next.t("register.question")} <a href="/login">{i18next.t("register.secondary")}</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
