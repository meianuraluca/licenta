import React from 'react'
import './cardProfile.scss'
import axios from 'axios'
import {MdPerson, MdPhotoCamera} from 'react-icons/md'
import {AiFillCaretRight,AiFillCaretLeft} from 'react-icons/ai'
import {FaFolderPlus} from 'react-icons/fa'
import getClaims from '../../../../utils/utils'
import isEmptyArrayBuffer from 'is-empty-array-buffer'
import { withRouter } from 'react-router-dom'

class CardProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            start:0,
            logo:null,
            title:"Cateva poze cu noi",
            images:[],
            accessToken:'',
            isPersonLog:false
        }
    }

    componentDidMount(){
        if (localStorage.getItem('accessToken') !== null) {
            let access = window.localStorage.getItem('accessToken');
            access = getClaims(access);
            this.setState({accessToken: access.identity});
        }
        axios
        .get("http://localhost:5000/allImagesAssociation",{
            params:{id:this.props.id},
        })
        .then(response => {
            let n = response.data.minId+response.data.numberImage;
            for (let index= response.data.minId; index < n; index++) {
                axios.get('http://localhost:5000/oneImageAssociation', {
                    params:{id:index},
                    responseType:'arraybuffer'  
                })
            .then(res => {
                if(isEmptyArrayBuffer(res.data))
                    this.setState({images:[...this.state.images,null]})
                else{
                let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                let url = URL.createObjectURL(matrixBlob)
                console.log(url)
                this.setState({images:[...this.state.images,url]})
                }

            })
            .catch(err => console.warn(err));
            }
            console.log(response.data)
        })
        .catch(err => console.warn(err));
    

    }

    displayNewLogo = (element) =>{
        var fileReader = new FileReader();
        fileReader.onloadend = () => { 
            if(this.state.logo ===null)
                this.setState({ logo: [fileReader.result] }); 
        }
        fileReader.readAsDataURL(element);
    }
    moveRight = () => {
        console.log(this.state.images.length)
        if(this.state.start+2 < this.state.images.length) 
            this.setState({start:this.state.start+2})
    }
    moveLeft = () => {
        if(this.state.start !==0 )
            this.setState({start:this.state.start-2})
    }

    addImageToState=(images)=>{
        console.log(images);
        let newImages = [];
        for(let i=0;i<images.length;i++){
            let matrixBlob = new Blob([images[i]], {type:"image/jpg"}); 
            newImages.push(URL.createObjectURL(matrixBlob))

        }
        this.setState({images:[...this.state.images,...newImages]})

    }

    sendImages = (event) =>{
        const images = event.target.files
        this.addImageToState(images)
        if (this.state.accessToken !== '') {
            for (let index = 0; index < images.length; index++) {
                console.log("trimit poza")
                const element = images[index];
                const fd = new FormData();
                fd.append('email',this.state.accessToken);
                fd.append('file',element);
                axios.post('http://localhost:5000/imagesAssoc',fd , {
                    onUploadProgress : ProgressEvent => {
                        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
                    }
                })
            .then(res => console.log(res))
            .catch(err => console.warn(err));
            }
        }

    }

    changeInput = (event)=>{
        if (this.state.accessToken !== '') {
            const element = event.target.files[0];
            this.displayNewLogo(element)
            const fd = new FormData();
            fd.append('email',this.state.accessToken);
            fd.append('file',element,element.name );
            axios.post('http://localhost:5000/addLogo',fd , {
                    onUploadProgress : ProgressEvent => {
                        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total *100) + '%')
                    }
                })
            .then(res => {  this.props.history.push('/profileAssociation');
                
            })
            .catch(err => console.warn(err));
        }
    }

    render(){
      console.log(this.props)
        return(
            <div className="profile-association-card">
                <div className="profile-association-card-additional">
                    <div className="profile-association-card-user-card">
                        <div className="incercare"><h2 className="profile-card-name">{this.props.name}</h2>
                        {this.props.logo === null?
                              <MdPerson className="profile_logo"></MdPerson> :
                              this.state.logo=== null ? <img src={this.props.logo} alt="" className="profile_logo"></img> : <img src={this.state.logo} alt="" className="profile_logo"></img>
                              
                        }
                        </div>
                        {this.props.isPersonLog === true &&
                        <label className="change-profile-logo">
                        <label htmlFor="logo"><MdPhotoCamera className="icon-add-photo"></MdPhotoCamera></label>
                        <label htmlFor="logo"><p>Schimba imaginea</p></label>
                        <input id="logo" name="logo" type="file" onChange={this.changeInput} />
                        </label>}

                        <div className="more-info">
                            <p>{this.props.contactEmail}</p>
                            <p>{this.props.phone}</p>
                            <div className="container-profile-link">
                                  <a className="profile-link" href={this.props.link}>Pagina oficiala</a>
                            </div>
                        </div>
                    </div>
                    {this.state.images.length !== 0
                    &&
                    <div className="profile-association-card-additional-photos">
                        <h1>{this.state.title}</h1>
                        <div className="associations-photos">
                            <AiFillCaretLeft onClick={this.moveLeft} style={{marginLeft:"5%"}} className="arrow-icon"/>
                            {this.state.images !== [] &&
                            this.state.images.slice(this.state.start,this.state.start+2).map((element,index)=>{
                                return <img className="associations-photos-style" src={element} key={index} alt=""/>
                            })}
                            <AiFillCaretRight onClick={this.moveRight} className="arrow-icon"/>
                        </div> 
                        {this.props.isPersonLog === true &&
                                                <div className="profil-card-add-photo-container">
                                                <label htmlFor="photos"> <FaFolderPlus className="modal-add-icon"></FaFolderPlus></label>
                                                <input id="photos" name="photos" type="file" multiple onChange={this.sendImages} />
                                        </div>}

                    </div>
    }
                </div>
            <div className="profile-association-card-general">
            <div>
                    <label className="profile-association-card-general-title">Motto Asociatie</label>
                    <p className="profile-association-card-general-info">{this.props.motto}</p>
                    </div>
                    <div>
                    <label className="profile-association-card-general-title">Despre Asociatie</label>
                    <p className="profile-association-card-general-info">{this.props.description}</p>
                    </div>
            </div>
          </div>
        );
    }
}

export default withRouter(CardProfile);