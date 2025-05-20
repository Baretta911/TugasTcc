import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import axios from "axios";
import "./styles.css";
import { BASE_URL } from "./utils";

const API_URL = `${BASE_URL}/notes`;

function App() {
  // Auth state
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  // Register form state
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Notes state
  const [notes, setNotes] = useState([]);

  // Catatan input form state (AddNote)
  const [addNoteData, setAddNoteData] = useState({ title: "", description: "" });

  // Ambil notes pakai token saat login
  useEffect(() => {
    if (loggedIn) {
      fetchNotes();
    }
  }, [loggedIn]);

  // Fetch notes dari backend pakai Authorization header
  const fetchNotes = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: { Authorization: token },
      });
      setNotes(response.data);
    } catch (err) {
      setError("Gagal mengambil catatan: " + (err.response?.data?.message || err.message));
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      if (response.data.token) {
        localStorage.setItem("token", "Bearer " + response.data.token);
        setLoggedIn(true);
        setLoginData({ username: "", password: "" });
      } else {
        setError("Login gagal: Token tidak ditemukan.");
      }
    } catch (err) {
      setError("Login gagal: " + (err.response?.data?.message || err.message));
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${BASE_URL}/create-users`, registerData);
      setShowRegister(false);
      setRegisterData({ username: "", email: "", password: "" });
      alert("Registrasi berhasil! Silakan login.");
    } catch (err) {
      setError("Registrasi gagal: " + (err.response?.data?.message || err.message));
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setNotes([]);
    setError("");
  };

  // Add Note
  const addNote = async (title, description) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        API_URL,
        { title, description },
        { headers: { Authorization: token } }
      );
      setNotes([...notes, response.data]);
    } catch (err) {
      setError("Gagal menambah catatan: " + (err.response?.data?.message || err.message));
    }
  };

  // Edit Note
  const editNote = async (id, newTitle, newDescription) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: token } }
      );
      fetchNotes();
    } catch (err) {
      setError("Gagal mengedit catatan: " + (err.response?.data?.message || err.message));
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: token },
      });
      fetchNotes();
    } catch (err) {
      setError("Gagal menghapus catatan: " + (err.response?.data?.message || err.message));
    }
  };

  // Render form Login
  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="form-auth">
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
      <p>
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={() => {
            setShowRegister(true);
            setError("");
          }}
          className="link-button"
        >
          Register di sini
        </button>
      </p>
    </form>
  );

  // Render form Register
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="form-auth">
      <h2>Register</h2>
      <label>
        Username:
        <input
          type="text"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          required
        />
      </label>
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
      <p>
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={() => {
            setShowRegister(false);
            setError("");
          }}
          className="link-button"
        >
          Login di sini
        </button>
      </p>
    </form>
  );

  return (
    <div className="container">
      {!loggedIn ? (
        showRegister ? renderRegisterForm() : renderLoginForm()
      ) : (
        <>
          <h1>Notes App</h1>
          <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
            Logout
          </button>
          <AddNote addNote={addNote} />
          <NoteList notes={notes} editNote={editNote} deleteNote={deleteNote} />
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
}

export default App;
