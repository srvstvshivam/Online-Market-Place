

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCar, FaHome, FaMobileAlt,
  FaTshirt, FaLaptop, FaBook
} from 'react-icons/fa';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { filterDataContext } from '../App';

const categories = [
  { name: 'Cars', icon: <FaCar />, link: '/ads/cars' },
  { name: 'Property', icon: <FaHome />, link: '/ads/property' },
  { name: 'Mobiles', icon: <FaMobileAlt />, link: '/ads/mobiles' },
  { name: 'Fashion', icon: <FaTshirt />, link: '/ads/fashion' },
  { name: 'Electronics', icon: <FaLaptop />, link: '/ads/electronics' },
  { name: 'Books', icon: <FaBook />, link: '/ads/books' },
];

const Home = () => {
  const [featuredAds, setFeaturedAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {filterData} = useContext(filterDataContext)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get('/api/v1/ads/featured');
        setFeaturedAds(data.data);
      } catch {
        setError('Failed to fetch featured ads.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if(filterData.length !== 0){
    return(
      <>
      <h2 className="text-2xl font-semibold mb-4">Filtered Ads</h2>
      {
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterData.map(ad => <ProductCard key={ad._id} ad={ad} />)}
        </div>
      }
      </>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Browse Categories</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(c => (
          <Link key={c.name} to={c.link}
            className="flex flex-col items-center p-4 w-32 h-32 bg-white rounded-lg shadow hover:shadow-lg">
            <span className="text-4xl text-red-600">{c.icon}</span>
            <span className="mt-2 text-md font-medium">{c.name}</span>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Featured Ads</h2>
      {loading ? <p>Loading...</p> :
        error ? <p className="text-red-500">{error}</p> :
        featuredAds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredAds.map(ad => <ProductCard key={ad._id} ad={ad} />)}
          </div>
        ) : <p>No featured ads found.</p>
      }
    </div>
  );
};

export default Home;
