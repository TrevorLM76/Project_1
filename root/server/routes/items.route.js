const router = require('express').Router();
const { findAllEntities, findEntityById, createEntity, updateEntity, deleteEntity } = require('../controllers/entity.controller.js');
const mongoose = require('mongoose');

// GET ALL Entities
router.get('/', async (req, res) => {
    const entities = await findAllEntities();
    res.json(entities);
});

// validate ObjectID middleware
const validateObjectID = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(204).send();
    } else {
        next(); 
    }
}

// GET Entity BY ID
router.get('/:id', validateObjectID, async (req, res) => {
    try {
        const entity = await findEntityById(req.params.id);
        res.json(entity);
    } catch (err) {
        res.status(err?.status).json(err);
    }
});

// POST http://localhost:9000/entitys
// CREATE A Entity
router.post('/', async (req, res) => {
    try {
        const entity = await createEntity(req.body);
        res.status(201).json(entity);
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// UPDATE A Entity
router.put('/:id', validateObjectID, async (req, res) => {
    try {
        const entity = await updateEntity(req.params.id, req.body);
        res.send();
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

// DELETE A Entity
router.delete('/:id', validateObjectID, async (req, res) => {
    try {
        const entity = await deleteEntity(req.params.id);
        res.send();
    }catch (err) {
        res.status(err?.status ?? 500).json(err);
    }
});

module.exports = router;