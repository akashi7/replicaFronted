import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Homenav } from '../Components/Homenavbar';
import me from '../images/me.JPG';
import insta from '../images/insta2.jpg';
import linkin from '../images/in.png';
import { Footer } from '../Components/Footer';



export const About = () => {

  const [state, setState] = useState({

  });

  const history = useHistory();

  return (
    <>
      <div className="boo">
        <Homenav />
        <div className="about_me">
          <h4 style={{ color: "blue" }}>About Replica</h4>
          <p>Simply Replica is a small web application that enables a User to ask or tell something to others </p>
          <p>As the name says it's a  small replica for popular web application that also do the same thing </p>
        </div>
        <div className="about_me">
          <h4 style={{ color: "blue" }}>About progress</h4>
          <p>I will be updating the application whenever i can by improving the design,functionality and adding new features </p>
        </div>
        <div className="about_me">
          <h4 style={{ color: "blue" }}>About developer</h4>
          <p>Akashi</p>
          <img src={me} className='default_pic' />
          <p style={{ color: 'gold' }}>Passionate developer eager for new challenges and hunting for his dreams
          follow me on
          </p>
          <a href="https://www.instagram.com/akashi__chris/"><img src={insta} className='default_pics' /></a>
          <a href="https://www.linkedin.com/in/nseko-christian-b505b7201/"><img src={linkin} className='default_picss' /></a>
        </div>
      </div>
      <Footer />
    </>
  );
};