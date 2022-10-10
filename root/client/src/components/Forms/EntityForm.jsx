import axios from "axios";
import { useState } from "react";
import { serverPort } from '../../serverPort.js';

// This should handle the creation of a new Entity

export const EntityForm = ({warehouseList, setEntityList}) => {

    const PORT = serverPort();

    const [entityData, setEntityData] = useState({
        name: '',
        brand: '',
        description: '',
        currentLocation: [],
        size: 1,
        quantity: 1,
        weight: 1
    });

    const ClearFields = () => {
        setEntityData({
            name: '',
            brand: '',
            description: '',
            currentLocation: [],
            size: 1,
            quantity: 1,
            weight: 1
        });
    };

    let warehouseData = [];
    const makeWarehouseData = (warehouseList) => {
        warehouseList.forEach((element, index) => {
            warehouseData[index] = {
                name: element.name,
                id: element._id,
                currentUnitCapacity: element.currentUnitCapacity.$numberDecimal,
                maxUnitCapacity: element.maxUnitCapacity,
                filledStatus: element.currentUnitCapacity.$numberDecimal / element.maxUnitCapacity,
                inventory: element.inventory
            };
        });
    };
    makeWarehouseData(warehouseList);
    const createWarehouseOptions = (warehouseData) => {
        let options = [<option key="blank" hidden></option>];
        warehouseData.forEach((element) => {
            let el = <option key={element.id} value={element.id}>{element.name}</option>
            options.push(el);
        });
        return options;
    };
    const Warehouses = createWarehouseOptions(warehouseData);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`http://localhost:${PORT}/items`, {
                name: entityData.name,
                brand: entityData.brand,
                description: entityData.description,
                currentLocation: entityData.currentLocation,
                size: entityData.size,
                quantity: entityData.quantity,
                weight: entityData.weight
            });
            setEntityList(entityList => [...entityList, res.data]);
            let wh = warehouseData.find((warehouse) => {return warehouse.id === entityData.currentLocation});
            wh.currentUnitCapacity = Number(wh.currentUnitCapacity) + (entityData.size * entityData.quantity);
            wh.filledStatus = wh.currentUnitCapacity / wh.maxUnitCapacity;
            wh.inventory.push(res.data._id);
            await axios.put(`http://localhost:${PORT}/warehouses/${entityData.currentLocation}`, {
                currentUnitCapacity: wh.currentUnitCapacity,
                inventory: wh.inventory
            });
            let warningDiv = document.getElementById("warning");
            if  (wh.filledStatus > 1) {
                warningDiv.innerText="Warning: This warehouse is overfilled.";
                setTimeout(clearWarningDiv, 5000);
            } else {
                clearWarningDiv();
            };
            event.target.reset();
            ClearFields();
        } catch (err) {
            console.error(err);
        };
    };


    const clearWarningDiv = () => {
        let warningDiv = document.getElementById("warning");
        warningDiv.innerText="";
    };

    return (<form onSubmit={handleSubmit} className="submissionForm" style={{marginLeft: "20px"}}>
        <h3 style={{marginBottom: "10px"}}>Create New Item</h3>
        <div>
            <label htmlFor="entity-name">Item Name:</label>
            <input 
                style={{width: "190px"}}
                id="entity-name" 
                onChange={e => setEntityData({...entityData, name: e.target.value})}
                value={entityData.name}
            />
            &emsp;
            <label htmlFor="entity-brand">Brand:</label>
            <input 
                style={{width: "190px"}}
                id="brand-name" 
                placeholder="optional" 
                onChange={e => setEntityData({...entityData, brand: e.target.value})}
                value={entityData.brand}
            />
        </div>
        <div>
        <label htmlFor="entity-description">Description:</label>
            <input 
                style={{width: "445px"}}
                id="entity-description"
                placeholder="optional" 
                onChange={e => setEntityData({...entityData, description: e.target.value})}
                value={entityData.description}
            />
        </div>
        <div>
            <label htmlFor="entity-size">Size:</label>
            <input 
                style={{width: "60px"}}
                id="entity-size" 
                type="number"
                onChange={e => setEntityData({...entityData, size: e.target.value})}
                value={entityData.size}
            />
            &emsp;
            <label htmlFor="entity-quantity">Quantity:</label>
            <input 
                style={{width: "60px"}}
                type="number"
                id="entity-quantity" 
                onChange={e => setEntityData({...entityData, quantity: e.target.value})}
                value={entityData.quantity}
            />
            &emsp;
            <label htmlFor="entity-weight">Weight:</label>
            <input 
                style={{width: "60px"}}
                id="entity-weight" 
                type="number"
                placeholder="optional"
                onChange={e => setEntityData({...entityData, weight: e.target.value})}
                value={entityData.weight}
            />
            &emsp;
            <label htmlFor="entity-location">Current Location:</label>
            <select 
                id="entity-location" 
                onChange={e => setEntityData({...entityData, currentLocation: e.target.value})}
                value={entityData.currentLocation.name}
            >
                {Warehouses}
            </select>
        </div>
        <button>Create New</button>
        &emsp; 
        <button type="reset" onClick={ClearFields}>Clear</button>
        <div id="warning"></div>
        <br/>
        <br/>
    </form>);
};