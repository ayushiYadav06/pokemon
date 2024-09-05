import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import PokemonPage from './pages/pokemon/pokemon';
function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
