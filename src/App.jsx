import React from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryPage from './Pages/CategoryPage';
import ProductPage from './Pages/ProductPage';
import InventoryPage from './Pages/InventoryPage';
import SalePage from './Pages/SalePage';
import SupplierPage from './Pages/SupplierPage';
import PurchasePage from './Pages/PurchasePage';
import Dashboard from './Pages/DashboardPage';
import Layout from './Components/Layout';
import Toast from './toast/Toast';

function App() {

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">

      <Router>
        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path='/sale' element={<SalePage />} />
            <Route path='/supplier' element={<SupplierPage />} />
            <Route path='/purchase' element={<PurchasePage />} />
            
          </Route>
        </Routes>
      </Router>
    </div>
  )

}

export default App
