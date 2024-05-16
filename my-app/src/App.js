import './App.css';
import HomePage from "./component/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
])

  function App() {
    return <RouterProvider router={router}/>;

}

export default App;
