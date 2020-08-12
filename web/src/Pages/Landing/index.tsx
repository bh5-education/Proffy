import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './style.css'

import logoImg from '../../Assets/images/logo.svg'
import landingImg from '../../Assets/images/landing.svg'

import studyIcon from '../../Assets/images/icons/study.svg'
import giveClassesIcon from '../../Assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../Assets/images/icons/purple-heart.svg'

import api from '../../Services/API'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)

    // Array de parametros
    useEffect(() => {
        // Barra é opcional
        api.get('connections').then( response => {
            const { total } = response.data

            setTotalConnections(total)
        })
    }, [])
    
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de estudos"
                    className='hero-image'
                />

                <div className="buttons-container">
                    <Link to="/study" className='study'>
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className='give-classes'>
                        <img src={giveClassesIcon} alt="Dar Aulas" />
                        Dar Aulas
                    </Link>
                </div>

                <div className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Purple Heart" />
                </div>
            </div>
        </div>
    )
}

export default Landing