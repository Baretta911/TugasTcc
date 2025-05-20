import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://be-baretta-1061342868557.us-central1.run.app";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        username,
        password,
      });
      const token = response.data.token; // sesuaikan kalau response beda
      if (token) {
        localStorage.setItem("token", "Bearer " + token);
        if (props.onLoginSuccess) props.onLoginSuccess();
      } else {
        setError("Token tidak ditemukan di response.");
      }
    } catch (err) {
      setError("Login gagal: " + (err.response?.data?.message || err.message));
    }
  };

  return React.createElement(
    "form",
    { onSubmit: handleLogin },
    React.createElement("h2", null, "Login"),
    React.createElement(
      "div",
      null,
      React.createElement("label", null, "Username: "),
      React.createElement("input", {
        type: "text",
        value: username,
        onChange: (e) => setUsername(e.target.value),
        required: true,
      })
    ),
    React.createElement(
      "div",
      null,
      React.createElement("label", null, "Password: "),
      React.createElement("input", {
        type: "password",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
      })
    ),
    error &&
      React.createElement("div", { style: { color: "red", marginTop: 5 } }, error),
    React.createElement(
      "button",
      { type: "submit", style: { marginTop: 10 } },
      "Login"
    )
  );
}

export default LoginForm;
