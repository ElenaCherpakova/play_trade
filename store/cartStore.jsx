import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create()(
  persist(
    (set, get) => ({
      cartItems: [],
      itemsCount: 0,
      totalPrice: 0,
      userId: null,

      calculateTotals: cartItems => {
        const itemsCount = cartItems.reduce((total, item) => total + (item.checked ? item.quantity : 0), 0);
        const totalPrice = cartItems.reduce(
          (total, item) => total + (item.checked ? item.price * item.quantity : 0),
          0
        );
        return { itemsCount, totalPrice };
      },

      addToCart: async product => {
        const userId = get().userId;
        if (!userId) return;

        if (!product || product.available !== "available" || product.quantity === 0) {
          return;
        }

        const existingProductIndex = get().cartItems.findIndex(item => item._id === product._id);
        const existingProduct = get().cartItems[existingProductIndex];
        let newQuantity = 1;
        if (existingProduct) {
          newQuantity += existingProduct.quantity;
        }
        if (newQuantity > product.quantity) return;
        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId,
              cardId: product._id
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add card into cart");
          }
          const data = await response.json();
          console.log("DAT", data)
          set(state => {
            const newCartItems = [...state.cartItems];
            if (existingProductIndex !== -1) {
              newCartItems[existingProductIndex].quantity += 1;
            } else {
              newCartItems.push({ ...product, quantity: 1, checked: true });
            }
            const totals = state.calculateTotals(newCartItems);
            return { ...state, cartItems: newCartItems, ...totals };
          });
        } catch (err) {
          console.log("Failed to add card into cart", err.message);
        }
      },
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
        }),
      setUserId: id => set({ userId: id })
    }),
    {
      name: "cart-items",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
