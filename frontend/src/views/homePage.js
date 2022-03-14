import { useContext } from "react";
import React from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import Admin from "./Admin";


const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <section className="text-center mt-5">
      {user?(user.is_superuser?(<Admin></Admin>):(<UserInfo user={user} />)):(<h1 className="text-center mt-5">You are on home page!</h1>)}
      {/* <h1 className="text-center mt-5">You are on home page!</h1> */}
    </section>
  );
};

export default Home;