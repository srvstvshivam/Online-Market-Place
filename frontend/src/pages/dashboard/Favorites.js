import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const Favorites = () => {
    const [favoriteAds, setFavoriteAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            try {
               
                const response = await axios.get('http://localhost:3001/api/v1/user/favorites', {
                    withCredentials: true 
                });
                setFavoriteAds(response.data);
            } catch (err) {
                setError('Failed to fetch your favorite ads.');
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) return <p className="text-center p-4">Loading your favorites...</p>;
    if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Saved Ads</h1>
            {favoriteAds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteAds.map(ad => (
                        <ProductCard key={ad._id || ad.id} ad={ad} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">
                    <p>You haven't saved any ads yet.</p>
                    <Link to="/" className="text-red-600 hover:underline mt-2 inline-block">Explore Ads</Link>
                </div>
            )}
        </div>
    );
};

export default Favorites;