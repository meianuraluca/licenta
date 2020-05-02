import React from 'react'
import './modal.css'
import { MdAddAPhoto} from 'react-icons/md'
import ErrorMessage from '../../../error/erros'
import axios from 'axios'
import getClaims from '../../../../utils/utils'


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logo:null,
            motto:"",
            link:"",
            email:"",
            description:"",
            validEmail:true
        }
    }
    changeInput=(e)=>{
        if(e.target.name === 'logo'){
            var file = e.target.files[0]
            this.setState({[e.target.name] : file})
        }
        else{
            console.log(e.target.name)
            this.setState({[e.target.name] : e.target.value})
        }
        
    }

    validateEmail = (event)=>{
        let value = event.target.value;
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        mailformat.test(value) === false ? this.setState({validEmail:false}) : this.setState({validEmail:true})
    }
    sendData = () =>{
        console.log("trimit datete")
        let ok = 0;
        if (localStorage.getItem('accessToken') !== null) {
            let access = window.localStorage.getItem('accessToken');
            access = getClaims(access);
            let result = access.identity;
            let data = [result,
                        this.state.motto,
                        this.state.link,
                        this.state.email,
                        this.state.description]            
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

        }
    }

    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
              <section className="modal-main">
                <div className="modal-container">
                    <h1 className="modal-title">Buna! Acum ca te-ai inregistrat hai sa adaugam cateva informatii ca profilul dumneavostra sa prinda contur!</h1>
                    <div className="modal-container-content">
                        <div className="modal-container-content-one">
                            <div className="modal-add-photo-container">
                                <label htmlFor="logo"> <MdAddAPhoto className="modal-add-icon"></MdAddAPhoto></label>
                                <input id="logo" name="logo" type="file" onChange={this.changeInput} />
                            </div>
                            <input className="modal-input" type="text" id="motto" name="motto" placeholder="Motto al asociatiei.." onChange={this.changeInput}/>
    
                            <input className="modal-input" type="text" id="link" name="link" placeholder="Link catre pagina oficiala a asociatiei" onChange={this.changeInput}/>   
                            <input className="modal-input" style={{marginBottom:"0px"}} type="text" id="email" name="email" placeholder="Email ul de contact" onChange={this.changeInput} onBlur={this.validateEmail}/>
                            {this.state.validEmail === false && <ErrorMessage style={{paddingTop:"0px"}} type_name="email"/>}
                        </div>
                        <div className="modal-container-content-two">
                            <textarea className="modal-input" id="description" name="description" placeholder="Despre asociatie" rows={10} onChange={this.changeInput}></textarea>
                        </div>
                        
                    </div>    
                    <div className="modal-buttons">
                        <button onClick={this.props.handleClose}>Mai tarziu</button>
                        <button onClick={this.sendData}>Salveaza</button>
                    </div>
                    
                </div>
              </section>
            </div>
          );
    }

}
export default Modal;