const adminMiddleware = (req, res, next) => {
    try {
        // Check if user exists and has admin role
        if (!req.user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = adminMiddleware;
