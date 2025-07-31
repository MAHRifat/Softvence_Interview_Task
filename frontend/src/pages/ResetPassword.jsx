import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('https://tasko-l7bf.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          navigate('/login');
          return;
        }

        const userData = await res.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token || !user?.email) {
      showToast('Unauthorized: Please login first');
      return;
    }

    try {
      const res = await fetch('https://tasko-l7bf.onrender.com/api/users/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: user.email, password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.message || 'Reset failed');
        return;
      }

      showToast('Password reset successful', 'success');

      // Remove token and redirect to login after 2s
      setTimeout(() => {
        localStorage.removeItem('token');
        navigate('/login');
      }, 2000);
    } catch (error) {
      showToast('Server error. Try again.');
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040612] to-[#60E5AE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-white"
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
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-white text-lg font-medium">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar activeTab={'reset'} setActiveTab={() => { }} user={user} />

      {/* Toast at top center */}
      {toast.show && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow text-white z-50 transition-all duration-300 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
          {toast.message}
        </div>
      )}

      {/* Top Banner */}
      <div className="relative w-full h-[174px] bg-gradient-to-l from-[#040612] to-[#135e3f] overflow-hidden">
        <img
          src="/login_img.png"
          alt="Top Illustration"
          className="absolute right-10 top-10 h-full object-cover hidden md:block opacity-40 scale-160"
        />
      </div>

      {/* Form Box */}
      <div className="flex justify-center px-[20px] md:px-[60px] -mt-[50px]">
        <div className="w-full max-w-[1320px] bg-white rounded-xl shadow-xl px-4 sm:px-8 lg:px-12 min-h-[78vh] relative overflow-hidden flex flex-col justify-center items-center">

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#60E5AE] p-3 rounded-full">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-6.219-8.56"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-1">
            Reset your Password
          </h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Strong passwords include numbers, letters, and punctuation marks.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-5 mx-auto">

            {/* Email */}
            <div className="max-w-xl mx-auto">
              <label className="block text-sm text-gray-700 mb-1 pl-1">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-gray-100 focus:outline-none"
              />
            </div>

            {/* New Password */}
            <div className="max-w-xl mx-auto">
              <label className="block text-sm text-gray-700 mb-1 pl-1">
                Enter New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 text-black focus:outline-none focus:ring focus:border-blue-400"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="max-w-xl mx-auto">
              <label className="block text-sm text-gray-700 mb-1 pl-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10 text-black focus:outline-none focus:ring focus:border-blue-400"
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full max-w-xl mx-auto block bg-[#60E5AE] hover:bg-[#4ed1a3] text-white py-2 rounded-md font-semibold"
            >
              Reset Password
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
