import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import Admin from "./views/Admin";
import AddUser from "./views/AddUser";
import EditUser from "./views/EditUser";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          
          
          <Routes>
            <Route element={<ProtectedPage/>} path="/protected" exact />
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Home/>} path="/" />
            <Route element={<Admin/>} path="/adminpanelcrud" />
            <Route element={<AddUser/>} path="/adminpanelcrud/adduser" />
            <Route element={<EditUser/>} path="/adminpanelcrud/edituser/:id" />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;