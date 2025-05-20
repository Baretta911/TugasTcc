import React from "react";
import { BASE_URL } from "../utils";

function NoteList({ notes, setNotes }) {
    const editNote = async (id, newTitle, newContent) => {
        try {
            const response = await fetch(`${BASE_URL}/notes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, content: newContent }),
            });

            if (response.ok) {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === id ? { ...note, title: newTitle, content: newContent } : note
                    )
                );
            }
        } catch (error) {
            console.error("Gagal mengedit catatan:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/notes/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
            }
        } catch (error) {
            console.error("Gagal menghapus catatan:", error);
        }
    };

    return (
        <div className="notes-container">
            {notes.map((note) => (
                <div key={note.id} className="note">
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => editNote(note.id, note.title, note.content)}>✏ Edit</button>
                    <button onClick={() => deleteNote(note.id)}>❌ Hapus</button>
                </div>
            ))}
        </div>
    );
}

export default NoteList;
