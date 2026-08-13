import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, password]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      'SELECT id, username, email, bio FROM users WHERE email = ? AND password_hash = ?',
      [email, password]
    );
    
    if (rows.length > 0) {
      res.json({ message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get User Profile
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, email, bio, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update Profile
router.put('/:id', async (req, res) => {
  try {
    const { username, bio } = req.body;
    await pool.query(
      'UPDATE users SET username = ?, bio = ? WHERE id = ?',
      [username, bio, req.params.id]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
