
import React from 'react';
import logo from '../asset/logo-design.jpg';  

const Logo = ({ w, h }) => {
  return (
    <img
      src={logo}
      alt="Logo"
      width={w}
      height={h}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;

