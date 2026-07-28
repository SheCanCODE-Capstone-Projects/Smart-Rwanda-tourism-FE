import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { ResetPasswordFormState, ResetPasswordErrors, ResetPasswordTouched } from '../../types/auth';
import { resetPassword } from '../../services/authService';

/**
 * ResetPasswordForm component.
 * Renders a form for setting a new password using a token from the URL query params.
 * Shows an invalid-link state if no token is present.
 */
const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [form, setForm] = useState<ResetPasswordFormState>({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<ResetPasswordErrors>({ password: '', confirmPassword: '' });
  const [touched, setTouched] = useState<ResetPasswordTouched>({ password: false, confirmPassword: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  /**
   * Validates the password field.
   * @param value - The password string to validate.
   * @returns An error message string, or empty string if valid.
   */
  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  /**
   * Validates the confirm password field.
   * @param value - The confirm password string.
   * @param password - The original password to compare against.
   * @returns An error message string, or empty string if valid.
   */
  const validateConfirm = (value: string, password: string) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  /**
   * Handles changes to password or confirm password input fields.
   * @param e - The input change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof typeof touched]) {
      setErrors({
        password: validatePassword(updated.password),
        confirmPassword: validateConfirm(updated.confirmPassword, updated.password),
      });
    }
  };

  /**
   * Marks the field as touched and triggers validation on blur.
   * @param e - The focus event.
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors({
      password: validatePassword(form.password),
      confirmPassword: validateConfirm(form.confirmPassword, form.password),
    });
  };

  /**
   * Handles form submission, validates both fields and triggers the reset API call.
   * @param e - The form submit event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      password: validatePassword(form.password),
      confirmPassword: validateConfirm(form.confirmPassword, form.password),
    };
    setErrors(newErrors);
    setTouched({ password: true, confirmPassword: true });
    if (newErrors.password || newErrors.confirmPassword) return;
    if (!token) return;

    setApiError('');
    setIsLoading(true);
    try {
      await resetPassword(token, form.password);
      setIsLoading(false);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset password. Please try again.';
      setApiError(message);
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full border border-gray-100 text-center">
        <div className="text-center mb-1">
          <span className="text-lg font-bold text-green-800">Smart</span>
          <span className="text-lg font-bold text-green-700"> Rwanda</span>
          <span className="text-xs text-gray-400 block">Tourism Marketplace</span>
        </div>
        <div className="mt-10 mb-4 flex justify-center">
          <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="h-7 w-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Invalid Reset Link</h2>
        <p className="text-sm text-gray-500 mb-6">This password reset link is invalid or has expired.</p>
        <Link to="/forgot-password"
          className="inline-block w-full py-3 px-4 rounded-xl bg-green-800 text-white text-sm font-medium text-center hover:bg-green-900 transition-colors">
          Request a New Link
        </Link>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400">🇷🇼 Explore Rwanda • Hotels • Tours • Attractions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full border border-gray-100">
      {/* Brand */}
      <div className="text-center mb-1">
        <span className="text-lg font-bold text-green-800">Smart</span>
        <span className="text-lg font-bold text-green-700"> Rwanda</span>
        <span className="text-xs text-gray-400 block">Tourism Marketplace</span>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-center mt-10 mb-2 tracking-tight bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
        Reset Password
      </h1>
      <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed">
        Enter your new password below.
      </p>

      {success ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800 mb-0.5">Password reset successful!</p>
            <p className="text-sm text-emerald-700">
              Your password has been updated.{' '}
              <Link to="/login" className="underline font-medium hover:text-emerald-900">
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <>
        {apiError && (
          <div role="alert" aria-live="assertive" className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {apiError}
          </div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {/* Password field */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              New Password
            </label>
            <div className={`flex items-center rounded-xl border ${
              errors.password && touched.password ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            } transition-all duration-200 px-4`}>
              <svg className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="Min. 8 characters"
                disabled={isLoading}
                aria-describedby="password-error"
              />
              <button type="button" onClick={() => setShowPassword(p => !p)}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none flex-shrink-0">
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p id="password-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm New Password
            </label>
            <div className={`flex items-center rounded-xl border ${
              errors.confirmPassword && touched.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
            } transition-all duration-200 px-4`}>
              <svg className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="Re-enter your password"
                disabled={isLoading}
                aria-describedby="confirm-error"
              />
              <button type="button" onClick={() => setShowConfirm(p => !p)}
                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none flex-shrink-0">
                {showConfirm ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p id="confirm-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd" />
                </svg>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-medium text-sm transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-800 hover:bg-green-900 shadow-md shadow-green-200 hover:shadow-lg transform hover:-translate-y-0.5'
            } focus:outline-none focus:ring-2 focus:ring-green-800 focus:ring-offset-2`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Resetting...
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        </>
      )}

      {/* Back to login */}
      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-sm text-gray-500 hover:text-green-800 transition-colors duration-200 inline-flex items-center gap-1.5 group"
        >
          <svg className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Login
        </Link>
      </div>

      {/* Footer note */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">🇷🇼 Explore Rwanda • Hotels • Tours • Attractions</p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
