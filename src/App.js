import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import './styles/App.css';
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
import PrivacyPolicy from "./components/PrivacyPolicy";
import LegalNotices from "./components/LegalNotices";
import Cgv from "./components/CGV";
import Inscription from "./components/Inscription";

function App() {
  return (
      <AuthProvider>
          <CartContextProvider>
              <Router>
                <Routes>
                    <Route path={"/"} element={<Layout />}>
                        <Route index element={<Home />}/>
                        <Route path={"login"} element={<Login />} />
                        <Route path={"inscription"} element={<Inscription />} />
                        <Route path={"/produit/:id"} element={<ProductDetails />} />
                        {/* Intégration de la searchBar sur les différentes pages */}
                        <Route path={"categorie/cafe"} element={<SearchBar page={"cafe"}/>}/>
                        <Route path={"categorie/the"} element={<SearchBar page={"the"}/>}/>
                        <Route path={"categorie/accessoire"} element={<SearchBar page={"accessoire"}/>}/>
                        <Route path={"coffret"} element={<SearchBar page={"coffret"}/>}/>
                        <Route path={"selection"} element={<SearchBar page={"selection"}/>}/>
                        <Route path={"/my_account"} element={<MyAccount />}/>
                        <Route path={"/commande/client/:id"} element={<MyOrder />}/>
                        <Route path={"/commande/detail/:id"} element={<OrderDetails />}/>
                        <Route path={"/cart"} element={<Cart />}/>
                        <Route path={"/delivery_method"} element={<DeliveryMethod />}/>
                        <Route path={"/summary"} element={<Summary />}/>
                        <Route path={"/confirm"} element={<Confirm />}/>
                        <Route path={"/privacy_policy"} element={<PrivacyPolicy />}/>
                        <Route path={"/legal_notices"} element={<LegalNotices />}/>
                        <Route path={"/cgv"} element={<Cgv />}/>
                    </Route>
                </Routes>
            </Router>
          </CartContextProvider>
      </AuthProvider>
  );
}

export default App;