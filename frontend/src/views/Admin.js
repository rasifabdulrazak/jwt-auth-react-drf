import React ,{useContext,useState,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@mui/material/Button';

function Admin() {
  const[name,setName] = useState({});
  const [id,setId] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // const { addUser ,user} = useContext(AuthContext);
  const navigate = useNavigate();

  const [users,setUsers] = useState([]);
  let details ={
    username:username,
    email:email,
}


const onhandleSubmit = async e => {
  e.preventDefault();
  console.log(details)
  console.log(id)
  axios.put(`http://127.0.0.1:8000/user/users/${id}/`,details);
  window.location.reload(false);
 navigate("/")

};
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/user/users/`)
    .then(res => {
     setUsers (res.data)
    })
  },[]);
  const {register,reset,trigger,setError,handleSubmit,formState:{errors}}=useForm();


  const addUser = async (username,email, password, password2) => {
    await axios({ method: "post", url: "http://127.0.0.1:8000/api/register/", data: {username:username,email:email,password:password,password2:password2} })
    .then((response) => {
      window.location.reload(false);
         navigate("/");
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
    addUser(username,email, password, password2);
    
  }


  return (
      <table className="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
      <th scope="col"><button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Add User
</button>
<div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add user here</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
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
      <div className='text-center mt-2'><Button type='submit' variant="contained" startIcon ={<SaveIcon/>}>Save and Add</Button></div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div></th>
    </tr>
  </thead>
  <tbody>
    {users.map((value,index)=>
     <tr>
     <th scope="row">{index+1}</th>
     <td>{value.username}</td>
     <td>{value.email}</td>
     <td>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={()=>{
  setUsername(value.username)
  setEmail(value.email)
  setId(value.id)

}}>
 Edit
</button>
<div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h5 className="modal-title" id="exampleModalLabel">Edit user here</h5>
       <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div className="modal-body">
       <form onSubmit={onhandleSubmit}>
     <div className="form-floating mb-3">
  <input 
    value={username}
    type="text" 
    className="form-control"
    onChange={e => setUsername(e.target.value)}
    id="floatingInput" 
    placeholder="name@example.com"/>
  <label for="floatingInput">Username</label>
  <div className='text-center'>{errors.username && (<small className='text-center text-danger'>{errors.username.message}</small>)}</div>
</div>

<div className="form-floating">
  <input 
    value={email}
    className="form-control" 
    onChange={e => setEmail(e.target.value)}
    id="floatingPassword" 
    placeholder="Enter Email"/>
  <label for="floatingPassword">Email</label>
  <div className='text-center'>{errors.email && (<small className='text-center text-danger'>{errors.email.message}</small>)}</div>
</div>
<button type="submit" className="btn btn-success mt-3">Save</button>
</form>
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
     </div>
   </div>
 </div>
</div></td>
     <td><button type="button" className="btn btn-danger" onClick={()=>{
        setUsername(value.username)
         setId(value.id)
     }} data-bs-toggle="modal" data-bs-target="#exampleModal3">
 Delete
</button>
<div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div className="modal-dialog">
   <div className="modal-content">
     <div className="modal-header">
       <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
     </div>
     <div className="modal-body">
       Are you sure you want to delete <p className='text-bold'>{username}</p>
     </div>
     <div className="modal-footer">
       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       <button type="button" onClick={()=>{
         console.log(value.id)
         axios.delete(`http://127.0.0.1:8000/user/users/${id}/`).then(res=>{
          window.location.reload(false);
          navigate("/")
         })
       }} className="btn btn-danger">Delete</button>
     </div>
   </div>
 </div>
</div></td>
   </tr>
    )}
   
  </tbody>
</table>
    
  )
}

export default Admin