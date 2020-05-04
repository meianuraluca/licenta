import React from 'react';
import {Link} from 'react-router-dom'
import './menu.scss';

function DropdownProfileAssocitation() {
  function logout(){
      window.localStorage.clear('accessToken');
      window.localStorage.clear('typeUser');
  }
  return (
    <div className="dropdown-content">
    <div><Link to={'/profileAssociation'} className="dropdown-link">Profil</Link></div>
    <div><Link to={'/profileAssociation'} className="dropdown-link">Setari profil</Link></div>
    <div onClick={logout}><Link to={'/'} className="dropdown-link">Iesi din cont</Link></div>
  </div>
  );
}

export default DropdownProfileAssocitation;