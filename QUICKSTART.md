# 🚀 Quick Start Guide - Online Medicine Store

## ⚡ Quick Setup (2 minutes)

### 1. Open Terminal/Command Prompt

Navigate to the project folder:
```bash
cd online-medicine-store
```

### 2. Install Dependencies

```bash
npm install
```

**This installs all required packages**

### 3. Start the Application

```bash
npm start
```

**The app will open automatically at `http://localhost:3000`**

---

## 🎮 What to Try First

### 1. Browse Home Page
- See featured medicines
- Check categories
- View offers section

### 2. Search Medicines
- Type in search bar (e.g., "Aspirin", "Tablet")
- Add items to cart
- View cart (click 🛒 icon)

### 3. Apply Coupon
- Add items to cart
- In cart page, use coupon: **SAVE10** or **SAVE20**
- See discount applied

### 4. Create Account
- Click "Sign Up" link
- Fill form with any email/password (min 6 chars)
- You're logged in!

### 5. Checkout
- Add items to cart
- Click "Proceed to Checkout"
- Fill delivery details
- Choose payment method
- Complete order
- See success page with Order ID

### 6. View Orders
- Go to "My Orders"
- See all your orders
- View order details

### 7. Admin Access
- Login with: **admin@medistore.com** / **password**
- Access Admin panel
- Add/Edit medicines
- View statistics

---

## 📱 Features to Explore

### Shopping Features
- ✅ Search medicines
- ✅ Filter by category, brand, price
- ✅ Add/Remove from cart
- ✅ Add to wishlist (heart icon)
- ✅ Apply discount coupons
- ✅ Multiple payment options

### User Features
- ✅ Create account
- ✅ View order history
- ✅ Manage wishlist
- ✅ Save address
- ✅ Track orders

### Admin Features
- ✅ Add medicines
- ✅ Edit medicines
- ✅ Delete medicines
- ✅ View orders
- ✅ Track revenue

---

## 🔑 Demo Credentials

### Admin Login
```
Email: admin@medistore.com
Password: password
```

### Create Regular Account
- Use any email
- Use any password (min 6 characters)

---

## 🎨 Responsive Design

The app works perfectly on:
- 📱 Mobile phones (tested on all screen sizes)
- 📱 Tablets
- 💻 Desktops

**Try resizing your browser to see responsive behavior!**

---

## 💡 Pro Tips

1. **Search Works Instantly**
   - Type in search bar in navbar
   - Click Search button or press Enter

2. **Filters Remember Your Choices**
   - Multiple filters work together
   - Click "Clear Filters" to reset

3. **Cart is Saved**
   - Items persist in localStorage
   - Reload page - cart still there!

4. **Wishlist is Saved**
   - Click heart (♡) to save items
   - View from profile page

5. **Try Different Coupons**
   - SAVE10 = 10% discount
   - SAVE20 = 20% discount

---

## 🛠️ Common Commands

### Start Development
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Start on Different Port
```bash
npm start -- --port 3001
```

### Clean Install (if issues)
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📸 Screenshots & Sections

### Available Pages
1. Home - Hero banner, categories, featured products
2. Listing - All medicines with filters
3. Product Details - Full product information
4. Cart - Review items before checkout
5. Checkout - Address & payment
6. Orders - View past orders
7. Profile - Personal info & wishlist
8. Admin - Manage inventory

---

## ✨ Special Features

### Coupon Codes
- **SAVE10** → 10% off
- **SAVE20** → 20% off

### Free Delivery
- Orders above ₹500 get free delivery

### Stock Management
- Shows availability
- Disables "Out of Stock" items
- Admin can update stock

### Toast Notifications
- Success messages
- Error alerts
- Real-time feedback

---

## 🐛 Having Issues?

### App won't start?
```bash
npm install
npm start
```

### Port 3000 in use?
```bash
npm start -- --port 3001
```

### Something looks broken?
- Clear cache: Ctrl+Shift+Delete
- Hard refresh: Ctrl+Shift+R
- Check console: F12

---

## 📚 File Structure

Key folders:
- `src/pages/` - All page components
- `src/components/` - Reusable components
- `src/styles/` - CSS files
- `src/data/` - medicines.json
- `src/context/` - State management

---

## 🎯 Next Steps

### To Learn More
1. Open `src/App.js` - See routing setup
2. Open `src/components/Navbar.js` - See reusable components
3. Open `src/pages/Listing.js` - See filtering logic
4. Open `src/context/MedicineContext.js` - See state management

### To Customize
1. Add medicines in `medicines.json`
2. Change colors in `global.css`
3. Add categories in `Categories.js`
4. Modify features in page components

---

## 🎓 Learning Resources

This project teaches:
- React Hooks & Context API
- React Router navigation
- Responsive CSS design
- Form handling
- LocalStorage usage
- Component composition

---

**Enjoy exploring the Online Medicine Store! 💊**

For more detailed documentation, see `README.md`
