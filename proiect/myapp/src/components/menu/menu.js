import React from 'react';
import './menu.scss'
import { Link } from 'react-router-dom';
import Dropdown from './dropdown';

class Menu extends React.Component {
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleOutsiteClick = this.handleOutsiteClick.bind(this)
    this.state = {
      show:false
    };
  }

  handleClick(){
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
    render() {

      return(
       <div className="container">
          <Link to={'/home'} className="link">Acasa</Link>
          <Link to={'/about'} className="link">Despre noi</Link>
          <Link to={'/announces'} className="link">Anunturi</Link>
          <Link to={'/associations'}  className="link">Asociatii</Link>
          <Link to={'/contact'} className="link">Contact</Link>
          <Link to={'/addPost'} className="link">Doneaza</Link>
         <div className="dropdown" ref={node=>{this.node=node;}}>
            <Link onClick={this.handleClick}  className="link">Contul meu</Link>
            {this.state.show  && (<Dropdown nameClass={this.state.show}/>)}
        </div>
       </div>
      );
    }
  }

export default Menu;