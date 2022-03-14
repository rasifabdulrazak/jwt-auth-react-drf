import React,{useContext,useState,useEffect} from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthContext";



function Admin() {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)

  const [users,setUsers] = useState([]); 
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/user/users/`)
    .then(res => {
     console.log(res.data)
     setUsers (res.data)
    })
  },[]);
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   axios.delete(`http://127.0.0.1:8000/user/users/${id}/`);
  //  navigate("/adminpanelcrud")

  // };
  const styles ={
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor:'red',
    };
  const stylesone ={
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor:'blue',
    };

  return (
    
    <div>
      <div className='text-center'>
      <table className='center' striped bordered hover>
  <thead>

    <tr>
      <th>No</th>
      <th>Username</th>
      <th>Email</th>
      <th>Edit</th>
      <th>Delete</th>
      <th><Link to="/adminpanelcrud/adduser"><button style={stylesone}>Add</button></Link></th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((value,index)=>
        <tr>
          <td>{index + 1}</td>
        <td>{value.username}</td>
        <td>{value.email}</td>
        <td><Link to={`/adminpanelcrud/edituser/${value.id}`}><button  style={stylesone}>Edit</button></Link></td>
        
        <td><button onClick={()=>{
            axios.delete(`http://127.0.0.1:8000/user/users/${value.id}/`).then(res =>{
              window.location.reload(false);
            })

        }} style={styles}>Delete</button></td>
      </tr>

      )
    }
   
  </tbody>
</table>
</div>
    </div>

  )
}

export default Admin