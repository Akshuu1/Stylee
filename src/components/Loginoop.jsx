import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div style={{fontFamily:"Test Founders Grotesk"}} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#004D54] via-[#00383D] to-[#001F22]">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900/60 backdrop-blur-2xl shadow-2xl p-8 rounded-3xl w-[90%] sm:w-[400px] text-center border border-[#CDEA68]/20"
      >
        <h1 className="text-3xl font-extrabold text-[#CDEA68] mb-4 tracking-wide">
          {isLogin ? "Welcome Back" : "Join Stylee"}
        </h1>

        <p className="text-zinc-300 mb-6 text-sm">
          {isLogin
            ? "Login to explore your personalized fashion journey."
            : "Create an account and step into your style universe."}
        </p>

        <form className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-xl bg-zinc-800 text-white border border-[#CDEA68]/30 focus:outline-none focus:ring-2 focus:ring-[#CDEA68]/50"
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
          <button
            onClick={toggleForm}
            className="text-[#CDEA68] font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
