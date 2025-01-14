import {
  createBrowserRouter,
  RouterProvider,
  Routes
} from "react-router-dom";
import "./App.css"
import Home from "./Components/Home/home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  }
]);

function App() {


  return (
 <div> <RouterProvider router={router}/></div>
  )
}

export default App
