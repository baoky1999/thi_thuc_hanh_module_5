import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import ProductList from "../../product/src/components/ProductList";
import ProductCreate from "../../product/src/components/ProductCreate"

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/create" element={<ProductCreate/>}/>
          </Routes>
        </BrowserRouter>
          <ToastContainer/>
      </>
  );
}

export default App;
