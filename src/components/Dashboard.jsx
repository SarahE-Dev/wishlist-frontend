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

  // On component mount, we check if the user is authenticated by checking the token
  useEffect(() => {
    const user = getUserFromToken(); // Try to get the user from the token
    if (!user) {
      return; // If there's no user, stop the effect early
    }
    // If a user is found, we dispatch the login action to store the user and token in Redux
    dispatch(login({ user , token: getToken()}));
  }, []);

  // Fetch wishlist items for user
  const fetchWishlist = async () => {
    try {
      // Pass the user ID in the query string 
      const response = await api.get(`/wishlist?user=${user.id}`);
      setWishlistItems(response.data); // Set the fetched wishlist items into state
    } catch (err) {
      setError('Failed to fetch wishlist items'); // Set error message if the fetch fails
      console.error(err); 
    } finally {
      setLoading(false); // Stop the loading spinner
      setTimeout(() => setError(null), 5000); // Clear the error message after 5 seconds
    }
  };

  
  useEffect(() => {
    if(user){
        fetchWishlist(); // Fetch the wishlist items only if user is set
    }
  }, [user]); 

  // Add a new item to the wishlist
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

  // Delete an item from the wishlist
  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      // Update state by filtering out the deleted item from the wishlistItems array
      setWishlistItems(wishlistItems.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  // Update an existing item in the wishlist
  const handleUpdateItem = async (id, updatedItem) => {
    try {
      const response = await api.put(`/wishlist/${id}`, {...updatedItem, user: user.id});
      // Update the state with the modified item by mapping over the wishlistItems array
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
          {error} {/* Display any error message */}
        </div>
      )}

      <WishlistForm onSubmit={handleAddItem} /> {/* Form to add new wishlist items */}

      {loading ? (
        <div className="text-white text-center py-8">Loading...</div> // Display loading state
      ) : (
        <div className="mt-8 space-y-4">
          {wishlistItems.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No items in your wishlist yet. Add some above! {/* Display if no items are found */}
            </p>
          ) : (
            wishlistItems.map(item => (
              <WishlistItem
                key={item._id} // Unique key for each item in the list
                item={item}
                onDelete={handleDeleteItem} // Pass delete handler to WishlistItem
                onUpdate={handleUpdateItem} // Pass update handler to WishlistItem
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
