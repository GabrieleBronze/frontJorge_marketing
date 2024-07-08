import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Evento from './pages/marketing/Evento'
import Campanha from './pages/marketing/Campanha';
import { Qualidade } from './pages/marketing/Qualidade';
import { Indicadores } from './pages/marketing/Indicadores';
import { Pesquisa } from './pages/marketing/Pesquisa';







export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="campanha" element={<Campanha />} />
          <Route path="evento" element = {<Evento/>} /> 
          <Route path="qualidade" element = {<Qualidade/>} /> 
          <Route path="indicadores" element = {<Indicadores/>} /> 
          <Route path="pesquisa" element = {<Pesquisa/>} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

