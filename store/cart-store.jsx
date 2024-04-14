import { create } from "zustand";

export const useCartStore = create(set => ({
  cartItems: [],
  addToCart: product =>
    set(state => {
      if (product.available !== "available") {
        return { ...state };
      }
      const existingProductIndex = state.cartItems.findIndex(item => item._id === product._id);
      if (existingProductIndex !== -1) {
        const newCartItems = [...state.cartItems];
        const existingProduct = newCartItems[existingProductIndex];
        if (existingProduct.quantity < product.quantity) {
          existingProduct.quantity += 1;
        }
        return { cartItems: newCartItems, count: newCartItems.reduce((total, item) => total + item.quantity, 0) };
      } else {
        const newCartItems = [...state.cartItems, { ...product, quantity: 1, checked: true }];
        return { cartItems: newCartItems, count: newCartItems.reduce((total, item) => total + item.quantity, 0) };
      }
    }),
  removeItemFromCart: productId =>
    set(state => {
      const newCartItems = state.cartItems.filter(product => product._id !== productId);
      return { cartItems: newCartItems, count: newCartItems.reduce((total, item) => total + item.quantity, 0) };
    }),
  clearCart: () => set({ cartItems: [], count: 0 }),
  handleCheck: index =>
    set(state => {
      const newCartItems = [...state.cartItems];
      newCartItems[index].checked = !newCartItems[index].checked;
      return { cartItems: newCartItems, count: newCartItems.reduce((total, item) => total + item.quantity, 0) };
    }),
  handleQuantityChange: (index, newQuantity) =>
    set(state => {
      const newCartItems = [...state.cartItems];
      const targetItem = newCartItems[index];
      const newQty = Number(newQuantity);
      console.log("newQty", newQty);
      if (newQty > 0 && newQty <= targetItem.quantity) {
        targetItem.quantity = newQty;
      } else if (newQty > targetItem.quantity) {
        targetItem.quantity = targetItem.quantity;
      } else if (newQty <= 0) {
        newCartItems.splice(index, 1);
      }
      return { cartItems: newCartItems, count: newCartItems.reduce((total, item) => total + item.quantity, 0) };
    })
}));
