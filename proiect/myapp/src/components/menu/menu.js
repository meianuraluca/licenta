import React from 'react';
import './menu.scss'
import {FiMenu} from 'react-icons/fi'
import {MdClose} from 'react-icons/md'
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';

class Menu extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleOutsiteClick = this.handleOutsiteClick.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.state = {
      show:false,
      height: 0
    };
  }

  handleClick=()=>{
    if(!this.state.show){
      document.addEventListener('click',this.handleOutsiteClick,false)
    }else{
    document.removeEventListener('click',this.handleOutsiteClick,false);
    }
    this.setState(prevState=>({
      show:!prevState.show
    }))
  }

  handleOutsiteClick=(e)=>{
    if(this.node.contains(e.target)){
      return
    }
    this.handleClick()
  }

  openDropdown = ()=>{
    this.setState({height:100})
  }
  closeDropdown = ()=>{
      this.setState({height:0})
    
  }
    render() {

      return(
      <React.Fragment>
        <FiMenu className={`icon-dropdown-${this.state.height}`} onClick={this.openDropdown}></FiMenu>
       <div className={`overlay-${this.state.height}`}>
       <MdClose onClick={this.closeDropdown} className="close-dropdown"></MdClose>
          <div className="container">
          <Link to={'/home'} onClick={this.closeDropdown} className="link">Acasa</Link>
          <Link to={'/about'} onClick={this.closeDropdown} className="link">Despre noi</Link>
          <Link to={'/announces'} onClick={this.closeDropdown} className="link">Anunturi</Link>
          <Link to={'/associations'} onClick={this.closeDropdown}  className="link">Asociatii</Link>
          <Link to={'/contact'} onClick={this.closeDropdown} className="link">Contact</Link>
          <Link to={'/addPost'} onClick={this.closeDropdown} className="link">Doneaza</Link>
         <div onClick={this.handleClick} className="dropdown" ref={node=>{this.node=node;}}>
            <a  className="sub-link">Contul meu</a>
            {this.state.show  && (<Dropdown  closeDropdown={this.closeDropdown} nameClass={this.state.show}/>)}
        </div>
        </div>
       </div>
       </React.Fragment>
      );
    }
  }

export default Menu;