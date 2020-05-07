import React from 'react'
import './profileAssociation.scss'
import axios from 'axios'
import getClaims from '../../../utils/utils'
import CardProfile from './cardProfile/cardProfile'
import isEmptyArrayBuffer from 'is-empty-array-buffer'

class ProfileAssociationForUser extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
        if(localStorage.getItem("accessToken") !== null){
            let access = window.localStorage.getItem('accessToken');
            if(access !== null){
                access = getClaims(access);
                axios
                .get("http://localhost:5000/infoAssociation",{
                    params:{id:this.props.location.aboutProps.id},
                })
                .then((response) => response.data[0])
                .then(info => { 
                    if(info.associationsemail === access.identity)
                        this.setState({isPersonLog:true, id:info.associationid,name:info.associationname,description:info.associationsdescription,link:info.linksite,motto:info.motto,contactEmail:info.contactemail,phone:info.phone});
                    else
                        this.setState({isPersonLog:false, id:info.associationid,name:info.associationname,description:info.associationsdescription,link:info.linksite,motto:info.motto,contactEmail:info.contactemail,phone:info.phone});
                    axios.get('http://localhost:5000/profileLogoAssociation', {
                        params:{email:info.associationsemail},
                        responseType:'arraybuffer'  
                    })
                    .then(res => {
                        if(isEmptyArrayBuffer(res.data))
                            this.setState({logo:null})
                        else{
                            let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                            let url = URL.createObjectURL(matrixBlob);
                            this.setState({logo:url});
                        }
    
       
                    })
                    .catch(err => console.warn(err));
                });
            }
        }
      
    }
    render(){
        return(
            <div>
                {this.state.id!==-1 &&<CardProfile 
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
                }
            </div>


        );
    }
}

export default ProfileAssociationForUser;