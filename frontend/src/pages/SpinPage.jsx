import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const categories = [
    'Arts and Craft',
    'Nature',
    'Family',
    'Sport',
    'Friends',
    'Meditation',
];

const categoryColors = {
    'Arts and Craft': '#4ADE80',
    Nature: '#10B981',
    Family: '#3B82F6',
    Sport: '#A78BFA',
    Friends: '#F59E0B',
    Meditation: '#EF4444',
};

const SpinPage = () => {
    const [user, setUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Family');
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error('User fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const spinWheel = () => {
        const fullRotation = 360 * 3;
        const randomExtra = Math.floor(Math.random() * 360);
        const totalRotation = fullRotation + randomExtra;

        setIsSpinning(true);
        setRotation((prev) => prev + totalRotation);

        setTimeout(() => {
            setIsSpinning(false);
        }, 3000);
    };

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
            {/* Top Background */}
            <div className="relative w-full h-[174px] bg-gradient-to-l from-[#040612] to-[#135e3f] overflow-hidden">
                <img
                    src="/login_img.png"
                    alt="Top Illustration"
                    className="absolute right-10 top-10 h-full object-cover hidden md:block opacity-40 scale-150"
                />
                <Navbar user={user} activeTab="spin" />
            </div>

            {/* Main Box */}
            <div className="flex justify-center px-4 md:px-10 w-full absolute top-[140px] left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-full max-w-[1320px] bg-white rounded-xl shadow-xl px-4 sm:px-8 lg:px-12 pt-8 pb-12 min-h-[78vh] relative overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-800">Spin Wheel</h2>

                        <div className="w-full sm:max-w-[300px] text-black">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Select Task Category
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>

                            {/* Color Legend */}
                            <div className="mt-4 space-y-1 text-sm">
                                {categories.map((cat) => (
                                    <div key={cat} className="flex items-center gap-2">
                                        <span
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: categoryColors[cat] }}
                                        ></span>
                                        <span>{cat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Wheel */}
                    <div className="flex flex-col items-center mt-6">
                        <div className="relative">
                            {/* Pointer Image (Top Center) */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-20">
                                <img
                                    src="/pointer_img.png"
                                    alt="Pointer"
                                    className="w-8 h-8 object-contain"
                                />
                            </div>

                            {/* Wheel */}
                            <div
                                className="w-[280px] h-[280px] rounded-full border-[10px] border-[#DD3F20] transition-all duration-[3000ms] ease-out"
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    background: `conic-gradient(
                                        #4ADE80 0deg 60deg,
                                        #10B981 60deg 120deg,
                                        #3B82F6 120deg 180deg,
                                        #A78BFA 180deg 240deg,
                                        #F59E0B 240deg 300deg,
                                        #EF4444 300deg 360deg
                                    )`,
                                }}
                            ></div>

                            {/* Center Dot */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full z-10 border" />
                        </div>

                        <p className="text-sm text-gray-500 mt-12 text-center">
                            Spin the wheel to pick your task
                        </p>

                        {/* Buttons */}
                        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center ">
                            <button
                                onClick={spinWheel}
                                disabled={isSpinning}
                                className="bg-[#60E5AE] text-black hover:bg-green-200 font-semibold px-8 py-2 rounded-md disabled:opacity-60"
                            >
                                Spin 🎯
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-[#60E5AE] hover:bg-green-200 text-green-800 font-semibold px-8 py-2 rounded-md"
                            >
                                Go To Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpinPage;
