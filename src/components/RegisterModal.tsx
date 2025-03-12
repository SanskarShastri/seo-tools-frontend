'use client';

import { useState } from 'react';
import Modal from './Modal';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accountCreated, setAccountCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Handle Google sign up
  const handleGoogleSignUp = async () => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Simulate API call for Google authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // This would be replaced with actual Google OAuth authentication
      console.log('Google sign up successful');
      
      // Show success message
      setAccountCreated(true);
      
      // Redirect or close modal after a delay
      setTimeout(() => {
        onClose();
        // Optionally, redirect to dashboard
      }, 3000);
    } catch (err) {
      console.error('Google sign up error:', err);
      setError('Failed to sign up with Google. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for this field
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate current step
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle step navigation
  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  // Handle manual registration submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }
    
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // This would be replaced with actual registration API call
      console.log('Manual registration successful', formData);
      
      // Show success message
      setAccountCreated(true);
      
      // Redirect or close modal after a delay
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Uppercase letters check
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Lowercase letters check
    if (/[a-z]/.test(password)) strength += 25;
    
    // Numbers and special characters check
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;
    
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Account">
      <div className="space-y-6 py-4">
        {accountCreated ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 mb-6 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Account Created Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Welcome to SEO Tools! Your account has been created successfully.
            </p>
            <div className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 p-px rounded-lg">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white rounded-md text-sm font-medium text-gray-800 hover:text-teal-600 transition-colors duration-300 focus:outline-none"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Illustration - Smaller version */}
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <svg className="w-14 h-14 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Welcome Text */}
            <div className="text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-1">Get started for free</h3>
              <p className="text-gray-600 text-sm">Create your account to access all SEO tools</p>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                {error}
              </div>
            )}
            
            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl shadow-sm flex items-center justify-center space-x-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                Sign up with Google
              </span>
            </button>
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            {/* Manual Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-800'}`}>1</div>
                  <div className="h-0.5 w-5 bg-gray-200"></div>
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-800'}`}>2</div>
                </div>
                <p className="text-xs text-gray-500">Step {currentStep} of 2</p>
              </div>
              
              {currentStep === 1 ? (
                <>
                  {/* Step 1: Account Information */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                        fieldErrors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                    {fieldErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                        fieldErrors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your@email.com"
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 flex justify-center items-center"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  {/* Step 2: Security */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                          fieldErrors.password ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formData.password && (
                      <div className="mt-2">
                        <div className="h-1.5 rounded-full bg-gray-200 mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${getPasswordStrengthColor()}`} 
                            style={{ width: `${getPasswordStrength()}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 flex justify-between">
                          <span>Password strength:</span>
                          <span className={getPasswordStrength() <= 25 ? 'text-red-500' : getPasswordStrength() <= 50 ? 'text-orange-500' : getPasswordStrength() <= 75 ? 'text-yellow-600' : 'text-green-500'}>
                            {getPasswordStrengthText()}
                          </span>
                        </p>
                      </div>
                    )}
                    {fieldErrors.password && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors ${
                        fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="••••••••"
                    />
                    {fieldErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                        I agree to the{' '}
                        <button
                          type="button"
                          className="text-teal-600 hover:text-teal-500 focus:outline-none"
                        >
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button
                          type="button"
                          className="text-teal-600 hover:text-teal-500 focus:outline-none"
                        >
                          Privacy Policy
                        </button>
                      </label>
                      {fieldErrors.agreeToTerms && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.agreeToTerms}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
            
            {/* Sign In Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{' '}
              <button
                onClick={onSwitchToLogin}
                className="font-medium text-teal-600 hover:text-teal-500 focus:outline-none transition-colors"
              >
                Log in
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default RegisterModal;