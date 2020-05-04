import React from 'react';
import './register.scss';
import {MdPerson, MdLockOutline, MdLock, MdEmail} from 'react-icons/md'
import {GiReturnArrow} from 'react-icons/gi'
import {FaPhone} from 'react-icons/fa'
import signup from '../../images/signup-image.jpg'
import { Link } from 'react-router-dom';
import ErrorMessage from '../error/erros'



class RegisterAssociation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            password:"",
            againPass:"",
            error:{
                name:'',
                email:'',
                phone:'',
                password:'',
                againPass:'',
            }
        }
    }
    changeInput=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }
    validatePassField=(value)=>{
        let upCase = /[A-Z]/;
        let lowerCase = /[a-z]/;
        let containNr = /\d/g;
        switch(true){
            case value.length < 8:
                this.setState({error:{...this.state.error,password:'passwordLung'}})
                break;
            case upCase.test(value) ===false:
                this.setState({error:{...this.state.error,password:'passwordMaj'}})
                break;
            case lowerCase.test(value) ===false:
                this.setState({error:{...this.state.error,password:'passwordMin'}})
                break;
            case containNr.test(value) ===false:
                this.setState({error:{...this.state.error,password:'passwordNr'}})
                break;
            default:  this.setState({error:{...this.state.error,password:''}})
        }
    }

    validateField =(event)=>{
        let value = event.target.value;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let phone = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
        if(event.target.value === ''){
            this.setState({error:{...this.state.error,[event.target.name]:'required'}})
        }
        else{
            switch(event.target.name){
                case 'name':
                    value.length < 5 ? this.setState({error:{...this.state.error,name:'name'}}) : this.setState({error:{...this.state.error,name:''}})
                    break;
                case 'email':
                    mailformat.test(value) === false ? this.setState({error:{...this.state.error,email:'email'}}) : this.setState({error:{...this.state.error,email:''}})
                    break;
                case 'phone':
                    phone.test(value) === false ? this.setState({error:{...this.state.error,phone:'phone'}}) : this.setState({error:{...this.state.error,phone:''}})
                    break;
                case 'password':
                    this.validatePassField(value);
                    break;
                case 'againPass':
                    value !== this.state.password ? this.setState({error:{...this.state.error,againPass:'againPass'}}) :this.setState({error:{...this.state.error,againPass:''}})
                    break;
            }
        }
    }

    validateForm =()=>{
        let ok = true;
        for (let key in this.state) {
            if(key !== "error")
                if(this.state[key] === ''){
                    ok = false;
                }
            else{
                for(let prop in this.state.error){
                    if(this.state.error[prop] !== ''){
                        ok = false;

                    }
                }
            }
        }
        return ok;
    }

    registerAssociation =(e)=>{
        if(this.validateForm() === true){
            e.preventDefault();
            fetch('http://localhost:5000/registerAssociation', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone:this.state.phone,
                password: this.state.password
              })
            })
              .then(response => response.json())
              .then(json => {
                if("msg" in json){
                    if(json.msg === 'The association already exists')
                      this.setState({error:{...this.state.error,email:'emailExist'}})

                  }else{
                    this.setState({error:{...this.state.error,email:''}})
                    const accessToken = json.access_token;
                    window.localStorage.setItem('accessToken', accessToken);
                    window.localStorage.setItem('firstTime','true')
                    window.localStorage.setItem('typeUser', "association");
                    this.props.history.push('/profileAssociation');

                  }

              })
              .catch(error => {
                console.log(error)
              });
        }
    }

    render() {
      return(
        <section className="register">
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="signup-form-title">Creare cont</h2>
                        <form method="POST" className="register-form" id="signup-form">
                            <div className="signup-form-group">
                                <label htmlFor="name" className="lab-"><MdPerson className="signup-icons"></MdPerson></label>
                                <input type="text" className="inpt-" name="name" id="name" placeholder="Nume asociatie" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.name !== '' && <ErrorMessage type_name={this.state.error.name}/>}
                            <div className="signup-form-group">
                                <label htmlFor="email" className={`lab-${this.state.error.name}`}><MdEmail className="signup-icons"></MdEmail></label>
                                <input type="email" className={`inpt-${this.state.error.name}`} name="email" id="email" placeholder="Adresa email" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.email !== '' && <ErrorMessage type_name={this.state.error.email}/>}
                            <div className="signup-form-group">
                                <label htmlFor="phone" className={`lab-${this.state.error.email}`}><FaPhone className="signup-icons"></FaPhone></label>
                                <input type="phone" className={`inpt-${this.state.error.email}`} name="phone" id="phone" placeholder="Telefon" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.phone !== '' && <ErrorMessage type_name={this.state.error.phone}/>}
                            <div className="signup-form-group">
                                <label htmlFor="password" className={`lab-${this.state.error.phone}`}><MdLock className="signup-icons"></MdLock></label>
                                <input type="password" className={`inpt-${this.state.error.phone}`} name="password" id="password" placeholder="Parola" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.password !== '' && <ErrorMessage type_name={this.state.error.password}/>}
                            <div className="signup-form-group">
                                <label htmlFor="againPass" className={`lab-${this.state.error.password}`}><MdLockOutline className="signup-icons"></MdLockOutline></label>
                                <input type="password" className={`inpt-${this.state.error.password}`} name="againPass" id="againPass" placeholder="Rescrie parola" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.againPass !== '' && <ErrorMessage type_name={this.state.error.againPass}/>}
                            <div className="form-group form-button">
                                <input type="button" name="register" id="register" className="form-submit" onClick={this.registerAssociation} value="Inregistreaza-te"/>
                            </div>
                        </form>
                    </div>
                    <div className="register-image">
                        <figure><img src={signup} alt="sing up"/></figure>
                        <div>
                            <Link className="changePage" to={'/register'}>Creaza cont normal <GiReturnArrow></GiReturnArrow></Link>
                            <Link className="changePage" to={'/login'}>Sunt deja membru <GiReturnArrow></GiReturnArrow></Link> 
                        </div>
                    </div>
                </div>
            </div>
        </section>

      );
    }
  }

export default RegisterAssociation;