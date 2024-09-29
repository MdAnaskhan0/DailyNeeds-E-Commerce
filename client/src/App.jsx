import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Auth/Login";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Cart from "./Pages/Cart";
import Policy from "./Pages/Policy";


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/PageNotFound" element={<PageNotFound/>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="privacy-policy" element={<Policy/>}/>
      <Route path="Category" element={<PageNotFound/>}/>


    </Routes>
  );
}

export default App;
