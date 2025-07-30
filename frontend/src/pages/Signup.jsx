import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Passwords don't match.", 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || 'Signup failed.', 'error');
        return;
      }

      showToast('Signup successful! Redirecting to login...', 'success');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      showToast('Server error. Please try again later.', 'error');
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-r from-[#040612] to-[#60E5AE]">
      {/* Left Illustration */}
      <div className="hidden md:flex items-center justify-center">
        <img src="/signup_img.png" alt="Signup Illustration" className="w-2/3" />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center bg-white px-6 py-10 shadow-lg relative">
        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`absolute top-5 right-5 px-4 py-2 rounded shadow-lg text-sm ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
          <p className="text-sm text-gray-600 mb-6">
            To Create Account, Please Fill in the Form Below.
          </p>

          <form onSubmit={handleSignup} className="space-y-5 text-left">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-black pr-10 focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-black pr-10 focus:outline-none focus:ring focus:border-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#60E5AE] hover:bg-[#70f5bf] py-2 px-4 rounded-md text-black font-semibold"
            >
              Sign Up
            </button>

            <div className="flex items-center mx-16">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

          </form>

          {/* Login Link */}
          <p className="text-sm mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
