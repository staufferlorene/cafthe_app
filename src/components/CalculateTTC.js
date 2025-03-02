// fonction pour calculer le montant TTC
function CalculateTtc({produit}) {

    return (<>
       {(produit.Prix_HT * (1 + (produit.Tva_categorie / 100))).toFixed(2)} €
    </>);
}

export default CalculateTtc;