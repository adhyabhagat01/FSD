const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// CONNECT MONGODB ATLAS
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.log("FULL ERROR ↓↓↓");
    console.log(err.message);
});
// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));