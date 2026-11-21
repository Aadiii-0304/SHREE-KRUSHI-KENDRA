import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { NewHomepage } from "./pages/NewHomepage";
import { CropSolutionsPage } from "./pages/CropSolutionsPage";
import { ExpertHelpPage } from "./pages/ExpertHelpPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboardMain } from "./pages/AdminDashboardMain";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AdminProductManagement } from "./pages/AdminProductManagement";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { AdminDocumentsPage } from "./pages/AdminDocumentsPage";
import { AdminPaymentsPage } from "./pages/AdminPaymentsPage";
import { AccessDeniedPage } from "./pages/AccessDeniedPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { ShippingPolicyPage } from "./pages/ShippingPolicyPage";
import { FAQPage } from "./pages/FAQPage";
import { SitemapPage } from "./pages/SitemapPage";

// Wrapper component for admin routes (no navbar/footer)
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

// Wrapper component for public routes (with navbar/footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <LanguageProvider>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <NewHomepage />
                  </PublicLayout>
                }
              />
              <Route
                path="/crop-solutions"
                element={
                  <PublicLayout>
                    <CropSolutionsPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/expert-help"
                element={
                  <PublicLayout>
                    <ExpertHelpPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/products"
                element={
                  <PublicLayout>
                    <ProductsPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <PublicLayout>
                    <ProductDetailPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <PublicLayout>
                    <CartPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <AboutPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <ContactPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PublicLayout>
                    <PrivacyPolicyPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/terms-conditions"
                element={
                  <PublicLayout>
                    <TermsConditionsPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/shipping-policy"
                element={
                  <PublicLayout>
                    <ShippingPolicyPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/faq"
                element={
                  <PublicLayout>
                    <FAQPage />
                  </PublicLayout>
                }
              />
              <Route
                path="/sitemap"
                element={
                  <PublicLayout>
                    <SitemapPage />
                  </PublicLayout>
                }
              />

              {/* Auth Routes */}
              <Route
                path="/login"
                element={
                  <PublicLayout>
                    <LoginPage />
                  </PublicLayout>
                }
              />

              {/* Protected User Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <PublicLayout>
                      <ProfilePage />
                    </PublicLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <PublicLayout>
                      <CheckoutPage />
                    </PublicLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-confirmation"
                element={
                  <ProtectedRoute>
                    <PublicLayout>
                      <OrderConfirmationPage />
                    </PublicLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <PublicLayout>
                      <OrderConfirmationPage />
                    </PublicLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PublicLayout>
                      <DashboardPage />
                    </PublicLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Login (No Layout) */}
              <Route
                path="/admin/login"
                element={<AdminLoginPage />}
              />

              {/* Access Denied Page */}
              <Route
                path="/access-denied"
                element={<AccessDeniedPage />}
              />

              {/* Protected Admin Routes (No Navbar/Footer) */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminDashboardMain />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminProductManagement />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminUsersPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminOrdersPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/payments"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminPaymentsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/documents"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLayout>
                      <AdminDocumentsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
            <Toaster position="top-right" richColors />
          </LanguageProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
