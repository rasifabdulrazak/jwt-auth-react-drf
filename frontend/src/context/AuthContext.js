import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  // const loginUser = async (username, password) => {
  //   const response = await fetch("http://127.0.0.1:8000/api/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password
  //     })
  //   });
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     navigate("/");
  //   } else {
  //     alert("Invalid username and password");
  //   }
  // };
  

  // const registerUser = async (username,email, password, password2) => {
  //   const response = await fetch("http://127.0.0.1:8000/api/register/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //       password2
  //     })
  //   }).catch((err)=>{
  //     console.log(err.response.data.username);
  //   });
  //   if (response.status === 201) {
  //     navigate("/login");
  //   } else {
  //     alert("User name already exist!");
  //   }
  // };


//   axios({ method: "post", url: "http://127.0.0.1:8000/api/register/", data: {username:username,email:email,password:password,password2:password2} })
//   .then((response) => {
//        navigate("/login");
//   })
//   .catch((error) => {
//        console.log(error.response.data);
//        if (error.response.data.username) {
//             setError("username", { type: "server", message: error.response.data.username });
//        }
//        if (error.response.data.email) {
//             setError("email", { type: "server", message: error.response.data.email });
//        }
//        if (error.response.data.password) {
//             setError("password", { type: "server", message: error.response.data.password[0] });
//        }
//        if (error.response.data.password2) {
//             setError("password2", { type: "server", message: error.response.data.password2[0] });
//        }
//   });
// };




  // const addUser = async (username,email, password, password2) => {
  //   const response = await fetch("http://127.0.0.1:8000/api/register/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //       password2
  //     })
  //   });
  //   if (response.status === 201) {
  //     navigate("/");
  //   } else {
  //     alert("Something went wrong!");
  //     console.log(username,password,email)
  //   }
  // };

  const logoutAdmin = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload(false);
    navigate("/");
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload(false);
    navigate("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    logoutUser,

  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};