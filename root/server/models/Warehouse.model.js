/**
 * The warehouse model is going to be a container for the entities.
 * Each Warehouse will contain references to its entities.
 * 
 * Warehouse will need the following variables:
 * - name (required)
 * - address (optional)
 *      - road
 *      - city
 *      - state
 *      - zipCode
 * - currentUnitCapacity (default of 0)
 * - maxUnitCapacity (in units) (required)
 * - inventory (an array of all item IDs) (required)
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
    name: { // item name
        type: String,
        minLength: [1, 'Must have at least 1 character'],
        maxLength: [24, 'Limit your name to 24 characters'],
        required: [true, 'Must have a name']
    },
    address: { // Warehouse address; not required
        road: {
            type: String,
            minLength: [1, 'Road must have at least 1 character'],
            maxLength: [32, 'Road name too long'],
            default: '123 Example Street'
        },
        city: {
            type: String,
            minLength: [1, 'City must have at least 1 character'],
            maxLength: [16, 'City name too long'],
            default: 'Nowhere'
        },
        state: {
            type: String,
            minLength: [1, 'State must have at least 1 character'],
            maxLength: [2, 'State abbreviation too long'],
            default: 'No State'
        },
        zipCode: {
            type: String,
            minLength: [5, 'Zip codes are 5 digits long'],
            maxLength: [5, 'Zip codes are 5 digits long'],
            default: '12345'
        }
    },
    currentUnitCapacity: { // current capacity for units of items; 1 unit is 1 space in the warehouse
        type: mongoose.Types.Decimal128,
        min: [0, 'capacity cannot be negative'],
        default: 0
    },
    maxUnitCapacity: { // max capacity for units of items; 1 unit is 1 space in the warehouse
        type: Number,
        required: [true, 'Must have a max capacity'],
        min: [1, 'Must hold at least 1 unit']
    },
    inventory: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: 'Entity' // reference to the Entity model
        }],
        required: [true, 'Must have an inventory, even if its empty.'],
    }
});

const Warehouse = mongoose.model('Warehouse', warehouseSchema, 'Warehouses');
module.exports = Warehouse;