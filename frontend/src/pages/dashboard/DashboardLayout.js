

import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FaUser, FaListAlt, FaHeart, FaSignOutAlt
} from 'react-icons/fa';
import axios from 'axios';

const items = [
  { to: 'profile', icon: <FaUser />, text: 'Profile Settings' },
  { to: 'my-ads', icon: <FaListAlt />, text: 'My Ads' },
  { to: '../favorites', icon: <FaHeart />, text: 'Favorites' }
];

const DashboardLayout = () => {
  const nav = useNavigate();
  const logout = async () => {
    await axios.get('/api/v1/users/logout', { withCredentials: true });
    nav('/login');
  };

  return (
    <div className="container mx-auto p-4 flex gap-6">
      <aside className="w-64 bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">My Account</h2>
        <nav className="flex flex-col gap-2">
          {items.map(o => (
            <NavLink key={o.to} to={o.to}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                }`}>
              {o.icon} {o.text}
            </NavLink>
          ))}
          <button onClick={logout} className="flex items-center gap-2 p-2 rounded hover:bg-red-100 w-full">
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
