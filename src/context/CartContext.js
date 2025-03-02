import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemFromCart: () => {},
});

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const cartReducer = (state, action) => {
    let updatedItems;

        if (action.type === "AJOUTER_DANS_PANIER") {

            //////// POUR L'AJOUT DANS LE PANIER ////////
            // Mettre à jour la quantité si le produit existe déjà dans le panier
            updatedItems = state.items.map(item =>
                item.id === action.payload.Id_produit
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );

            // Ajouter le produit s'il n'est pas déjà dans le panier
            if (!state.items.some(item => item.id === action.payload.Id_produit)) {
                updatedItems.push({
                    id: action.payload.Id_produit,
                    name: action.payload.Nom_produit,
                    amount: action.payload.Prix_HT,
                    Tva_categorie: action.payload.Tva_categorie,
                    quantity: 1,
            });
        }
    }

    if (action.type === "ACTUALISER_QUANTITE_PRODUIT") {
        //////// POUR LA MAJ DE LA QUANTITE DANS LE PANIER ////////
        // Màj la quantité du produit voulu
        updatedItems = state.items
            .map(item =>
                item.id === action.payload.Id_produit
                    ? { ...item, quantity: item.quantity + action.payload.quantity }
                    : item
            )

            // Supprimer le produit quand la quantité = 0
            .filter(item => item.quantity > 0);

        return { items: updatedItems };
    }


    if (action.type === "SUPPRIMER_DU_PANIER") {
            updatedItems = state.items.filter(item => item.id !== action.payload.Id_produit);
        }

        // Màj du localStorage
        localStorage.setItem("cart", JSON.stringify(updatedItems));

        return { items: updatedItems };
};

export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, { items: loadCartFromLocalStorage() });

    // Sauvegarde du panier dans localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartState.items));
    }, [cartState.items]);

    /////////////////////////////////////////////////////////////////////////
    // Actions pour modifier le panier (ajout, màj quantité, suppression) //
    //////////////////////////////////////////////////////////////////////

    const addItemToCart = (Id_produit, Nom_produit, Prix_HT, Tva_categorie) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: { Id_produit, Nom_produit, Prix_HT, Tva_categorie },
        });
    };

    const updateItemQuantity = (Id_produit, quantity) => {
        cartDispatch({
            type: "ACTUALISER_QUANTITE_PRODUIT",
            payload: { Id_produit, quantity }
        })
    };

    const removeItemFromCart = (Id_produit) => {
        cartDispatch({
            type: "SUPPRIMER_DU_PANIER",
            payload: { Id_produit },
        });
    };

    // Déclaration context pour le passer aux composants enfants
    const initialValue = {
        items: cartState.items,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
    };

    // Passage du context aux composants enfants
    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};