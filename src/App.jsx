import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Campanha from './pages/marketing/Campanha';
import { Evento } from './pages/marketing/Evento';







export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="campanha" element={<Campanha />} />
          <Route path="evento" element = {<Evento/>} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

