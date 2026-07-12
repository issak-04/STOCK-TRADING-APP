const User = require("../models/userModel");

const admin = async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
        return res.status(403).json({
            message: "Admin Access Only",
        });
    }

    next();
};

module.exports = admin;