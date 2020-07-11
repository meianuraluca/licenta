import React from 'react';
import './contact.scss';
import {mailformat,phoneFormat} from '../../utils/regex';
import ErrorMessage from '../error/erros';
import axios from 'axios'
class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            phone:'',
            subject:'',
            message:'',
            error:{
                name:'',
                email:'',
                phone:'',
                subject:'',
                message:'', 
            }
        }

    }

    changeInput=(e)=>{
        this.setState({[e.target.name] : e.target.value})
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
                case 'subject':
                    value.length < 5 ? this.setState({error:{...this.state.error,subject:'subject'}}) : this.setState({error:{...this.state.error,subject:''}})
                    break;
                case 'message':
                    value.length < 10 ? this.setState({error:{...this.state.error,message:'message'}}) : this.setState({error:{...this.state.error,message:''}})
                    break;
                default:  this.setState({error:{...this.state.error,[event.target.name]:''}})
            }
        }
    }
    validateData = ()=>{
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
            subject:change[3],
            message:change[4]
        }})

        return ok
    }

    sendMail=(e)=>{
        if(this.validateData() === true){
            let data = [this.state.name,
                        this.state.email,
                        this.state.phone,
                        this.state.subject,
                        this.state.message]            
            axios
            .post("http://localhost:5000/contactUs", data)
            .then(res => {
                
                console.log(res)
                if(res.data === "Sent"){
                    this.props.history.push('/home')
                    axios
                    .post("http://localhost:5000/confirmEmail", [this.state.email])
                    .then(res =>{console.log(res)})
                    .catch(err=>console.warn(err));
                }
            })
            .catch(err => console.warn(err));
        }
    }


  render(){
    return (
                <div className="contact-parent">
                    <div className="contact-child child1">

                        <p>
                            <i className="fas fa-phone-alt"></i> Hai să vorbim: <br />
                            <span> 0787878787</span>
                        </p>

                        <p>
                            <i className=" far fa-envelope"></i> Suport: <br />
                            <span>emailsuport.donation@gmail.com</span>
                        </p>
                    </div>

                    <div className="contact-child child2">
                        <div className="inside-contact">
                            <h2>Contactați-ne</h2>
                            <h3>
                               <span id="confirm"/>
                            </h3>

                            <p className="label-contact-">Nume:</p>
                            <input id="txt_name" type="text" name = "name" onBlur={this.validateField} onChange={this.changeInput}/>
                            {this.state.error.name !== '' && <ErrorMessage type_name={this.state.error.name}/>}

                            <p className={`label-contact-${this.state.error.name}`}>Adresa de email:</p>
                            <input id="txt_email" type="text" name = "email" onBlur={this.validateField} onChange={this.changeInput}/>
                            {this.state.error.email !== '' && <ErrorMessage type_name={this.state.error.email}/>}

                            <p className={`label-contact-${this.state.error.email}`}>Număr de telefon:</p>
                            <input id="txt_phone" type="text" name = "phone" onBlur={this.validateField} onChange={this.changeInput}/>
                            {this.state.error.phone !== '' && <ErrorMessage type_name={this.state.error.phone}/>}

                            <p className={`label-contact-${this.state.error.phone}`}>Subiect:</p>
                            <input id="txt_subject" type="text" name = "subject" onBlur={this.validateField} onChange={this.changeInput}/>
                            {this.state.error.subject !== '' && <ErrorMessage type_name={this.state.error.subject}/>}

                            <p className={`label-contact-${this.state.error.subject}`}>Mesaj:</p>
                            <textarea id="txt_message" rows="4" cols="20" name = "message" onBlur={this.validateField} onChange={this.changeInput}></textarea>
                            {this.state.error.message !== '' && <ErrorMessage type_name={this.state.error.message}/>}
                            
                            <input type="submit" id="btn_send" onClick={this.sendMail} value="Trimite"/>
                        </div>
                    </div>
                </div>

    );
  }

}

export default Contact;
