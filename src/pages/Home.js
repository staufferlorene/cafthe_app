import React from 'react';
import "../styles/Global.css";
import SearchBar from "../components/SearchBar";

function Home(props) {
    return (
        <div>
            <SearchBar page={"Liste"}/>
        </div>
    );
}

export default Home;