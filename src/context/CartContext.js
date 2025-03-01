import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    //removeItemFromCart: () => {},
    //clearCart: () => {},
});

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const cartReducer = (state, action) => {
    let updatedItems;

       if (action.type === "AJOUTER_DANS_PANIER") {
        updatedItems = [...state.items];

        const existingItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.Id_produit
        );

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].quantity += 1;
        } else {
            updatedItems.push({
                id: action.payload.Id_produit,
                name: action.payload.Nom_produit,
                quantity: 1,
            });
        }
    }

    // if (action.type === "SUPPRIMER_DU_PANIER") {
    //     updatedItems = state.items.filter(item => item.id !== action.payload.Id_produit);
    // }
    //
    // if (action.type === "VIDER_PANIER") {
    //     updatedItems = [];
    // }

    // Met à jour le localStorage
    localStorage.setItem("cart", JSON.stringify(updatedItems));

    return { items: updatedItems };
};

export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(cartReducer, { items: loadCartFromLocalStorage() });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartState.items));
    }, [cartState.items]);

    const addItemToCart = (Id_produit, Nom_produit) => {
        cartDispatch({
            type: "AJOUTER_DANS_PANIER",
            payload: { Id_produit, Nom_produit },
        });
    };

    // const removeItemFromCart = (Id_produit) => {
    //     cartDispatch({
    //         type: "SUPPRIMER_DU_PANIER",
    //         payload: { Id_produit },
    //     });
    // };
    //
    // const clearCart = () => {
    //     cartDispatch({ type: "VIDER_PANIER" });
    // };

    const initialValue = {
        items: cartState.items,
        addItemToCart,
        //removeItemFromCart,
        //clearCart,
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};






//////////////////////////////////////////
//////////////////////////////////////////
//                 CODE 2
//////////////////////////////////////////
//////////////////////////////////////////

// import {createContext, useReducer} from "react";
//
// export const CartContext = createContext({
//     // items = élément dans panier
//     items: [],
//     addItemToCart: () => {},
// });
//
// const cartReducer = (state, action) => {
//      if (action.type === "AJOUTER_DANS_PANIER") {
//          const updateShoppingCartItems = [...state.items];
//
//          // Vérifier si l'élément en question existe
//
//          const existingElementIndex = updateShoppingCartItems.findIndex(
//              (cartItem) => cartItem.id === action.payload.Id_produit
//          );
//
//          const existingElement = updateShoppingCartItems[existingElementIndex]
//
//          if(existingElement){
//              // Au cas ou l'élement est déjà présent dans le panier
//          } else {
//              const produit = DUMMY_PRODUCTS.find((produit) => produit.Id_produit === action.payload.Id_produit);
//
//              if (produit){
//                  updateShoppingCartItems.push({
//                      id: produit.Id_produit,
//                      name: produit.Nom_produit,
//                      quantity: 1,
//                  })
//              }
//          }
//
//         return {
//              items: updateShoppingCartItems,
//         }
//     }
//
//     return state;
// };
//
// export const CartContextProvider = ({children}) => {
//     const [cartState, cartDispatch] = useReducer(cartReducer, {
//        items: [],
//     });
//
//     //Fonction d'ajout dans le panier
//     const handleAddProductToCart = (Id_produit) => {
//         cartDispatch({
//             type: "AJOUTER_DANS_PANIER",
//             payload: { Id_produit: Id_produit },
//         });
//     };
//
//     const initialValue = {
//         items: cartState.items,
//         addItemToCart: handleAddProductToCart,
//     };
//
//     return <CartContext.Provider value={initialValue}>
//         {children}
//     </CartContext.Provider>
// };


//////////////////////////////////////////
//////////////////////////////////////////
//                 CODE 1
//////////////////////////////////////////
//////////////////////////////////////////

// import { createContext, useContext, useState } from "react";
//
// export const CartContext = createContext();
//
// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);
//
//     const addToCart = (item) => {
//         setCartItems((prevItems) => [...prevItems, item]);
//     };
//
//     const removeFromCart = (itemId) => {
//         setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//     };
//
//     const clearCart = () => {
//         setCartItems([]);
//     };
//
//     return (
//         <CartContext.Provider
//             value={{ cartItems, addToCart, removeFromCart, clearCart }}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };
//
// export const useCart = () => useContext(CartContext);
//
// export default CartContext;
