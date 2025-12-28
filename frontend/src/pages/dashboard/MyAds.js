


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import placeholderImage from '../../asset/logo-design.jpg';


const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    const fetchMyAds = async () => {
      setLoading(true);
      try {

        const { data } = await axios.get('/api/v1/ads/my-ads', { withCredentials: true });
        setAds(data.data);
      } catch (error) {
        setErr('Failed to fetch your ads. Please try again later.');
        console.error("Fetch MyAds Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAds();
  }, []);

  const handleDelete = async (adId) => {
    if (!window.confirm('Are you sure you want to permanently delete this ad?')) {
      return;
    }
    try {

      await axios.delete(`/api/v1/ads/${adId}`, { withCredentials: true });

      setAds(currentAds => currentAds.filter(ad => ad._id !== adId));
    } catch (error) {
      alert('Failed to delete ad.');
      console.error("Delete Ad Error:", error);
    }
  };

  if (loading) return <p className="text-center p-4">Loading your ads...</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Ads</h1>
        <Link to="/post-ad" className="bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors text-sm">
          Post New Ad
        </Link>
      </div>

      {err && <p className="text-red-500 text-center py-4">{err}</p>}

      <div className="space-y-4">
        {ads.length > 0 ? ads.map(ad => {
          const imageUrl = ad.imageUrls?.[0]?.url || placeholderImage;

          return (
            <div key={ad._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
              <Link to={`/ad/${ad._id}`}>
                <img
                  src={imageUrl}
                  alt={ad.title}
                  className="w-full sm:w-32 h-24 object-cover rounded-md"
                />
              </Link>
              <div className="flex-grow">
                <Link to={`/ad/${ad._id}`} className="font-semibold text-lg hover:text-red-600 transition-colors">{ad.title}</Link>
                <p className="text-gray-700 font-bold">₹{ad.price.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-500">
                  Status: <span className={`font-medium ${ad.isActive ? 'text-green-600' : 'text-yellow-600'}`}>{ad.isActive ? 'Active' : 'Pending'}</span>
                </p>
              </div>
              <div className="flex gap-2 self-center">
                <Link to={`/dashboard/edit-ad/${ad._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700">Edit</Link>
                <button onClick={() => handleDelete(ad._id)} className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700">Delete</button>
              </div>
            </div>
          );
        }) : (
          !loading && <p className="text-center text-gray-500 py-8">You have not posted any ads yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAds;