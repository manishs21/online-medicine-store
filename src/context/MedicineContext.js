import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const MedicineContext = createContext();

// Create a provider component
export const MedicineProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('user');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Add item to cart
  const addToCart = (medicine) => {
    const existingItem = cart.find((item) => item.id === medicine.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (medicineId) => {
    setCart(cart.filter((item) => item.id !== medicineId));
  };

  // Update cart quantity
  const updateCartQuantity = (medicineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === medicineId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Add to wishlist
  const addToWishlist = (medicine) => {
    const exists = wishlist.find((item) => item.id === medicine.id);
    if (!exists) {
      setWishlist([...wishlist, medicine]);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (medicineId) => {
    setWishlist(wishlist.filter((item) => item.id !== medicineId));
  };

  // Check if item is in wishlist
  const isInWishlist = (medicineId) => {
    return wishlist.some((item) => item.id === medicineId);
  };

  // Login user
  const loginUser = (userData) => {
    setUser(userData);
  };

  // Logout user
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get cart item count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    wishlist,
    user,
    medicines,
    setMedicines,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loginUser,
    logoutUser,
    getCartTotal,
    getCartCount,
  };

  return (
    <MedicineContext.Provider value={value}>{children}</MedicineContext.Provider>
  );
};

// Custom hook to use the context
export const useMedicineContext = () => {
  const context = useContext(MedicineContext);
  if (!context) {
    throw new Error(
      'useMedicineContext must be used within MedicineProvider'
    );
  }
  return context;
};
