import React, { useEffect } from 'react'
import Singup from "../components/Singup/Singup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';



const SignupPage = () => {
const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      console.log("Authenticated");
      navigate("/");
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
     <Singup />
     <Footer />
    </div>
  );
};

export default SignupPage;
