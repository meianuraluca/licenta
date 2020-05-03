import React from 'react'
import './cardProfile.scss'
import {MdPerson} from 'react-icons/md'

class CardProfile extends React.Component{

    render(){
      console.log(this.props)
        return(
            <div className="profile-association-card">
                <div className="profile-association-card-additional">
                    <div className="profile-association-card-user-card">
                        <h2 className="profile-card-name">{this.props.name}</h2>
                        {this.props.logo === null?
                              <MdPerson className="profile_logo"></MdPerson> :
                              <img src={this.props.logo} alt="" className="profile_logo"></img>
                        }
                        <div className="more-info"v>
                            <p>{this.props.contactEmail}</p>
                            <p>{this.props.phone}</p>
                            <div className="container-profile-link">
                                  <a className="profile-link" href={this.props.link}>Pagina oficiala</a>
                            </div>
                        </div>
                    </div>
                    <div className="profile-association-card-additional-photos">
      
                    </div>
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

export default CardProfile;