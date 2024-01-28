import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    function isUserAuthenticated() {
      const token = localStorage.getItem("jwtToken");
      return !!token;
    }

    if (isUserAuthenticated()) {
      window.location.href = "/";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username: username,
          password: password,
        }
      );

      // Assuming the JWT is in the response
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("jwtToken", token);

      // Redirect or perform other actions after login
      console.log("Logged in successfully");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
