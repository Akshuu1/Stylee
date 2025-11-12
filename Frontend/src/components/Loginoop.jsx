import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthPage({ mode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // detect mode from path or props
  const isLogin = mode === "login" || location.pathname === "/login";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? "/api/login" : "/api/signup";
      const res = await axios.post(`http://localhost:5001${endpoint}`, formData);

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() =>{
          navigate("/")
        },1000)
      } else {
        alert("Signup successful! Please login now.");
        setFormData({ name: "", email: "", password: "" });
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22]">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900/60 backdrop-blur-2xl shadow-2xl p-8 rounded-3xl w-[90%] sm:w-[400px] text-center border border-[#CDEA68]/20"
      >
        <h1 className="text-3xl font-extrabold text-[#CDEA68] mb-4 tracking-wide">
          {isLogin ? "Welcome Back" : "Join Stylee"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:ring-2 focus:ring-[#CDEA68]/50"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#CDEA68] text-[#004D54] py-3 rounded-xl font-semibold shadow-lg hover:bg-[#dfff7a] transition-all"
            type="submit"
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-sm text-zinc-400 mt-6">
          {isLogin ? "New to Stylee?" : "Already have an account?"}{" "}
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
