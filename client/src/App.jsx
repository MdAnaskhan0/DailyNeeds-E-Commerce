import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Auth/Login";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Auth/Register";
import Cart from "./Pages/Cart";
import Policy from "./Pages/Policy";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminDashBoard from "./Pages/Admin/AdminDashBoard";
import AdminRoute from "./Components/Routes/AdminRoute";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Dashboard" element={<PrivateRoute />}>  {/* User Dashboard Route */}
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/Admin" element={<AdminRoute />}>
        <Route path="" element={<AdminDashBoard />}/>
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/Forgot-password" element={<ForgotPassword />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/PageNotFound" element={<PageNotFound />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/Category" element={<PageNotFound />} />
      <Route path='*' element={<PageNotFound />} />


    </Routes>
  );
}

export default App;
