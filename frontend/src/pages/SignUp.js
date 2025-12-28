

import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [show, setShow] = useState({ pwd: false, cpwd: false });
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    const { password, confirmPassword } = form;
    if (password !== confirmPassword) return setError('Passwords do not match');
    try {
      const { data } = await axios.post('api/v1/users/signup', form, { withCredentials: true });
      setUser(data.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <section className="mx-auto container p-4 max-w-md">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          {['name', 'email', 'phone'].map(field => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input name={field} value={form[field]} onChange={handle}
                className="w-full p-2 border rounded" required />
            </div>
          ))}
          {['password', 'confirmPassword'].map((field, idx) => (
            <div key={field}>
              <label>{field === 'password' ? 'Password:' : 'Confirm Password:'}</label>
              <div className="flex items-center border rounded">
                <input type={show[idx] ? 'text' : 'password'} name={field}
                  value={form[field]} onChange={handle}
                  className="w-full p-2 rounded-l" required />
                <div className="p-2 cursor-pointer" onClick={() => setShow(s => ({ ...s, [idx ? 'cpwd' : 'pwd']: !s[idx ? 'cpwd' : 'pwd'] }))}>
                  {show[idx] ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          ))}
          <button type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
