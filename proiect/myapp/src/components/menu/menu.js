import React from 'react';
import './menu.scss'
import { Link } from 'react-router-dom';
import DropdownConect from './dropdownConect';
import DropdownProfile from './dropdownProfile';
import DropdownProfileAssocitation from './dropdownProfileAssociation';

class Menu extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dropdown: <DropdownConect/>,
    }
  }
  componentDidMount(){
    if (localStorage.getItem('typeUser') !== null) {
      if(localStorage.getItem('typeUser') === "user")
        this.setState({dropdown: <DropdownProfile/>})
      else
        this.setState({dropdown: <DropdownProfileAssocitation/>})
    }
    else{
      this.setState({dropdown: <DropdownConect/>})
    }
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
            <Link  to={'/login'} className="link">Cont</Link>
            {this.state.dropdown}
        </div>
       </div>
      );
    }
  }

export default Menu;