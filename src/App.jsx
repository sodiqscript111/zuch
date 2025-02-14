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
    path:"/product/:id",
    element: <ProductDetail/>,
  },
  {
    path: "/cart",
    element: <Cart />,
  }
]);

function App({ user }) {
  return (
    <RouterProvider router={router} />
  );
}

export default App
