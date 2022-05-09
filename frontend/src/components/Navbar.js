import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const {logoutAdmin} = useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome
          </Typography>
          {user ?(
          <>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Logout
          </button>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h5 className="modal-title text-dark" id="exampleModalLabel">Confirmation</h5>
       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div className="modal-body text-dark">
       Are you sure you want to logout
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      
        <button type="button" onClick={logoutUser} className="btn btn-danger">Logout</button>
     
       
     </div>
   </div>
 </div>
</div></>):(
            <>
              <Button onClick={()=>navigate('/adminlogin')} color="inherit">Admin</Button>
              <Button onClick={()=>navigate('/login')} color="inherit">User</Button>
              <Button onClick={()=>navigate('/register')} color="inherit">Register</Button>
            </>
          )}
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}
