const Entities = require('../models/Entity.model.js'); // link to the Entity model

// Find all Entities, sorted, and with Warehouse name filled in
const findAllEntities = async () => {
    const entities = await Entities.find().sort({"name": 1}).populate('currentLocation', 'name');
    return entities;
};

// Find Entity by id
const findEntityById = async id => {
    try {
        const entity = await Entities.findById(id).populate('currentLocation', 'name');
        if (entity == null) {
            throw {status: 204, msg: `No Entity found with the id of ${id}`};
        }
        return entity;
    } catch (err) {
        throw err; 
    }
};

// Create a new Entity
const createEntity = async newEntity => {
    try {
        const entity = new Entities(newEntity);
        await entity.save();
        return entity.populate('currentLocation', 'name');
    } catch (err) {
        throw err;
    }
}

// Update an Entity
const updateEntity = async (id, entityToUpdate) => {
    try {
        await Entities.findByIdAndUpdate(id, entityToUpdate)
    } catch (err) {
        throw {status: 400, msg: err};
    }
};

// Delete an Entity
const deleteEntity = async id => {
    try {
        await Entities.findByIdAndDelete(id)
    } catch (err) {
        throw {status: 400, msg: err};
    }
};

module.exports = { findAllEntities, findEntityById, createEntity, updateEntity, deleteEntity };