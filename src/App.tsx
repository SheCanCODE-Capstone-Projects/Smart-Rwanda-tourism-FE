import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import DiscoverPage from '@/pages/DiscoverPage';
import ContactPage from '@/pages/ContactPage';
import MarketplacePage from '@/pages/MarketplacePage';
import BusinessDetailsPage from '@/pages/BusinessDetailsPage';
import BookingPage from '@/pages/BookingPage';
import BookingLandingPage from '@/pages/BookingLandingPage';
import TripPlanner from '@/pages/TripPlanner';
import TripPackageDetail from '@/pages/TripPackageDetail';
import ProviderDashboard from '@/pages/ProviderDashboard';
import ProviderRoute from '@/components/auth/ProviderRoute';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';

// Auth Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// Admin Pages
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ProvidersPage from '@/pages/admin/ProvidersPage';
import UsersPage from '@/pages/admin/UsersPage';
import AttractionsPage from '@/pages/admin/AttractionsPage';
import BookingsPage from '@/pages/admin/BookingsPage';
import ReviewsPage from '@/pages/admin/ReviewsPage';
import TripPackagesPage from '@/pages/admin/TripPackagesPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
      <Route path="/admin/providers" element={<ProtectedRoute><ProvidersPage /></ProtectedRoute>} />
      <Route path="/admin/attractions" element={<ProtectedRoute><AttractionsPage /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute><ReviewsPage /></ProtectedRoute>} />
      <Route path="/admin/trip-packages" element={<ProtectedRoute><TripPackagesPage /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

      {/* Marketplace Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/business/:id" element={<BusinessDetailsPage />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/trip-planner/:id" element={<TripPackageDetail />} />
        <Route path="/booking" element={<BookingLandingPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route
          path="/provider/dashboard"
          element={
            <ProviderRoute>
              <ProviderDashboard />
            </ProviderRoute>
          }
        />
        <Route
          path="*"
          element={<NotFoundPanel title="Page not found." message="The page you're looking for doesn't exist or has moved." />}
        />
      </Route>
    </Routes>
  );
}

export default App;
