import React from "react";
import Banner from "../components/home/Banner";
// import Navbar from "../components/common/Navbar";
import Foods from "../components/FoodShowCase/Foods";
import AboutUs from "../components/About/AboutUs";
import Footer from "../components/Footer/Footer";
import Combo from "../components/home/Combo";
import TakeawaySteps from "../components/home/TakeawaySteps";
import FAQ from "../components/home/FAQ";

function index() {
  return (
    <>
      <Banner />
      <Combo />
      <TakeawaySteps />
      <Foods />
      <FAQ />
      <AboutUs />
    </>
  );
}

export default index;
