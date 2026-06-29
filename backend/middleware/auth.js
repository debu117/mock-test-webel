import { getAuth } from "@clerk/express";
import User from "../model/User.js";

export const protect = (req, res, next) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  req.auth = auth;
  next();
};

export const isAdmin = async (req, res, next) => {
    try {
        const clerkId = req.auth.userId;

        const user = await User.findOne({ clerkId });

        console.log("CLERK ID:", clerkId);
        console.log("DB USER:", user);

        if (user && user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                message: "Access Denied. Admins Only."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};