import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignDetect = () =>{
    navigate('/Signdetect');
  }

  const handleFleet = () =>{
    navigate('/fleet');
  }

  const handleHome = () =>{
    navigate('/')
  }

  return (
    <div className="flex justify-between p-4 bg-slate-200 rounded-lg bg-opacity-40 fixed top-0 left-0 right-0">
      <div className="font-artifika font-pacifico text-3xl">fleetPro</div>
      <div className="flex px-3">
        {location.pathname === '/' || location.pathname === '/home' ? (
          <>
            <p
              onClick={handleSignDetect}
              className="text-black font-semibold cursor-pointer font-serif hover:bg-opacity-50 hover:bg-black hover:shadow-md hover:text-white rounded-md transition-all duration-300 ease-in-out px-4 py-2 text-lg"
            >
              Signdetect
            </p>
            <p
              onClick={handleFleet}
              className="text-black font-semibold font-serif cursor-pointer hover:bg-opacity-50 hover:bg-black hover:text-white hover:shadow-md rounded-md px-4 py-2 text-lg"
            >
              Fleet
            </p>
          </>
        ) : (
          <p
            onClick={handleHome}
            className="text-white cursor-pointer font-semibold font-serif hover:bg-opacity-50 hover:bg-black hover:shadow-md hover:text-white rounded-md transition-all duration-300 ease-in-out px-4 py-2 text-lg"
          >
            Home
          </p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
