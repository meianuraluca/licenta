import React from 'react';
import './style.scss';
import image from '../../images/charity-donation_18591-47988.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text';
import isEmptyArrayBuffer from 'is-empty-array-buffer'



class showAssociations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      associations:[],
      associationsLogo:[]
    }
  }
  componentDidMount(){
      fetch('/listAssociations')
      .then((response) => response.json())
      .then(associationsList => {
        this.setState({associations:associationsList})
          let n = associationsList.length
          for (let index = 0; index < n; index++) {

            axios.get('http://localhost:5000/profileLogoAssociation', {
                params:{email:associationsList[index].associationsemail},
                responseType:'arraybuffer'  
            })
            .then(res => {
                
                if(isEmptyArrayBuffer(res.data)){
                  let id  = this.state.associations[index].associationid
                  this.setState({associationsLogo:[...this.state.associationsLogo,id,null]})
                  
                }
                else{
                  let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                  let url = URL.createObjectURL(matrixBlob)
                  let id  = this.state.associations[index].associationid
                  this.setState({associationsLogo:[...this.state.associationsLogo,id,url]})
                }

            })
            .catch(err => console.warn(err));
            
        }
       
      });
  }


  render(){
    return (
      <div>
        <section>
          {this.state.associationsLogo.length === (2* this.state.associations.length) &&
          <div className="associations-page">
            {this.state.associations.map((element,index)=>{
              let indexPhoto = this.state.associationsLogo.indexOf(element.associationid) + 1;
              return(
                <div key={index} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    {this.state.associationsLogo[indexPhoto] === null ? <img src={image} alt="Avatar" className="image-card"/> : <img src={this.state.associationsLogo[indexPhoto]} alt="Avatar" className="image-card"/>}
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
                        <Link className="profile-link" to={{ pathname:'/profileAssociationForUser',aboutProps:{id:element.associationid}}}>Vezi profilul asociatiei </Link>
                      </div>
                  </div>}
                </div>
              </div>
              );
            })}
            </div>
  }
          </section>
      </div>
    )
  }

}
export default showAssociations;