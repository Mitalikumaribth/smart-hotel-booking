import express from "express";
import {
  createPostController,
  getPostController,
  getAllPostsController,
} from "../controller/Post.js";
import { requireSignIn, isAdmin } from "../middlewares/Auth.js";

const router = express.Router();

// Public routes
router.get("/get-posts", getAllPostsController);
router.get("/get-post/:slug", getPostController);

// Protected routes (admin only)
router.post("/create-post", requireSignIn, isAdmin, createPostController);

export default router;
