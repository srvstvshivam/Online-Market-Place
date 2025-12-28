


import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/users/login', form, { withCredentials: true });
      setUser(data.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <section className="mx-auto container p-4 max-w-md">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={form.email} onChange={handle}
              className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label>Password:</label>
            <div className="flex items-center border rounded">
              <input type={show ? 'text' : 'password'} name="password"
                value={form.password} onChange={handle}
                className="w-full p-2 rounded-l" required />
              <div className="p-2 cursor-pointer" onClick={() => setShow(s => !s)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/sign-up" className="text-red-600 hover:underline">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
