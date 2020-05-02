import React from 'react'
import './modal.css'
import { MdAddAPhoto} from 'react-icons/md'


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            logo:null,
            motto:"",
            link:"",
            email:"",
            description:""
        }
    }
    changeInput=(e)=>{
        if(e.target.name === 'logo'){
            var file = e.target.files[0]
            this.setState({[e.target.name] : file})
        }
        else{
            this.setState({[e.target.name] : e.target.value})
        }
        
    }
    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName}>
              <section className="modal-main">
                
                <div class="modal-container">
                    <h1 style={{marginTop:"2%",marginBottom:"2%", marginLeft:"10%",marginRight:"10%"}}>Buna! Acum ca te-ai inregistrat hai sa adaugam cateva informatii ca profilul dumneavostra sa prinda contur!</h1>
                    <div className="modal-container-content">
                        <div className="modal-container-content-one">
                            <div className="modal-add-photo-container">
                                <label htmlFor="logo"> <MdAddAPhoto className="modal-add-icon"></MdAddAPhoto></label>
                                <input id="logo" name="logo" type="file" onChange={this.onChange} />
                            </div>
                            <input className="modal-input" type="text" id="motto" name="motto" placeholder="Motto al asociatiei.." onChange={this.onChange}/>
    
                            <input className="modal-input" type="text" id="link" name="link" placeholder="Link catre pagina oficiala a asociatiei" onChange={this.onChange}/>   
                            <input className="modal-input" type="text" id="email" name="email" placeholder="Email ul de contact" onChange={this.onChange}/>
                        </div>
                        <div className="modal-container-content-two">
                            <textarea className="modal-input" id="subject" name="subject" placeholder="Despre asociatie" rows={10} onChange={this.onChange}></textarea>
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