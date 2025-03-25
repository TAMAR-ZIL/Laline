import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-navbar">
      <div className="footer-links">
        <Link to="/contact">contact</Link>
        <Link to="/products">our products</Link>
      </div>
      <div className="footer-bottom">
        <h3>Stay pampered.</h3>
        <p>Sign up for updates and be the first to be pampered.</p>
        <div className="input-container">
          <button className='arrow '><span className="arrow-icon">&#8592;</span></button>
          <input type="text" placeholder="enter your email" className="input-field" />
        </div>
        <p className='agreement'>
          I hereby authorize the receipt of advertising materials and updates
          <br /> from Laline Candles and Soaps Ltd. in various media.
          <br /> I am aware that removal from receiving mailings will
          <br /> be done in accordance with the details in the regulations
          <br /> for viewing the regulations. <br />I authorize and agree
          <br /> to personal registration in Lalin's database 700008335.
          <br /> A person whose details will be registered in the database
          <br /> may contact Lalin's management and receive the details
          <br />registered about him and/or revoke his  consent to receive mailings.</p>
        <p>
          © 2025, Laline. פותח ב-♥️ ע״י </p>
      </div>
    </footer>
  );
};

export default Footer;