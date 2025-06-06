import './App.css';
import NavBar from './components/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';

function App() {
  return (
    <div className="bg-black-100">
      <NavBar/>
      <Hero />
      <About />
    </div>
  );
}

export default App;
