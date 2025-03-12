import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { NavbarProvider } from "./context/NavbarContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import JobDetails from "./pages/JobDetails";
import Dashboard from "./pages/Dashboard";
import './App.css'
import AddJob from "./pages/AddJob";

function App() {
  return (
    <AuthProvider>
      <NavbarProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-job" element={<AddJob/>} />
          

        </Routes>
        </NavbarProvider>

      
    </AuthProvider>
  );
}

export default App;
