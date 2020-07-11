import React from 'react';
import { MdAddAPhoto} from 'react-icons/md'
import './addPhoto.css'


class Image extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:null
        }
 

    }
    onChange = (event)=>{
        var file = event.target.files[0]
        this.props.addImage(file)
    }
    displayImage=()=>{
        if(this.props.photo!== undefined){
            var fileReader = new FileReader();
            fileReader.onloadend = () => { 
                if(this.state.image ===null)
                    this.setState({ image: [fileReader.result] }); 
            }
            fileReader.readAsDataURL(this.props.photo);
        }
 
    }
    render(){
        return(   
            <div className="add-photo-container">
                {this.props.photo !== undefined && this.displayImage()}
                <label htmlFor={`file-input${this.props.index}`}>
                    {this.props.photo === undefined 
                        ? <MdAddAPhoto className="add-icon"></MdAddAPhoto>  
                        : <img className="uploadImage" src={this.state.image} alt="upload"></img>
                    }
                    
                </label>
                <input id={`file-input${this.props.index}`} type="file" onChange={this.onChange}/>
            </div>
    ); 
    }
}

export default Image