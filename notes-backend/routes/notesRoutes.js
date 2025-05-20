const express = require('express');
const Note = require('../models/note');

const router = express.Router();

// Ambil semua catatan
router.get('/', async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tambah catatan baru
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title dan content wajib diisi" });
    }
    const note = await Note.create({ title, content });
    res.status(201).json(note); // kirim seluruh data note
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update catatan
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    await Note.update({ title, content }, { where: { id } });
    res.json({ message: 'Catatan diperbarui' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hapus catatan
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.destroy({ where: { id } });
    res.json({ message: 'Catatan dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
