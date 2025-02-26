import {
  createBrowserRouter,
  RouterProvider,
  Routes
} from "react-router-dom";
import "./App.css"
import Home from "./Components/Home/home"
import Allclothes from "./Components/Shopall/shop";
import ProductDetail from "./Components/Product/product";
import Cart from "./Components/Cart/cart";
import Shopall from "./Components/Shopall/shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/clothes",
    element: <Allclothes/>,
  }
  ,
  {
    path: "/product/:collectionName/:id",
    element: <ProductDetail />,
  }
  ,
  {
    path: "/cart",
    element: <Cart />,
  } ,
  {
    path: "/shopall",
    element: <Shopall />,
  }
]);

function App({ user }) {
  return (
    <RouterProvider router={router} />
  );
}

export default App
