import React, {useState} from 'react';
import PageCoffee from "../pages/PageCoffee";
import PageTea from "../pages/PageTea";
import PageAccessory from "../pages/PageAccessory";
import ProductList from "../pages/ProductList";
import PageBox from "../pages/PageBox";
import PageSelection from "../pages/PageSelection";
import "../styles/Global.css";
import "../styles/SearchBar.css";

// Prop indique catégorie produit affichée
function SearchBar({page}) {
    const [searchInput, setSearchInput] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (
        <div>
            <input className="searchBar"
                type="search"
                placeholder="Rechercher"
                onChange={handleChange}
                value={searchInput}
            />
            {page === "cafe" ? <PageCoffee search={searchInput}/> :
                page === "the" ? <PageTea search={searchInput}/> :
                    page === "accessoire" ? <PageAccessory search={searchInput}/> :
                        page === "coffret" ? <PageBox search={searchInput}/> :
                            page === "selection" ? <PageSelection search={searchInput}/> :
                                <ProductList search={searchInput}/>}
        </div>
    );
}

export default SearchBar;