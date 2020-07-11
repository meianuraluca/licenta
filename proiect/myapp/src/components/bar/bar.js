import React from 'react'
import image from '../../images/logo 1.png'
import './bar.scss'

function Bar(){
    return(
        <div className="name-and-logo-bar">
            <img src={image}/>
            <h1><span>Oferă  &nbsp;speranță!</span></h1>
            <p> "Ce faci pentru tine dispare odată cu tine, ce faci pentru alții rămâne pentru eterninate." Albert Einstein</p>
        </div>
    )
}
export default Bar;