import React from 'react';
import "../styles/Global.css";
import SearchBar from "../components/SearchBar";

function Home(props) {
    return (
        <div>
            <h1>Bienvenue chez Cafthé</h1>
            <SearchBar page={"Liste"}/>
        </div>
    );
}

export default Home;