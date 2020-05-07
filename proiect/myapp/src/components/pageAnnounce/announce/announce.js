import React from 'react';
import '../style.scss';
import {Link} from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';

class Announce extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id : this.props.infoAd.announceid,
            title: this.props.infoAd.title,
            description: this.props.infoAd.announcedescription
        }
    }
    render(){
        //console.log(this.state)
        return(
            <div className="col-sm-4">
            <div className="card text-center">
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
                    aboutProps:{id:this.state.id,title:this.state.title,description:this.state.description}
                }} >Vezi anuntul </Link>
            </div>
            </div>

);
    }
}

export default Announce;