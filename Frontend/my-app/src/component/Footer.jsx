import React from 'react';
import line from '../assetss/image/line2.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section logo-section">
                <h1>
                        Service on Tab
                    </h1>
                    <p className="maintenance-text">Maintain and repair</p>
                    <p>
                        Stay updated with our latest home maintenance tips, service updates, and helpful articles on keeping your home running smoothly.
                    </p>
             
                </div>

               
                

                <div className="footer-section menu-section">
                    <h3>Menu</h3>
                    <ul>
                        <li>About Us</li>
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                        <li>Website Feedback</li>
                    </ul>
                </div>
                <div className="footer-section follow-section">
                    <h3>Services</h3>
                    <ul>
                        <li>Electrician</li>
                        <li>Plumber</li>
                        <li>Mechanic</li>
                    </ul>
                    </div>
                   

                <div className="footer-section follow-section">
                    <h3>Follow us</h3>
                    <p>GitHub</p>
                </div>

                <div className="footer-section subscribe-section">
                    <h3>Subscribe to Service on Tab Newsletter</h3>
                    <input type="email" placeholder="Email Goes here" />
                    <button>Send</button>
                </div>
            </div>

            <div className="footer-line">
                <img src={line} alt="divider" />
            </div>

            <div className="footer-bottom">
                <p>2024 "Service on Tab" All Rights Reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
