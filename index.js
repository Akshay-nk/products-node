const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");


dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", require("./routes/auth"));
app.use("/api/brands", require("./routes/brand"));
app.use("/api/products", require("./routes/product"));
app.use("/api/block", require("./routes/block"));


app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
