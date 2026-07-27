import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
