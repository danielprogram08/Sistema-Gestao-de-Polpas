import { Link } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <h1 className="text-3xl font-bold mt-24 mb-24">Bem-vindo ao Sistema de Gestão de Polpas</h1>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Cadastro
        </Link>
        <Link to="/cadastrar-produto" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Cadastrar Produto
        </Link>
        <Link to="/dashboard" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Dashboard
        </Link>
        <Link to="/stock-movement" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Entrada/Saída
        </Link>
      </div>
    </div>
  );
}

export default App;
