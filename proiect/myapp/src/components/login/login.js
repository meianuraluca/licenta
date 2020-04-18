import React from 'react';
import './login.css'
import {GiReturnArrow} from 'react-icons/gi'
import {MdEmail, MdLock} from 'react-icons/md'
import signin from '../../images/signin-image.jpg'
import { Link,withRouter } from 'react-router-dom';



class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    changeInput=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }
    handleLogin = e => {
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
            const accessToken = json.access_token;
            window.localStorage.setItem('accessToken', accessToken);
            this.props.history.push('/home');

          })
          .catch(error => {
            console.log(error)
          });
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
                            <div className="signin-form-group">
                                <label htmlFor="password"><MdLock className="signin-icons"></MdLock></label>
                                <input type="password" name="password" id="password" placeholder="Parola" onChange={this.changeInput}/>
                            </div>

                            <div className="form-group form-button">
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