import { createContext, useReducer, useEffect } from "react";

// Création du contexte, tout est vide par défaut et défini par la suite
export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemFromCart: () => {},
    clearCart: () => {},
});

// Récupération du panier dans le localstorage s'il est existant
const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

// Gérer les différentes actions dans le panier
const cartReducer = (state, action) => {
    let updatedItems;

    if (action.type === "AJOUTER_DANS_PANIER") {

        //////// POUR L'AJOUT DANS LE PANIER ////////
        // Mettre à jour la quantité si le produit existe déjà dans le panier
            updatedItems = state.items.map(item =>
                item.id === action.payload.Id_produit
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );

        // Ajouter le produit s'il n'est pas déjà dans le panier
        if (!state.items.some(item => item.id === action.payload.Id_produit)) {
            updatedItems.push({
                // Ajouter le produit avec toutes les infos suivantes dans le localstorage
                quantity: action.payload.Type_conditionnement === "unitaire" ? 1 : 50,
                amount_TTC: action.payload.Prix_TTC,
                id: action.payload.Id_produit,
                name: action.payload.Nom_produit,
                amount: action.payload.Prix_HT,
                tva_category: action.payload.Tva_categorie,
                type_conditionnement: action.payload.Type_conditionnement,
            });
        }
        console.log(action);
    }

    if (action.type === "ACTUALISER_QUANTITE_PRODUIT") {
        //////// POUR LA MAJ DE LA QUANTITE DANS LE PANIER ////////
        // Màj la quantité du produit voulu
        updatedItems = state.items
            .map(item => {
                // Pour les produits vendu à l'unité on ajoute ou retire de la quantité
                if (item.id === action.payload.Id_produit && item.type_conditionnement === "unitaire") {
                    return  {...item, quantity: item.quantity + action.payload.quantity}
                    }

                // Pour les produits vendu en vrac on remplace par la quantité sélectionnée
                if (item.id === action.payload.Id_produit && item.type_conditionnement === "vrac") {
                    return  {...item, quantity: action.payload.quantity}
                }

                    return item;
                })

            // Supprimer le produit quand la quantité = 0 (ne pas mettre signe = mais > sinon même lorsqu'on clic sur +
            // le produit est supprimé
            .filter(item => item.quantity > 0);

        return {items: updatedItems};
        console.log(updatedItems);
    }

    // Filtrer pour retirer du panier
    if (action.type === "SUPPRIMER_DU_PANIER") {
        updatedItems = state.items.filter(item => item.id !== action.payload.Id_produit);
    }

    // Réinitialisation du panier
    if (action.type === "VIDER_PANIER") {
        updatedItems = [];
    }

    // Màj du localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return {items: updatedItems};
};


export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, {items: loadCartFromLocalStorage()});

    // Sauvegarde du panier dans localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartState.items));
    }, [cartState.items]);

    ///////////////////////////////////////////////////////////////////////////////////////
    // Actions pour modifier le panier (ajout, màj quantité, suppression, vider panier) //
    ////////////////////////////////////////////////////////////////////////////////////

    // Envoi des actions au cartReducer qui gère les différentes actions dans le panier
    const addItemToCart = (Id_produit, Nom_produit, Prix_HT, Prix_TTC, Tva_categorie, Type_conditionnement) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: {Id_produit, Nom_produit, Prix_HT, Prix_TTC, Tva_categorie, Type_conditionnement},
        });
    };

    const updateItemQuantity = (Id_produit, quantity) => {
        cartDispatch({
            type: "ACTUALISER_QUANTITE_PRODUIT",
            payload: {Id_produit, quantity}
        })
    };

    const removeItemFromCart = (Id_produit) => {
        cartDispatch({
            type: "SUPPRIMER_DU_PANIER",
            payload: {Id_produit},
        });
    };

    const clearCart = () => {
        cartDispatch({
            type: "VIDER_PANIER",
        });
    };

    // Déclaration context pour le passer aux composants enfants
    const initialValue = {
        items: cartState.items,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart,
    };

    // Passage du context aux composants enfants
    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};