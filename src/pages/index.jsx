import React from "react";
import Banner from "../components/home/Banner";
import Navbar from "../components/common/Navbar";
import Foods from "../components/FoodShowCase/Foods";
import AboutUs from "../components/About/AboutUs";
import Footer from "../components/Footer/Footer";


function index() {


  return (
    <>
      <Navbar />
      <Banner />
      <Foods />
      <AboutUs />
      <Footer />
    </>
  );
}

export default index;
