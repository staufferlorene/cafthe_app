function CalculateTtc({produit}) {

    return (<>
        Prix TTC: {(produit.Prix_HT * (1 + (produit.Tva_categorie / 100))).toFixed(2)} €
    </>);
}

export default CalculateTtc;
