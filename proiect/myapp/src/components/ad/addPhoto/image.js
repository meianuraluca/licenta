import React from 'react';
import { MdAddAPhoto} from 'react-icons/md'
import './addPhoto.css'

function Image(props){
    function onChange(event){
        var file = event.target.files[0]
        props.addImage(file)
    }
    function displayImage(file){
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
        console.log(url)
        reader.onloadend = function (e) {
            return <img className="uploadImage" src={[reader.result]} alt="upload"></img>
        }
    }

        return(    
            <div className="add-photo-container">
                <label htmlFor={`file-input${props.index}`}>
                    {props.photo === undefined 
                        ? <MdAddAPhoto className="add-icon"></MdAddAPhoto>  
                        : displayImage(props.photo)
                    }
                    
                </label>
                <input id={`file-input${props.index}`} type="file" onChange={onChange}/>
            </div>
    ); 
}

export default Image