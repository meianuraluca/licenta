import React from 'react';
import './style.scss';
import Announce from './announce/announce';
import getClaims from '../../utils/utils'
import axios from 'axios'
import Pagination from '../pagination/pagination'


class PageUserAnnounce extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      announces:[],
      numberAnnounce:-1,
      start:0
    }
  }
  componentDidMount(){
    let aceess = localStorage.getItem("accessToken");
    aceess = getClaims(aceess)
    axios.get('http://localhost:5000/listUserAnnounces', {
                params:{email:aceess.identity},
            })
    .then(res => {
      let lung = res.data.length;
      this.setState({announces:res.data,numberAnnounce:lung})
                

            })
    .catch(err => console.warn(err));
  }

  changeStart=(data)=>{
    let next = this.state.start +(-1)*(data *12)
    this.setState({start:next})
}

  render(){
    return (
      <React.Fragment>
                <div className="row">
                {this.state.announces.map((ad,index) => {
                      console.log(index)
                      if(index>= this.state.start && index<(this.state.start+12))
                          return <Announce key={index}  infoAd ={ad}/>
                  })}           
                </div>
                {this.state.numberAnnounce >12 && <Pagination changeStart={this.changeStart} numberPerPage={12} numberElem={this.state.numberAnnounce} /> } 
      </React.Fragment>
    )
  }

}
export default PageUserAnnounce;