import { useContext } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import UserInfo from "../components/UserInfo";
import './button.css';

const LoginPage = () => {
  const { loginUser,user } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
        {user?(
            
            <h1 className="text-center">You are on home page!</h1>
        ):(
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mt-3">Login </h1>
        <hr />
        <div className="text-center mt-5">
        <div>
        <label htmlFor="username">Username : </label>
        <input type="text" id="username" placeholder="Enter Username" required /><br/>
        </div>
        <div className="mt-4">
        <label htmlFor="password">Password : </label>
        <input type="password" id="password" placeholder="Enter Password" required /><br/>
        </div>
        <button className="mt-3" type="submit">Login</button>
        </div>
      </form>
      )}
    </section>
    
  );
};

export default LoginPage;