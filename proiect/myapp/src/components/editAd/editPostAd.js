import React from 'react';
import './editPostAd.css';
import Select from 'react-select'
import getClaims from '../../utils/utils'
import axios from 'axios';
import ErrorMessage from '../error/erros'
import WrongAd from '../ad/modalWrongAd/wrongAd'
import {mailformat,phoneFormat} from '../../utils/regex';
import ContactData from '../ad/contactData';




class EditPostAd extends React.Component{
    constructor(props){
        super(props)
        this.state={
            wrongAd:false,
            showDateContact:false,
            adInfo :{ 
                title:'',
                categoty:'',
                description:'',
                namePerson:'',
                email:'',
                phone:'',
                location:''
                
            },
            error:{
                title:'',
                category:'',
                description:'',
                namePerson:'',
                email:'',
                phone:'',
                location:''
            },
            photos:[],
            categoryOp:[
                { value: 'jucarii', label:'Jucarii'},
                { value: 'mobila', label: 'Mobila' },
                { value: 'electronice', label: 'Electronice' },
                { value: 'haine', label: 'Haine' },
                { value: 'ingrijire', label:'Ingrijire personala'},
                { value: 'altele', label: 'Altele'},

              ]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/announceInfo', {
            params:{id:this.props.location.aboutProps.id},
        })
        .then(res => { 
            this.setState({adInfo:{...this.state.adInfo,
                title:res.data[0].title,
                description:res.data[0].announcedescription,
                category:res.data[0].category,
                namePerson:res.data[0].personcontact,
                email:res.data[0].announceemail,
                phone:res.data[0].phone,
                location:res.data[0].userlocation}
    
            })
        })
        .catch(err => console.warn(err));
        



    }

    validateField = (event)=>{
         let value = event.target.value;
        if(this.state.adInfo[event.target.name] ==='')
            this.setState({error:{...this.state.error,[event.target.name]:'required'}})
            else{
                switch(event.target.name){
                    case 'title':
                        value.length < 5 ? this.setState({error:{...this.state.error,title:'title'}}) : this.setState({error:{...this.state.error,title:''}})
                        break;
                    case 'description':
                        value.length < 5 ? this.setState({error:{...this.state.error,description:'description'}}) : this.setState({error:{...this.state.error,description:''}})
                        break;
                    default:  this.setState({error:{...this.state.error,[event.target.name]:''}})
                }
            }
    }

    errorContact = (name,value) =>{
        console.log(value)
        if(value === '')
        this.setState({error:{...this.state.error,[name]:'required'}})
        else{
                switch(name){
                    case 'namePerson':
                        value.length < 5 ? this.setState({error:{...this.state.error,namePerson:'name'}}) : this.setState({error:{...this.state.error,namePerson:''}})
                        break;
                    case 'email':
                        mailformat.test(value) === false ? this.setState({error:{...this.state.error,email:'email'}}) : this.setState({error:{...this.state.error,email:''}})
                        break;
                    case 'phone':
                        phoneFormat.test(value) === false ? this.setState({error:{...this.state.error,phone:'phone'}}) : this.setState({error:{...this.state.error,phone:''}})
                        break;
                    case 'location':
                        value.length < 3 ? this.setState({error:{...this.state.error,location:'city'}}) : this.setState({error:{...this.state.error,location:''}})
                        break;
                    default:  this.setState({error:{...this.state.error,[name]:''}})
                }
            }
            
    }

    changeInput=(e)=>{
        this.setState({ adInfo:{...this.state.adInfo,[e.target.name] : e.target.value}})
    }

    handleChange=(selectedOption)=>{
        this.setState({adInfo:{...this.state.adInfo,categoty:selectedOption.value},error:{...this.state.error,category:''}})

    }
    showContact=(e)=>{
        this.setState({showDateContact:e.target.checked})
    }

    validateData = ()=>{
        let ok = true;
        let change = []
        for(let key in this.state.adInfo){
            if(this.state.adInfo[key] ==='')
            {   change.push('required')
                ok = false
            }
            else{
                change.push('')
            }
        }
        this.setState({error:{...this.state.error,
            title:change[0],
            category:change[1],
            description:change[2],
            namePerson:change[3],
            email:change[4],
            phone:change[5],
            location:change[6]
        }})

        return ok
    }


    sendData=()=>{
        if(this.validateData() === true){
            let typeUser = window.localStorage.getItem("typeUser")
            let access = window.localStorage.getItem("accessToken")
            access  = getClaims(access)
            let data = [this.state.adInfo.title,
                        this.state.adInfo.categoty,
                        this.state.adInfo.description,
                        this.state.adInfo.namePerson,
                        this.state.adInfo.email,
                        this.state.adInfo.phone,
                        this.state.adInfo.location,
                        this.props.location.aboutProps.id
                    ]            
            axios
            .post("http://localhost:5000/editAnnounce", data)
            .then(res => {
                if(res.data === "wrong announcement")
                    this.setState({wrongAd:true})
                else{
                    this.props.history.push('/listUserAnnounces') 
                }
            })
            .catch(err => console.warn(err));
    }
}

    hideModal = () => {
        this.setState({ wrongAd: false});
      };

    render(){    
        console.log(this.state)
        return (
        <div style={{marginTop:"5%",marginBottom:"5%"}}>
            {this.state.wrongAd === true
            ? <WrongAd  show={this.state.wrongAd} handleClose={this.hideModal}></WrongAd>
            :<div className="edit-add-container">
                <h1 className="title-edit-add">Modifică anunțul</h1>
                 <div className="edit-add-form">
                    <form className="edit-add-left">
                        <div className={`edit-add-form-group${this.state.error.title}`}>
                            <label htmlFor="title">Titlu:</label>
                            <input type="text" name="title" id="title" defaultValue={this.state.adInfo.title} onBlur={this.validateField} onChange={this.changeInput}/>
                        </div>
                        {this.state.error.title !== '' && <ErrorMessage style={{marginBottom:"10px"}} type_name={this.state.error.title}/>}
                        <div className={`select-option${this.state.error.description}`}>
                            <label>Categoria</label>
                            <Select style={{marginBottom:"0px"}} options={this.state.categoryOp}  onChange={this.handleChange} />
                        </div>
                        {this.state.error.category !== "" && <ErrorMessage style={{marginBottom:"10px"}} type_name={this.state.error.category}/>}
                        <div className={`edit-add-form-group${this.state.error.description}`}>
                            <label style={{marginTop:"20px"}} htmlFor="description">Descriere:</label>
                            <textarea  rows="2" cols="50"  name="description" id="description" onBlur={this.validateField} defaultValue={this.state.adInfo.description} onChange={this.changeInput}/>
                        </div>
                        {this.state.error.description !== '' && <ErrorMessage type_name={this.state.error.description}/>}
                    </form>
                </div>
                <div className="edit-add-contact">
                    <input type="checkbox" id="check" onChange={this.showContact} checked={this.state.showDateContact}/>
                    <label htmlFor="check">Vreau să îmi modific datele de contact</label><br/>
                    {this.state.showDateContact === true && 
                    <ContactData isError={this.state.error} namePerson={this.state.adInfo.namePerson} 
                    phone={this.state.adInfo.phone} location={this.state.adInfo.location} email={this.state.adInfo.email}
                     changeInput ={this.changeInput} error={this.errorContact}/> }
                </div>
                <div className="edit-add-button-submit">
                     <input type="submit" name="edit-add" id="edit-add" className="edit-add-form-submit" value="Salvează" onClick={this.sendData}/>
                </div>
            </div>
    }
    </div>
          )
    }
}
export default EditPostAd;