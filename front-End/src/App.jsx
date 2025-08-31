import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Pages/HomePage.jsx';
import About from './assets/Pages/AboutusPage.jsx';
import DashboardPage from './assets/Pages/DashboardPage.jsx';
import LoginPage from './assets/Pages/LoginPage.jsx';
import RegisterPage from './assets/Pages/registerPage.jsx';
import Navbar from './assets/Components/Navbar.jsx';
import DashboardLayout from './assets/Pages/DashboardLayout.jsx';
import StudentsPage from './assets/Pages/Dashboard_pages/Students.jsx';
import StaffPage from './assets/Pages/Dashboard_pages/Staff.jsx';
import RoomPage from './assets/Pages/Dashboard_pages/Room.jsx';
import VisitorPage from './assets/Pages/Dashboard_pages/Visitor.jsx';
import ComplaintPage from './assets/Pages/Dashboard_pages/Complaint.jsx';
// import PaymentPage from './assets/Pages/Dashboard_pages/Payment.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard routes (with sidebar layout) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} /> 
          <Route path="students" element={<StudentsPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="room" element={<RoomPage />} />
          <Route path="visitor" element={<VisitorPage />} />
          <Route path="complaint" element={<ComplaintPage />} />
          {/* <Route path="payment" element={<PaymentPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
