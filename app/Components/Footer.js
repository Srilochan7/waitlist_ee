import React from 'react';

const Footer = () => {
  return (
    <div className="py-[36%]  w-full h-[200px]  bg-black " aria-hidden="true">
      <div className=" bg-black w-full pointer-events-none absolute z-50 text-center sm:text-[10px] md:text-[20px] lg:text-[280px] xl:text-[300px] font-bold ">
        <span className="bg-gradient-to-b from-gray-500 via-gray-900 to-black bg-clip-text text-transparent">Waitlist</span>
      </div>
    </div>
  );
};

export default Footer;
