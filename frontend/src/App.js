import React, { useState, useEffect } from "react";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
import axios from "axios";
import "./styles.css";
import { BASE_URL } from "./utils"; // ✅ Tambahan penting

const API_URL = `${BASE_URL}/notes`;

function App() {
    const [notes, setNotes] = useState([]);

    // Ambil catatan dari backend saat pertama kali halaman dimuat
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(API_URL);
            setNotes(response.data);
        } catch (error) {
            console.error("Gagal mengambil catatan:", error);
        }
    };

    const addNote = async (title, content) => {
        try {
            const response = await axios.post(API_URL, { title, content });
            setNotes([...notes, response.data]);
        } catch (error) {
            console.error("Gagal menambah catatan:", error);
        }
    };

    const editNote = async (id, newTitle, newContent) => {
        try {
            await axios.put(`${API_URL}/${id}`, { title: newTitle, content: newContent });
            fetchNotes();
        } catch (error) {
            console.error("Gagal mengedit catatan:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchNotes();
        } catch (error) {
            console.error("Gagal menghapus catatan:", error);
        }
    };

    return (
        <div className="container">
            <h1>Notes App</h1>
            <AddNote addNote={addNote} />
            <NoteList notes={notes} editNote={editNote} deleteNote={deleteNote} />
        </div>
    );
}

export default App;
