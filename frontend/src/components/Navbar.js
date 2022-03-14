import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav>
      <div>
        <h1 className="text-center">JWT AUTHENTICATION</h1>
        <div>
          {user ? (
            <>
            <div className="text-center">
              <Link to="/">Home</Link><br/>
              <Link to="/protected">Protected Page</Link><br/>
            </div>
              <div className="text-center">
              <button onClick={logoutUser}>Logout</button>
              </div>
            </>
          ) : (
            <>
            <div className="text-cenetr" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <button onClick={()=>navigate('/login')}>Login</button>
            <button onClick={()=>navigate('/register')}>Regiter</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;