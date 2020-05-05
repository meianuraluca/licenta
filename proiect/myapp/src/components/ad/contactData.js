import React from 'react';
import './contactData.css'



function ContactData(props){
    function validateField(event){
        if(event.target.value === '')
            props.error(event.target.name)
            event.target.placeholder = "* Campul este obligatoriu"

    }
        return (
            <form className="contact">
                <div className={`contact-form-group${props.isError.namePerson}`}>
                    <label htmlFor="namePerson">Persoana de contact:</label>
                    <input type="text" name="namePerson" defaultValue={props.namePerson} id="namePerson" onChange={props.changeInput}/>
                </div>
                <div className={`contact-form-group${props.isError.email}`}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" defaultValue={props.email} id="email" onChange={props.changeInput}/>
                </div>
                <div className={`contact-form-group${props.isError.location}`}>
                    <label htmlFor="location">Localitate:</label>
                    <input type="text" name="location" defaultValue={props.location} id="location" onBlur={validateField} onChange={props.changeInput}/>
                </div>
                <div className={`contact-form-group${props.isError.phone}`}>
                    <label htmlFor="phone">Telefon:</label>
                    <input type="text" name="phone" defaultValue={props.phone} id="phone" onChange={props.changeInput}/>
                </div>

            </form>
          )
    
}
export default ContactData;