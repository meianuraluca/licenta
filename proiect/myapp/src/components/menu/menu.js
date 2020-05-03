import React from 'react';
import './menu.scss'
import { Link } from 'react-router-dom';
import DropdownConect from './dropdownConect';
import DropdownProfile from './dropdownProfile';

class Menu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      accessToken: '',
      show:false

    }
  }
  componentDidMount(){
    if (localStorage.getItem('accessToken') !== null) {
      let access = window.localStorage.getItem('accessToken');
      access = this.getClaims(access);
      let result = access.identity;
      this.setState({accessToken: result})
    }
  }
  getClaims = accessToken => {
      if (!accessToken) return {};
      const base64Url = accessToken.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    };
    showDropdown = ()=>{
      if(this.state.show === true)
        this.setState({show:false})
      else
        this.setState({show:true})
    }
    render() {
      return(
       <div className="container">
          <Link to={'/home'} className="link">Acasa</Link>
          <Link to={'/about'} className="link">Despre noi</Link>
          <Link to={'/announces'} className="link">Anunturi</Link>
          <Link to={'/associations'}  className="link">Asociatii</Link>
          <Link to={'/contact'} className="link">Contact</Link>
          <Link to={'/addPost'} className="link">Doneaza</Link>
          <div className="dropdown">
            <Link onclick={this.showDropdown} className="link">Cont</Link>
            <DropdownConect show={this.state.show}></DropdownConect>
            {/* <button onclick="myFunction()" className="dropbtn">Dropdown</button> */}
 
          </div>
         {/* <div className="dropdown">
            <Link  to={'/login'} className="link">Cont</Link>
            {this.state.accessToken === '' ? <DropdownConect/> : <DropdownProfile/>}
        </div> */}
       </div>
      );
    }
  }

export default Menu;