// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import WishlistForm from '../components/WishlistForm';
import WishlistItem from '../components/WishlistItem';
import api from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUserFromToken } from '../utils/auth';
import { login } from '../features/userSlice';

const Dashboard = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user  = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    const user = getUserFromToken();
    if (!user) {
      return;
    }
    dispatch(login({ user , token: getToken()}));
  }, []);

  // Fetch wishlist items
  const fetchWishlist = async () => {
    try {
      const response = await api.get(`/wishlist?user=${user.id}`);
      setWishlistItems(response.data);
    } catch (err) {
      setError('Failed to fetch wishlist items');
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => setError(null), 5000);
    }
  };

  useEffect(() => {
    if(user){
        fetchWishlist();
    }
    
  }, [user]);

  // Add new item
  const handleAddItem = async (newItem) => {
    try {
      const response = await api.post('/wishlist', {...newItem, user: user.id});
      setWishlistItems([...wishlistItems, response.data.wishlistItem]);
    } catch (err) {
      setError('Failed to add item');
      console.error(err);
    } finally {
        setTimeout(() => setError(null), 5000);
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      setWishlistItems(wishlistItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  // Update item
  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const response = await api.put(`/wishlist/${id}`, {...updatedItem, user: user.id});
      setWishlistItems(wishlistItems.map(item => 
        item._id === id ? response.data.wishlistItem : item
      ));
    } catch (err) {
      setError('Failed to update item');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Wishlist</h1>
      
      {error && (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <WishlistForm onSubmit={handleAddItem} />

      {loading ? (
        <div className="text-white text-center py-8">Loading...</div>
      ) : (
        <div className="mt-8 space-y-4">
          {wishlistItems.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No items in your wishlist yet. Add some above!
            </p>
          ) : (
            wishlistItems.map(item => (
              <WishlistItem
                key={item._id}
                item={item}
                onDelete={handleDeleteItem}
                onUpdate={handleUpdateItem}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;


