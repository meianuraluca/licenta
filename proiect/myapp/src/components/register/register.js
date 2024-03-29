import React from 'react';
import './register.scss'
import ErrorMessage from '../error/erros'
import {GiReturnArrow} from 'react-icons/gi'
import {MdLocationCity,MdPerson, MdLockOutline, MdLock, MdEmail} from 'react-icons/md'
import {FaPhone} from 'react-icons/fa'
import signup from '../../images/signup-image.jpg'
import { Link,withRouter} from 'react-router-dom';
import {mailformat,phoneFormat} from '../../utils/regex';




class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            phone:"",
            city:"",
            password:"",
            againPass:"",
            error:{
                name:'',
                email:'',
                phone:'',
                city:'',
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
                    phoneFormat.test(value) === false ? this.setState({error:{...this.state.error,phone:'phone'}}) : this.setState({error:{...this.state.error,phone:''}})
                    break;
                case 'city':
                    value.length < 3 ? this.setState({error:{...this.state.error,city:'city'}}) : this.setState({error:{...this.state.error,city:''}})
                    break;
                case 'password':
                    this.validatePassField(value);
                    break;
                case 'againPass':
                    value !== this.state.password ? this.setState({error:{...this.state.error,againPass:'againPass'}}) :this.setState({error:{...this.state.error,againPass:''}})
                    break;
                default:  this.setState({error:{...this.state.error,[event.target.name]:''}})
            }
        }
    }

    validateForm =()=>{
        let ok = true;
        let change = []
        for(let key in this.state){
            if(key !== 'error'){
                if(this.state[key] ==='')
                {   change.push('required')
                    ok = false
                }
                else{
                    if(this.state.error[key] === '')
                        change.push('')
                    else
                        change.push(this.state.error[key])
                }
        }
        }
        this.setState({error:{...this.state.error,
            name:change[0],
            email:change[1],
            phone:change[2],
            city:change[3],
            password:change[4],
            againPass:change[5]
        }})

        return ok
    }

    registerUser =(e)=>{
        if(this.validateForm() === true){
            e.preventDefault();
            fetch('http://localhost:5000/registerUser', {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone:this.state.phone,
                city:this.state.city,
                password: this.state.password
              })
            })
              .then(response => response.json())
              .then(json => {
                if("msg" in json){
                    if(json.msg === 'The user already exists')
                      this.setState({error:{...this.state.error,email:'emailExist'}})

                }else{
                const accessToken = json.access_token;
                window.localStorage.setItem('accessToken', accessToken);
                window.localStorage.setItem('typeUser', "user");
                this.props.history.push('/home');
                  }
              })
              .catch(error => {
                console.log(error)
              });
        }
    }

    render() {
      return(
        <section className="sign-up">
            <div className="signup-container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="signup-form-title">Inscrie-te</h2>
                        <form className="register-form" id="register-form">
                            <div className="signup-form-group">
                                <label htmlFor="name" className="lab-"><MdPerson className="signup-icons"></MdPerson></label>
                                <input type="text" className="inpt-" name="name" id="name" placeholder="Nume" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.name !== '' && <ErrorMessage type_name={this.state.error.name}/>}
                            <div className="signup-form-group">
                                <label htmlFor="email" className={`lab-${this.state.error.name}`}><MdEmail className="signup-icons"></MdEmail></label>
                                <input type="email" className={`inpt-${this.state.error.name}`} name="email" id="email" placeholder="Adresa de email" onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.email !== '' && <ErrorMessage type_name={this.state.error.email}/>}
                            <div className="signup-form-group">
                                <label htmlFor="phone" className={`lab-${this.state.error.email}`}><FaPhone className="signup-icons"></FaPhone></label>
                                <input type="phone" className={`inpt-${this.state.error.email}`} name="phone" id="phone" placeholder="Telefon"  onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.phone !== '' && <ErrorMessage type_name={this.state.error.phone}/>}
                            <div className="signup-form-group">
                                <label htmlFor="city" className={`lab-${this.state.error.phone}`}><MdLocationCity className="signup-icons"></MdLocationCity></label>
                                <input type="city" className={`inpt-${this.state.error.phone}`} name="city" id="city" placeholder="Oras"  onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.city !== '' && <ErrorMessage type_name={this.state.error.city}/>}
                            <div className="signup-form-group">
                                <label htmlFor="password" className={`lab-${this.state.error.city}`}><MdLock className="signup-icons"></MdLock></label>
                                <input type="password" className={`inpt-${this.state.error.city}`} name="password" id="password" placeholder="Parola"  onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.password !== '' && <ErrorMessage type_name={this.state.error.password}/>}
                            <div className="signup-form-group">
                                <label htmlFor="againPass" className={`lab-${this.state.error.password}`}><MdLockOutline className="signup-icons"></MdLockOutline></label>
                                <input type="password" className={`inpt-${this.state.error.password}`} name="againPass" id="againPass" placeholder="Rescrie parola"  onBlur={this.validateField} onChange={this.changeInput}/>
                            </div>
                            {this.state.error.againPass !== '' && <ErrorMessage type_name={this.state.error.againPass}/>}
                            <div className="form-group form-button">
                                <input type="button" name="signup" id="signup" className="form-submit" value="Inregistrează-te" onClick={this.registerUser}/>
                                <div>
                                    <Link className="changePage" to={'/login'}>Sunt deja membru <GiReturnArrow></GiReturnArrow></Link>
                                    <Link className="changePage" to={'/registerAssoc'}>Creează cont de asociație <GiReturnArrow></GiReturnArrow></Link>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src={signup} alt="sing up"/></figure>
                        <div>
                            <Link className="changePage" to={'/login'}>Sunt deja membru <GiReturnArrow></GiReturnArrow></Link>
                            <Link className="changePage" to={'/registerAssoc'}>Creaază cont de asociație <GiReturnArrow></GiReturnArrow></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      );
    }
  }

export default withRouter(Register);