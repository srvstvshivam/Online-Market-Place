

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ status: '', text: '' });

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/users/forgot-password', { email });
      setMsg({ status: 'success', text: 'Check your inbox for a reset link.' });
    } catch {
      setMsg({ status: 'error', text: 'Failed to send reset link.' });
    }
  };

  return (
    <section className="mx-auto container p-4 max-w-sm">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        {msg.text && <p className={`text-center mb-4 ${msg.status === 'error' ? 'text-red-500' : 'text-green-600'}`}>{msg.text}</p>}
        <form onSubmit={submit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded" required />
          </div>
          <button type="submit"
            className="mt-4 w-full bg-red-600 text-white py-2 rounded">
            Send Reset Link
          </button>
        </form>
        <p className="mt-4 text-center">
          Remembered? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
