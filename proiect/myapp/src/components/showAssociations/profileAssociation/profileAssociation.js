import React from 'react'
import './profileAssociation.scss'
import {MdPerson} from 'react-icons/md'
import Carousel from './carousel/carousel'
import Modal from './modal/modal'

class ProfileAssociation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstTime:true,
            name:"",
            description:"",
            logo:null,
            images:["https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-2.jpg","https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-3.jpg"],
            link:"",
            motto:"",
            phone:""
        }
    }
    componentDidMount(){
        if (localStorage.getItem('firstTime') === 'true') {
            this.setState({firstTime: true})
            localStorage.setItem('firstTime','false');
          }
      
    }
    hideModal = () => {
        this.setState({ firstTime: false });
      };
    render(){
        return(
            <div>
                {this.state.firstTime === true ?
                <Modal show={this.state.firstTime} handleClose={this.hideModal}>
                </Modal>:
                            <div className="profile-container">
                            <div className="left">
                                <div className="photo-left">
                                    {this.state.logo === null?
                                    <MdPerson className="profile_logo"></MdPerson> :
                                    <img className="profile_logo"></img>
                                    }
                                </div>
                                <h4 className="name">Jane Doe</h4>
                                <p className="info">UI/UX Designer</p>
                                <p className="info">jane.doe@gmail.com</p>
                                <p className="desc">Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in France. I really enjoy photography and mountains.</p>
                            </div>
                            <div className="right">
                                <ul className="nav">
                                <li>Gallery</li>
                                <li>About</li>
                                </ul>
                                <div className="profile-gallery">
                                    <Carousel photos={this.state.images}/>
                                </div>
                            </div>
                        </div>
                }
            </div>


        );
    }
}

export default ProfileAssociation;