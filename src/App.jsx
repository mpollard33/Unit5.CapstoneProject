import { Routes , Route } from 'react-router-dom';
import './App.css';
import Nav from './features/Nav';

function App() {
  return (
    <>
      <header>
        <h1>E-Commerce Site</h1>
      </header>
      <Nav />
      <Routes>
        <Route path='/' element={<h2>/home</h2>} />
        <Route path='/products' element={<h2>/products</h2>} />
        <Route path='/account' element={<h2>/account</h2>} />
        <Route path='/cart' element={<h2>/cart</h2>} />

      </Routes>
    </>
  );
}

export default App;
