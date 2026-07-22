export interface ForgotPasswordFormState {
  email: string;
  emailError: string;
  isLoading: boolean;
  successMessage: string;
  touched: boolean;
}

export interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordErrors {
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordTouched {
  password: boolean;
  confirmPassword: boolean;
}
