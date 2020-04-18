import React from 'react';
import './addPost.css';
import Select from 'react-select'
import AddPhoto from './addPhoto/addPhoto'
import ContactData from './contactData';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class AddPost extends React.Component{
    constructor(props){
        super(props)
        this.state={
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
            photos:[],
            categoryOp:[
                { value: 'mobila', label: 'Mobila' },
                { value: 'electronice', label: 'Electronice' },
                { value: 'haine', label: 'Haine' },
                { value: 'altele', label: 'Altele'}
              ]
        }
    }
    changeInput=(e)=>{
        this.setState({ adInfo:{...this.state.adInfo,[e.target.name] : e.target.value}})
    }

    handleChange=(selectedOption)=>{
        this.setState({adInfo:{...this.state.adInfo,categoty:selectedOption.value}})

    }
    showContact=(e)=>{
        this.setState({showDateContact:e.target.checked})
    }
    addImages = (image)=>{
        this.setState({photos:[...this.state.photos,image]})
    }


    sendData=()=>{
        let data = [this.state.adInfo.title,
                    this.state.adInfo.categoty,
                    this.state.adInfo.description,
                    this.state.adInfo.namePerson,
                    this.state.adInfo.email,
                    this.state.adInfo.phone,
                    this.state.adInfo.location]            
        axios
          .post("http://localhost:5000/announce", data)
          .then(res => {
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


          })
          .catch(err => console.warn(err));
          this.props.history.push('/announces');

    }

    render(){     
        console.log('addpost')
        return (
            <div className="add-container">
                <div className="add-form">
                    <form className="add-left">
                        <div className="add-form-group">
                            <label htmlFor="title">Titlu:</label>
                            <input type="text" name="title" id="title" onChange={this.changeInput}/>
                        </div>
                        <div className="select-option">
                            <label>Categoria</label>
                            <Select options={this.state.categoryOp}  onChange={this.handleChange} />
                        </div>
                        <div className="add-form-group">
                            <label htmlFor="description">Descriere:</label>
                            <textarea style={{resize:"none",marginTop:"40px"}} rows="2" cols="50"  name="description" id="description" onChange={this.changeInput}/>
                        </div>
                    </form>
                    <div className="add-right">
                        <label>Adauga fotografii:</label>
                        <AddPhoto photo={this.addImages}></AddPhoto>
                    </div>
                </div>
                <div className="add-contact">
                    <input type="checkbox" id="check" onChange={this.showContact} checked={this.state.showDateContact}/>
                    <label htmlFor="check">Vreau sa imi modific datele de contact</label><br/>
                    {this.state.showDateContact === true && <ContactData changeInput ={this.changeInput}/> }
                </div>
                <div className="add-button-submit">
                     <input type="submit" name="add" id="add" className="add-form-submit" value="Adauga anunt" onClick={this.sendData}/>
                </div>
            </div>
          )
    }
}
export default withRouter(AddPost);