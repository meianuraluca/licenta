import React from 'react'
import './profileAssociation.scss'
import Modal from './modal/modal'
import axios from 'axios'
import getClaims from '../../../utils/utils'
import CardProfile from './cardProfile/cardProfile'
import isEmptyArrayBuffer from 'is-empty-array-buffer'

class ProfileAssociation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstTime:false,
            id:-1,
            name:"",
            logo:null,
            description:"",
            phone:"",
            link:"",
            motto:"",
            contactEmail:"",
            isPersonLog:false
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
    componentDidUpdate(){
        if(this.props.location.aboutProps !== undefined){
            localStorage.setItem('edit','true')
        }
        if (localStorage.getItem('firstTime') === 'true') {
            this.setState({firstTime: true})
            localStorage.setItem('firstTime','false');
          }

    }
    dataFromBackend=(ok)=>{
        let access = window.localStorage.getItem('accessToken');
        if(access !== null){
            access = getClaims(access);
            axios
            .get("http://localhost:5000/infoAssociation",{
                params:{email:access.identity},
            })
            .then((response) => response.data[0])
            .then(info => { 
                if(info.associationsemail === access.identity)
                    this.setState({isPersonLog:true, id:info.associationid,name:info.associationname,description:info.associationsdescription,link:info.linksite,motto:info.motto,contactEmail:info.contactemail,phone:info.phone});
                else
                    this.setState({isPersonLog:false, id:info.associationid,name:info.associationname,description:info.associationsdescription,link:info.linksite,motto:info.motto,contactEmail:info.contactemail,phone:info.phone});
                axios.get('http://localhost:5000/profileLogoAssociation', {
                    params:{email:access.identity},
                    responseType:'arraybuffer'  
                })
                .then(res => {
                    let url;
                    if(isEmptyArrayBuffer(res.data))
                        url = null
                    else{
                        let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                        url = URL.createObjectURL(matrixBlob);
                    }

                    if(ok===1){
                        this.setState({logo:url, firstTime:false });
                        localStorage.setItem('edit','false')
                    }
                    else
                        this.setState({logo:url})
                })
                .catch(err => console.warn(err));
            });
        }


    }
    hideModal = () => {
        this.dataFromBackend(1);
     };
    render(){
        let edit = localStorage.getItem('edit')
        return(
            <div>
                {this.state.firstTime === false 
                ? this.state.id!==-1 &&<CardProfile 
                               id={this.state.id}
                               isPersonLog={this.state.isPersonLog}
                               name ={this.state.name}
                               phone={this.state.phone} 
                               link = {this.state.link} 
                               logo = {this.state.logo}
                               motto = {this.state.motto}
                               description ={this.state.description} 
                               contactEmail = {this.state.contactEmail}
                ></CardProfile>
                : edit === 'true' ?<Modal show={this.state.firstTime} handleClose={this.hideModal} edit={true}></Modal> :<Modal show={this.state.firstTime} handleClose={this.hideModal} edit={false}></Modal>
                }
            </div>


        );
    }
}

export default ProfileAssociation;