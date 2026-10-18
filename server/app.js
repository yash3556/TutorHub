const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
const allowedOrigins = new Set(
    (process.env.CLIENT_URL || "http://localhost:5173")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.has(origin)) {
                return callback(null, true);
            }
            return callback(new Error("Origin is not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(express.json({ limit: "3mb" }));
app.use(cookieParser());

app.use("/api/auth",require("./src/routes/authRoutes"));
app.use("/api/teacher", require("./src/routes/teacherRoutes"));
app.use("/api/student", require("./src/routes/studentRoutes"));
app.use("/api/contact", require("./src/routes/contactRoutes"));

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: "Something went wrong on the server." });
});


app.get('/',(req,res)=>{
    res.send('welcome');
})

const port = process.env.PORT || 3000;

async function start() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be configured before starting the server.");
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET must be configured before starting the server.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

start().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});
