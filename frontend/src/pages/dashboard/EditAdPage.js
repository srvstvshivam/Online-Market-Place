import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAdPage = () => {
  const { id } = useParams(); // ad ID from URL
  const navigate = useNavigate();

  const [adData, setAdData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
  });

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // Fetch ad details on mount
  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await axios.get(`/api/v1/ads/${id}`, {
          withCredentials: true,
        });

        const ad = data.data;
        setAdData({
          title: ad.title || '',
          description: ad.description || '',
          price: ad.price || '',
          category: ad.category || '',
          location: ad.location || '',
        });
      } catch (error) {
        console.error('Failed to fetch ad:', error);
        setErr('Unable to load ad. You may not have access.');
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/ads/${id}`, adData, {
        withCredentials: true,
      });
      alert('Ad updated successfully!');
      navigate('/dashboard/my-ads');
    } catch (error) {
      console.error('Update failed:', error.response?.data);
      setErr('Failed to update ad. Please try again.');
    }
  };

  if (loading) return <p className="text-center py-6">Loading ad data...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Ad</h2>

      {err && <p className="text-red-600 mb-4">{err}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            name="title"
            value={adData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={adData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price (₹)</label>
          <input
            name="price"
            type="number"
            value={adData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            name="category"
            value={adData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            name="location"
            value={adData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Ad
        </button>
      </form>
    </div>
  );
};

export default EditAdPage;
