# ShopSphere — E-Commerce Frontend Application

ShopSphere is a responsive e-commerce frontend built with React. It includes product browsing, search and filtering, product details, a shopping cart, simulated user authentication, and a checkout flow with form validation. The app is designed as a capstone project to demonstrate modern frontend architecture, state management, API integration, and deployment practices.

## Features

- Responsive product catalog with cards, filters, and sorting.
- Product detail page with complete item information.
- Shopping cart with add, remove, update quantity, and persistent storage.
- Simulated authentication using Local Storage.
- Protected routes for cart and checkout pages.
- Checkout form with validation and order summary.
- Loading states, error handling, and lazy-loaded routes for better performance.
- Deployed-ready structure for Vercel or Netlify.

## Tech Stack

- React
- React Router
- Context API
- Local Storage
- FakeStoreAPI
- CSS Modules / custom CSS
- Vercel or Netlify for deployment

## Project Structure

```bash
src/
├── App.js
├── components/
│   ├── Navbar/
│   ├── ProductList/
│   ├── ProductCard/
│   ├── Cart/
│   └── Checkout/
├── pages/
│   ├── Home.js
│   ├── ProductDetail.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── contexts/
│   ├── CartContext.js
│   └── AuthContext.js
├── hooks/
│   └── useProducts.js
├── services/
│   └── api.js
└── styles/
public/
package.json
README.md
```

## Architecture Overview

The application follows a component-based architecture to keep the UI modular and maintainable. Global cart and authentication state are managed using Context API, which avoids prop drilling and keeps shared data accessible throughout the app. Product data is fetched through a dedicated API service, while custom hooks handle reusable data-fetching logic. React Router manages page navigation and route protection.

## State Management

- **Cart state**: Stores items, quantities, subtotal, and persistence data.
- **Auth state**: Simulates login and logout using Local Storage.
- **UI state**: Handles loading, error, filtering, and sorting behavior.
- **API state**: Managed through custom hooks and component-level state where needed.

## API Integration

This project uses FakeStoreAPI to load product data and simulate a real e-commerce backend. API requests are centralized inside `src/services/api.js` so the app stays easy to maintain and update. Loading and error states are shown to improve user experience during network requests [web:1][web:3].

## Performance Optimization

- Route-based code splitting with `React.lazy()` and `Suspense`.
- Lazy loading images in product cards.
- Reusable components to reduce duplication.
- API response caching where appropriate.
- Clean file structure for easier maintenance and smaller bundles [web:16][web:19].

## Authentication Flow

Authentication is simulated for learning purposes. Users can log in and log out, and session data is stored in Local Storage. Protected routes ensure that checkout and cart-related flows behave like a real application.

## Checkout Process

The checkout page includes form fields for shipping and payment details, client-side validation, and an order summary. The form prevents invalid submissions and gives feedback to users before completing the purchase.

## Deployment

The project can be deployed to Vercel or Netlify. For Vercel, connect the GitHub repository and let the platform detect the React app automatically. For Netlify, deploy the build output after running the production build [web:7][web:10].

## Setup Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.
4. Build the app with `npm run build`.
5. Deploy the build folder to your hosting platform.

## Screenshots

Include screenshots of:
- Home page with product listing
- Product detail page
- Shopping cart
- Login page
- Checkout page
- Responsive mobile view

## Testing

Suggested test cases:
- Product loads successfully from API.
- Add to cart updates quantity correctly.
- Cart data persists after refresh.
- Login/logout updates auth state.
- Checkout form blocks invalid submissions.
- Protected routes redirect unauthorized users.

## Challenges Faced

- Managing shared state across multiple pages.
- Handling API loading and error states.
- Keeping the cart data persistent.
- Designing a clean checkout flow.
- Optimizing performance with lazy loading and route splitting.

## Future Improvements

- Wishlist functionality.
- Dark mode toggle.
- Product search suggestions.
- Real payment integration.
- User profile and order history.

## License

This project is created for educational purposes.
