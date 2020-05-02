import React from 'react';
import './style.scss';
import image from '../../images/charity-donation_18591-47988.jpg'
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text';


class showAssociations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      associations:[]
    }
  }
  componentDidMount(){
      fetch('/listAssociations')
      .then((response) => response.json())
      .then(associationsList => {
          this.setState({ associations: associationsList });
      });
  }


  render(){
    console.log(this.state.associations);
    return (
      <div>
        <section>
          <div className="associations-page">
            {this.state.associations.map((element,index)=>{
              return(
                <div key={index} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    {element.logo === null ? <img src={image} alt="Avatar" className="image-card"/> : <img src={element.logo} alt="Avatar" className="image-card"/>}
                  </div>
                  {element.associationsdescription === null ?
                  <div className="flip-card-back-without-description">
                      <h1 style={{marginBottom:"15px", marginTop:"10px"}}>{element.associationname}</h1> 
                      <div className="container-profile-link">
                        <Link className="profile-link" to={{ pathname:'/profileAssociation',aboutProps:{id:element.associationid}}}>Vezi profilul asociatiei </Link>
                      </div>
                  </div>:
                  <div className="flip-card-back">
                      <h1 style={{marginBottom:"15px", marginTop:"10px"}}>{element.associationname}</h1> 
                  
                      <ShowMoreText lines={4} more={null}>
                              {element.associationsdescription}
                      </ShowMoreText>
                      <div className="container-profile-link">
                        <Link className="profile-link" to={{ pathname:'/profileAssociation',aboutProps:{id:element.associationid}}}>Vezi profilul asociatiei </Link>
                      </div>
                  </div>}
                </div>
              </div>
              );
            })}
            </div>
          </section>
      </div>
    )
  }

}
export default showAssociations;