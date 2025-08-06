import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/HomePage.jsx';
import About from './assets/Pages/AboutusPage.jsx';
import DashboardPage from './assets/Pages/DashboardPage.jsx';
import LoginPage from './assets/Pages/LoginPage.jsx';
import RegisterPage from './assets/Pages/registerPage.jsx';
import Navbar from './assets/Components/Navbar.jsx';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <div>
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App;