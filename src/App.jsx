import './App.css'
import AdminPage from './components/AdminPage'
import Login from './components/login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from './components/UsersPage'

function App() {
  return (
    // <MovieProvider>
    <BrowserRouter>
      <Routes>
        {/* Add this route to redirect from root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/personal-page" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
    // </MovieProvider>
  )
}

export default App