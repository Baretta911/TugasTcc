import React, { useState } from "react";
import { BASE_URL } from "../utils";

function AddNote({ addNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            addNote(title, content);
            setTitle("");
            setContent("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <input
                type="text"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Isi catatan"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Tambah</button>
        </form>
    );
}

export default AddNote;
