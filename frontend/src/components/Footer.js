import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Copyright from '@material-ui/icons/Copyright';
import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  var style = {
    backgroundColor: "grey",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}
  return (
    <div style={style}>
      <Button startIcon={<Copyright/>} variant="text" style={{color:'white'}} >All rights reserved by jwt authentication</Button>
    </div>
  );
}
