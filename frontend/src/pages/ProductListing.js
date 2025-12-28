
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ProductListing = () => {
  const { category } = useParams();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`/api/v1/ads?category=${category}`);
        setAds(data.data);
      } catch {
        setError('Failed to load ads.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Ads</h1>
      {loading ? <p>Loading...</p> :
        error ? <p className="text-red-500">{error}</p> :
        ads.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ads.map(ad => <ProductCard key={ad._id} ad={ad} />)}
          </div>
        ) : <p>No ads found in this category.</p>
      }
    </div>
  );
};

export default ProductListing;
