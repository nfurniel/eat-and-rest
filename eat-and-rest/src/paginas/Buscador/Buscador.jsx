import React, { useEffect, useState } from 'react';
import Tarjeta from '../../componentes/Tarjeta/Tarjeta';
import Filtros from '../../componentes/Filtros/Filtros';
import './Buscador.css';

const Buscador = () => {
    const [items, setItems] = useState([]);
    const [filtrados, setFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 6;

    const fetchZaragozaRest = async () => {
        try {
            const res = await fetch('/api/zaragoza/restaurante.geojson?rows=50');
            const data = await res.json();
            const features = data.features || [];
            // LO he tenido que limitar a 50 porque si no me devolvia 3000 resultados y explotaba la pagina
            const limitado = features.slice(0, 50);

            return limitado.map(item => {
                return {
                    id: 'zgz-rest-' + item.properties.id,
                    nombre: item.properties.title,
                    categoria: 'Restaurante',
                    ubicacion: {
                        lat: parseFloat(item.geometry.coordinates[1]),
                        lng: parseFloat(item.geometry.coordinates[0]),
                        direccion: item.properties.streetAddress
                    },
                    tipo: 'restaurante',
                    imagen: 'https://picsum.photos/seed/zgz-rest-' + item.properties.id + '/600/400',
                    valoracion: 4,
                    precio: 30,
                    origen: 'Zaragoza'
                };
            });
        } catch (e) {
            return [];
        }
    };

    const fetchZaragozaAlo = async () => {
        try {
            const res = await fetch('/api/zaragoza/alojamiento.json?rows=50');
            const data = await res.json();
            const result = data.result || [];
            const limitado = result.slice(0, 50);

            return limitado.map(item => {
                return {
                    id: 'zgz-alo-' + item.id,
                    nombre: item.title,
                    categoria: 'Alojamiento',
                    ubicacion: {
                        lat: parseFloat(item.geometry.coordinates[1]),
                        lng: parseFloat(item.geometry.coordinates[0]),
                        direccion: item.streetAddress
                    },
                    tipo: 'alojamiento',
                    imagen: 'https://picsum.photos/seed/zgz-alo-' + item.id + '/600/400',
                    valoracion: 3,
                    precio: 80,
                    origen: 'Zaragoza'
                };
            });
        } catch (e) {
            return [];
        }
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
                return {
                    id: 'mur-hot-' + index,
                    nombre: item.Nombre,
                    categoria: 'Alojamiento',
                    ubicacion: {
                        lat: parseFloat(item.Latitud),
                        lng: parseFloat(item.Longitud),
                        direccion: item.Direccion
                    },
                    tipo: 'alojamiento',
                    imagen: 'https://picsum.photos/seed/mur-hot-' + index + '/600/400',
                    valoracion: 4,
                    precio: 70,
                    origen: 'Murcia'
                };
            });
        } catch (e) {
            return [];
        }
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
                return {
                    id: 'mur-rest-' + index,
                    nombre: item.Nombre,
                    categoria: 'Restaurante',
                    ubicacion: {
                        lat: parseFloat(item.Latitud),
                        lng: parseFloat(item.Longitud),
                        direccion: item.Direccion
                    },
                    tipo: 'restaurante',
                    imagen: 'https://picsum.photos/seed/mur-rest-' + index + '/600/400',
                    valoracion: 3,
                    precio: 40,
                    origen: 'Murcia'
                };
            });
        } catch (e) {
            return [];
        }
    };

    useEffect(() => {
        const cargar = async () => {
            const zgzRest = await fetchZaragozaRest();
            const zgzAlo = await fetchZaragozaAlo();
            const murHot = await fetchMurciaHot();
            const murRest = await fetchMurciaRest();

            const todos = zgzRest.concat(zgzAlo).concat(murHot).concat(murRest);
            setItems(todos);
            setFiltrados(todos);
            setCargando(false);
        };
        cargar();
    }, []);

    const filtrar = (criterios) => {
        const busqueda = criterios.busqueda;
        const tipo = criterios.tipo;
        const ciudad = criterios.ciudad;

        let result = items;
        if (busqueda) {
            result = result.filter(i => {
                return i.nombre.toLowerCase().includes(busqueda.toLowerCase());
            });
        }
        if (tipo) {
            result = result.filter(i => {
                return i.tipo === tipo;
            });
        }
        if (ciudad) {
            result = result.filter(i => {
                return i.origen === ciudad;
            });
        }
        setFiltrados(result);
        setPaginaActual(1);
    };

    const indiceUltimo = paginaActual * itemsPorPagina;
    const indicePrimero = indiceUltimo - itemsPorPagina;
    const itemsActuales = filtrados.slice(indicePrimero, indiceUltimo);

    const cambiarPagina = (nuevaPagina) => {
        setPaginaActual(nuevaPagina);
        window.scrollTo(0, 0);
    };

    const totalPaginas = Math.ceil(filtrados.length / itemsPorPagina);

    return (
        <div className="buscador pagina contenedor">
            <h2>Explorar</h2>
            <Filtros onFiltrar={filtrar} />

            {cargando ? (
                <p>Cargando datos...</p>
            ) : (
                <>
                    <div className="grid-resultados">
                        {itemsActuales.map(item => {
                            return <Tarjeta key={item.id} item={item} />;
                        })}
                    </div>

                    <div className="paginacion">
                        <button
                            className="btn-paginacion"
                            onClick={() => cambiarPagina(paginaActual - 1)}
                            disabled={paginaActual === 1}
                        >
                            Anterior
                        </button>
                        <span>Pagina {paginaActual} de {totalPaginas}</span>
                        <button
                            className="btn-paginacion"
                            onClick={() => cambiarPagina(paginaActual + 1)}
                            disabled={paginaActual === totalPaginas}
                        >
                            Siguiente
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Buscador;
