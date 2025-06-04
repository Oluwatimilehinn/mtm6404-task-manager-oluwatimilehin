import React from 'react';
import NavBar from './components/NavBar';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Services />
      <Portfolio />
      <Clients />
      <Footer />
    </div>
  );
}

export default App;