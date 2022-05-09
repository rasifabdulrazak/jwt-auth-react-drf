import * as React from 'react';
import { useState,useEffect,useContext,Fragment } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';
import {
  Paper,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';



export default function Register() {
 

 

  const initialValues = {username:"",email:"",password:"",confirmpassword:""};
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const { registerUser,user } = useContext(AuthContext);
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);  
  const {register,reset,trigger,handleSubmit,setError   ,formState:{errors}}=useForm();
  const navigate=useNavigate();

  // const registerUser = async (username,email, password, password2) => {
  //   const response =  axios.post("http://127.0.0.1:8000/api/register/", {
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


  const registerUser = async (username,email, password, password2) => {
    await axios({ method: "post", url: "http://127.0.0.1:8000/api/register/", data: {username:username,email:email,password:password,password2:password2} })
    .then((response) => {
         navigate("/login");
    })
    .catch((error) => {
         console.log(error.response.data);

         if (error.response.data.username) {
              setError("username", { type: "server", message: error.response.data.username });
         }
         if (error.response.data.email) {
              setError("email", { type: "server", message: error.response.data.email });
         }
         if (error.response.data.password) {
              setError("password", { type: "server", message: error.response.data.password[0] });
         }
         if (error.response.data.password2) {
              setError("password2", { type: "server", message: error.response.data.password2[0] });
         }
    });
  };



  const onSubmit=()=>{
    registerUser(username,email, password, password2);
    // navigate("/")
    // reset();
  }

  useEffect(()=>{
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
    }
  },[formErrors])

  return (
    <Box
    >
      <div className='text-center mt-5'><h1 style={{color: "grey"}}>Registration Form</h1></div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center mt-3'>
        <TextField
          {...register("username",{required:"username is required",minLength:{
            value:6,
            message:"Should contain 6 characters"
          }})}
     
          name='username'
          label="Username"
          placeholder='Enter username'
          onChange={e => setUsername(e.target.value)}
        />
        
      </div>
      <div className='text-center'>{errors.username && (<small className='text-center text-danger'>{errors.username.message}</small>)}</div>
      
      <div className='text-center mt-2'>
        <TextField
          {...register("email",{required:"email is required",pattern:{
            value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message:"Invalid mail id"
          }})}

          name='email'
          type="email"
          label="Email"
          placeholder='Enter Email'
          onChange={e => setEmail(e.target.value)}
        />
        </div>
        <div className='text-center'>{errors.email && (<small className='text-center text-danger'>{errors.email.message}</small>)}</div>
        <div className='text-center mt-2'>
        <TextField
          {...register("password",{required:"password is required",minLength:{
            value:8,
            message:"Please Enter atleast 8 charecters"
          },pattern:{
            value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            message:"Please Enter a strong password ,should contain letter charecter and number"
          }})}

          name='password'
          label="Password"
          type="password"
          placeholder='Enter Password'
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <div className='text-center'>{errors.password && (<small className='text-center text-danger'>{errors.password.message}</small>)}</div>
        <div className='text-center mt-2'>
        <TextField
          {...register("confirmpassword",{required:"confirmpassword is required"})}

          name='confirmpassword'
          label="Confirm Password"
          type="password"
          placeholder='Confirm Password'
          onChange={e => setPassword2(e.target.value)}
        />
      </div>
      <div className='text-center'><p className='text-danger'>{password2 !== password ? "Passwords do not match" : ""}</p></div>
      <div className='text-center'>{errors.confirmpassword && (<small className='text-center text-danger'>{errors.confirmpassword.message}</small>)}</div>
      <div className='text-center mt-2'><Button type='submit' variant="contained" startIcon ={<SaveIcon/>}>Register</Button></div>
      </form>
    </Box>
  );
}
