import { useState, useContext } from "react";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import  {jwtDecode}  from "jwt-decode"; 

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

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
      navigate("/dashboard")

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login error");
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
