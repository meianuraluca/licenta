import React from 'react';
import '../style.scss';
import {Link} from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

class Announce extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.infoAd.announceId,
            title: this.props.infoAd.title,
            description: this.props.infoAd.announcedescription
        }
    }
    render(){
        return(
            <div className="col-sm-4">
            <div className="card text-center">
                <div className="title">
                <h2>{this.state.title}</h2>
                </div>
                <div className="post-description">
                    <ShowMoreText lines={3} more={null}>
                        {this.state.description}
                    </ShowMoreText>
                </div>   
                <Link to={'/showAdd'}>Vezi anuntul </Link>
            </div>
            </div>

);
    }
}

export default Announce;