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
import AllProducts from "./Pages/Admin/AllProducts";
import CreateCategory from "./Pages/Admin/CreateCategory";
import AddProduct from "./Pages/Admin/AddProduct";
import AllUsers from "./Pages/Admin/AllUsers";
import AllOrders from "./Pages/Admin/AllOrders";
import Profile from "./User/Profile";
import Order from "./User/Order";
import UpdateProduct from "./Pages/Admin/UpdateProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* User Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/orders" element={<Order />} />
      </Route>
      {/* Admin Dashboard */}
      <Route path="/dashboard/admin" element={<AdminRoute />}>
        <Route index element={<AdminDashBoard />} /> 
        <Route path="all-products" element={<AllProducts />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="product/:slug" element={<UpdateProduct />} />
        <Route path="all-user" element={<AllUsers />} />
        <Route path="all-orders" element={<AllOrders />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/privacy-policy" element={<Policy />} />
      <Route path="/category" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
