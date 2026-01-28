import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './componentes/Navegacion/Navegacion';
import Footer from './componentes/Footer/Footer';
import Inicio from './paginas/Inicio/Inicio';
import Buscador from './paginas/Buscador/Buscador';
import Detalle from './paginas/Detalle/Detalle';
import Reservas from './paginas/Reservas/Reservas';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navegacion />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/reservas" element={<Reservas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
