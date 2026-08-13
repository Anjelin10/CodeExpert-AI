import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      user_id,
      language,
      severity,
      code_snippet,
      root_cause,
      suggested_fix,
      is_saved,
      explanation_level,
      feature_explain_cause,
      feature_suggest_fix,
      feature_show_corrected_code,
      error_message
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO debug_history 
      (user_id, language, severity, code_snippet, root_cause, suggested_fix, is_saved, explanation_level, feature_explain_cause, feature_suggest_fix, feature_show_corrected_code, error_message) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id || null, 
        language, 
        severity, 
        code_snippet, 
        root_cause, 
        suggested_fix, 
        is_saved || false,
        explanation_level,
        feature_explain_cause,
        feature_suggest_fix,
        feature_show_corrected_code,
        error_message
      ]
    );
    res.status(201).json({ message: 'History saved successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get user history
router.get('/user/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM debug_history WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get user saved
router.get('/user/:userId/saved', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM debug_history WHERE user_id = ? AND is_saved = TRUE ORDER BY created_at DESC',
      [req.params.userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Toggle save status
router.put('/:id/toggle-save', async (req, res) => {
  try {
    const { is_saved } = req.body;
    await pool.query(
      'UPDATE debug_history SET is_saved = ? WHERE id = ?',
      [is_saved, req.params.id]
    );
    res.json({ message: 'Save status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete history
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM debug_history WHERE id = ?', [req.params.id]);
    res.json({ message: 'History deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
