import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css';
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import PageCoffee from "./pages/PageCoffee";
import PageTea from "./pages/PageTea";
import PageAccessory from "./pages/PageAccessory";

function App() {
  return (
      <Router>
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route index element={<Home />}/>
                <Route path={"/produit/:id"} element={<ProductDetails />} />
                <Route path={"categorie/cafe"} element={<PageCoffee />}/>
                <Route path={"categorie/the"} element={<PageTea />}/>
                <Route path={"categorie/accessoire"} element={<PageAccessory />}/>
            </Route>
        </Routes>
    </Router>
  );
}

export default App;
