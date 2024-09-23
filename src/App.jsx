import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Manager from "./components/Manager";

function App() {


  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Navbar/>
      <Hero/>
      <Manager/>

    </>
  );
}

export default App;
