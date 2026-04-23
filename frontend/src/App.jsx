import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import InventoryDashboard from "./pages/InventoryDashboard";
import OrderDashboard from "./pages/OrderDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerOrders from "./pages/CustomerOrder";
import AdminUsers from "./pages/AdminUsers";
function App() {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected Routes (Only Logged-In Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={
            user?.role === "resource_manager" ? <Dashboard /> :
            user?.role === "admin" ? <Dashboard /> :
            user?.role === "employee" ? <CustomerDashboard /> :
            <Dashboard />
          } />
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/orders" element={<OrderDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
          <Route path="/employee/dashboard" element={<CustomerDashboard />} />
          <Route path="/employee/request" element={<CustomerOrders />} />  {/* ✅ Fix this route */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;