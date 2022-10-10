/**
 * The entity model is the items in inventory.
 * 
 * Entity will need the following variables:
 * - name (required)
 * - brand (optional)
 * - description (optional)
 * - currentLocation (required)
 * - quantity (required)
 * - size (in units) (required)
 * - weight (optional)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entitySchema = new Schema({
    name: { // item name
        type: String,
        minLength: [1, 'Name must have at least 1 character'],
        maxLength: [24, 'Name too long'],
        required: [true, 'Must have a name']
    },
    brand: { // brand name
        type: String,
        minLength: [0],
        maxLength: [24, 'Brand name too long'],
    },
    description: { // description of the item
        type: String,
        minLength: [0],
        maxLength: [128, 'Description too long'],
    },
    currentLocation: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Warehouse' // reference to the Warehouse model
        }],
        required: [true, 'Must have a location'],
    },
    size: { // size in terms of units; 1 unit is essentially enough space for a pallet
        type: mongoose.Types.Decimal128,
        min: [0.001, 'Item size can\'t be 0 or negative'],
        required: [true, 'Must have a size']
    },
    quantity: { // quantity of the item
        type: Number,
        min: [1, 'Item quantity can\'t be 0 or negative'],
        required: [true, 'Must have a quantity']
    },
    weight: { // weight of the item per unit 
        type: Number,
        min: [0.001, 'Item weight can\'t be negative']
    }
});

const Entity = mongoose.model('Entity', entitySchema, 'Entities');
module.exports = Entity;