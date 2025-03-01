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
import OrderDetails from "./pages/OrderDetails";
import {CartContextProvider, CartProvider} from "./context/CartContext";
import Cart from "./pages/Cart";

function App() {
  return (
      <AuthProvider>
          <CartContextProvider>
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
                        <Route path={"/commande/client/:id"} element={<MyOrder />}/>
                        <Route path={"/commande/detail/:id"} element={<OrderDetails />}/>
                        <Route path={"/cart"} element={<Cart />}/>
                    </Route>
                </Routes>
            </Router>
          </CartContextProvider>
      </AuthProvider>
  );
}

export default App;