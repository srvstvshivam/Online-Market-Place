import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostAd = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    condition: 'Used',
    location: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const changeImages = e => {
    const files = Array.from(e.target.files);
    if (files.length > 5) return alert('Only up to 5 images.');
    setImages(files);
  };

  const submit = async e => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      images.forEach(img => fd.append('images', img));
      const { data } = await axios.post('/api/v1/ads/new', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      nav(`/ad/${data.data._id}`);
    } catch (err) {
      setError('Failed to post ad.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Post Your Ad</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={submit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1">Title:</label>
            <input name="title" value={form.title} onChange={handle}
              className="w-full p-2 border rounded" required />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description:</label>
            <textarea name="description" value={form.description} onChange={handle}
              className="w-full p-2 border rounded" required rows={4} />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block mb-1">Category:</label>
            <select name="category" value={form.category} onChange={handle}
              className="w-full p-2 border rounded" required>
              <option value="">-- Select Category --</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Mobiles</option>
              <option value="Furniture">Fashion</option>
              <option value="Vehicles">Cars</option>
              <option value="Clothing">Property</option>
              <option value="Books">Books</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price:</label>
            <input name="price" value={form.price} onChange={handle}
              className="w-full p-2 border rounded" required />
          </div>

          {/* Condition Dropdown */}
          <div>
            <label className="block mb-1">Condition:</label>
            <select name="condition" value={form.condition} onChange={handle}
              className="w-full p-2 border rounded" required>
              <option>New</option>
              <option>Used</option>
              <option>Like New</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">Location:</label>
            <input name="location" value={form.location} onChange={handle}
              className="w-full p-2 border rounded" required />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1">Upload Images:</label>
            <input type="file" onChange={changeImages} multiple accept="image/*"
              className="block mt-1 mb-2" />
            <small>{images.length} file(s) selected</small>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-600 text-white py-2 rounded">
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
