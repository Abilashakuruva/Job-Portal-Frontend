import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavbar } from "../context/NavbarContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { showNavbar } = useNavbar();
  
  if (!showNavbar) return null;

  return (
    <nav className="navbar">
      <Link to="/" style={{ fontSize:"large", padding:"12px"}}>JobStation</Link>
      {user ? (
        <>
        
        <button  style={{ fontSize:"large", padding:"12px",marginLeft: "65rem"}} onClick={logout}>Logout</button>
        <Link to="/dashboard" style={{ fontSize:"large",marginTop:"18px"}}>Dashboard</Link>
    
        <Link to="/profile" ><img src="assets/3.png" alt="Person" style={{backgroundColor:"#ff4d4d",borderRadius:"50%"}}/></Link>
        
          
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
