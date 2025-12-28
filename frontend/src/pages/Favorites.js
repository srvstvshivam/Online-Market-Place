

import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { UserContext } from '../context/UserContext';

const Favorites = () => {
  const { user } = useContext(UserContext);
  const savedAds = user?.favorites || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Saved Products</h1>
      {savedAds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedAds.map(ad => (
            <ProductCard key={ad._id || ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You have no saved products.</p>
      )}
    </div>
  );
};

export default Favorites;
