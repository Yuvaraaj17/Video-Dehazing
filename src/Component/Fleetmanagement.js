import React, { useState } from "react";
import Navbar from "../Navbar";
import Modal from "./Modal";

const Fleetmanagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModel, setShowModel] = useState(false);

  const vehicles = [
    {
      id: 1,
      name: "Vehicle - 1",
      registrationNumber: "TN-15-AB-1234",
      currentOwner: "Anna University",
      modelYear: 2014,
      driverName: "Ashok",
      imageSrc: "/schoolbus-1.jpg",
    },
    {
      id: 1,
      name: "Vehicle - 2",
      registrationNumber: "TN-15-AB-1234",
      currentOwner: "Anna University",
      modelYear: 2014,
      driverName: "Dinesh",
      imageSrc: "/schoolbus-2.jpg",
    },
    {
      id: 1,
      name: "Vehicle - 3",
      registrationNumber: "TN-15-AB-1234",
      currentOwner: "Anna University",
      modelYear: 2014,
      driverName: "Suresh",
      imageSrc: "/schoolbus-3.jpg",
    },
   
  ];

  const toggleMenu = () =>{
    setShowModel(!showModel);
  }


  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/img-5.jpg)",
        backgroundRepeat: `no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "73px",
      }}
    >
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="m-10 border-black rounded-md flex">
          <input
            className="h-10 flex-grow px-2 outline-none rounded-md"
            placeholder="Search by your car name.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-white bg-blue-500 px-4 py-2 rounded-md ml-1 h-10">
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-5">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="border-2 text-black bg-slate-300 p-4 rounded-lg font-serif font-medium"
          >
            <div className="flex justify-center">
              <img
                src={vehicle.imageSrc}
                alt={vehicle.name}
                className="w-32 h-32"
              />
            </div>
            <p className="text-center my-2">{vehicle.name}</p>
            <p>Registration Number : {vehicle.registrationNumber}</p>
            <p>Current Owner : {vehicle.currentOwner}</p>
            <p>Model Year : {vehicle.modelYear}</p>
            <p>Driver Name : {vehicle.driverName}</p>
            <div className="flex justify-center">
              <button 
              onClick={toggleMenu}
              className="border my-2 p-2 shadow-md hover:bg-orange-400 font-medium hover:text-black rounded-md">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModel && <Modal onClose={toggleMenu}/>}
    </div>
  );
};

export default Fleetmanagement;
