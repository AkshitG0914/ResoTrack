import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, createUser, deleteUser } from "../redux/admin/adminSlice";
import {
  Users, Mail, ShieldCheck, XCircle, Search,
  UserPlus, User, ArrowUpRight, ArrowDownRight,
  Trash2, CheckCircle, AlertCircle
} from "lucide-react";
import Navbar from "../components/Navbar";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error, createSuccess } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [animateStats, setAnimateStats] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "employee" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
    setTimeout(() => setAnimateStats(true), 100);
  }, [dispatch]);

  const filteredUsers = Array.isArray(users)
    ? users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalUsers = Array.isArray(users) ? users.length : 0;
  const adminCount = Array.isArray(users) ? users.filter(u => u.role === "admin").length : 0;
  const employeeCount = Array.isArray(users) ? users.filter(u => u.role === "employee").length : 0;

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setIsSubmitting(true);
    try {
      const result = await dispatch(createUser(formData)).unwrap();
      setFormSuccess(result.message || "User created successfully. Temporary credentials generated for onboarding.");
      setFormData({ name: "", email: "", role: "employee" });
      dispatch(fetchUsers());
    } catch (err) {
      setFormError(err || "Failed to create user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to remove ${userName} from the system?`)) return;
    try {
      await dispatch(deleteUser(userId)).unwrap();
    } catch (err) {
      alert("Failed to delete user: " + err);
    }
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setFormData({ name: "", email: "", role: "employee" });
    setFormError("");
    setFormSuccess("");
  };

  const formatRole = (role) => {
    const map = {
      admin: "Admin",
      resource_manager: "Manager",
      employee: "Staff",
    };
    return map[role?.toLowerCase()] || role || "User";
  };

  const getRoleStyle = (role) => {
    const map = {
      admin: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      resource_manager: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      employee: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    };
    return map[role?.toLowerCase()] || map.employee;
  };

  const StatCard = ({ title, value, change, isPositive, icon, delay, color }) => {
    const [isHovered, setIsHovered] = useState(false);
    const gradient = color === "indigo" ? "from-indigo-500 to-indigo-600"
      : color === "purple" ? "from-purple-500 to-purple-600"
      : "from-violet-500 to-violet-600";

    return (
      <div
        className={`p-6 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform ${
          animateStats ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        } ${isHovered ? "-translate-y-1" : ""} border border-slate-200/50 dark:border-slate-700/50 hover:border-violet-300/50 dark:hover:border-violet-700/50`}
        style={{ transitionDelay: `${delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} transition-all duration-500 ${isHovered ? "rotate-6 scale-110" : ""}`}>
            {icon}
          </div>
          <div className={`flex items-center ${isPositive ? "text-emerald-500" : "text-red-500"}`}>
            <span className="text-sm font-medium">{change}</span>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          </div>
        </div>
        <h2 className="text-lg font-medium text-slate-600 dark:text-slate-300">{title}</h2>
        <p className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{value}</p>
        <div className={`mt-4 h-1 w-16 bg-gradient-to-r ${gradient} rounded-full transition-all duration-500 ${isHovered ? "w-3/4" : ""}`} />
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      <Navbar />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-indigo-900 to-purple-900 h-64" />
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-violet-400 blur-3xl" />
            <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-indigo-500 blur-3xl" />
          </div>
        </div>

        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 pt-6 text-white">
              <div className="mb-4 inline-flex items-center px-4 py-2 rounded-full bg-violet-500/20 text-violet-200 text-sm font-medium tracking-wider">
                <Users size={16} className="mr-2" />
                USER MANAGEMENT
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                <span className="text-zinc-50 block">Team Members</span>
                <span className="bg-gradient-to-r from-violet-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  Manage & Onboard Users
                </span>
              </h1>
              <p className="text-zinc-300 mt-2">Create employee accounts and manage roles across ResoTrack</p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-16">
              <StatCard title="Total Users" value={totalUsers} change="+active" isPositive={true} icon={<Users size={24} className="text-white" />} delay={0} color="violet" />
              <StatCard title="Admins" value={adminCount} change="system" isPositive={true} icon={<ShieldCheck size={24} className="text-white" />} delay={100} color="indigo" />
              <StatCard title="Employees" value={employeeCount} change="onboarded" isPositive={true} icon={<User size={24} className="text-white" />} delay={200} color="purple" />
            </div>

            {/* User Table */}
            <div className="bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-800/80 dark:to-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl text-white">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">System Users</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">All registered accounts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50 rounded-lg text-sm text-slate-700 dark:text-slate-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-lg shadow-sm transition-all"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </button>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="m-6 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl flex items-center">
                  <XCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <p className="font-medium">Error loading users: {error}</p>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-16 text-center">
                  <User className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No Users Found</h3>
                  <p className="text-slate-500 dark:text-slate-400">Click "Add User" to create the first account.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                        <th className="py-3 px-6 font-medium text-slate-600 dark:text-slate-300">Name</th>
                        <th className="py-3 px-6 font-medium text-slate-600 dark:text-slate-300">Email</th>
                        <th className="py-3 px-6 font-medium text-slate-600 dark:text-slate-300">Role</th>
                        <th className="py-3 px-6 font-medium text-slate-600 dark:text-slate-300">Joined</th>
                        <th className="py-3 px-6 font-medium text-slate-600 dark:text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="border-t border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                          <td className="py-3 px-6 font-medium text-slate-900 dark:text-white">{user.name}</td>
                          <td className="py-3 px-6 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                            <Mail className="w-4 h-4 text-slate-400" />
                            {user.email}
                          </td>
                          <td className="py-3 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleStyle(user.role)}`}>
                              {formatRole(user.role)}
                            </span>
                          </td>
                          <td className="py-3 px-6 text-slate-500 dark:text-slate-400 text-sm">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="py-3 px-6">
                            {user.role !== "admin" && (
                              <button
                                onClick={() => handleDeleteUser(user._id, user.name)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                                title="Remove user"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/30 dark:bg-slate-800/30">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Showing {filteredUsers.length} of {totalUsers} users
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-800/95 dark:to-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Add New User</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Account will be created with password: <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-violet-600 dark:text-violet-400">password123</code>
                </p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <XCircle size={20} className="text-slate-400" />
              </button>
            </div>

            {formSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg flex items-start gap-2">
                <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-emerald-700 dark:text-emerald-300">{formSuccess}</p>
              </div>
            )}

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-lg flex items-start gap-2">
                <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-rose-700 dark:text-rose-300">{formError}</p>
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  <option value="employee">Staff (Employee)</option>
                  <option value="resource_manager">Manager (Resource Manager)</option>
                </select>
              </div>

              <div className="pt-2 p-3 bg-violet-50 dark:bg-violet-900/20 border border-violet-200/50 dark:border-violet-800/50 rounded-lg">
                <p className="text-xs text-violet-700 dark:text-violet-300">
                  🔑 Temporary credentials generated for onboarding. User can log in immediately with <strong>{formData.email || "their email"}</strong> and password <strong>password123</strong>. Role: <strong>{formData.role === "resource_manager" ? "Manager" : "Staff"}</strong>.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white rounded-lg shadow-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <UserPlus size={16} />
                  )}
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;