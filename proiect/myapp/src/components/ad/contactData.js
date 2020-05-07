import React from 'react';
import './contactData.css'
import ErrorMessage from '../error/erros';



function ContactData(props){
    function validateField(event){
            props.error(event.target.name,event.target.value)

    }
        return (
            <form className="contact">
                <div className="contact-form-group">
                    <label htmlFor="namePerson">Persoana de contact:</label>
                    <input type="text" name="namePerson" defaultValue={props.namePerson} id="namePerson"  onBlur={validateField} onChange={props.changeInput}/>
                    {props.isError.namePerson !=='' && <ErrorMessage type_name={props.isError.namePerson}/>}
                </div>
                <div className="contact-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" defaultValue={props.email} id="email"  onBlur={validateField} onChange={props.changeInput}/>
                    {props.isError.email !=='' && <ErrorMessage type_name={props.isError.email}/>}
                </div>
                <div className="contact-form-group">
                    <label htmlFor="location">Localitate:</label>
                    <input type="text" name="location" defaultValue={props.location} id="location" onBlur={validateField} onChange={props.changeInput}/>
                    {props.isError.location !=='' && <ErrorMessage type_name={props.isError.location}/>}
                </div>
                <div className="contact-form-group">
                    <label htmlFor="phone">Telefon:</label>
                    <input type="text" name="phone" defaultValue={props.phone} id="phone"  onBlur={validateField} onChange={props.changeInput}/>
                    {props.isError.phone !=='' && <ErrorMessage type_name={props.isError.phone}/>}
                </div>

            </form>
          )
    
}
export default ContactData;