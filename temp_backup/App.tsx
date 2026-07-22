import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';

// NOTE: Other routes (Homepage, Login/Register, Reset Password) are managed by other team members.
// This App.tsx only includes the Forgot Password route for demonstration.
// In the full project, additional routes would be added here.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Other routes will be added by other team members:
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
