import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css';

function TeacherItem() {
    return(
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/19825481?s=460&v=4" alt="Fabíola Maria Kretzer"/>
                <div>
                    <strong>Fabíola Maria Kretzer</strong>
                    <span>Química</span>
                </div>
            </header>

            <p>
                olá mundo
                <br/><br/>
                eu sou entusiasta
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 20,00</strong>
                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;