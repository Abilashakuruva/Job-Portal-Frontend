import { useState, useContext,useEffect } from "react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavbar } from "../context/NavbarContext"; 



const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setShowNavbar } = useNavbar();

  useEffect(() => {
    setShowNavbar(false); // Hide navbar on login page

    return () => setShowNavbar(true); // Show navbar when leaving login page
  }, [setShowNavbar]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting:", formData);
      const { data } = await login(formData);
      console.log("Response Data:", data);

      // Decode JWT after getting token
      const decodedToken = jwtDecode(data.token);
      console.log("Decoded Token:", decodedToken);

      authLogin(data.token);
      navigate("/");

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login error");
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-form">
        <h1>Already have an account?</h1>
        <p>Your personal job finder is here</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
          <button type="submit">Sign In</button>
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {/* Right Side - Image */}
      <div className="login-image">
        <img src="assets/1.png" alt="Person" />
      </div>
    </div>
  );
};

export default LoginForm;
