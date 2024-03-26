import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const navigate = useNavigate();

  const handleDiscover = () =>{
    navigate("/Signdetect")
  }
  
  return (
    <div
      className="min-h-screen font-serif"
      style={{
        backgroundImage: "url(/car.jpg)",
        backgroundRepeat: `no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: `center`,
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col justify-center items-center m-2">
          <p className="text-xl text-white text-center">
            Empowering Safe Journeys: <br />
            Unveil the Future of Transportation <br />
            with Cutting-Edge Traffic Sign Detection Technology
          </p>
          <button 
          className="border mt-6 p-3 rounded-md font-semibold font-serif text-white hover:text-black hover:bg-opacity-50 hover:shadow-md hover:bg-orange-500 "
          onClick={handleDiscover}
          >
            Discover Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
