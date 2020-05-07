import React from 'react';
import {Link} from 'react-router-dom'
import './menu.scss';

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state={
      typeUser:''
    }
  }
  componentDidMount(){
      console.log("intru aici")
      console.log(localStorage.getItem('typeUser'))
      if (localStorage.getItem('typeUser') !== null) {
        if(localStorage.getItem('typeUser') === "user"){
          this.setState({typeUser:'user'})
        }
        else
          this.setState({typeUser: 'association'})
      }
      else{
        this.setState({typeUser:''})
      }

  }

  logout=()=>{
    window.localStorage.clear('accessToken');
    window.localStorage.clear('typeUser');
  }  

  editProfile=()=>{
    window.localStorage.setItem('firstTime','true')
  }

  render(){
    console.log(this.state)
    return (
      <div className={`dropdown-content-${this.props.nameClass}`}>
        {this.state.typeUser === '' 
        ? <div>
              <div><Link to={'/login'} className="dropdown-link"> Contectare</Link></div>
              <div><Link to={'/register'} className="dropdown-link">Creeaza cont</Link></div>
              <div><Link to={'/registerAssoc'} className="dropdown-link">Creeaza cont de asociație</Link></div>
        </div>
        : this.state.typeUser === 'user' 
        ?  <div>    
              <div><Link to={'/'} className="dropdown-link">Profil</Link></div>
              <div><Link to={'/listUserAnnounces'} className="dropdown-link">Anunturile tale</Link></div>
              <div onClick={this.logout}><Link to={'/'} className="dropdown-link">Iesi din cont</Link></div>
            </div>
        :<div>
            <div><Link to={'/profileAssociation'} className="dropdown-link">Profil</Link></div>
            <div onClick={this.editProfile}><Link to={{
                                                  pathname:'/profileAssociation',
                                                  aboutProps:{show:true}}} className="dropdown-link">Setari profil</Link></div>
            <div onClick={this.logout}><Link to={'/'} className="dropdown-link">Iesi din cont</Link></div>
        </div>
    }
    </div>
    );
  }

}

export default Dropdown;