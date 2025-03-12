import { useState, useContext, useEffect } from "react";
import { register } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNavbar } from "../context/NavbarContext";



const RegisterForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success Message State
  const { register: authRegister } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setShowNavbar } = useNavbar();

  useEffect(() => {
    setShowNavbar(false); // Hide navbar on login page

    return () => setShowNavbar(true); // Show navbar when leaving login page
  }, [setShowNavbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(formData);
      //authRegister(data.token);
      //navigate("/");
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Register failed:", error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-form">
        <h1>Create an account</h1>
        <p>Your personal job finder is here</p>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="text" placeholder="Mobile" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <div style={{display:"flex"}}>
          <input type="checkbox" />
          <p style= {{font:"small"}}>By creating an account,I agree to our terms of use and privacy policy</p></div>
          
          <button type="submit">Sign Up</button>
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </form>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
      <div className="login-image">
        <img src="assets/1.png" alt="Person" />
      </div>


    </div>

  )
}

export default RegisterForm
