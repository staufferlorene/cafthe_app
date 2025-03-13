import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './styles/App.css';
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import MyOrder from "./pages/MyOrder";
import OrderDetails from "./pages/OrderDetails";
import {CartContextProvider} from "./context/CartContext";
import Cart from "./pages/Cart";
import DeliveryMethod from "./pages/DeliveryMethod";
import Summary from "./pages/Summary";
import Confirm from "./pages/Confirm";
import SearchBar from "./components/SearchBar";

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
                        {/* Intégration de la searchBar sur les différentes pages */}
                        <Route path={"categorie/cafe"} element={<SearchBar page={"cafe"}/>}/>
                        <Route path={"categorie/the"} element={<SearchBar page={"the"}/>}/>
                        <Route path={"categorie/accessoire"} element={<SearchBar page={"accessoire"}/>}/>
                        <Route path={"/my_account"} element={<MyAccount />}/>
                        <Route path={"/commande/client/:id"} element={<MyOrder />}/>
                        <Route path={"/commande/detail/:id"} element={<OrderDetails />}/>
                        <Route path={"/cart"} element={<Cart />}/>
                        <Route path={"/delivery_method"} element={<DeliveryMethod />}/>
                        <Route path={"/summary"} element={<Summary />}/>
                        <Route path={"/confirm"} element={<Confirm />}/>
                    </Route>
                </Routes>
            </Router>
          </CartContextProvider>
      </AuthProvider>
  );
}

export default App;