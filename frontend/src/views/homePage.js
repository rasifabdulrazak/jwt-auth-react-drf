import { useContext } from "react";
import React from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import Admin from "./Admin";


const Home = () => {
  const { user } = useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <section className="text-center mt-5">
      {user?((<UserInfo user={user} />)):(
      <>
      <div>
        <p><h1>You are on home page</h1></p>
      </div>
      </>
      

      
      )}
      {/* <h1 className="text-center mt-5">You are on home page!</h1> */}
    </section>
  );
};

export default Home;