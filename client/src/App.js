import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>

      <Navbar/>
      <Routes>
          <Route path="/" element={<Home  />}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} 
         />
        
      </Routes>

    </>
  )
}

export default App;
