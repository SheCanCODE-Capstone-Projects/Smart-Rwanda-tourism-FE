// Auth Validation Helpers 
import type { LoginFormData, LoginFormErrors, RegisterFormData, RegisterFormErrors } from '../types/auth'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Login

export function validateLoginForm(data: LoginFormData): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.password) {
    errors.password = 'Password is required.'
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  return errors
}

export function isLoginFormValid(errors: LoginFormErrors): boolean {
  return Object.keys(errors).length === 0
}

// Register

export function validateRegisterForm(data: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {}

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required.'
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required.'
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.password) {
    errors.password = 'Password is required.'
  } else if (data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.'
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  if (!data.role) {
    errors.role = 'Please select a role to continue.'
  }

  return errors
}

export function isRegisterFormValid(errors: RegisterFormErrors): boolean {
  return Object.keys(errors).length === 0
}
