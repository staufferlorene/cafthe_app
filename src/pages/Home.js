import React from 'react';
import ProductList from "./ProductList";
import "../styles/Global.css";

function Home(props) {
    return (
        <div>
            <h1>Bienvenue chez Cafthé</h1>
            <ProductList />
        </div>
    );
}

export default Home;