'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';

type RegisterInputs = {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  location: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState<Omit<RegisterInputs, 'confirmPassword'> | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const password = watch('password');

  const handleSendOtp = async (data: RegisterInputs) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Remove confirmPassword as it's not needed for the API
      const { confirmPassword, ...userData } = data;
      
      // Store the form data for later submission after OTP verification
      setFormData(userData);
      setEmail(userData.email);
      
      // Call the API to send OTP
      await authAPI.sendOTP(userData.email);
      
      // Show OTP verification screen
      setOtpSent(true);
      setShowOtpVerification(true);
      setIsLoading(false);
      
    } catch (err: any) {
      console.error('Failed to send OTP:', err);
      setError(err?.response?.data?.error || 'Failed to send OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!email || !formData) {
        setError('Session expired. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Verify OTP with the API
      await authAPI.verifyOTP(email, otp);
      
      // If OTP is valid, register the user
      await authAPI.register(formData);
      router.push('/login?registered=true');
      
    } catch (err: any) {
      console.error('Registration failed:', err);
      if (err.message === 'Invalid OTP') {
        setError('Invalid OTP. Please try again.');
      } else {
        setError(err?.response?.data?.error || 'Registration failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!email) {
        setError('Session expired. Please try again.');
        setIsLoading(false);
        return;
      }
      
      // Call the API to resend OTP
      await authAPI.sendOTP(email);
      
      setOtpSent(true);
      setIsLoading(false);
      
    } catch (err: any) {
      console.error('Failed to resend OTP:', err);
      setError(err?.response?.data?.error || 'Failed to resend OTP. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {!showOtpVerification ? (
        <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              {...register('gender', { required: 'Gender is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Sending OTP...' : 'Continue'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          {otpSent && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
              <p>OTP sent to your email address!</p>
              <p className="text-xs mt-1">For demo purposes, use code: 123456</p>
            </div>
          )}
          
          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-1">
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button
            onClick={handleVerifyOtp}
            disabled={isLoading || otp.length !== 6}
            className={`w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ${
              isLoading || otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Verify & Register'}
          </button>
          
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Didn&apos;t receive the OTP?{' '}
              <button 
                type="button" 
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-primary hover:underline text-sm"
              >
                Resend OTP
              </button>
            </p>
            
            <button 
              type="button" 
              onClick={() => setShowOtpVerification(false)}
              className="text-primary hover:underline text-sm"
            >
              Back to Registration Form
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
} 