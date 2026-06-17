import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import InventoryPage from './Pages/InventoryPage';
import SalePage from './Pages/SalePage';
import SupplierPage from './Pages/SupplierPage';
import PurchasePage from './Pages/PurchasePage';
import Dashboard from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Layout from './Components/dashboard/Layout';
import Toast from './toast/Toast';
import ProtectedRoute from './routes/ProtectedRoute';
import UserPage from './Pages/UserPage';

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Core Security Wrapper: Must be Authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>

              {/* Shared Paths (Staff and Admin/Manager can view) */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path='/sale' element={<SalePage />} />

              {/* Management Paths (Only manager or admin roles can enter) */}
              <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                <Route path="/categories" element={<CategoryPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path='/supplier' element={<SupplierPage />} />
                <Route path='/purchase' element={<PurchasePage />} />
                <Route path='/users' element={<UserPage/>} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </Router>
      <Toast />
    </div>
  )
}

export default App;