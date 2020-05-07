import React from 'react';
import './style.scss';
import Announce from './announce/announce';
import Pagination from '../pagination/pagination'

class pageAnnounce extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      announces:[],
      numberAnnounce:-1,
      start:0
    }
  }
  componentDidMount(){
      fetch('/listAnnounces')
      .then((response) => response.json())
      .then(booksList => {
          let lung = booksList.length;
          this.setState({ announces: booksList,numberAnnounce:lung });
      });
  }

  changeStart=(data)=>{
      let next = this.state.start +(-1)*(data *12)
      this.setState({start:next})
  }

  render(){
    return (
        <div>
                <div className="row">
                    {this.state.announces.map((ad,index) => {
                      console.log(index)
                      if(index>= this.state.start && index<(this.state.start+12))
                          return <Announce key={index}  infoAd ={ad}/>
                  })}      
                </div>
                {this.state.numberAnnounce >12 && <Pagination changeStart={this.changeStart} numberPerPage={12} numberElem={this.state.numberAnnounce} /> } 
        </div>
    )
  }

}
export default pageAnnounce;