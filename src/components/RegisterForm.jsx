import { useState, useContext } from "react";
import { register } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "", password: "" });
    const [successMessage, setSuccessMessage] = useState(""); // ✅ Success Message State
    const { register: authRegister } = useContext(AuthContext);
    const navigate = useNavigate();

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
      <div>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="text" placeholder="Mobile" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

            <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit">Create Account</button></form>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}


        
        </div>

    )
}

export default RegisterForm
