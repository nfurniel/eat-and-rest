import React, { useEffect, useState } from 'react';
import './Reservas.css';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('reservas_eat_rest') || '[]');
        setReservas(data.reverse());
    }, []);

    const cancelarReserva = (id) => {
        const nuevas = reservas.filter(r => r.id !== id);
        setReservas(nuevas);
        localStorage.setItem('reservas_eat_rest', JSON.stringify(nuevas));
        alert('Cancelada');
    };

    return (
        <div className="reservas pagina contenedor">
            <h2>Mis Reservas</h2>

            {reservas.length === 0 ? (
                <p>No tienes reservas.</p>
            ) : (
                <div className="lista-reservas">
                    {reservas.map(reserva => (
                        <div key={reserva.id} className="item-reserva">
                            <div className="info">
                                <h3>{reserva.itemNombre}</h3>
                                <p>Fecha: {reserva.fecha} - Personas: {reserva.personas}</p>
                                <p><small>Reservado por: {reserva.nombre}</small></p>
                            </div>
                            <button
                                className="btn-ver"
                                style={{ background: 'red', color: 'white' }}
                                onClick={() => cancelarReserva(reserva.id)}
                            >
                                Cancelar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reservas;
