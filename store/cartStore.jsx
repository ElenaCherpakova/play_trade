import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    set => ({
      cartItems: [],
      itemsCount: 0,
      totalPrice: 0,

      calculateTotals: cartItems => {
        const itemsCount = cartItems.reduce((total, item) => total + (item.checked ? item.quantity : 0), 0);
        const totalPrice = cartItems.reduce((total, item) => total + (item.checked ? item.price * item.quantity : 0), 0);
        return { itemsCount, totalPrice };
      },

      addToCart: product =>
        set(state => {
          if (product.available !== "available") {
            return state;
          }
          const existingProductIndex = state.cartItems.findIndex(item => item._id === product._id);
          const newCartItems = [...state.cartItems];
          if (existingProductIndex !== -1) {
            const existingProduct = newCartItems[existingProductIndex];
            existingProduct.quantity = Math.min(existingProduct.quantity + 1, product.quantity);
          } else {
            newCartItems.push({ ...product, quantity: 1, checked: true });
          }
          const totals = state.calculateTotals(newCartItems);
          return { ...state, cartItems: newCartItems, ...totals };
        }),

      removeItemFromCart: productId =>
        set(state => {
          const newCartItems = state.cartItems.filter(item => item._id !== productId);
          const totals = state.calculateTotals(newCartItems);
          return { ...state, cartItems: newCartItems, ...totals };
        }),

      clearCart: () => set({ cartItems: [], itemsCount: 0, totalPrice: 0 }),

      handleCheck: index =>
        set(state => {
          const newCartItems = [...state.cartItems];
          newCartItems[index].checked = !newCartItems[index].checked;
          const totals = state.calculateTotals(newCartItems);
          return { ...state, cartItems: newCartItems, ...totals };
        }),

      handleQuantityChange: (index, newQuantity) =>
        set(state => {
          const newCartItems = [...state.cartItems];
          const targetItem = newCartItems[index];
          const newQty = Number(newQuantity);
          if (newQty > 0 && newQty <= targetItem.quantity) {
            targetItem.quantity = newQty;
          } else if (newQty <= 0) {
            newCartItems.splice(index, 1);
          }
          const totals = state.calculateTotals(newCartItems);
          return { ...state, cartItems: newCartItems, ...totals };
        })
    }),
    {
      name: "cart-items",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
