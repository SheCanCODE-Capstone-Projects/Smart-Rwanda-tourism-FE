import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ForgotPassword, ResetPassword, LoginPage, RegisterPage, TripPlanner, TripPackageDetail } from './pages';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/trip-packages/:id" element={<TripPackageDetail />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;