import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStopwatch } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

const Navbar = ({ activeTab, setActiveTab, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleReset = () => {
    navigate('/reset');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    if (setActiveTab) setActiveTab('task');
  };

  return (
    <nav className="absolute top-0 left-0 w-full px-6 py-4 z-50 text-white">
      <div className="relative flex items-center justify-between max-w-[1320px] mx-auto">
        {/* Left Logo */}
        <div
          className="flex items-center gap-2 font-bold text-xl cursor-pointer"
          onClick={goToDashboard}
        >
          <FaStopwatch className="text-[#60E5AE]" />
          Tasko
        </div>

        {/* Center Tabs */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-white font-medium">
          <button
            onClick={goToDashboard}
            className={`hover:text-[#60E5AE] ${activeTab === 'task' ? 'text-[#60E5AE]' : ''}`}
          >
            Task List
          </button>
          <button
            onClick={() => {
              navigate('/spin');
              if (setActiveTab) setActiveTab('spin');
            }}
            className={`hover:text-[#60E5AE] ${activeTab === 'spin' ? 'text-[#60E5AE]' : ''}`}
          >
            Spin
          </button>
        </div>

        {/* Right Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 font-semibold hover:text-[#162920]"
          >
            {user?.name || 'User'}
            <IoMdArrowDropdown className="text-lg" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md overflow-hidden z-50">
              <button
                onClick={handleReset}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Reset Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
