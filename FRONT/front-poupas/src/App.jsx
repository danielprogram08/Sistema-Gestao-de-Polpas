import { Link } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-8">Bem-vindo ao Sistema de Gestão de Polpas</h1>
      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Cadastro
        </Link>
      </div>
    </div>
  );
}

export default App;
