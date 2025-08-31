import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './assets/AuthContext.jsx';
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
import PaymentPage from './assets/Pages/Dashboard_pages/Payment.jsx';
import ProtectedRoute from './assets/ProtectRoute.jsx';


const NavbarWithAuth = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <Navbar currentUser={currentUser} onLogout={logout} />
  );
};

const AppContent = () => {
  return (
    <Router>
      <NavbarWithAuth />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected dashboard routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute adminOnly={true}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="room" element={<RoomPage />} />
          <Route path="visitor" element={<VisitorPage />} />
          <Route path="complaint" element={<ComplaintPage />} />
          <Route path="payment" element={<PaymentPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;