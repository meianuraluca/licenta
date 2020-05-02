import React from 'react';
import axios from 'axios';
import './showAd.scss';

class showAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images:[],
            loading:false
        }
    }

    componentDidMount(){
        if(this.props.location.aboutProps !== undefined){
            axios
            .get("http://localhost:5000/allImages",{
                params:{id:this.props.location.aboutProps.id},
            })
            .then(response => {
                let n = response.data.minId+response.data.numberImage;
                for (let index= response.data.minId; index < n; index++) {
                    axios.get('http://localhost:5000/oneImage', {
                        params:{id:index},
                        responseType:'arraybuffer'  
                    })
                .then(res => {
                    let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                    let url = URL.createObjectURL(matrixBlob)
                    console.log(url)
                    this.setState({images:[...this.state.images,url]})
                })
                .catch(err => console.warn(err));
                }
                console.log(response.data)
            })
            .catch(err => console.warn(err));
        }
        this.setState({loading:true})
    }


    render(){
        if(this.props.location.aboutProps !== undefined){
            console.log(this.props.location.aboutProps.id)
        }
        console.log(this.state)
        
        return(
            <div className="card_announce">
                {this.state.images !==null && 
                <div className="card_announce_container">
                        {this.state.loading === true &&
                            <div>
                                <div className="square_one">
                                    <div className="square_one_left"></div>
                                    <div className="square_one_right">
                                        <h2>{this.props.location.aboutProps.title}</h2>
                                        <p>{this.props.location.aboutProps.description}</p>
                                    </div>
                                </div>
                                <div className="square_two">
                                {this.state.images.map((elem,index)=>{
                                        // return <img key={index} className="uploadImage" src={elem} alt="upload"></img>
                                        return(  
                                            <div key={index} className="card_announce_image">
                                                <div class="imgBx">
                                                    <img className="uploadImage" src={elem} alt="upload"></img>
                                                </div>
                                                <div className="announce_details">
                                                    <h2>SomeOne Famous</h2>
                                                </div>
                                            </div>
    
);
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                }
                
            </div>

);
    }
}

export default showAd;