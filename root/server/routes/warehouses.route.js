const router = require('express').Router();
const { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse } = require('../controllers/warehouse.controller.js');
const mongoose = require('mongoose');

// GET ALL Warehouses
router.get('/', async (req, res) => {
    const warehouses = await findAllWarehouses();
    res.json(warehouses);
});

// validate ObjectID middleware
const validateObjectID = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next(); 
    }
}

// GET Warehouse BY ID
router.get('/:id', validateObjectID, async (req, res) => {
    try {
        const warehouse = await findWarehouseById(req.params.id);
        res.json(warehouse);
    } catch (err) {
        res.status(err?.status).json(err);
    }
});

// POST http://localhost:9000/warehouses
// CREATE A Warehouse
router.post('/', async (req, res) => {
    try {
        const warehouse = await createWarehouse(req.body);
        res.status(201).json(warehouse);
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// UPDATE A Warehouse
router.put('/:id', validateObjectID, async (req, res) => {
    try {
        const warehouse = await updateWarehouse(req.params.id, req.body);
        res.send();
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE A Warehouse
router.delete('/:id', validateObjectID, async (req, res) => {
    try {
        const warehouse = await deleteWarehouse(req.params.id);
        res.send();
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;