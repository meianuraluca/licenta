import React from 'react';
import './erros.css'

function ErrorMessage(props) {
    function displayError(name){
      switch(name){
          case 'name': return '* Numele trebuie sa aiba cel putin 5 caractere';
          case 'email': return "* Adresa de email este invalida";
          case 'phone': return "* Numarul de telefon este invalid"
          case 'city': return "* Numele orasului trebuie sa aiba cel putin 3 caractere";
          case 'passwordLung': return "* Parola trebuie sa aiba cel putin 8 caractere ";
          case 'passwordMaj': return "* Parola trebuie sa contina cel putin o litera mare ";
          case 'passwordMin': return "* Parola trebuie sa contina cel putin o litera mica ";
          case 'passwordNr': return "* Parola trebuie sa contina cel putin o cifra ";
          case 'againPass': return "* Parolele nu se potrivesc";
          case 'required': return "* Campul este obligatoriu";
          case 'missing' : return "* Parola sau email-ul lipseste";
          case 'bad': return "* Parola sau email-ul este gresit";
          case 'emailExist': return "* Exista deja un user cu acest email"
          default: return "Campul este obligatoriu"
      }
  }
  return (
    <div className="error-container">
        <p className = "style-error">{displayError(props.type_name)}</p>
    </div>
  );
}

export default ErrorMessage;
