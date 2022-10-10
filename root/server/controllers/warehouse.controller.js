const Warehouses = require('../models/Warehouse.model.js'); // link to the Warehouse model

// Find all Warehouses, sorted by name
const findAllWarehouses = async () => {
    const warehouses = await Warehouses.find().sort({name: 1});
    return warehouses;
};

// Find Warehouse by id
const findWarehouseById = async id => {
    try {
        const warehouse = await Warehouses.findById(id).populate('inventory');
        if (warehouse == null) {
            throw {status: 204, msg: `No Warehouse found with the id of ${id}`};
        }
        return warehouse;
    } catch (err) {
        throw err; 
    }
};

// Create a new Warehouse
const createWarehouse = async newWarehouse => {
    try {
        const warehouse = new Warehouses(newWarehouse);
        await warehouse.save();
        return warehouse;
    } catch (err) {
        throw err;
    }
};

// Update a Warehouse
const updateWarehouse = async (id, warehouseToUpdate) => {
    try {
        await Warehouses.findByIdAndUpdate(id, warehouseToUpdate)
    } catch (err) {
        throw {status: 400, msg: err};
    }
};

// Delete a Warehouse
const deleteWarehouse = async id => {
    try {
        await Warehouses.findByIdAndDelete(id)
    } catch (err) {
        throw {status: 400, msg: err};
    }
};

module.exports = { findAllWarehouses, findWarehouseById, createWarehouse, updateWarehouse, deleteWarehouse };