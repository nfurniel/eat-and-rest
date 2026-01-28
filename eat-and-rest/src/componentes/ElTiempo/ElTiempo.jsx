import React, { useEffect, useState } from 'react';
import './ElTiempo.css';

const ElTiempo = (props) => {
    const lat = props.lat;
    const lng = props.lng;
    const [clima, setClima] = useState(null);

    const [error, setError] = useState(false);

    useEffect(() => {
        if (lat && lng) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setError(true);
                    } else {
                        setClima(data.current_weather);
                    }
                })
                .catch(() => setError(true));
        } else {
            setError(true);
        }
    }, [lat, lng]);

    if (error) {
        return <div className="el-tiempo">Tiempo no disponible</div>;
    }

    if (!clima) {
        return <div>Cargando tiempo...</div>;
    }

    return (
        <div className="el-tiempo">
            <h4>Tiempo</h4>
            <div>
                <span>{clima.temperature} C</span>
                <span>Viento: {clima.windspeed} km/h</span>
            </div>
        </div>
    );
};

export default ElTiempo;
