import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import SpinPage from './pages/SpinPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/reset" element={<ResetPassword/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/spin" element={<SpinPage/>} />
        <Route path="/tasks/:id" element={<TaskDetails/>} />

        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
