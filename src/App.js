import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css';
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import PageCoffee from "./pages/PageCoffee";
import PageTea from "./pages/PageTea";
import PageAccessory from "./pages/PageAccessory";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
      <AuthProvider>
          <Router>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />}/>
                    <Route path={"login"} element={<Login />} />
                    <Route path={"/produit/:id"} element={<ProductDetails />} />
                    <Route path={"categorie/cafe"} element={<PageCoffee />}/>
                    <Route path={"categorie/the"} element={<PageTea />}/>
                    <Route path={"categorie/accessoire"} element={<PageAccessory />}/>
                    <Route path={"/my_account"} element={<MyAccount />}/>
                    <Route path={"/my_order"} element={<MyOrder />}/>
                </Route>
            </Routes>
        </Router>
      </AuthProvider>
  );
}

export default App;