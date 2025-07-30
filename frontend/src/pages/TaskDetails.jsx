import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClipboardList } from 'react-icons/fa';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Navbar from '../components/Navbar';
import EditTask from '../components/EditTask';
import ConfirmDialog from '../components/ConfirmDialog';
import TaskCompleteDialog from '../components/TaskCompleteDialog'; // ✅

const statusColors = {
  pending: '#E343E6',
  ongoing: '#DD9221',
  done: '#21D789',
  collaborative_task: '#4A90E2',
};

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showComplete, setShowComplete] = useState(false); // ✅

  useEffect(() => {
    const fetchTask = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTask(data);
      setStatus(data.status);
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
    };

    fetchTask();
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate('/dashboard');
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (status === 'done') {
      setShowComplete(true); // ✅ Show completion dialog
    } else {
      navigate('/dashboard');
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setDropdownOpen(false);
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040612] to-[#60E5AE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <p className="text-white text-lg font-medium">Loading Task Details...</p>
        </div>
      </div>
    );
  }

  const statusColor = statusColors[status] || '#DD9221';

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Top Background */}
      <div className="relative w-full h-[174px] bg-gradient-to-l from-[#040612] to-[#135e3f] overflow-hidden">
        <img
          src="/login_img.png"
          alt="Top Illustration"
          className="absolute right-10 top-10 h-full object-cover hidden md:block opacity-40 scale-160"
        />
        <Navbar user={user} />
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <ConfirmDialog
          onClose={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}

      {/* ✅ Task Completion Dialog */}
      {showComplete && (
        <TaskCompleteDialog
          onClose={() => {
            setShowComplete(false);
            navigate('/dashboard');
          }}
        />
      )}

      {/* Main Section */}
      <div className="flex justify-center px-4 md:px-10 w-full absolute top-[140px] left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-[96%] max-w-[1320px] bg-white rounded-xl shadow-xl px-6 md:px-12 pt-12 pb-16 min-h-[78vh] relative overflow-hidden">

          {showEdit && (
            <>
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 rounded-xl" />
              <div className="absolute inset-0 z-20 px-6 md:px-12 pt-12 pb-16 overflow-auto">
                <EditTask
                  taskId={id}
                  onClose={() => setShowEdit(false)}
                  onTaskUpdated={(updatedTask) => {
                    setTask(updatedTask);
                    setStatus(updatedTask.status);
                    setShowEdit(false);
                  }}
                />
              </div>
            </>
          )}

          {!showEdit && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Task Details</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEdit(true)}
                    className="bg-[#FFAB001A] text-[#FFAB00] px-4 py-1 rounded-md text-sm hover:bg-[#e4ce8b85] w-28"
                  >
                    <AiOutlineEdit className="inline-block mr-1" /> Edit Task
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-green-100 text-green-700 px-4 py-1.5 rounded-md text-sm hover:bg-green-200 w-30"
                  >
                    Back
                  </button>
                </div>
              </div>

              <hr className="border-gray-300 mb-6" />

              <div className="flex gap-6 items-start mb-4">
                <div className="bg-[#60E5AE] p-4 rounded-full text-white text-3xl">
                  <FaClipboardList />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1 text-2xl">{task.category}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{task.description}</p>

                  <div className="flex flex-wrap gap-8 items-start mb-6 mt-12">
                    <div>
                      <div className="text-sm font-bold text-black mb-1">End Date</div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <FaCalendarAlt />
                        <span>
                          {new Date(task.endDate).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="w-px h-14 bg-gray-300"></div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 mt-2 text-xl">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor }}></span>
                        <span style={{ color: statusColor }} className="font-medium capitalize">
                          {status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 max-w-xs relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Change Status
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={handleStatusChange}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full border text-black border-gray-300 rounded-md px-4 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        <option value="pending">Pending</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="collaborative_task">Collaborative Task</option>
                        <option value="done">Done</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-lg">
                        {dropdownOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-7 bottom-10 flex gap-4">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-100 text-red-600 px-6 py-1 rounded-md font-medium hover:bg-red-200 w-36"
                >
                  Delete Task
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-[#60E5AE] text-white px-6 py-1 rounded-md font-semibold hover:bg-[#49c59c] w-36"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
