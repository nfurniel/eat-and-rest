import React, { useState } from 'react';
import './Filtros.css';

const Filtros = (props) => {
    const onFiltrar = props.onFiltrar;
    const [busqueda, setBusqueda] = useState('');
    const [tipo, setTipo] = useState('');
    const [ciudad, setCiudad] = useState('');

    const aplicarFiltros = () => {
        onFiltrar({
            busqueda: busqueda,
            tipo: tipo,
            ciudad: ciudad
        });
    };

    return (
        <div className="filtros">
            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Tipo (Todos)</option>
                <option value="restaurante">Restaurante</option>
                <option value="alojamiento">Alojamiento</option>
            </select>

            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
                <option value="">Ciudad (Todas)</option>
                <option value="Zaragoza">Zaragoza</option>
                <option value="Murcia">Murcia</option>
            </select>

            <button className="btn-primary" onClick={aplicarFiltros}>Buscar</button>
        </div>
    );
};

export default Filtros;
