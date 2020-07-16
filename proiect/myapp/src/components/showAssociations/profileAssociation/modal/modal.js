import React from 'react'
import './modal.css'
import { MdAddAPhoto} from 'react-icons/md'
import ErrorMessage from '../../../error/erros'
import axios from 'axios'
import getClaims from '../../../../utils/utils'
import {mailformat, phoneFormat, linkFormat} from '../../../../utils/regex';



class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logo:null,
            displayLogo:null,
            motto:"",
            link:"",
            email:"",
            description:"",
            validEmail:true,
            validPhone:true,
            validLink:true,
            phone:''
        }
    }
    changeInput=(e)=>{
        if(e.target.name === 'logo'){
            var file = e.target.files[0]
            var element = file;
            var fileReader = new FileReader();
            fileReader.onloadend = () => { 
                if(this.state.logo ===null)
                    this.setState({ displayLogo: [fileReader.result],logo: file }); 
            }
            fileReader.readAsDataURL(element);
            this.setState({})
            //this.displayPhoto(file)
            
        }
        else{
            console.log(e.target.name)
            this.setState({[e.target.name] : e.target.value})
        }
        
    }

    displayPhoto=(element)=>{
        var fileReader = new FileReader();
        fileReader.onloadend = () => { 
            if(this.state.logo ===null)
                this.setState({ displayLogo: [fileReader.result] }); 
        }
        fileReader.readAsDataURL(element);
    }

    validateEmail = (event)=>{
        let value = event.target.value;
        mailformat.test(value) === false ? this.setState({validEmail:false}) : this.setState({validEmail:true})
    }

    validatePhone = (event)=>{
        let value = event.target.value;
        phoneFormat.test(value) === false ? this.setState({validPhone:false}) : this.setState({validPhone:true})
    }
    validateLink = (event)=>{
        let value = event.target.value;
        linkFormat.test(value) === false ? this.setState({validLink:false}) : this.setState({validLink:true})
    }

    sendData = () =>{
        if( this.state.validEmail === true && this.state.validPhone === true){
            if (localStorage.getItem('accessToken') !== null) {
                let access = window.localStorage.getItem('accessToken');
                access = getClaims(access);
                let result = access.identity;
                let data = [result,
                            this.state.motto,
                            this.state.link,
                            this.state.email,
                            this.state.description,
                            this.state.phone]            
                axios
                .post("http://localhost:5000/editProfile", data)
                .then(res => {
                        if(this.state.logo !== null){
                            const element = this.state.logo;
                            const fd = new FormData();
                            fd.append('email',result);
                            fd.append('file',element,element.name );
                            axios.post('http://localhost:5000/addLogo',fd , {
                                onUploadProgress : ProgressEvent => {
                                    console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
                                }
                            })
                        .then(res => {
                            res.data ==="done" && this.props.handleClose()
                            
                        })
                        .catch(err => console.warn(err));
                        }
                        else{
                            res.data ==="done" && this.props.handleClose()
                        }

                })
                .catch(err => console.warn(err));

            }}

    }

    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
              <section className="modal-main">
                <div className="modal-container">
                    {this.props.edit === false 
                     ? <h1 className="modal-title">Bună! Acum că te-ai înregistrat adaugă câteva informații ca profilul dumneavoastră să prindă contur!</h1>
                     : <h1 className="modal-title">Modifică datele profilului</h1>
                    }   
                    <div className="modal-container-content">
                        <div className="modal-container-content-one">
                            {this.props.edit ===false
                            && <div className="modal-add-photo-container">
                                {this.state.displayLogo ===null ? <label htmlFor="logo"> <MdAddAPhoto className="modal-add-icon"></MdAddAPhoto></label> : <img className="modal-image-profile" alt="" src={this.state.displayLogo}/>}
                                <input id="logo" name="logo" type="file" onChange={this.changeInput} />
                            </div>
                            }
                            <input className="modal-input" type="text" id="motto" name="motto" placeholder="Motto al asociatiei.." onChange={this.changeInput}/>
    
                            <input className={`modal-input link-${this.state.validLink}`} type="text" id="link" name="link" placeholder="Link catre pagina oficiala a asociatiei" onChange={this.changeInput}/>   
                            {this.state.validLink === false && <ErrorMessage style={{paddingTop:"0px"}} type_name="link"/>}
                            <input className={`modal-input phone-${this.state.validPhone}`}  type="text" id="phone" name="phone" placeholder="Numar de telefon" onChange={this.changeInput} onBlur={this.validatePhone}/>   
                            {this.state.validPhone === false && <ErrorMessage style={{paddingTop:"0px"}} type_name="phone"/>}
                            <input className="modal-input" style={{marginBottom:"0px"}} type="text" id="email" name="email" placeholder="Email ul de contact" onChange={this.changeInput} onBlur={this.validateEmail}/>
                            {this.state.validEmail === false && <ErrorMessage style={{paddingTop:"0px"}} type_name="email"/>}
                        </div>
                        {this.props.edit === false
                            ? <div className="modal-container-content-two">
                                <textarea className="modal-input description" id="description" name="description" placeholder="Despre asociatie" rows={10} onChange={this.changeInput}></textarea>
                            </div>
                            :<div style={{marginTop:"0px"}} className="modal-container-content-two">
                                <textarea className="modal-input" id="description" name="description" placeholder="Despre asociatie" rows={10} onChange={this.changeInput}></textarea>
                            </div>
                        }   
                        
                    </div>    
                    <div className="modal-buttons">
                        <div className="button" >
                            <div className="translate"></div>
                            <a href="#" onClick={this.props.handleClose}>Închide</a>
                        </div>
                        <div className="button">
                            <div className="translate"></div>
                            <a href="#" onClick={this.sendData}>Salvează</a>
                        </div>
                    </div>
                    
                </div>
              </section>
            </div>
          );
    }

}
export default Modal;