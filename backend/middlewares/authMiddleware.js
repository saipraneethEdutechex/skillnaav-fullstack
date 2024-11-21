const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Userwebapp = require("../models/webapp-models/userModel"); // Adjust path as necessary
const Partnerwebapp = require("../models/webapp-models/partnerModel"); // Adjust path for partner model

// Middleware to protect routes for both users and partners
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header is present
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract token from header
    console.log("Verifying token:", token); // Log the token before verification

    try {
      // Verify token and decode it
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
      let user;

      // Check which model to use for user verification (check for the "partner" route)
      if (req.originalUrl.includes("partners")) {
        // If the URL includes "partners", use Partnerwebapp
        user = await Partnerwebapp.findById(decoded.id).select("-password");
      } else {
        // Otherwise, use Userwebapp
        user = await Userwebapp.findById(decoded.id).select("-password");
      }

      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      req.user = user; // Attach user to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error("Error verifying token:", error); // Log any errors
      let message = "Not authorized, token failed";

      // Handle specific JWT errors
      if (error.name === "JsonWebTokenError") {
        message = "Not authorized, token invalid";
      } else if (error.name === "TokenExpiredError") {
        message = "Not authorized, token expired";
      }

      res.status(401).json({ message });
    }
  } else {
    console.log("No token provided"); // Log if no token is found
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = { protect }; // Export the middleware for use in routes
