import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/home";
import Allclothes from "./Components/Shopall/shop";
import ProductDetail from "./Components/Product/product";
import Cart from "./Components/Cart/cart";
import Shopall from "./Components/Shopall/shop";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/about";
import AdminDashboard from "./Components/AdminDashboard /admindashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/clothes",
    element: <Allclothes />,
  },
  {
    path: "/product/:collectionName/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/shopall/:collectionId",
    element: <Shopall />,
  },
  {
    path: "/shopall",
    element: <Shopall />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/admin9222283373", // Hidden admin route
    element: <AdminDashboard />,
  },
]);

function App({ user }) {
  return (
    <RouterProvider router={router} />
  );
}

export default App;