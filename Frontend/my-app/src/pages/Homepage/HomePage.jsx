import React from 'react';
import decore from '../../assetss/image/Rectangle 1.png';
import mainpic from '../../assetss/image/main.png';
import electrtion from '../../assetss/image/Electrtion.png';
import plumber from '../../assetss/image/plumber.png';
import mechnic from '../../assetss/image/mechnic.png';
import Whycustomer from '../../assetss/image/whycutomerchooseus.png';
import welcomepic1 from '../../assetss/image/welcomepic1.png';
import welcomepic2 from '../../assetss/image/ewelcomepic2.png';
import line from '../../assetss/image/line2.png';
import Headeruser from '../../component/Headeruser.jsx';   
import Footer from '../../component/Footer.jsx';   
import './HomePage.css';

function HomePage() {
    return (
        <div>
            <Headeruser />
            
            {/* main contanier */}
            <div className="service-container">
                <div className="text-section">
                    <h1 className="main-heading">Simplify Your Life with Our Professional Home Service</h1>
                    <p className="sub-heading">Bringing ease, comfort, and quality service right to your</p>
                    <p className="highlight-text"> doorstep.We offer homeservices designed to maximize</p>
                    <p className="highlight-text">efficiency,minimizing time, energy and cost</p>
                    
                   
                </div>
                
                <div className="image-section">
                    <img src={decore} alt="Background Design" className="background-decore" />
                    <img src={mainpic} alt="Handyman with tools" className="main-pic" />
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section" id="ourservices"> 
                <h2 className="services-heading">Our Services</h2>
                <img src={line} alt="Line Design" className="line-image" /> 
                <div className="services-boxes">
                    <div className="service-box">
                        <img src={plumber} alt="Plumber" className="service-image" />
                        <p className="service-text">Plumber</p>
                    </div>
                    <div className="service-box">
                        <img src={electrtion} alt="Electrician" className="service-image" />
                        <p className="service-text">Electrician</p>
                    </div>
                    <div className="service-box">
                        <img src={mechnic} alt="Mechanic" className="service-image" />
                        <p className="service-text">Mechanic</p>
                    </div>
                </div>
            </div>

            {/* why choose us */}
            <div className="quote-section">
      <div className="quote-contents">
        <div className="texts">
          <div className="frame">
            <div className="why-our-customers">
              Why our customers
              <br />
              choose us?
            </div>
          </div>
          <p className="text-wrapper">
            Service on Tab is your go-to platform for home services, offering reliable and skilled Electricians,
            Plumbers, and Mechanics across Pakistan. Choosing Service on Tab means selecting trust, expertise, and a
            seamless customer experience. With our commitment to quality and efficiency, your home is in the best hands.
          </p>
        </div>
      </div>
      <div className="image" />
    </div>


            {/* about  */}
    <div className="about-section">
      <div className="images">
        <div className="overlap-group">
          <img className="image" alt="Image" src={welcomepic1} />
          <img className="img" alt="Image" src={welcomepic2} />
        </div>
      </div>
      <div className="overlap">
        <div className="about-contents">
          <div className="texts">
            <div className="frame">
              <div className="div-wrapper">
                <p className="text-wrapper">
                  In a few easy clicks, you can use the Service on Tab to Urgent Booking and Get offers option the
                  Cheapest and most Reliable Professionals and get all of your work done anywhere
                </p>
              </div>
            </div>
            <div className="point">
              <div className="div">
                <div className="frame-2">
                  <div className="frame-3">
                    <div className="text-wrapper-2">Police Verified Experts</div>
                  </div>
                </div>
                <div className="frame-2">
                  <div className="text-wrapper-3">Verified Professionals</div>
                </div>
                <div className="frame-4">
                  <div className="text-wrapper-4">Quick Booking Process</div>
                </div>
              </div>
              <div className="frame-5">
                <div className="frame-2">
                  <div className="text-wrapper-5">User Friendly</div>
                </div>
                <div className="frame-6">
                  <div className="text-wrapper-6">Best Quality</div>
                </div>
                <div className="frame-2">
                  <div className="text-wrapper-6">Affordable Prices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="welcome-to-service">
          Welcome to Service on <br />
          Tab – Your Trusted Home
          <br /> Services Provider!
        </p>
      </div>
    </div>
  


            <Footer />
        </div>
    );
}

export default HomePage;
