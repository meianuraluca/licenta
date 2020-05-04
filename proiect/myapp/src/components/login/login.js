import React from 'react';
import './login.css'
import {GiReturnArrow} from 'react-icons/gi'
import {MdEmail, MdLock} from 'react-icons/md'
import signin from '../../images/signin-image.jpg'
import { Link,withRouter } from 'react-router-dom';
import ErrorMessage from '../error/erros'



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            error:''
        }
    }


  changeInput=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }
  validateForm =()=>{
    let ok = true;
    for (let key in this.state) {
        if(this.state[key] === " "){
          this.setState({error:"missing"})
          return false;
        }
    }
    this.setState({error:""})
    return ok;
  }
    handleLogin = e => {
      if(this.validateForm() === true){
        e.preventDefault();
        fetch('http://localhost:5000/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        })
          .then(response => response.json())
          .then(json => {
            if("msg" in json){
              if(json.msg === "Email is missing" || json.msg === "Password is missing")
                this.setState({error:"missing"})
              else
                this.setState({error:"bad"})
            }
            else{
              const accessToken = json.access_token;
              const typeUser = json.type;
              window.localStorage.setItem('accessToken', accessToken);
              window.localStorage.setItem('typeUser',typeUser)
              this.props.history.push('/home');
            }
          })
          .catch(error => {
            console.log(error)
          });
      }
      };
    render() {
      return(
        <section className="sign-in">
            <div className="signin-container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={signin} alt="sing in"/></figure>
                        <div className="signin-link">
                            <Link className="changePage" to={'/register'}>Creaza cont <GiReturnArrow></GiReturnArrow></Link>
                            <Link className="changePage" to={'/registerAssoc'}>Creaza cont de asociatie <GiReturnArrow></GiReturnArrow></Link>
                        </div>
                    </div>
                    <div className="signin-form">
                        <h2 className="signin-form-title">Autentificare</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="signin-form-group">
                                <label htmlFor="email"><MdEmail className="signin-icons"></MdEmail></label>
                                <input type="text" name="email" id="email" placeholder="Adresa de email" onChange={this.changeInput}/>
                            </div>
                            <div className="signin-form-group" style={{marginBottom:"0px"}}>
                                <label htmlFor="password"><MdLock className="signin-icons"></MdLock></label>
                                <input type="password" name="password" id="password" placeholder="Parola" onChange={this.changeInput}/>
                            </div>
                            {this.state.error !== '' && <ErrorMessage type_name={this.state.error}/>}
                            <div className="form-group form-button" style={{marginTop:"5%"}}>
                                <input type="button" name="signin" id="signin" className="signin-form-submit" value="Autentificare" onClick={this.handleLogin}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

      );
    }
  }

export default withRouter(Login);