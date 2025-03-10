import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/" style={{ fontSize:"large", padding:"12px"}}>JobStation</Link>
      {user ? (
        <>
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={logout}>Logout</button>
        
          
        </>
      ) : (
        <>
          
          
          <button style={{ color: "white", background: "transparent", border: "1px solid white", borderRadius: "5px",marginLeft: "65rem" }}>
            
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              Login
            </Link>
          </button>
          <button style={{ color: "#ff4d4d", background: "white", border: "1px solid #ff4d4d", borderRadius: "5px", marginLeft: "10px"}}>
            <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
              Register
            </Link>
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
