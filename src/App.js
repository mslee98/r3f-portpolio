import './App.css';
import NavBar from './components/NavBar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
// import Loader from './components/Loader';

function App() {
  return (
    <div className="bg-black">
      {/* <Loader/> */}
      <NavBar/>
      <Hero />
      <About />
      <Projects/>
    </div>
  );
}

export default App;
