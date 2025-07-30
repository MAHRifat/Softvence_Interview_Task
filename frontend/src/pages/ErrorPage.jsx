import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Top Gradient Background */}
      <div className="relative w-full h-[174px] bg-gradient-to-l from-[#040612] to-[#135e3f] overflow-hidden">
        <img
          src="/login_img.png"
          alt="Top Illustration"
          className="absolute right-10 top-10 h-full object-cover hidden md:block opacity-40 scale-180 "
        />
      </div>

      {/* Error Box */}
      <div className="flex justify-center px-[20px] md:px-[60px] -mt-[50px]">
        <div className="w-full max-w-[1320px] bg-white rounded-xl shadow-xl px-6 md:px-12 pt-10 pb-[60px] z-10 flex flex-col justify-center items-center min-h-[500px]">
          
          {/* Error Image */}
          <img
            src="/error_img.png"
            alt="Error"
            className="w-60 md:w-80 mb-6"
          />

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
            Oops! Something went wrong.
          </h2>
          <p className="text-gray-500 text-center mb-8">
            The page you're looking for doesn't exist or an error occurred.
          </p>

          {/* Back Button */}
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#60E5AE] hover:bg-[#4ed1a3] text-white px-6 py-2 rounded-md font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
