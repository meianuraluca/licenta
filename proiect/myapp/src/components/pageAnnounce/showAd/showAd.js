import React from 'react';
import axios from 'axios';
import image from '../../../images/Gift Giving.jpg'
import Loader from 'react-loader-spinner'
import './showAd.scss';
import { withRouter } from 'react-router-dom';

class showAd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images:[],
            loading:true
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
                if(n === 0)
                    this.setState({loading:false})
                for (let index= response.data.minId; index < n; index++) {
                    console.log(index)
                    axios.get('http://localhost:5000/oneImage', {
                        params:{id:index},
                        responseType:'arraybuffer'  
                    })
                .then(res => {
                    let matrixBlob = new Blob([res.data], {type:"image/jpg"}); 
                    let url = URL.createObjectURL(matrixBlob)
                    if(index !== (n-1))
                        this.setState({images:[...this.state.images,url]})
                    else    
                        this.setState({images:[...this.state.images,url],loading:false})
                })
                .catch(err => console.warn(err));
                }
                console.log(response.data)
            })
            .catch(err => console.warn(err));
        }
    }


    render(){
        return(
            <div className="card_announce">
                {this.state.images !==null && 
                <div className="card_announce_container">
                            <div>
                                <div className="square_one">
                                    <div className="square_one_left"></div>
                                    <div className="square_one_right">
                                        <div>
                                            <h2 className="stars"><span>{this.props.location.aboutProps.title}</span></h2>
                                            <p>{this.props.location.aboutProps.description}</p>
                                        </div>
                                        <div style={{textAlign:"end"}}>
                                            <p><span>Persoana de contact: </span> {this.props.location.aboutProps.name}</p>
                                            <p><span>Adresa de email: </span>{this.props.location.aboutProps.email}</p>
                                            <p><span>Numar de telefon: </span>{this.props.location.aboutProps.phone}</p>
                                            <p><span>Localitate: </span>{this.props.location.aboutProps.city}</p>
                                        </div>
                                    </div>
                                </div>
                                {this.state.images.length === 0 ?
                                <img src={image} alt="" className="default-image"></img>
                                :<div className="square_two">
                                {this.state.loading === true ?
                                <div style={{marginLeft:"42%" ,marginTop:'28%'}}><Loader type="Oval" color="#000" height={100} width={100}/></div>
                                :this.state.images.map((elem,index)=>{
                                    let type = ''
                                    if(this.state.images.length ===1)
                                        type = 'one'
                                    if(this.state.images.length === 2)
                                        type = 'two'
                                    if(this.state.images.length === 3)
                                        type = 'three'
                                        return(  
                                            <div key={index} className={`card_announce_image${type}`}>
                                                <div class="imgBx">
                                                    <img className="uploadImage" src={elem} alt="upload"></img>
                                                </div>
                                            </div>
    
);
                                    })
                                    }
                                </div>
    }
                            </div>
                                
                    </div>
                }
                
            </div>

);
    }
}

export default withRouter(showAd);