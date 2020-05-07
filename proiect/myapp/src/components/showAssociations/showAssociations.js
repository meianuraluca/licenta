import React from 'react';
import './style.scss';
import image from '../../images/charity-donation_18591-47988.jpg'
import axios from 'axios'
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text';
import isEmptyArrayBuffer from 'is-empty-array-buffer'
import Pagination from '../pagination/pagination';



class showAssociations extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      associations:[],
      associationsLogo:[],
      numberAssociations:-1,
      start:0
    }
  }
  componentDidMount(){
      fetch('/listAssociations')
      .then((response) => response.json())
      .then(associationsList => {
        let n = associationsList.length
        this.setState({associations:associationsList,numberAssociations:n})
          
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
  changeStart=(data)=>{
    let next = this.state.start +(-1)*(data *12)
    this.setState({start:next})
}



  render(){
    return (
      <div>
        <section>
          {this.state.associationsLogo.length === (2* this.state.associations.length) &&
          <div className="associations-page">
            {this.state.associations.map((element,index)=>{
              if(index>= this.state.start && index<(this.state.start+12)){
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
                          <Link className="profile-link" to={{ pathname:'/profileAssociationForUser',aboutProps:{id:element.associationid}}}>Vezi profilul asociatiei </Link>
                        </div>
                    </div>:
                    <div className="flip-card-back">
                        <h1 style={{marginBottom:"15px", marginTop:"10px"}}>{element.associationname}</h1> 
                    
                        <ShowMoreText lines={4} more={null} >
                                {element.associationsdescription}
                        </ShowMoreText>
                        <div className="container-profile-link">
                          <Link className="profile-link" to={{ pathname:'/profileAssociationForUser',aboutProps:{id:element.associationid}}}>Vezi profilul asociatiei </Link>
                        </div>
                    </div>}
                  </div>
                </div>
                );
                  }
            })}
             {this.state.numberAnnounce >12 && <Pagination changeStart={this.changeStart} numberPerPage={12} numberElem={this.state.numberAnnounce} /> } 
            </div>
  }
       
          </section>
      </div>
    )
  }

}
export default showAssociations;