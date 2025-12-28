
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [data, setData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    axios.get('/api/v1/users/profile', { withCredentials: true })
      .then(res => setData({ name: res.data.data.name, phone: res.data.data.phone }))
      .catch(() => setErr('Failed to load profile data.'))
      .finally(() => setLoading(false));
  }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.put('/api/v1/users/profile', data, { withCredentials: true });
      alert('Profile updated!');
    } catch {
      setErr('Failed to update.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
      {err && <p className="text-red-500 mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-4">
        {['name', 'phone'].map(f => (
          <div key={f}>
            <label>{f.charAt(0).toUpperCase() + f.slice(1)}:</label>
            <input name={f} value={data[f]} onChange={e => setData(d => ({ ...d, [f]: e.target.value }))}
              className="w-full p-2 border rounded" required />
          </div>
        ))}
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileSettings;
