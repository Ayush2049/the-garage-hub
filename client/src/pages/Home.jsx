import Hero from '../components/Hero';
import Services from '../components/Services';
import Diagnostics from '../components/Diagnostics';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <Diagnostics />
      <About />
      <Gallery />
      <Reviews />
      <Contact />
    </main>
  );
};

export default Home;
