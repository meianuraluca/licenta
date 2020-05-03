import React from 'react'
import './profileAssociation.scss'
import Modal from './modal/modal'
import axios from 'axios'
import getClaims from '../../../utils/utils'
import CardProfile from './cardProfile/cardProfile'

class ProfileAssociation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstTime:false,
            name:"",
            logo:null,
            description:"",
            phone:"",
            link:"",
            motto:"",
            contactEmail:"",
            images:["https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-2.jpg","https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-3.jpg"],
        }
    }
    componentDidMount(){
        if (localStorage.getItem('firstTime') === 'true') {
            this.setState({firstTime: true})
            localStorage.setItem('firstTime','false');
          }
        if(localStorage.getItem("accessToken") !== null){
            this.dataFromBackend(0);
        }
      
    }
    dataFromBackend=(ok)=>{
        let access = window.localStorage.getItem('accessToken');
        access = getClaims(access);
        axios
        .get("http://localhost:5000/infoAssociation",{
            params:{email:access.identity},
        })
        .then((response) => response.data[0])
        .then(info => { 
            console.log("ce naiba")
            this.setState({name:info.associationname,description:info.associationsdescription,link:info.linksite,motto:info.motto,contactEmail:info.contactemail,phone:info.phone});
            axios.get('http://localhost:5000/profileLogoAssociation', {
                params:{email:access.identity},
                responseType:'arraybuffer'  
            })
            .then(res => {
                let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                let url = URL.createObjectURL(matrixBlob);
                if(ok===1)
                    this.setState({logo:url, firstTime:false });
                else
                    this.setState({logo:url})
            })
            .catch(err => console.warn(err));
        });

    }
    hideModal = () => {
        console.log("intru in hideModal")
        this.dataFromBackend(1);
     };
    render(){
        console.log(this.state)
        return(
            <div>
                {this.state.firstTime === true 
                ? <Modal show={this.state.firstTime} handleClose={this.hideModal}></Modal>
                : <CardProfile name ={this.state.name}
                               phone={this.state.phone} 
                               link = {this.state.link} 
                               logo = {this.state.logo}
                               motto = {this.state.motto}
                               description ={this.state.description} 
                               contactEmail = {this.state.contactEmail}
                ></CardProfile>

                        //     <div className="profile-container">
                        //     <div className="left">
                        //         <div className="photo-left">
                        //             {this.state.logo === null?
                        //             <MdPerson className="profile_logo"></MdPerson> :
                        //             <img src={this.state.logo} className="profile_logo"></img>
                        //             }
                        //         </div>
                        //         <h4 className="name">{this.state.name}</h4>
                        //         <p className="info">{this.state.contactEmail}</p>
                        //         <p className="desc">{this.state.motto}</p>
                        //     </div>
                        //     <div className="right">
                        //         <ul className="nav">
                        //         <li>Gallery</li>
                        //         <li>About</li>
                        //         </ul>
                        //         <div className="profile-gallery">
                        //             <Carousel photos={this.state.images}/>
                        //         </div>
                        //     </div>
                        // </div>
                }
            </div>


        );
    }
}

export default ProfileAssociation;