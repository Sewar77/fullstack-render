import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Home from "./Pages/Home/Home";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Register from "./Components/Auth/Register";
import ManageUsers from "./Components/Admin/Manage/ManageUsers/ManageUsers";
import ManageCategories from "./Components/Admin/Manage/ManageCategories/ManageCategories";
import ManageProducts from "./Components/Admin/Manage/ManageProducts/ManageProducts";
import ThemeToggle from "./Components/ThemeToggle/ThemeToggle";
import Categories from "./Components/Catgeories/Categories";
import Products from "./Components/Products/Products";
import AdminRoutes from "./Components/Routes/AdminRoutes";
import Unautherized from "./Components/Unautherized/Unautherized";
import NotFound from "./Components/NotFound/NotFound";
import ProductsItem from "./Components/Card/ProductsItem";
import ViewProduct from "./Components/Card/ViewProduct.jsx";
import Cart from "./Components/Cart/Cart.jsx";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/unautherized" element={<Unautherized />} />
        <Route path="/category/:name/:id/products" element={<ProductsItem />} />
        <Route path="/view-product/:name/:id" element={<ViewProduct />} />

        {/* admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoutes>
              <AdminLayout />
            </AdminRoutes>
          }
        >
          <Route index path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="products" element={<ManageProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
