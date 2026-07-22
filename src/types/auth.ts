/** State shape for the ForgotPasswordForm component. */
export interface ForgotPasswordFormState {
  email: string;
  emailError: string;
  isLoading: boolean;
  successMessage: string;
  touched: boolean;
}

/** State shape for the ResetPasswordForm fields. */
export interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
}

/** Validation error messages for the ResetPasswordForm. */
export interface ResetPasswordErrors {
  password: string;
  confirmPassword: string;
}

/** Tracks which fields in ResetPasswordForm have been touched by the user. */
export interface ResetPasswordTouched {
  password: boolean;
  confirmPassword: boolean;
}
