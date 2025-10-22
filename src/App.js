import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tableta from './componentes/TableNew';
import PokemonDetail from './componentes/PokemonDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Tableta/>} />
        <Route path='/pokemon/:name' element={<PokemonDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App;
