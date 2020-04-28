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
export default pageAnnounce;