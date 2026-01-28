import React from 'react';
import { Link } from 'react-router-dom';
import './Navegacion.css';

const Navegacion = () => {
    return (
        <nav className="navegacion">
            <div className="logo">
                <Link to="/">Eat & Rest</Link>
            </div>
            <ul className="menu">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/buscador">Explorar</Link></li>
                <li><Link to="/reservas">Mis Reservas</Link></li>
            </ul>
        </nav>
    );
};

export default Navegacion;
