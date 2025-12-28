

import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../asset/logo-design.jpg';

const ProductCard = ({ ad }) => {

  const imageUrl = ad.imageUrls?.[0]?.url || placeholder;


  return (
    <Link to={`/ad/${ad._id}`} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300">

      <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={ad.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold truncate">{ad.title}</h2>
        <p className="text-sm text-gray-600">{ad.location}</p>
        <p className="text-md font-bold text-green-700">
          ₹{new Intl.NumberFormat('en-IN').format(ad.price)}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(ad.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;