// express
const path = require("path")
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, 'public')))

//database
const connectDB = require("./config/db");

// morgan & cors
const morgan = require("morgan");
const cors = require("cors");
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  })
);
//cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser());

// router
const usersRouter = require("./routes/users.js");
app.use("/api/users", usersRouter);

const adminRouter = require("./routes/admin.js")
app.use("/api/admin", adminRouter);

const productRouter = require("./routes/productRoutes.js");
app.use("/api/products", productRouter);

const categoryRouter = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRouter);

//server working
app.get("/test-api", (req, res) => {
  res.status(200).json({ message: "api is working fine" });
});


//broke
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke")
});

//client error
const createError = require("http-errors");

app.use((req, res, next) => {
  next(createError(404, "Route Not Found"));
});

//500
app.use((err, req, res, next) => {
  const statusCode = err.status
  res.status(statusCode || 500).json({
    error: {
      statusCode: statusCode || 500,
      message: err.message
    }
  });
});

//port listening
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`The app is listening at http://localhost:${PORT}`);
  connectDB();
})


