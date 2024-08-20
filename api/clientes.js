const express = require('express');
const router = express.Router();
const db = require('../database');

// Create a new cliente
router.post('/', (req, res) => {
  const { cedula, nombres, apellidos, alias, celular } = req.body;
  db.run(
    `INSERT INTO clientes (cedula, nombres, apellidos, alias, celular) VALUES (?, ?, ?, ?, ?)`,
    [cedula, nombres, apellidos, alias, celular],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id_cliente: this.lastID });
    }
  );
});

// Read all clientes
router.get('/', (req, res) => {
  db.all(`SELECT * FROM clientes`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (rows.length === 0) {
        return res.status(200).json({ message: 'No hay Clientes' });
      }
    res.status(200).json(rows);
   
  });
});

// Read a single cliente by id
router.get('/:id_cliente', (req, res) => {
  const { id_cliente } = req.params;
  db.get(`SELECT * FROM clientes WHERE id_cliente = ?`, [id_cliente], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Cliente not found' });
    }
    res.json(row);
  });
});

// Update a cliente
router.put('/:id_cliente', (req, res) => {
  const { id_cliente } = req.params;
  const { cedula, nombres, apellidos, alias, celular } = req.body;
  db.run(
    `UPDATE clientes SET cedula = ?, nombres = ?, apellidos = ?, alias = ?, celular = ? WHERE id_cliente = ?`,
    [cedula, nombres, apellidos, alias, celular, id_cliente],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Cliente not found' });
      }
      res.json({ message: 'Cliente updated successfully' });
    }
  );
});

// Delete a cliente
router.delete('/:id_cliente', (req, res) => {
  const { id_cliente } = req.params;
  db.run(`DELETE FROM clientes WHERE id_cliente = ?`, [id_cliente], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Cliente not found' });
    }
    res.json({ message: 'Cliente deleted successfully' });
  });
});

module.exports = router;
