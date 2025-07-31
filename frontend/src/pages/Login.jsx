import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://tasko-l7bf.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === 'User not found') {
          showToast('User not found. Please sign up first.', 'error');
        } else if (data.message === 'Incorrect password') {
          showToast('Incorrect password. Please try again.', 'error');
        } else {
          showToast(data.message || 'Login failed.', 'error');
        }
        return;
      }

      localStorage.setItem('token', data.token);
      showToast('Login successful!', 'success');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      showToast('Server error. Please try again later.', 'error');
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-r from-[#040612] to-[#60E5AE]">
      {/* Left Illustration */}
      <div className="hidden md:flex items-center justify-center">
        <img src="/login_img.png" alt="Login Illustration" className="w-2/3" />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center bg-white px-6 py-10 shadow-lg relative">
        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`absolute top-5 right-5 px-4 py-2 rounded shadow-lg text-sm ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back! Please enter your credentials.
          </p>

          <form onSubmit={handleLogin} className="space-y-5 text-left">
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

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-black">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="/reset" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#60E5AE] hover:bg-[#70f5bf] py-2 px-4 rounded-md text-black font-semibold"
            >
              Login
            </button>

            <div className="flex items-center mx-16">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

          </form>

          {/* Sign Up */}
          <p className="text-sm mt-6 text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
