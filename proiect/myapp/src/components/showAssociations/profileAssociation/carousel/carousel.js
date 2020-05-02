import React from 'react'
import './carousel.scss'
import {Slide} from 'react-slideshow-image';

class Carousel extends React.Component{
    constructor(props){
        super(props)
        this.state={
            index:[]
        }
    }
    componentDidMount(){
        let vect = []
        let n = this.props.photos.length;
        let i=0;
        while(i<n){
            vect.push(i);
            i = i + 2;
        }
        this.setState({index:[...vect]})
    }

    render(){
        const properties = {
            duration: 3000,
            transitionDuration: 500,
            infinite: true,
            arrows: true,
            pauseOnHover: true
            }
        return(
            <div className="profile-slide-container">
            <Slide {...properties}>
                {this.props.photos.map((elem,index)=>{
                    return(                    
                    <div key={index} className="each-slide">
                        <img className="profile-carousel-imagine" src={elem} alt="carusel1"></img>
                    </div>
                    );
                })}
            </Slide>
          </div>
        );
    }

}

export default Carousel;