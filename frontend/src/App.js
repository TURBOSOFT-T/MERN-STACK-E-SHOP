import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  ProductsPage,
  ProductDetailsPage,
  CheckoutPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  HomePage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./routes/Routes";
import { ShopDashboardPage, ShopCreateProduct } from "./routes/ShopRoutes";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    //  Store.dispatch(getAllProducts());
    // Store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
