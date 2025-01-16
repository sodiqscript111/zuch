import {
  createBrowserRouter,
  RouterProvider,
  Routes
} from "react-router-dom";
import "./App.css"
import Home from "./Components/Home/home"
import Allclothes from "./Components/Shopall/shop";
import ProductDetail from "./Components/Product/product";

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
  }
]);

function App() {


  return (
 <div> <RouterProvider router={router}/></div>
  )
}

export default App
