import React from 'react';
import './erros.css'

function ErrorMessage(props) {
    function displayError(name){
      switch(name){
          case 'name': return '* Numele trebuie să aibă cel puțin 5 caractere';
          case 'title': return '* Titlul trebuie să aibă cel puțin 5 caractere';
          case 'description': return '* Descrierea trebuie să aibă cel puțin 10 caractere';
          case 'subject': return '* Subiectul trebuie să aibă cel puțin 5 caractere';
          case 'message': return '* Mesajul trebuie să aibă cel puțin 10 caractere';
          case 'email': return "* Adresa de email este invalidă";
          case 'link': return "* Link-ul este invalid"
          case 'phone': return "* Numărul de telefon este invalid"
          case 'city': return "* Numele orașului trebuie să aibă cel puțin 3 caractere";
          case 'passwordLung': return "* Parola trebuie să aibă cel puțin 8 caractere ";
          case 'passwordMaj': return "* Parola trebuie să conțină cel puțin o literă mare ";
          case 'passwordMin': return "* Parola trebuie să conțină cel puțin o literă mică ";
          case 'passwordNr': return "* Parola trebuie să conțină cel puțin o cifră ";
          case 'againPass': return "* Parolele nu se potrivesc";
          case 'required': return "* Câmpul este obligatoriu";
          case 'missing' : return "* Parola sau email-ul lipsește";
          case 'bad': return "* Parola sau email-ul este greșit";
          case 'emailExist': return "* Existî deja un user cu acest email"
          default: return "Câmpul este obligatoriu"
      }
  }
  return (
    <div className="error-container">
        <p className = "style-error">{displayError(props.type_name)}</p>
    </div>
  );
}

export default ErrorMessage;
