import React from 'react';
import logo from '../assets/NavLogo.png';

const Footer = () => {
  return (
    <footer style={{backgroundColor: 'transparent', padding: '20px', textAlign: 'center', position: 'fixed', bottom: '0', width: '100%'}}>
      <img src={logo} alt="Logo" style={{width: '100px', height: 'auto'}}/>
      <p style={{marginTop: '10px'}}>&copy; {new Date().getFullYear()} @Soummyaanon. All rights reserved.</p>
    </footer>
  );
}

export default Footer;