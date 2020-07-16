import React from 'react';
import '../style.scss';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import ShowMoreText from 'react-show-more-text';

class Announce extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.infoAd.announceid,
            title: this.props.infoAd.title,
            description: this.props.infoAd.announcedescription,
            name: this.props.infoAd.personcontact,
            email:this.props.infoAd.announceemail,
            phone:this.props.infoAd.phone,
            city:this.props.infoAd.userlocation,
            show:false
        }
    }
    deleteAnnouce = ()=>{          
        axios
            .get("http://localhost:5000/deleteAd",{
                params:{id:this.state.id},
            })
            .then((response) => {
                if(response.data === "done")
                window.location.reload(false);
            })
            .catch(err => console.warn(err));
    }
    render(){
        console.log(this.state)
        return(
            <React.Fragment>

                <div className="col-sm-4">
                <div className="card text-center">
                {this.props.user === true && <div className="container-icon-edit">
                    
                    <Link className="editAd" to={{
                        pathname:'/editAd',
                        aboutProps:{id:this.state.id}}} >
                            <FaEdit className="editAd-icon"></FaEdit>
                        </Link>
                    <MdDelete onClick={this.deleteAnnouce} className="deleteAd"></MdDelete>
                    </div>}
                
                    <div className="title">
                    <h2>{this.state.title}</h2>
                    </div>
                    <div className="post-description">
                        <ShowMoreText lines={4} more={null}>
                            {this.state.description}
                        </ShowMoreText>
                    </div>  
                    <Link className="show-ad" style={{display:"block"}}  to={{
                        pathname:'/showAdd',
                        aboutProps:{id:this.state.id,
                                    title:this.state.title,
                                    description:this.state.description,
                                    name:this.state.name,
                                    email:this.state.email,
                                    phone:this.state.phone,
                                    city:this.state.city}
                    }} >Vezi anunțul </Link>
                </div>
                </div>
            </React.Fragment>

);
    }
}

export default Announce;