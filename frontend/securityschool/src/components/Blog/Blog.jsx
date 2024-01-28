import React, { useState, useEffect } from "react";
import { BlogContainer } from "./Blog.elements";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [change, setChange] = useState(false);

  // Fetch posts
  useEffect(() => {
    function isUserAuthenticated() {
      const token = localStorage.getItem("jwtToken");
      return !!token;
    }

    if (!isUserAuthenticated()) {
      window.location.href = "/login";
    }

    async function fetchPosts() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogposts",
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${localStorage.getItem("jwtToken")}`,
            },
          }
        );

        const data = response.data;

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }

    fetchPosts();
  }, [change]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/blogposts/search?title=${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      const data = response.data;

      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error searching posts", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/blogposts",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${localStorage.getItem("jwtToken")}`,
          },
        }
      );

      console.log("Post created successfully");
      setChange(!change);
    } catch (error) {
      console.error("Error during post creation", error);
    }
  };

  return (
    <>
      <BlogContainer>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button type="submit">Post</button>
        </form>

        <input
          type="text"
          placeholder="Search by title..."
          onChange={(e) => handleSearch(e.target.value)}
        />

        <div>
          {posts &&
            posts.map((post) => (
              <div key={post._id}>
                <h3>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h3>
                <p>{post.content}</p>
                <p>{post.title && post.createdAt}</p>
              </div>
            ))}
        </div>
      </BlogContainer>
    </>
  );
};

export default Blog;
