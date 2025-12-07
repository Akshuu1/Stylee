import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function AuthPage({ mode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // detect mode from path or props
  const isLogin = mode === "login" || location.pathname === "/login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER", // Default role for signup
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          alert("Login successful!");
          // Check role and redirect accordingly
          const targetPath = result.user.role === "ADMIN" ? "/admin" : "/";

          setFormData({ name: "", email: "", password: "", role: "USER" });
          setTimeout(() => {
            navigate(targetPath);
          }, 500);
        } else {
          alert(result.message || "Login failed");
        }
      } else {
        // Signup with selected role
        const result = await signup(formData.name, formData.email, formData.password, formData.role);
        if (result.success) {
          alert("Signup successful! Please login now.");
          setFormData({ name: "", email: "", password: "", role: "USER" });
          navigate("/login");
        } else {
          alert(result.message || "Signup failed");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22] px-4 py-6 sm:px-6" style={{ fontFamily: "'Sephora Sans', 'Gilroy', sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900/60 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl w-full max-w-lg text-center border border-[#CDEA68]/20"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#CDEA68] mb-2 sm:mb-3 tracking-wide" style={{ fontFamily: "'Beikho', sans-serif" }}>
          {isLogin ? "Welcome to Stylee" : "Join Stylee"}
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8">
          {isLogin ? "Login to your account" : "Create your account"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              required
              className="p-3 sm:p-4 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50 focus:outline-none text-sm sm:text-base"
              style={{ fontFamily: "'Sephora Sans', sans-serif" }}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={formData.email}
            required
            className="p-3 sm:p-4 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50 focus:outline-none text-sm sm:text-base"
            style={{ fontFamily: "'Sephora Sans', sans-serif" }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            onChange={handleChange}
            value={formData.password}
            required
            className="p-3 sm:p-4 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50 focus:outline-none text-sm sm:text-base"
            style={{ fontFamily: "'Sephora Sans', sans-serif" }}
          />

          {!isLogin && (
            <div className="text-left">
              <label className="block text-zinc-400 text-xs sm:text-sm mb-2 ml-1" style={{ fontFamily: "'Sephora Sans', sans-serif" }}>
                Account Type
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50 focus:outline-none text-sm sm:text-base cursor-pointer"
                style={{ fontFamily: "'Sephora Sans', sans-serif" }}
              >
                <option value="USER">User Account</option>
                <option value="ADMIN">Admin Account</option>
              </select>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#CDEA68] text-[#004D54] py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:bg-[#dfff7a] transition-all disabled:opacity-50 mt-1 sm:mt-2"
            type="submit"
            disabled={loading}
            style={{ fontFamily: "'Sephora Sans', sans-serif" }}
          >
            {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
          </motion.button>
        </form>

        <p className="text-xs sm:text-sm text-zinc-400 mt-6 sm:mt-8" style={{ fontFamily: "'Sephora Sans', sans-serif" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-[#CDEA68] font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
