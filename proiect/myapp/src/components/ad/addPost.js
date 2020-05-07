import React from 'react';
import './addPost.css';
import Select from 'react-select'
import AddPhoto from './addPhoto/addPhoto'
import ContactData from './contactData';
import getClaims from '../../utils/utils'
import axios from 'axios';
import ErrorMessage from '../error/erros'
import { withRouter } from 'react-router-dom';
import WrongAd from './modalWrongAd/wrongAd';
import {mailformat,phoneFormat} from '../../utils/regex';




class AddPost extends React.Component{
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
                { value: 'mobila', label: 'Mobila' },
                { value: 'electronice', label: 'Electronice' },
                { value: 'haine', label: 'Haine' },
                { value: 'altele', label: 'Altele'}
              ]
        }
    }

    componentDidMount(){
        let access = window.localStorage.getItem("accessToken")
        access  = getClaims(access)
        axios.get('http://localhost:5000/userData', {
            params:{email:access.identity},
        })
        .then(res => { console.log(res)
            this.setState({adInfo:{...this.state.adInfo,
                namePerson:res.data[0].username,
                email:res.data[0].email,
                phone:res.data[0].phone,
                location:res.data[0].city}
 
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
    addImages = (image)=>{
        this.setState({photos:[...this.state.photos,image]})
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
            let access = window.localStorage.getItem("accessToken")
            access  = getClaims(access)
            let data = [this.state.adInfo.title,
                        this.state.adInfo.categoty,
                        this.state.adInfo.description,
                        this.state.adInfo.namePerson,
                        this.state.adInfo.email,
                        this.state.adInfo.phone,
                        this.state.adInfo.location,
                        access.identity]            
            axios
            .post("http://localhost:5000/announce", data)
            .then(res => {
                console.log(res)
                if(res.data === "wrong announcement")
                    this.setState({wrongAd:true})
                else{
                    for (let index = 0; index < this.state.photos.length; index++) {
                        console.log("trimit poza")
                        const element = this.state.photos[index];
                        const fd = new FormData();
                        fd.append('idd',res.data);
                        fd.append('file',element,element.name );
                        axios.post('http://localhost:5000/images',fd , {
                            onUploadProgress : ProgressEvent => {
                                console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
                            }
                        })
                    .then(res => console.log(res))
                    .catch(err => console.warn(err));
                }
                this.props.history.push('/home') 
                }
            })
            .catch(err => console.warn(err));
    }
}

    hideModal = () => {
        this.setState({ wrongAd: false});
      };

    render(){    
        return (
        <div>
            {this.state.wrongAd === true
            ? <WrongAd  show={this.state.wrongAd} handleClose={this.hideModal}></WrongAd>
            :<div className="add-container">
                 <div className="add-form">
                    <form className="add-left">
                        <div className={`add-form-group${this.state.error.title}`}>
                            <label htmlFor="title">Titlu:</label>
                            <input type="text" name="title" id="title" defaultValue={this.state.adInfo.title} onBlur={this.validateField} onChange={this.changeInput}/>
                        </div>
                        {this.state.error.title !== '' && <ErrorMessage style={{marginBottom:"10px"}} type_name={this.state.error.title}/>}
                        <div className={`select-option${this.state.error.description}`}>
                            <label>Categoria</label>
                            <Select style={{marginBottom:"0px"}} options={this.state.categoryOp}  onChange={this.handleChange} />
                        </div>
                        {this.state.error.category !== "" && <ErrorMessage style={{marginBottom:"10px"}} type_name={this.state.error.category}/>}
                        <div className={`add-form-group${this.state.error.description}`}>
                            <label style={{marginTop:"20px"}} htmlFor="description">Descriere:</label>
                            <textarea  rows="2" cols="50"  name="description" id="description" onBlur={this.validateField} defaultValue={this.state.adInfo.description} onChange={this.changeInput}/>
                        </div>
                        {this.state.error.description !== '' && <ErrorMessage type_name={this.state.error.description}/>}
                    </form>
                    <div className="add-right">
                        <label>Adauga fotografii:</label>
                        <AddPhoto photo={this.addImages}></AddPhoto>
                    </div>
                </div>
                <div className="add-contact">
                    <input type="checkbox" id="check" onChange={this.showContact} checked={this.state.showDateContact}/>
                    <label htmlFor="check">Vreau sa imi modific datele de contact</label><br/>
                    {this.state.showDateContact === true && 
                    <ContactData isError={this.state.error} namePerson={this.state.adInfo.namePerson} phone={this.state.adInfo.phone} location={this.state.adInfo.location} email={this.state.adInfo.email} changeInput ={this.changeInput} error={this.errorContact}/> }
                </div>
                <div className="add-button-submit">
                     <input type="submit" name="add" id="add" className="add-form-submit" value="Adauga anunt" onClick={this.sendData}/>
                </div>
            </div>
    }
    </div>
          )
    }
}
export default withRouter(AddPost);