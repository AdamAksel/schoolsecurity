import express from "express";
import BlogPost from "../models/blogPost.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// skapa blogpost
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    let blogPost = new BlogPost({ title, content, author: req.user._id });
    blogPost = await blogPost.save();

    res.send(blogPost);
  } catch (error) {
    res.status(500).send("Error creating blog post");
  }
});

// hitta alla blogposts
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort("createdAt");
    res.send(blogPosts);
  } catch (error) {
    res.status(500).send("Error fetching blog posts");
  }
});
// hitta blogpost med id
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const blogPost = await BlogPost.findById(postId);

    if (!blogPost) {
      return res.status(404).send("Blog post not found");
    }

    res.send(blogPost);
  } catch (error) {
    res.status(500).send("Error fetching blog post");
  }
});

// hitta blogpost med titel
router.get("/search", async (req, res) => {
  try {
    const { title } = req.query;
    const blogPosts = await BlogPost.find({ title: new RegExp(title, "i") });
    res.send(blogPosts);
  } catch (error) {
    res.status(500).send("Error searching for blog posts");
  }
});

export default router;
