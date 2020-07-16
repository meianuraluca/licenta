import React from 'react';
import './filterComponent.scss'
import {FaFilter} from 'react-icons/fa'

function FilterComponent(props){
    

    return(
        <React.Fragment>
            <div className="container-filters">
            <p className="button-filters"><FaFilter/>Filtrează anunțurile</p>   
            <ul className="filters">
                {props.options.map((element,index)=>{
                    return(
                        <div  key={index}  className="inputGroup">
                            <div onClick={()=>props.changeCategory(index)} id="container">
                                <input type="radio" name="check"/>
                                <label htmlFor="check"><div></div></label>
                            </div>
                            <label className="name-category">{element.label}</label>
                      </div>
                    )
                })}
            </ul>
            </div>
        </React.Fragment>
    )
}
export default FilterComponent;