import { create } from "zustand";

export const useCartStore = create(set => ({
  cartItems: [],
  addToCart: product =>
    set(state => {
      if (product.available !== "available") {
        return { cartItems: state.cartItems };
      }
      const existingProductIndex = state.cartItems.findIndex(item => item._id === product._id);
      if (existingProductIndex !== -1) {
        const newCartItems = [...state.cartItems];
        const existingProduct = newCartItems[existingProductIndex];
        if (existingProduct.quantity < product.quantity) {
          existingProduct.quantity += 1;
        }
        return { cartItems: newCartItems };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity: 1, checked: true }] };
      }
    }),
  removeItemFromCart: productId =>
    set(state => ({ cartItems: state.cartItems.filter(product => product._id !== productId) })),
  clearCart: () => set({ cartItems: [] }),
  handleCheck: index =>
    set(state => {
      const newCartItems = [...state.cartItems];
      newCartItems[index].checked = !newCartItems[index].checked;
      return { cartItems: newCartItems };
    }),
  handleQuantityChange: (index, newQuantity) =>
    set(state => {
      const newCartItems = [...state.cartItems];
      const targetItem = newCartItems[index];
      const newQty = Number(newQuantity);
      console.log("newQty", newQty)
      if (newQty > 0 && newQty <= targetItem.quantity) {
        targetItem.quantity = newQty;
      } else if (newQty > targetItem.quantity) {
        targetItem.quantity = targetItem.quantity;
      } else if (newQty <= 0) {
        newCartItems.splice(index, 1);
      }
      return { cartItems: newCartItems };
    })
}));
