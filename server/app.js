const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "3mb" }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB",err);
})

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
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
