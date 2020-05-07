import React from 'react'
import{IoMdArrowRoundBack,IoMdArrowRoundForward} from 'react-icons/io'
import './pagination.scss'

class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state={
            nrPage:-1,
            activePage:[]
        }
    }
    componentDidMount(){
        let nrPage = Math.floor(this.props.numberElem/this.props.numberPerPage) +1;
        let vect = [];
        for(let i=0;i<nrPage;i++){
            if(i===0){
                vect.push('active')
            }
            else{
                vect.push('')
            }
        }
        this.setState({nrPage:nrPage,activePage:[...vect]})
    }
    changePage=(poz)=>{
        let index = this.state.activePage.indexOf('active');
        this.props.changeStart(index-poz)
        if(poz !== index){
            let newState = this.state.activePage;
            newState[index]='';
            newState[poz] = 'active';
            this.setState({activePage:[...newState]})
    
        }
    }
    moveRight = () => {
        let index = this.state.activePage.indexOf('active');
        console.log(index)
        if(index!==(this.state.nrPage-1)){
            let newState = this.state.activePage;
            newState[index]='';
            newState[index+1] = 'active';
            this.setState({activePage:[...newState]})
            this.props.changeStart(-1)
        }
        
    }
    moveLeft = () => {
        let index = this.state.activePage.indexOf('active');
        if(index!==0){
            let newState = this.state.activePage;
            newState[index]='';
            newState[index-1] = 'active';
            this.setState({activePage:[...newState]})
            this.props.changeStart(1)
        }
    }

    render(){
        return(		
            <div className="pagination">
                <p onClick={this.moveLeft} className="pagination-newer"><IoMdArrowRoundBack className="pagination-newer-arrow"/></p>
                <span className="pagination-inner">
                    {this.state.activePage.map((element, index)=>{
                        return( <p key={index}  onClick={()=>this.changePage(index)} className={`pag-${element}`}>{index+1}</p>)
                    })}
                </span>
                <p onClick={this.moveRight} className="pagination-older" ><IoMdArrowRoundForward className="pagination-older-arrow"/></p>
            </div>)
    }
}

export default Pagination;