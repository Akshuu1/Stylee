import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
      className="min-h-screen bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] text-white pt-24 px-6 pb-12 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#CDEA68]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#CDEA68]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInDown">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#CDEA68] to-[#9FFF00] bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-zinc-400 text-lg">Welcome back, {user.name}! ✨</p>
        </div>

        {/* Main Profile Card */}
        <div
          className="bg-zinc-900/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-[#CDEA68]/20 shadow-2xl relative overflow-hidden animate-fadeInUp"
        >
          {/* Gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#CDEA68] via-[#9FFF00] to-[#CDEA68]"></div>

          {/* Avatar Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="relative animate-scaleIn">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#CDEA68] to-[#9FFF00] flex items-center justify-center text-6xl shadow-lg shadow-[#CDEA68]/30">
                {user.role === "ADMIN" ? "👑" : "🎨"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#CDEA68] text-[#004D54] px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {user.role}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-2 text-[#CDEA68]">{user.name}</h2>
              <p className="text-zinc-400 text-lg">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600/80 hover:bg-red-700 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 border border-red-500/30 font-semibold"
            >
              🚪 Logout
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-zinc-800/50 backdrop-blur-xl rounded-2xl p-6 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#CDEA68]/10 animate-slideInLeft"
                style={{ animationDelay: `${index * 0.1}s` }}
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
              </div>
            ))}
          </div>

          {/* Admin Dashboard Button */}
          {user.role === "ADMIN" && (
            <div className="mt-8 pt-8 border-t border-zinc-700/50">
              <button
                onClick={() => navigate("/admin")}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#CDEA68] to-[#9FFF00] text-[#004D54] rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#CDEA68]/50 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">⚡</span>
                Go to Admin Dashboard
                <span className="text-2xl">⚡</span>
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-zinc-700/50">
            <h3 className="text-xl font-semibold mb-4 text-[#CDEA68]">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/products")}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:scale-105 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30"
              >
                🛍️ Browse Products
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:scale-105 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30"
              >
                🏠 Home
              </button>
              <button
                className="px-4 py-3 bg-zinc-800/50 hover:bg-zinc-700/50 rounded-xl transition-all duration-300 hover:scale-105 border border-[#CDEA68]/10 hover:border-[#CDEA68]/30 col-span-2 md:col-span-1"
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out 0.4s both;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
}
