import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useCartStore = create(
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
        console.log("ADD TO", product);
        const userId = get().userId;
        if (!userId) return;

        if (!product || product.available !== "available") {
          return;
        }

        const existingProductIndex = get().cartItems.findIndex(item => item._id === product._id);
        const newCartItems = [...get().cartItems];

        if (existingProductIndex !== -1) {
          const existingProduct = newCartItems[existingProductIndex];

          if (existingProduct.quantity + 1 > product.quantity) {
            console.error("Can not add more that available");
            return;
          }
          newCartItems[existingProductIndex] = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
            checked: true
          };
        } else {
          newCartItems.push({ ...product, quantity: 1, checked: true });
        }

        const productToSend =
          existingProductIndex !== -1 ? newCartItems[existingProductIndex] : newCartItems[newCartItems.length - 1];
        if (!productToSend) return;

        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId,
              cardId: productToSend._id,
              quantity: 1
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add card into cart");
          }
          const data = await response.json();
          console.log("DATA", data);
          set(state => {
            const totals = state.calculateTotals(newCartItems);
            return { ...state, cartItems: newCartItems, ...totals };
          });
          await get().loadCart();
        } catch (err) {
          console.log("Failed to add card into cart", err.message);
        }
      },
      loadCart: async () => {
        const userId = get().userId;
        console.log("userId", userId);
        if (!userId) return;
        try {
          const response = await fetch(`/api/cart?userId=${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to load cart");
          }
          const data = await response.json();
          console.log("DATA FROM LOADING", data);
          // set({ cartItems: data.items });
          const items = data.items.map(item => ({
            ...item.cardId,
            price: item.cardId.price,
            quantity: item.quantity,
            checked: true 
          }));
          set(state => {
            const totals = state.calculateTotals(items);
            return { ...state, cartItems: items, ...totals };
          });
        } catch (error) {
          console.error("Error loading cart:", error.message);
        }
      },

      updateQuantityChange: async (productId, quantity) => {
        const userId = get().userId;
        const userCart = get().cartItems;
        const product = userCart.find(item => item._id === productId);

        if (!userId || !product) return;

        // Ensure quantity is within valid range
        if (quantity < 0 || quantity > product.quantity) {
          console.error("Invalid quantity");
          return;
        }

        try {
          const response = await fetch("/api/cart", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ cardId: productId, quantity })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update cart");
          }

          const data = await response.json();
          console.log("Cart updated successfully:", data);

          set(state => {
            const newCartItems = [...state.cartItems];

            const itemIndex = newCartItems.findIndex(item => item._id === productId);
            if (itemIndex !== -1) {
              if (quantity === 0) {
                newCartItems.splice(itemIndex, 1);
              } else {
                newCartItems[itemIndex].quantity = quantity;
              }
            }

            const totals = state.calculateTotals(newCartItems);
            return { ...state, cartItems: newCartItems, ...totals };
          });

          await get().loadCart();
        } catch (error) {
          console.log("Failed to update cart:", error.message);
        }
      },
      handleCheck: cardId =>
        set(state => {
          const newCartItems = state.cartItems.map(item =>
            item._id === cardId ? { ...item, checked: !item.checked } : item
          );
          const totals = state.calculateTotals(newCartItems);
          return { ...state, cartItems: newCartItems, ...totals };
        }),
      removeItemFromCart: async productId => {
        const userId = get().userId;

        if (!userId) return;
        try {
          const response = await fetch("/api/cart", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ cardId: productId })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update cart");
          }

          const data = await response.json();
          console.log("Cart updated successfully:", data);

          set(state => {
            const newCartItems = state.cartItems.filter(item => item._id !== productId);
            const totals = state.calculateTotals(newCartItems);
            return { ...state, cartItems: newCartItems, ...totals };
          });

          await get().loadCart();
        } catch (error) {
          console.log("Failed to update cart:", error.message);
        }
      },
      clearCart: () => set({ cartItems: [], itemsCount: 0, totalPrice: 0 }),

      setUserId: id => set({ userId: id }),

      clearCart: () => set({ cartItems: [], itemsCount: 0, totalPrice: 0 }),

      logOutAndClearCart: () => {
        set({ userId: null });
        get().clearCart();
      }
    }),
    {
      name: "cart-items"
      // storage: createJSONStorage(() => localStorage)
    }
  )
);
