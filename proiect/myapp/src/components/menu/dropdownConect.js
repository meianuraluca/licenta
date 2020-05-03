import React from 'react';
import {Link} from 'react-router-dom'
import './menu.scss';

function DropdownConect(props) {
  return (
    <div id="myDropdown" className={`dropdown-content-${props.show}`}>
    <div><Link to={'/login'} className="dropdown-link"> Contectare</Link></div>
    <div><Link to={'/register'} className="dropdown-link">Creeaza cont</Link></div>
    <div><Link to={'/registerAssoc'} className="dropdown-link">Creeaza cont de asociație</Link></div>
  </div>
  );
}

export default DropdownConect;
