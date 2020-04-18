import React from 'react';
import './style.scss';

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
              <div className="associations-container">
                <div className="row">      
                </div>
              </div>
            </div>
          </section>
      </div>
    )
  }

}
export default showAssociations;