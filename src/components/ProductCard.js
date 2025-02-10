import React from 'react';
import { Link } from "react-router-dom";

function ProductCard({produit}) {
    return (
        <div className={"product-card"}>
            {/*image*/}
            <h3>{produit.Nom_produit}</h3>
            <p>{produit.Prix_HT}</p>
                <Link to={`/produit/${produit.Id_produit}`} className="details-btn">
                    Voir détails
                </Link>
        </div>
    );
}

export default ProductCard;