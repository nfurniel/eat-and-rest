import React from 'react';
import { Link } from 'react-router-dom';
import './Tarjeta.css';

const Tarjeta = (props) => {
    const item = props.item;

    return (
        <div className="tarjeta">
            <img src={item.imagen} alt={item.nombre} className="tarjeta-imagen" />
            <div className="tarjeta-contenido">
                <span className="categoria">{item.categoria} - {item.origen}</span>
                <h3>{item.nombre}</h3>
                <div className="info-extra">
                    <span className="valoracion">Valoracion: {item.valoracion}</span>
                    <span className="precio">{item.precio} euros</span>
                </div>
                <Link to={`/detalle/${item.id}`} className="btn-ver">Ver Detalles</Link>
            </div>
        </div>
    );
};

export default Tarjeta;
