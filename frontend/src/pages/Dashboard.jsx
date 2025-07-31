import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import AddTask from '../components/AddTask';
import ConfirmDialog from '../components/ConfirmDialog';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('task');
  const [showAddTask, setShowAddTask] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await fetch('https://tasko-l7bf.onrender.com/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        const taskRes = await fetch('https://tasko-l7bf.onrender.com/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const taskData = await taskRes.json();
        setTasks(taskData);
      } catch (err) {
        console.error(err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchTasks = () => {
    const token = localStorage.getItem('token');
    fetch('https://tasko-l7bf.onrender.com/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  const handleDeleteRequest = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`https://tasko-l7bf.onrender.com/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowConfirm(false);
      setTaskToDelete(null);
      fetchTasks();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (!categoryFilter || task.category === categoryFilter) &&
      (!statusFilter || task.status === statusFilter)
  );

  const categories = [
    'Arts and Craft',
    'Nature',
    'Family',
    'Sport',
    'Friends',
    'Meditation',
  ];

  const statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Collaborative Task', value: 'collaborative_task' },
    { label: 'Done', value: 'done' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#040612] to-[#60E5AE] flex flex-col justify-center items-center">
        <svg className="animate-spin h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-white text-lg font-semibold">Loading your Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Top Background */}
      <div className="relative w-full h-[306px] bg-gradient-to-r from-[#040612] to-[#60E5AE] overflow-hidden">
        <img
          src="/login_img.png"
          alt="Top Illustration"
          className="absolute right-0 top-0 h-full object-cover hidden md:block"
        />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

        {/* Greeting */}
        {!showAddTask && (
          <div className="mt-20 md:mt-24 px-6 md:px-16">
            <h2 className="text-lg text-[#60E5AE]">Hi {user?.name || 'User'}</h2>
            <h3 className="text-2xl font-bold text-white">Welcome to Dashboard</h3>
          </div>
        )}
      </div>

      {/* Confirm Dialog Overlay */}
      {showConfirm && (
        <ConfirmDialog
          onClose={() => setShowConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Main Section */}
      {activeTab === 'task' && (
        <div className="flex justify-center px-[20px] md:px-[60px] w-full absolute top-[240px] left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-full max-w-[1320px] bg-white rounded-xl shadow-xl px-6 md:px-[60px] pt-[60px] pb-[60px] h-[calc(100vh-270px)] overflow-y-auto">
            {showAddTask ? (
              <AddTask
                onClose={() => setShowAddTask(false)}
                onTaskAdded={fetchTasks}
              />
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                  <h2 className="text-xl font-semibold text-black">All Task</h2>

                  <div className="flex flex-wrap gap-4 items-center relative z-10">
                    {/* Category Filter */}
                    <div className="relative">
                      <button
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center gap-2"
                      >
                        {categoryFilter || 'All Categories'}
                        {showCategoryDropdown ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {showCategoryDropdown && (
                        <div className="absolute mt-1 bg-white border rounded-md shadow-lg w-48 z-20">
                          {categories.map((cat) => (
                            <label
                              key={cat}
                              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-black hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                name="category"
                                value={cat}
                                checked={categoryFilter === cat}
                                onChange={() => {
                                  setCategoryFilter(cat);
                                  setShowCategoryDropdown(false);
                                }}

                              />
                              {cat}
                            </label>
                          ))}
                          <div
                            className="px-4 py-2 text-sm text-blue-600 cursor-pointer"
                            onClick={() => {
                              setCategoryFilter('');
                              setShowCategoryDropdown(false);
                            }}
                          >
                            Clear Filter
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                      <button
                        onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 flex items-center gap-2"
                      >
                        {statusFilter || 'All Status'}
                        {showStatusDropdown ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {showStatusDropdown && (
                        <div className="absolute mt-1 bg-white border rounded-md shadow-lg w-48 z-20">
                          {statuses.map((status) => (
                            <label
                              key={status.value}
                              className="flex items-center gap-2 px-4 py-2 cursor-pointer text-black hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                name="status"
                                value={status.value}
                                checked={statusFilter === status.value}
                                onChange={() => {
                                  setStatusFilter(status.value);
                                  setShowStatusDropdown(false);
                                }}

                              />
                              {status.label}
                            </label>
                          ))}
                          <div
                            className="px-4 py-2 text-sm text-blue-600 cursor-pointer"
                            onClick={() => {
                              setStatusFilter('');
                              setShowStatusDropdown(false);
                            }}

                          >
                            Clear Filter
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Add Task Button */}
                    <button
                      onClick={() => setShowAddTask(true)}
                      className="bg-[#60E5AE] hover:bg-[#4ed1a3] text-white font-semibold px-5 py-2 rounded-md"
                    >
                      Add New Task
                    </button>
                  </div>
                </div>

                {/* Task List */}
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col justify-center items-center text-center">
                    <img src="/empty_img.png" alt="No Tasks" className="w-60 md:w-72 mb-6" />
                    <p className="text-gray-500 font-medium">
                      No Task is Available yet, Please Add your New Task
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onTaskUpdate={fetchTasks}
                        onDeleteRequest={handleDeleteRequest}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
