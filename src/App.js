import './App.css';
import NavBar from './components/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
// import Loader from './components/Loader';

function App() {
  return (
    <div className="bg-black">
      {/* <Loader/> */}
      <NavBar/>
      
      <Hero />
      <About />
      <Projects/>
      <Contact/>
    </div>
  );
}

export default App;
