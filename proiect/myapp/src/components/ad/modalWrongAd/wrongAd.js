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
          <p>Buna! Anuntul dumneavoastra a fost depistat ca anunt de vanzare. Scopul acestui site este de a dona asa ca va rugam sa il respectati!</p>
          <div className="button" style={{float:"left",marginLeft:"90px"}}>
            <div className="translate"></div>
            <a href="#" onClick={props.handleClose}>Modifica postarea</a>
          </div>
          <div className="button" style={{float:"right",marginRight:"90px"}} >
            <div className="translate"></div>
            <a href="#" onClick={closePost}>Inchide pagina</a>
          </div>
        </section>
      </div>
    );
  };
export default withRouter(WrongAd);