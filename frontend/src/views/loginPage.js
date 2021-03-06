import * as React from 'react';
import { useContext,useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AuthContext from '../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const {register,reset,trigger,setError,handleSubmit,formState:{errors}}=useForm();
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [err,setErr] = useState();
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

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
     
      
      
    } else {
      setErr("Invalid username and password");
    }
  };


  // const loginUser = async (username, password) => {
  //   await axios({ method: "post", url: "http://127.0.0.1:8000/api/token/", data: {username:username,password:password} })
  //   .then((response) => {
      
  //     if (response.status === 200) {
  //       setAuthTokens(data);
  //       setUser(jwt_decode(data.access));
  //       localStorage.setItem("authTokens", JSON.stringify(data));
  //       navigate("/");
        
  //   })
  //   .catch((error) => {
  //        console.log(error.response.data);

  //        if (error.response.data.username) {
  //             setError("username", { type: "server", message: error.response.data.username });
  //        }
  //        if (error.response.data.password) {
  //             setError("password", { type: "server", message: error.response.data.password[0] });
  //        }
  //   });
  // };


  const onSubmit = e => {
   loginUser(username, password);
  
  };


  return (
    <Box
    >
      <div className='text-center mt-5'><h1 style={{color: "grey"}}>User Login Here</h1></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='text-center'>{err?(<p style={{color:"red"}}>{err}</p>):(null)}</div>
      <div className='text-center mt-3'>
        <TextField
          {...register("username",{required:"username is required",minLength:{
            value:5,
            message:"Should contain 5 characters"
          }})}
          id="username"
          label="Username"
          placeholder='Enter username'
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className='text-center'>{errors.username && (<small className='text-center text-danger'>{errors.username.message}</small>)}</div>
      <div className='text-center mt-2'>
        <TextField
          {...register("password",{required:"password is required",minLength:{
            value:8,
            message:"Please Enter atleast 8 charecters"
          },pattern:{
            value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:"Please Enter a strong password ,should contain letter charecter and number"
          }})}
          id="password"
          label="Password"
          type="password"
          placeholder='Enter Password'
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <div className='text-center'>{errors.password && (<small className='text-center text-danger'>{errors.password.message}</small>)}</div>
      <div className='text-center mt-2'><Button type='submit' variant="contained" startIcon ={<LockOpenIcon/>}>Login</Button></div>
      </form>
    </Box>
  );
}
