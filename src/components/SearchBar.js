import React, {useState} from 'react';
import "../styles/Global.css";
import PageCoffee from "../pages/PageCoffee";
import PageTea from "../pages/PageTea";
import PageAccessory from "../pages/PageAccessory";
import ProductList from "../pages/ProductList";

function SearchBar({page}) {
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (
        <div>
            <input
                type="search"
                placeholder="Rechercher"
                onChange={handleChange}
                value={searchInput}
            />
            {page === "cafe" ? <PageCoffee search={searchInput}/> :
                page === "the" ? <PageTea search={searchInput}/> :
                    page === "accessoire" ? <PageAccessory search={searchInput}/> :
                        <ProductList search={searchInput}/>}
        </div>
    );
}

export default SearchBar;