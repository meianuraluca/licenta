import React from 'react'
import './cardProfile.scss'
import {MdPerson} from 'react-icons/md'

class CardProfile extends React.Component{

    render(){
        return(
            <div class="profile-association-card">
            <div class="profile-association-card-additional">
                    <div class="profile-association-card-user-card">
                                 {this.props.logo === null?
                                        <MdPerson className="profile_logo"></MdPerson> :
                                        <img src={this.props.logo} className="profile_logo"></img>
                                }
                    </div>
                    <div class="more-info">
                    </div>
            </div>
            <div class="profile-association-card-general">
              <h1>Jane Doe</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
              <span class="more">Mouse over the card for more info</span>
            </div>
          </div>
        );
    }
}

export default CardProfile;