import React from 'react'
import './wrongAdd.scss'
import { withRouter } from 'react-router-dom';

function WrongAd(props) {
    const showHideClassname = props.show ? "wrong-ad display-block" : "wrong-ad display-none";
    function closePost(){
        props.history.push('/home')
    }
   
    return (
      <div className={showHideClassname}>
        <section className="wrong-ad-main">
          <p>Bună ziua! Anunțul dumneavoastră a fost depistat ca anunț de vanzare. Scopul acestei platforme este de a dona și vă rugăm să țineți cont de acest lucru!</p>
          <div className="button">
            <div className="translate"></div>
            <a href="#" onClick={props.handleClose}>Modifică postarea</a>
          </div>
          <div className="button" >
            <div className="translate"></div>
            <a href="#" onClick={closePost}>Inchide pagina</a>
          </div>
        </section>
      </div>
    );
  };
export default withRouter(WrongAd);