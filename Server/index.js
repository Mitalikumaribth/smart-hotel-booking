// // import express from 'express';
// // import cors from 'cors';
// // import morgan from 'morgan';
// // import dotenv from 'dotenv';
// // import {connectDB}  from "./src/config/db.js";
// // import authRoutes from "./src/routes/User.js";
// // import postRoutes from "./src/routes/Post.js";

// // dotenv.config();

// // connectDB();

// // const app = express();

// // app.use(express.json());
// // app.use(cors());
// // app.use(morgan('dev'));

// // const PORT = process.env.PORT || 3000;

// // app.get('/', (req, res) => {
// //     console.log('Welcome');
// //     res.send('Welcome to the server!');
// // });

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use("/api/post", postRoutes);

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import fileUpload from "express-fileupload";
// import { connectDB } from "./src/config/db.js";
// import authRoutes from "./src/routes/User.js";
// import postRoutes from "./src/routes/Post.js";
// import otpRoutes from "./src/routes/Otp.js";

// // Load environment variables first
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//   origin: process.env.CLIENT_URL || "http://localhost:5173",
//   credentials: true
// }));
// app.use(morgan("dev"));

// // File upload middleware (only once!)
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./tmp/",
//   })
// );

// const PORT = process.env.PORT || 3000;

// // Root route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Welcome to Hotel Booking API!",
//   });
// });

// // API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/otp", otpRoutes);
// app.use("/api/post", postRoutes);

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import dotenv from "dotenv";
// import fileUpload from "express-fileupload";
// import { connectDB } from "./src/config/db.js";
// import authRoutes from "./src/routes/User.js";
// import postRoutes from "./src/routes/Post.js";
// import otpRoutes from "./src/routes/Otp.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(morgan("dev"));

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./tmp/",
//   })
// );

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Welcome to Hotel Booking API!",
//   });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/otp", otpRoutes);
// app.use("/api/post", postRoutes);

// app.use((req, res) => {
//   res.status(404).json({ success: false, message: "Route not found" });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Internal server error",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config(); // 🔥 MUST BE FIRST

import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { connectDB } from "./src/config/db.js";
import authRoutes from "./src/routes/User.js";
import postRoutes from "./src/routes/Post.js";
import otpRoutes from "./src/routes/Otp.js";
import bookingRoutes from "./src/routes/Booking.js";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  }),
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Hotel Booking API!",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/post", postRoutes);
app.use("/api/booking", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
