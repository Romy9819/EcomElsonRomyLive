const app = require("./backend/app");
const cloudinary = require("cloudinary");
const path = require('path');
const connectDatabase = require("./backend/config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  //console.log(`Error: ${err.message}`);
  //console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//static files
// app.use(express.static(path.join(__dirname, './frontend/build')));

// app.get("*", function(req, res){
//   res.sendFile(path.join(__dirname, ".frontend/build/index.html"));
// });

const server = app.listen(process.env.PORT, () => {
  //console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  //console.log(`Error: ${err.message}`);
  //console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
