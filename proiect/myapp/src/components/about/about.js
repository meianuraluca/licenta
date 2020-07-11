import React from 'react';
import './about.css'
import image from  '../../images/hand.jpg';
function About(){
 
  
  return (
    <div className="about-container">
        <div className="about-content">
            <div className="about-content-text">
                <br/>
                 <p>Platforma online ”Oferă Speranță!„ are ca scop îmbunătățirea procesul de donație. Multe obiecte ajung să fie uitate în diferite zone de depozitare sau chiar mai rău să fie aruncate deși sunt într-o stare bună
                 și ar mai putea fi folosite. Astfel prin acest site poți să găsești noi propietari pentru lucrurile care nu îți mai folosesc.
                 Pe lângă posibilitatea de a face o postarea despre ce dorești să donezi poți găsi și o listă de asociații din această ramură.Dacă îți dorești să te implici mai mult în acest proces poți afla cum să le vi în ajutor întrând pe profilul acestora. Prin construirea acestui site ne dorim să creștem dorința de a dona și a ajuta persoanele din jurul nostru astfel că te rugăm să respecți scopul proiectului ”Oferă Speranță!” și să nu încerci să adaugi alte tipuri de anunțuri.
                </p>
                </div>
            <img src={image} alt="hand" className="about-content-image"></img>

        </div>

    </div>
  )

}
export default About;