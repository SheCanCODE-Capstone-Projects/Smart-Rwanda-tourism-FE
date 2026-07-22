import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [touched, setTouched] = useState(false);

  // Validate email format
  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) setEmailError(validateEmail(value));
  };

  const handleBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateEmail(email);
    setEmailError(error);
    setTouched(true);
    if (error) return;

    setIsLoading(true);

    // TODO: Replace with real API call to POST /api/auth/forgot-password
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        'If an account with this email exists, a password reset link has been sent. Please check your email.'
      );
    }, 2000);
  };

  return (
    <div className="w-full">
      {/* Brand */}
      <div className="mb-8">
        <span className="text-3xl font-bold text-emerald-600">Smart</span>
        <span className="text-3xl font-bold text-teal-500"> Rwanda</span>
        <p className="text-sm text-gray-400 mt-1">Tourism Marketplace</p>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password</h1>
      <p className="text-gray-500 mb-10 leading-relaxed">
        Enter your email address and we'll send you a password reset link.
      </p>

      {/* Success state */}
      {successMessage ? (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
          <svg
            className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-emerald-700">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Email input */}
          <div className="mb-8">
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleBlur}
              className={`w-full px-0 py-3 border-0 border-b-2 ${
                emailError && touched
                  ? 'border-red-400'
                  : 'border-gray-300 focus:border-emerald-500'
              } bg-transparent outline-none text-gray-800 placeholder-gray-400 text-base transition-colors duration-200`}
              placeholder="Enter your email"
              disabled={isLoading}
              aria-describedby="email-error"
            />
            {emailError && touched && (
              <p id="email-error" className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {emailError}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-4 rounded-xl text-white font-semibold text-base transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.99]'
            } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
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
          className="text-sm text-gray-500 hover:text-emerald-600 transition-colors duration-200 inline-flex items-center gap-1.5 group"
        >
          <svg
            className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
