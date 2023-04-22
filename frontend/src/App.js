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
} from "./routes/Routes";
//mport { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useEffect } from "react";
import { ShopHomePage } from "./ShopRoutes.js";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {

  const {  isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
  
    Store.dispatch(loadUser());
    // Store.dispatch(loadUser());
    //  Store.dispatch(loadSeller());
    //  Store.dispatch(getAllProducts());
    // Store.dispatch(getAllEvents());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route
          path="/profile"
          element={
            
            <ProtectedRoute isAuthenticated={isAuthenticated} >
              <ProfilePage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
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
        <Route path="/" acti element={<LoginPage />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={10000}
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
