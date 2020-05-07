import React from 'react';
import './style.scss';
import Announce from './announce/announce';
import ReactPaginate from "react-paginate";

class pageAnnounce extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      announces:[]
    }
  }
  componentDidMount(){
      fetch('/listAnnounces')
      .then((response) => response.json())
      .then(booksList => {
          this.setState({ announces: booksList });
      });
  }

  render(){
    return (
        <React.Fragment>
                <div className="row">
                {this.state.announces.map((ad,index) => (
                    <Announce key={index}  infoAd ={ad}/>
                ))}        
                </div>
            </React.Fragment>
    )
  }

}
export default pageAnnounce;