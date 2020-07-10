import React from 'react';
import './style.scss';
import Loader from 'react-loader-spinner';
import Announce from './announce/announce';
import Pagination from '../pagination/pagination'
import FilterComponent from '../filtering/filterComponent';

class pageAnnounces extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      announces:[],
      chooseCategory:'toate',
      filterAnnounces:-1,
      numberAnnounce:-1,
      start:0,
      categoryOp:[
        { value:'toate',label:'Toate'},
        { value: 'jucarii', label:'Jucarii'},
        { value: 'mobila', label: 'Mobila' },
        { value: 'electronice', label: 'Electronice' },
        { value: 'haine', label: 'Haine' },
        { value: 'ingrijire', label:'Ingrijire personala'},
        { value: 'altele', label: 'Altele'},

      ]
    }
  }
  componentDidMount(){
      fetch('/listAnnounces')
      .then((response) => response.json())
      .then(booksList => {
          console.log(booksList)
          let lung = booksList.length;
          this.setState({ announces: booksList,numberAnnounce:lung,filterAnnounces:lung, loading:false });
      });
  }

  changeStart=(data)=>{
      let next = this.state.start +(-1)*(data *12)
      this.setState({start:next})
  }

  changeCategory=(index)=>{
    this.setState({chooseCategory:this.state.categoryOp[index].value})
    console.log(this.state.categoryOp[index].value)
    if(this.state.categoryOp[index].value !=='toate'){
        let number = 0
        this.state.announces.forEach((element)=>{
          if(element.category ===this.state.categoryOp[index].value){
            number  = number + 1;
          }
        })
        this.setState({filterAnnounces:number})
    }
    else{
      this.setState({filterAnnounces:this.state.numberAnnounce})
    }
    
  }

  render(){
    console.log(this.state)
    return (
      <React.Fragment>
        {this.state.loading === true 
        ? <div style={{textAlign:"center", marginTop:'15%'}}><Loader type="Oval" color="#000" height={100} width={100}/></div>
        :<div>
                <FilterComponent changeCategory={this.changeCategory} options={this.state.categoryOp} />
                <div className="row">
                    {this.state.announces.map((ad,index) => {
                      if(this.state.filterAnnounces > 12){
                        if(index>= this.state.start && index<(this.state.start+12))
                          if(this.state.chooseCategory === 'toate')
                            return <Announce user={false} key={index}  infoAd ={ad}/>
                          else
                            if(this.state.chooseCategory === ad.category)
                              return <Announce user={false} key={index} infoAd={ad}/>
                      }
                      else{
                        if(this.state.chooseCategory === 'toate')
                        return <Announce user={false} key={index}  infoAd ={ad}/>
                      else
                        if(this.state.chooseCategory === ad.category)
                          return <Announce user={false} key={index} infoAd={ad}/>
                      }
                  })}      
                </div>
                {this.state.filterAnnounces >12 && <Pagination changeStart={this.changeStart} numberPerPage={12} numberElem={this.state.numberAnnounce} /> } 
        </div>
  }
      </React.Fragment>
    )
  }

}
export default pageAnnounces;