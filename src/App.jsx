import './App.css'
import AdminPage from './components/AdminPage'
import Login from './components/login'
import Register from './components/Register'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import i18next from "i18next";
import PersonalPage from "./components/personalPage.jsx";

function App() {
    const lang = new URLSearchParams(window.location.search).get("lang");
    i18next.init({resources: translations, fallbackLng: (lang || "en")});
    return (
        // <MovieProvider>
        <BrowserRouter>
            <Routes>
                {/* Add this route to redirect from root to login */}
                <Route path="/" element={<Navigate to="/login" replace/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/personal-page" element={<PersonalPage/>}/>
            </Routes>
        </BrowserRouter>
        // </MovieProvider>
    )
}

export default App

const translations = {
    "en": {
        "translation": {
            "login": {
                "welcome": "Welcome to Beniflix",
                "sub": "Your ultimate movie streaming platform",
                "helper": "Login to Your Account",
                "primary": "Login",
                "question": "Don’t have an account?",
                "secondary": "Sign up"
            },
            "register": {
                "welcome": "Welcome to Beniflix",
                "sub": "Create an account to get started",
                "helper": "Create an Account",
                "primary": "Sign Up",
                "question": "Already have an account?",
                "secondary": "Login"
            }
        }
    },
    "fr": {
        "translation": {
            "login": {
                "welcome": "Bienvenue à Beniflix",
                "sub": "Votre plateforme de streaming de films ultime",
                "helper": "Connectez-vous à votre compte",
                "primary": "S'identifier",
                "question": "Vous n'avez pas de compte?",
                "secondary": "S'inscrire"
            },
            "register": {
                "welcome": "Bienvenue à Beniflix",
                "sub": "Créez un compte pour commencer",
                "helper": "Créer un compte",
                "primary": "S'inscrire",
                "question": "Vous avez déjà un compte?",
                "secondary": "S'identifier"
            }
        }
    }
}