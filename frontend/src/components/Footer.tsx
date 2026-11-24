import React from 'react'

const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
    <div className="container flex justify-between mx-auto items-center">
      <span className="text-3xl text-white font-bold tracking-tight" >BookingNest</span>
      <span className="text-white flex gap-2 tracking-wide "> 
        <p className="hover:underline cursor-pointer">Privacy Policy</p>
        <p className="hover:underline cursor-pointer">Terms of Service</p>
      </span>
    </div>
    
    </div>
  )
}

export default Footer
