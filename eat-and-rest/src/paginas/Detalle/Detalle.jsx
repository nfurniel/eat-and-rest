import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mapa from '../../componentes/Mapa/Mapa';
import ElTiempo from '../../componentes/ElTiempo/ElTiempo';
import proj4 from 'proj4';
import './Detalle.css';


// He tenido que instalar una libreria que se llama proj4  para convertir las coordenadas 
// He tenido que convertir las corrdeadas porque con el react leaflet no me dejaba mostrar el mapa con las corrdenadas que me vienen
// de la api. Por eso he tenido que convertirlas. Los calculos que he hecho para convertir las coordenadas no los he hecho yo porque no
// me entero de como se usa ni los calculos que hace, pero solo los convierte
const utm = "+proj=utm +zone=30 +ellps=GRS80 +units=m +no_defs";
const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

const toLatLon = (x, y) => {
    if (!x || !y) return { lat: 0, lng: 0 };
    const px = parseFloat(String(x).replace(',', '.'));
    const py = parseFloat(String(y).replace(',', '.'));
    if (isNaN(px) || isNaN(py)) return { lat: 0, lng: 0 };

    if (Math.abs(py) > 90 || Math.abs(px) > 180) {
        const res = proj4(utm, wgs84, [px, py]);
        return { lat: res[1], lng: res[0] };
    }
    return { lat: py, lng: px };
};

const Detalle = () => {
    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    const [fecha, setFecha] = useState('');
    const [personas, setPersonas] = useState(1);
    const [nombre, setNombre] = useState('');

    const fetchZaragozaRest = async () => {
        try {
            const res = await fetch('/api/zaragoza/restaurante.geojson?rows=50');
            const data = await res.json();
            const features = data.features || [];
            const limitado = features.slice(0, 50);

            return limitado.map(item => {
                const coords = toLatLon(item.geometry.coordinates[0], item.geometry.coordinates[1]);
                return {
                    id: 'zgz-rest-' + item.properties.id,
                    nombre: item.properties.title,
                    categoria: 'Restaurante',
                    ubicacion: {
                        lat: coords.lat,
                        lng: coords.lng,
                        direccion: item.properties.streetAddress
                    },
                    tipo: 'restaurante',
                    imagen: 'https://picsum.photos/seed/zgz-rest-' + item.properties.id + '/600/400',
                    valoracion: 4,
                    precio: 30,
                    origen: 'Zaragoza'
                };
            });
        } catch (e) { return []; }
    };

    const fetchZaragozaAlo = async () => {
        try {
            const res = await fetch('/api/zaragoza/alojamiento.json?rows=50');
            const data = await res.json();
            const result = data.result || [];
            const limitado = result.slice(0, 50);

            return limitado.map(item => {
                const coords = toLatLon(item.geometry.coordinates[0], item.geometry.coordinates[1]);
                return {
                    id: 'zgz-alo-' + item.id,
                    nombre: item.title,
                    categoria: 'Alojamiento',
                    ubicacion: {
                        lat: coords.lat,
                        lng: coords.lng,
                        direccion: item.streetAddress
                    },
                    tipo: 'alojamiento',
                    imagen: 'https://picsum.photos/seed/zgz-alo-' + item.id + '/600/400',
                    valoracion: 3,
                    precio: 80,
                    origen: 'Zaragoza'
                };
            });
        } catch (e) { return []; }
    };

    const fetchMurciaHot = async () => {
        try {
            const res = await fetch('https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Hoteles.json');
            const data = await res.json();

            let lista = [];
            if (data.result) {
                lista = data.result;
            } else {
                lista = data;
            }

            const limitado = lista.slice(0, 50);

            return limitado.map((item, index) => {
                const coords = toLatLon(item.Longitud, item.Latitud);
                return {
                    id: 'mur-hot-' + index,
                    nombre: item.Nombre,
                    categoria: 'Alojamiento',
                    ubicacion: {
                        lat: coords.lat,
                        lng: coords.lng,
                        direccion: item.Direccion
                    },
                    tipo: 'alojamiento',
                    imagen: 'https://picsum.photos/seed/mur-hot-' + index + '/600/400',
                    valoracion: 4,
                    precio: 70,
                    origen: 'Murcia'
                };
            });
        } catch (e) { return []; }
    };

    const fetchMurciaRest = async () => {
        try {
            const res = await fetch('https://nexo.carm.es/nexo/archivos/recursos/opendata/json/Restaurantes.json');
            const data = await res.json();

            let lista = [];
            if (data.result) {
                lista = data.result;
            } else {
                lista = data;
            }

            const limitado = lista.slice(0, 50);

            return limitado.map((item, index) => {
                const coords = toLatLon(item.Longitud, item.Latitud);
                return {
                    id: 'mur-rest-' + index,
                    nombre: item.Nombre,
                    categoria: 'Restaurante',
                    ubicacion: {
                        lat: coords.lat,
                        lng: coords.lng,
                        direccion: item.Direccion
                    },
                    tipo: 'restaurante',
                    imagen: 'https://picsum.photos/seed/mur-rest-' + index + '/600/400',
                    valoracion: 3,
                    precio: 40,
                    origen: 'Murcia'
                };
            });
        } catch (e) { return []; }
    };

    useEffect(() => {
        const cargar = async () => {
            const zgzRest = await fetchZaragozaRest();
            const zgzAlo = await fetchZaragozaAlo();
            const murHot = await fetchMurciaHot();
            const murRest = await fetchMurciaRest();

            const todos = zgzRest.concat(zgzAlo).concat(murHot).concat(murRest);

            let encontrado = null;
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    encontrado = todos[i];
                    break;
                }
            }
            setItem(encontrado);
        };
        cargar();
    }, [id]);

    const realizarReserva = (e) => {
        e.preventDefault();
        const nuevaReserva = {
            id: Date.now(),
            itemId: item.id,
            itemNombre: item.nombre,
            fecha: fecha,
            personas: personas,
            nombre: nombre,
            fechaCreacion: new Date().toISOString()
        };

        const reservasPrevias = JSON.parse(localStorage.getItem('reservas_eat_rest') || '[]');
        const nuevasReservas = [...reservasPrevias, nuevaReserva];
        localStorage.setItem('reservas_eat_rest', JSON.stringify(nuevasReservas));

        alert('Reserva confirmada');
        navigate('/reservas');
    };

    if (!item) {
        return <div className="contenedor">Cargando...</div>;
    }

    return (
        <div className="detalle pagina contenedor">
            <div className="detalle-header">
                <h1>{item.nombre}</h1>
                <span className="categoria-badge">{item.categoria} - {item.origen}</span>
            </div>

            <div className="detalle-grid">
                <div className="col-info">
                    <img src={item.imagen} alt={item.nombre} className="img-detalle" />
                    <div className="meta-info">
                        <p><strong>Direccion:</strong> {item.ubicacion.direccion}</p>
                        <p><strong>Precio:</strong> {item.precio} euros</p>
                        <p><strong>Valoracion:</strong> {item.valoracion}</p>
                    </div>

                    <div className="seccion-reserva">
                        <h3>Hacer Reserva</h3>
                        <form onSubmit={realizarReserva}>
                            <div className="form-group">
                                <label>Fecha</label>
                                <input type="date" required value={fecha} onChange={e => setFecha(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Personas</label>
                                <input type="number" min="1" required value={personas} onChange={e => setPersonas(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                            <button type="submit" className="btn-primary">Confirmar</button>
                        </form>
                    </div>
                </div>

                <div className="col-mapa">
                    <ElTiempo lat={item.ubicacion.lat} lng={item.ubicacion.lng} />
                    <h3>Mapa</h3>
                    <Mapa lat={item.ubicacion.lat} lng={item.ubicacion.lng} nombre={item.nombre} />
                </div>
            </div>
        </div>
    );
};

export default Detalle;
