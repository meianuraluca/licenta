import React from 'react';
import './style.scss';
import Announce from './announce/announce';
import getClaims from '../../utils/utils'
import axios from 'axios'


class PageUserAnnounce extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      announces:[]
    }
  }
  componentDidMount(){
    let aceess = localStorage.getItem("accessToken");
    aceess = getClaims(aceess)
    axios.get('http://localhost:5000/listUserAnnounces', {
                params:{email:aceess.identity},
            })
    .then(res => {
        this.setState({announces:res.data})
                

            })
    .catch(err => console.warn(err));
  }

  render(){
    return (
      <div>
        <section>
          <div className="container-fluid">
              <div className="post-container">
                <div className="row">
                {this.state.announces.map((ad,index) => (
                    <Announce key={index}  infoAd ={ad}/>
                ))}        
                </div>
              </div>
            </div>
          </section>
          {/* <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/> */}
      </div>
    )
  }

}
export default PageUserAnnounce;