# Wishlist Tracker - Frontend

Welcome to the **Wishlist Tracker** frontend! This is a modern web app built with **React**, **Vite**, and **TailwindCSS**. It allows users to manage and track their personal wishlists, keeping everything organized in one place.

## 🚀 Features

- **User Authentication**: Sign up, log in, and securely manage your account.
- **Wishlist Creation**: Users can create, edit, and delete wishlists.
- **Item Management**: Add items to your wishlists with descriptions, priorities, and due dates.
- **Responsive Design**: A mobile-first, responsive design built with **TailwindCSS**.
- **React Router**: Seamlessly navigate between login, signup, and wishlist management pages.

## 🛠️ Tech Stack

- **Frontend Framework**: React (v18+)
- **Build Tool**: Vite
- **CSS Framework**: TailwindCSS
- **Routing**: React Router
- **State Management**: Redux Toolkit (for user authentication)
- **Authentication**: JWT (JSON Web Token)

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SarahE-Dev/wishlist-frontend.git
cd wishlist-tracker-frontend
2. Install Dependencies
bash
Copy code
npm install
3. Environment Variables
Create a .env file in the root directory and add the following:

bash
Copy code
VITE_API_URL=http://localhost:5000/api
4. Run the Development Server
bash
Copy code
npm run dev
This will start the development server and you can access the app at http://localhost:5173.

5. Build the App for Production
bash
Copy code
npm run build
📂 Project Structure
src/: Contains all the source code for the app
components/: Reusable UI components
features/: Redux slices for managing the application state
assets/: Images, icons, and static assets
📄 API Documentation
This frontend is designed to work with the backend API. Please refer to the Backend README for details on setting up and using the API.