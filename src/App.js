import './App.css';
import NavBar from './components/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';

function App() {
  return (
    <div className="bg-black-100">
      <NavBar/>
      <Hero />
      <About />
      <Projects/>
    </div>
  );
}

export default App;
