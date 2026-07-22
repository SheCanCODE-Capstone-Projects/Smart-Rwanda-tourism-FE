import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ForgotPasswordFormState } from '../../types/auth';

/**
 * ForgotPasswordForm component.
 * Renders a form that allows users to request a password reset link via email.
 */
const ForgotPasswordForm = () => {
  const [state, setState] = useState<ForgotPasswordFormState>({
    email: '',
    emailError: '',
    isLoading: false,
    successMessage: '',
    touched: false,
  });
  const { email, emailError, isLoading, successMessage, touched } = state;

  /**
   * Validates the email input value.
   * @param value - The email string to validate.
   * @returns An error message string, or empty string if valid.
   */
  const validateEmail = (value: string) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  /**
   * Handles changes to the email input field.
   * @param e - The input change event.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      email: value,
      emailError: prev.touched ? validateEmail(value) : '',
    }));
  };

  /**
   * Marks the email field as touched and triggers validation on blur.
   */
  const handleBlur = () => {
    setState(prev => ({ ...prev, touched: true, emailError: validateEmail(prev.email) }));
  };

  /**
   * Handles form submission, validates the email and triggers the API call.
   * @param e - The form submit event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateEmail(email);
    setState(prev => ({ ...prev, emailError: error, touched: true }));
    if (error) return;
    setState(prev => ({ ...prev, isLoading: true }));
    // TODO: Replace with real API call to POST /api/auth/forgot-password
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        successMessage: 'If an account with this email exists, a password reset link has been sent. Please check your email.',
      }));
    }, 2000);
  };

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
        Forgot Password?
      </h1>
      <p className="text-center text-gray-500 mb-8 text-sm leading-relaxed">
        Enter your email address and we'll send you a password reset link.
      </p>

      {/* Success state */}
      {successMessage ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="h-4 w-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800 mb-0.5">Check your inbox!</p>
            <p className="text-sm text-emerald-700">{successMessage}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>

          {/* Email field */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className={`flex items-center rounded-xl border ${
              emailError && touched
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-gray-50'
              } transition-all duration-200 px-4`}>
              <svg className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleBlur}
                className="w-full py-3 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
                placeholder="your@email.com"
                disabled={isLoading}
                aria-describedby="email-error"
              />
            </div>
            {emailError && touched && (
              <p id="email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd" />
                </svg>
                {emailError}
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
                Sending...
              </span>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>
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

      {/* Footer note - tourism theme */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">🇷🇼 Explore Rwanda • Hotels • Tours • Attractions</p>
      </div>

    </div>
  );
};

export default ForgotPasswordForm;
