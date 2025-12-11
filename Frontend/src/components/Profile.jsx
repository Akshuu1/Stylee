import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout, isAuthenticated, isGuest } = useAuth();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#CDEA68]"></div>
          <p className="mt-6 text-zinc-400 text-lg" style={{ fontFamily: "Gilroy-Light" }}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Name", value: user.name, icon: "👤" },
    { label: "Email", value: user.email, icon: "📧" },
    { label: "Role", value: user.role, icon: user.role === "ADMIN" ? "👑" : "🎯" },
    { label: "Member Since", value: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently", icon: "📅" },
  ];

  return (
    <div
      style={{ fontFamily: "Gilroy-Light" }}
      className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-20 px-4 sm:px-6 pb-12 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#CDEA68] rounded-full blur-3xl opacity-[0.05]"
        />
        {/* Geometric patterns */}
        <div className="absolute top-40 right-1/4 w-48 h-48 sm:w-64 sm:h-64 border border-[#CDEA68]/10 rotate-45 rounded-3xl" />
        <div className="absolute bottom-40 left-1/4 w-32 h-32 sm:w-48 sm:h-48 border border-[#CDEA68]/10 -rotate-12 rounded-2xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#CDEA68] to-[#9FFF00] bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg">Welcome back, {user.name}!</p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/60 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#CDEA68]/20 shadow-2xl relative overflow-hidden"
        >
          {/* Gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#CDEA68] via-[#9FFF00] to-[#CDEA68]"></div>

          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-8 sm:mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="relative"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#CDEA68] to-[#9FFF00] flex items-center justify-center text-4xl sm:text-6xl shadow-lg shadow-[#CDEA68]/30">
                {user.role === "ADMIN" ? "👑" : "🎨"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#CDEA68] text-[#004D54] px-2 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg">
                {user.role}
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#CDEA68]">{user.name}</h2>
              <p className="text-zinc-400 text-base sm:text-lg">{user.email}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full md:w-auto px-6 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 border border-red-500/30 font-semibold text-sm sm:text-base"
            >
              Logout
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-zinc-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#CDEA68]/10"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{stat.icon}</div>
                  <div className="flex-1">
                    <p className="text-zinc-500 text-sm mb-1">{stat.label}</p>
                    <p className={`text-xl font-semibold ${stat.label === "Role" ? "text-[#CDEA68]" : "text-white"}`}>
                      {stat.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Admin Dashboard Button */}
          {user.role === "ADMIN" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-8 border-t border-zinc-700/50"
            >
              <button
                onClick={() => navigate("/admin")}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#CDEA68] to-[#9FFF00] text-[#004D54] rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#CDEA68]/50 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">⚡</span>
                Go to Admin Dashboard
                <span className="text-2xl">⚡</span>
              </button>
            </motion.div>
          )}

          {/* Guest User Upgrade Section */}
          {isGuest() && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 pt-8 border-t border-zinc-700/50"
            >
              <div className="bg-gradient-to-br from-[#CDEA68]/10 to-[#9FFF00]/5 rounded-2xl p-6 border border-[#CDEA68]/30">
                <div className="text-center mb-4">
                  <span className="text-4xl mb-2 block">🎁</span>
                  <h3 className="text-2xl font-bold text-[#CDEA68] mb-2">
                    Unlock Full Access!
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    You're browsing as a guest. Sign up to unlock all features:
                  </p>
                </div>

                <ul className="space-y-2 mb-6 text-sm text-zinc-300">
                  <li className="flex items-center gap-2">
                    <span className="text-[#CDEA68]">✓</span> Create and manage products
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#CDEA68]">✓</span> Save your preferences
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#CDEA68]">✓</span> Access your full profile
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#CDEA68]">✓</span> And much more!
                  </li>
                </ul>

                <button
                  onClick={() => navigate("/signup")}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#CDEA68] to-[#9FFF00] text-[#004D54] rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#CDEA68]/50"
                >
                  Sign Up Now - It's Free!
                </button>
              </div>
            </motion.div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-zinc-700/50">
            <h3 className="text-xl font-semibold mb-4 text-[#CDEA68]">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30"
              >
                Browse Products
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30"
              >
                Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30 col-span-2 md:col-span-1"
              >
                Settings
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
