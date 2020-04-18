import React from 'react';
import './contactData.css'



function ContactData(props){
        return (
            <form className="contact">
                <div className="contact-form-group">
                    <label htmlFor="namePerson">Persoana de contact:</label>
                    <input type="text" name="namePerson" id="namePerson" onChange={props.changeInput}/>
                </div>
                <div className="contact-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" id="email" onChange={props.changeInput}/>
                </div>
                <div className="contact-form-group">
                    <label htmlFor="location">Localitate:</label>
                    <input type="text" name="location" id="location" onChange={props.changeInput}/>
                </div>
                <div className="contact-form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input type="text" name="phone" id="phone" onChange={props.changeInput}/>
                </div>

            </form>
          )
    
}
export default ContactData;