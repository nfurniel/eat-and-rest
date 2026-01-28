import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

const Inicio = () => {
    return (
        <div className="inicio pagina contenedor">
            <div className="hero">
                <h1>Descubre Murcia y Zaragoza</h1>
                <p>Restaurantes y alojamientos.</p>
                <Link to="/buscador" className="btn-primary btn-grande">Buscar</Link>
            </div>

            <div className="destacados">
                <h2>Eat & Rest</h2>
                <div className="features">
                    <div className="feature">
                        <h3>Informacion Real</h3>
                        <p>Datos de fuentes oficiales.</p>
                    </div>
                    <div className="feature">
                        <h3>Reservas</h3>
                        <p>Reserva rapido.</p>
                    </div>
                    <div className="feature">
                        <h3>Opiniones</h3>
                        <p>Valora tu experiencia.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;
