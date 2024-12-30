import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen overflow-auto bg-black" >
      {/* Router paths with private route for dashboard and navbar that appears everywhere */}
    <Router> 
      <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register/>} />
      <Route
        path="/"
        element={
          // Private Route for dashboard, will redirect to login if no token
          <PrivateRoute>
            <Dashboard /> 
          </PrivateRoute>
        }
      />
    </Routes>
    </Router>
    </div>
  );
}

export default App;