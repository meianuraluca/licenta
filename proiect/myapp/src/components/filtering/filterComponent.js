import React from 'react';
import './filterComponent.scss'

function FilterComponent(props){
    

    return(
        <React.Fragment>
            <ul className="filters">
                {props.options.map((element,index)=>{
                    return(
                        <div  key={index}  className="inputGroup">
                            <div onClick={()=>props.changeCategory(index)} id="container">
                                <input type="radio" name="check"/>
                                <label for="check"><div></div></label>
                            </div>
                            <label className="name-category">{element.label}</label>
                      </div>
                    )
                })}
            </ul>
        </React.Fragment>
    )
}
export default FilterComponent;