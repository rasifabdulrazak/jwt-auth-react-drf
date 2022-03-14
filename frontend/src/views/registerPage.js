import { useState, useContext } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import './button.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser,user } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username,email, password, password2);
  };

  return (
    <section>
        {user?(
            <h1 className="text-center mt-3">You are on home page!</h1>
        ):(
      <form onSubmit={handleSubmit}>
        <h1 className="text-center mt-3">Register</h1>
        <hr />
        <div className="text-center mt-3">
        <div>
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="username">Email : </label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="mt-3">
          <label htmlFor="confirm-password">Confirm Password : </label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        
        <button>Register</button>
        </div>
      </form>
      )}
    </section>
  );
}

export default Register;