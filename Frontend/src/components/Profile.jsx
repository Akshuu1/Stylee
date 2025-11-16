import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1️⃣ Get token from localStorage (we saved it after login)
    const token = localStorage.getItem("token");

    // 2️⃣ Make a GET request to the protected backend route
    axios
      .get("https://stylee-4cbh.vercel.app/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => alert("Unauthorized! Please log in again."));
  }, []);

  // 3️⃣ Show data if available
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#004D54] text-[#CDEA68] text-2xl">
      {user ? `Welcome, ${user.email}!` : "Loading..."}
    </div>
  );
}
