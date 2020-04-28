import React from 'react';
import './addPhoto.css'
import Image from '../addPhoto/image'

class AddPhoto extends React.Component{
  constructor(props){
    super(props)
    this.addImage = this.addImage.bind(this);
    this.state={
      images:[]
    }
  }

  addImage = (image) =>{
    this.setState({images:[...this.state.images,image]})
    this.props.photo(image);
  }

  render(){
    console.log(this.state.images)
    return (
      <div className="photo">
        <div className="photo-container">
          <Image index={1} photo={this.state.images[0]} addImage={this.addImage}></Image>
          <Image index={2} photo={this.state.images[1]} addImage={this.addImage}></Image>
          <Image index={3} photo={this.state.images[2]} addImage={this.addImage}></Image>
        </div>
        <div className="photo-container">
          <Image index={4} photo={this.state.images[3]} addImage={this.addImage}></Image>
          <Image index={5} photo={this.state.images[4]} addImage={this.addImage}></Image>
          <Image index={6} photo={this.state.images[5]} addImage={this.addImage}></Image>
          </div>
      </div>
    )
  }

}
export default AddPhoto;