import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://be-baretta-1061342868557.us-central1.run.app";

function RegisterForm(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post(`${BASE_URL}/create-users`, {
        username,
        email,
        password,
      });
      setSuccess("Registrasi berhasil! Silakan login.");
      setUsername("");
      setEmail("");
      setPassword("");
      if (props.onRegisterSuccess) props.onRegisterSuccess();
    } catch (err) {
      setError(
        "Registrasi gagal: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return React.createElement(
    "form",
    { onSubmit: handleRegister },
    React.createElement("h2", null, "Register"),
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
      React.createElement("label", null, "Email: "),
      React.createElement("input", {
        type: "email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
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
    success &&
      React.createElement("div", { style: { color: "green", marginTop: 5 } }, success),
    React.createElement(
      "button",
      { type: "submit", style: { marginTop: 10 } },
      "Register"
    )
  );
}

export default RegisterForm;
