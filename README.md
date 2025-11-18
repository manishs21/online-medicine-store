# 💊 Online Medicine Store - Complete React Application

A professional, responsive, and fully functional online medicine buying platform built with React, HTML5, CSS3, and JavaScript.

![image alt](https://github.com/manishs21/online-medicine-store/blob/583b5537ecc3fba3a0a0cbda8a585343cad83709/Web%20pic1.png)

## 🎯 Features

### Core Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern UI with blue-white medical theme
- ✅ Complete e-commerce functionality
- ✅ Shopping cart with localStorage persistence
- ✅ Wishlist management
- ✅ Product filtering and search
- ✅ Order management system
- ✅ User authentication (Login/Signup)
- ✅ Admin panel for managing medicines
- ✅ Toast notifications
- ✅ Smooth animations and transitions

### Pages Included
1. **Home Page** - Hero banner, categories, featured medicines, brands, offers
2. **Medicine Listing** - Advanced filters, search, sorting, grid view
3. **Product Details** - Full product information, reviews, tabs
4. **Shopping Cart** - Add/remove items, quantity control, coupon system
5. **Checkout** - Address form, delivery options, payment methods
6. **Order Success** - Order confirmation and details
7. **Login/Signup** - User authentication with validation
8. **User Profile** - Orders, wishlist, personal details, saved addresses
9. **Orders Page** - View all orders with status
10. **Admin Panel** - Add/edit/delete medicines, view orders

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router v6
- **State Management**: React Hooks + Context API
- **Styling**: CSS3 (Responsive Design)
- **Notifications**: React Toastify
- **Build Tool**: Create React App
- **Storage**: LocalStorage

## 📋 Project Structure

```
online-medicine-store/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── HeroBanner.js
│   │   ├── Categories.js
│   │   └── FeaturedMedicines.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Listing.js
│   │   ├── ProductDetails.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── OrderSuccess.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Profile.js
│   │   ├── Admin.js
│   │   └── Orders.js
│   ├── context/
│   │   └── MedicineContext.js
│   ├── data/
│   │   └── medicines.json
│   ├── styles/
│   │   ├── global.css
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── productcard.css
│   │   ├── heroBanner.css
│   │   ├── categories.css
│   │   ├── featured.css
│   │   ├── home.css
│   │   ├── listing.css
│   │   ├── productdetails.css
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   ├── ordersuccess.css
│   │   ├── auth.css
│   │   ├── profile.css
│   │   ├── admin.css
│   │   └── orders.css
│   ├── App.js
│   └── index.js
└── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd online-medicine-store
npm install
```

This will install all required packages:
- react
- react-dom
- react-router-dom
- react-toastify
- axios
- react-scripts

### Step 2: Start the Development Server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🔐 Demo Credentials

### Admin Login
- **Email**: admin@medistore.com
- **Password**: password

### Regular User
You can create a new account using the Signup page with any email and password (minimum 6 characters).

## 💡 Usage Guide

### As a Customer

1. **Browse Medicines**
   - Visit the Home page to see featured medicines
   - Click "Medicines" in navbar to access the listing page
   - Use filters to refine your search

2. **Search & Filter**
   - Use the search bar in navbar to find specific medicines
   - Filter by category, brand, price range, and rating
   - Sort by popular, price, rating, or newest

3. **Add to Cart**
   - Click "Add to Cart" on any product card
   - View cart by clicking the cart icon in navbar
   - Adjust quantities or remove items

4. **Wishlist**
   - Click the heart icon (♡) on product cards to add to wishlist
   - View wishlist from your profile page

5. **Checkout**
   - Fill in delivery address
   - Choose delivery option
   - Select payment method
   - Complete the order

6. **Track Orders**
   - View all orders in "My Orders" page
   - Check order status and details in profile

### As an Admin

1. **Access Admin Panel**
   - Login with admin credentials (admin@medistore.com)
   - Click "Admin" in navbar

2. **Dashboard**
   - View key statistics:
     - Total medicines
     - Low stock products
     - Total orders
     - Revenue

3. **Manage Medicines**
   - Add new medicines with details
   - Edit existing medicine information
   - Delete medicines from inventory
   - Track stock levels

4. **View Orders**
   - See all customer orders
   - View order details and status
   - Monitor revenue

## 🎨 Customization

### Change Color Scheme

Edit the color variables in `src/styles/global.css`:

```css
:root {
  --primary-blue: #007bff;
  --dark-blue: #0056b3;
  --light-blue: #e7f3ff;
  /* ... more colors ... */
}
```

### Add More Products

Edit `src/data/medicines.json` and add medicine objects:

```json
{
  "id": 16,
  "name": "Medicine Name",
  "category": "Tablet",
  "brand": "Brand Name",
  "price": 100,
  "originalPrice": 150,
  "image": "image-url",
  "rating": 4.5,
  "reviews": 100,
  "stock": 50,
  "description": "Description",
  "composition": "Active ingredient",
  "manufacturer": "Company name",
  "usage": "Usage instructions",
  "sideEffects": "Side effects",
  "discount": 33
}
```

### Modify Categories

Edit the categories array in `src/components/Categories.js`:

```javascript
const categories = [
  {
    name: 'Your Category',
    icon: '🏥',
    link: '/listing?category=YourCategory',
  },
  // ... more categories
];
```

## 📱 Responsive Breakpoints

The application is responsive across all devices:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔒 Features in Detail

### Context API (State Management)
- Global state for cart, wishlist, user, and medicines
- Persistent storage using localStorage
- Easy prop drilling elimination

### Form Validation
- Email format validation
- Password strength requirements
- Required field validation
- Phone number validation

### Search Functionality
- Real-time search across medicines
- Filter by name, brand, and category
- Case-insensitive search

### Coupon System
- Apply discount codes: SAVE10 (10% off), SAVE20 (20% off)
- Automatic total calculation
- Discount display in price summary

### Cart Features
- Add/remove items
- Quantity adjustment
- Persistent storage
- Free delivery threshold (₹500+)

### Admin Features
- Add new medicines
- Edit existing medicines
- Delete medicines
- View order statistics
- Track low stock items

## 🐛 Troubleshooting

### Issue: Port 3000 is already in use
**Solution**: 
```bash
npm start -- --port 3001
```

### Issue: Modules not found
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Changes not reflecting
**Solution**: Clear browser cache or do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📧 Demo Features

### Pre-filled Data
- 15 sample medicines in multiple categories
- 6 popular brands
- Multiple category options
- Real pricing and discounts

### Test Scenarios
1. Add medicines to cart
2. Apply coupons (SAVE10 or SAVE20)
3. Proceed to checkout
4. Complete order
5. View order history
6. Login as admin and add new medicines

## 🎓 Learning Points

This project demonstrates:
- React Hooks (useState, useEffect, useContext)
- React Router for multi-page navigation
- Context API for global state management
- Responsive CSS Grid and Flexbox
- Form handling and validation
- LocalStorage API usage
- Component composition and reusability
- Conditional rendering
- Array and object manipulation

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve this project. Great for portfolio building and learning React!

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check component documentation

---

**Made with ❤️ for learning React and building e-commerce applications**

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Built with**: React 18, React Router 6, CSS3
