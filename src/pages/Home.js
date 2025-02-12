import "../styles/Global.css"
import React from 'react';
import ProductList from "./ProductList";

function Home(props) {
    return (
        <div>
            <h1>Bienvenue chez Cafthé</h1>

            <option value=''>---</option>



            <ProductList />
        </div>
    );
}

export default Home;