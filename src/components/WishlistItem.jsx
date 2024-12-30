// src/components/WishlistItem.jsx
import { useState } from 'react';

const WishlistItem = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description,
    priority: item.priority
  });

  const priorityColors = {
    1: 'bg-green-500',
    2: 'bg-yellow-500',
    3: 'bg-red-500'
  };

  const priorityLabels = {
    1: 'Low',
    2: 'Medium',
    3: 'High'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(item._id, editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              rows="3"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Priority
            </label>
            <select
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: Number(e.target.value) })}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-white">{item.title}</h3>
          <p className="mt-1 text-gray-300">{item.description}</p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[item.priority]} text-white mt-2`}>
            {priorityLabels[item.priority]} Priority
          </span>
        </div>
        <div className="ml-4 flex-shrink-0 space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-indigo-400 hover:text-indigo-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
