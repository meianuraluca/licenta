import React from 'react';
import './home.css'
import {Slide} from 'react-slideshow-image';
import image1 from  '../../images/image1.jpg';
import image2 from  '../../images/image2.jpg';
import image3 from  '../../images/image3.jpg';
import image4 from  '../../images/image5.jpg';
import image5 from  '../../images/image6.jpg';

function Home(){
   
  const properties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    arrows: true,
    pauseOnHover: true
    }
  
  return (
    <div className="slide-container">
      <Slide {...properties}>
        <div className="each-slide">
          <img className="imagine" src={image1} alt="carusel1"></img>
        </div>
        <div className="each-slide">
          <img className="imagine" src={image2} alt="carusel2"></img>
        </div>
        <div className="each-slide">
          <img className="imagine" src={image3} alt="carusel3"></img>
        </div>
        <div className="each-slide">
          <img className="imagine" src={image4}alt="carusel4"></img>
        </div>
        <div className="each-slide">
          <img className="imagine" src={image5}alt="carusel5"></img>
        </div>
      </Slide>
    </div>
  )

}
export default Home;