import React from 'react';

const Footer = () => {
  return (

    <div className=" w-full bg-black">
      <div className=" bg-black w-full pointer-events-none absolute z-50 text-center text-[50px] sm:text-[100px] md:text-[200px] lg:text-[280px] xl:text-[300px] font-bold ">
      <span className="bg-gradient-to-b from-gray-500 via-gray-900 to-black bg-clip-text text-transparent ">Waitlist</span>

      </div>
    </div>
  );
};

export default Footer;
