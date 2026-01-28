import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './Mapa.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Mapa = (props) => {
    const lat = props.lat;
    const lng = props.lng;
    const nombre = props.nombre;
    const isInvalid = (lat === 0 && lng === 0) || !lat || !lng;

    if (isInvalid) {
        return <div className="mapa-contenedor" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#eee' }}>
            <p>Ubicación no disponible en el mapa</p>
        </div>;
    }

    const position = [lat, lng];

    return (
        <div className="mapa-contenedor">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {nombre}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Mapa;
