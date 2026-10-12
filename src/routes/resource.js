const express = require('express');
const pool = require('../config/db');
const { notifyNewResource } = require('../notifications/notify');

function createResourceRouter(table, allowedColumns) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      let query = `SELECT * FROM ${table}`;
      const params = [];
      const conditions = [];

      if (req.query.featured === 'true') {
        conditions.push('featured = true');
      }
      if (req.query.tag) {
        params.push(req.query.tag);
        conditions.push(`$${params.length} = ANY(tags)`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      query += ' ORDER BY featured DESC, created_at DESC';

      const { rows } = await pool.query(query, params);
      res.json(rows);
    } catch (err) {
      console.error(`GET /${table} error:`, err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

      const { rows } = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (err) {
      console.error(`GET /${table}/:id error:`, err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const fields = Object.keys(req.body).filter(k => allowedColumns.includes(k));
      if (fields.length === 0) return res.status(400).json({ error: 'No valid fields provided' });

      const values = fields.map(k => req.body[k]);
      const placeholders = fields.map((_, i) => `$${i + 1}`);
      const query = `INSERT INTO ${table} (${fields.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`;

      const { rows } = await pool.query(query, values);

      notifyNewResource(table, rows[0]).catch(err => {
        console.error('Notification error:', err.message);
      });

      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(`POST /${table} error:`, err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

      const fields = Object.keys(req.body).filter(k => allowedColumns.includes(k));
      if (fields.length === 0) return res.status(400).json({ error: 'No valid fields provided' });

      const sets = fields.map((k, i) => `${k} = $${i + 1}`);
      sets.push(`updated_at = NOW()`);
      const values = [...fields.map(k => req.body[k]), id];

      const query = `UPDATE ${table} SET ${sets.join(', ')} WHERE id = $${values.length} RETURNING *`;
      const { rows } = await pool.query(query, values);

      if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
      res.json(rows[0]);
    } catch (err) {
      console.error(`PUT /${table}/:id error:`, err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

      const { rowCount } = await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
      if (rowCount === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ deleted: true });
    } catch (err) {
      console.error(`DELETE /${table}/:id error:`, err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
}

module.exports = createResourceRouter;
