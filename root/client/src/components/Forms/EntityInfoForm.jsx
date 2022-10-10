import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// This should handle the update and delete of an Entity

export const EntityInfoForm = ({ PORT, eID, entity, warehouseList }) => {

    const [shouldDeleteRender, toggleShouldDeleteRender] = useState(false);

    const [entityData, setEntityData] = useState({
        name: '',
        brand: '',
        description: '',
        currentLocation: '',
        size: '',
        quantity: '',
        weight: ''
    });

    const ClearFields = () => {
        setEntityData({
            name: '',
            brand: '',
            description: '',
            currentLocation: '',
            size: '',
            quantity: '',
            weight: ''
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
            let tempSize = entity.size.$numberDecimal;
            let tempQuantity = entity.quantity;
            let tempWID = entity.currentLocation[0]._id;
            await axios.put(`http://localhost:${PORT}/items/${eID}`, {
                name: (entityData.name !== '' ? entityData.name : entity.name),
                brand: (entityData.brand !== '' ? entityData.brand : entity.brand),
                description: (entityData.description !== '' ? entityData.description : entity.description),
                currentLocation: (entityData.currentLocation !== '' ? entityData.currentLocation : entity.currentLocation[0]._id),
                size: (entityData.size !== '' ? entityData.size : entity.size.$numberDecimal),
                quantity: (entityData.quantity !== '' ? entityData.quantity : entity.quantity),
                weight: (entityData.weight !== '' ? entityData.weight : entity.weight)
            })
            entity.name = (entityData.name !== '' ? entityData.name : entity.name);
            entity.brand = (entityData.brand !== '' ? entityData.brand : entity.brand);
            entity.description = (entityData.description !== '' ? entityData.description : entity.description);
            entity.currentLocation[0]._id = (entityData.currentLocation !== '' ? entityData.currentLocation : entity.currentLocation[0]._id);
            entity.size.$numberDecimal = (entityData.size !== '' ? entityData.size : entity.size.$numberDecimal);
            entity.quantity = (entityData.quantity !== '' ? entityData.quantity : entity.quantity);
            entity.weight = (entityData.weight !== '' ? entityData.weight : entity.weight);
            let wh = {};
            let array = [];
            wh = warehouseData.find((warehouse) => { return warehouse.id === tempWID});
            wh.currentUnitCapacity-= (tempSize * tempQuantity);
            array = wh.inventory.filter(obj => { return obj !== eID});
            await axios.put(`http://localhost:${PORT}/warehouses/${tempWID}`, {
                currentUnitCapacity: wh.currentUnitCapacity,
                inventory: array
            });
            wh = warehouseData.find((warehouse) => { return warehouse.id === entityData.currentLocation || warehouse.id === entity.currentLocation[0]._id});
            tempSize = Number(entityData.size !== '' ? entityData.size : entity.size.$numberDecimal);
            tempQuantity = Number(entityData.quantity !== '' ? entityData.quantity : entity.quantity);
            wh.currentUnitCapacity = Number(wh.currentUnitCapacity) + (tempSize * tempQuantity);
            wh.filledStatus = wh.currentUnitCapacity / wh.maxUnitCapacity;
            array = wh.inventory.filter(obj => {return obj});
            array.push(eID);
            await axios.put(`http://localhost:${PORT}/warehouses/${entityData.currentLocation !== '' ? entityData.currentLocation : entity.currentLocation[0]._id}`, {
                currentUnitCapacity: wh.currentUnitCapacity,
                inventory: array
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

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            let wh = {};
            let array = [];
            wh = warehouseData.find((warehouse) => { return warehouse.id === entity.currentLocation[0]._id});
            wh.currentUnitCapacity-= (entity.size.$numberDecimal * entity.quantity);
            array = wh.inventory.filter(obj => { return obj !== eID});
            await axios.put(`http://localhost:${PORT}/warehouses/${entity.currentLocation[0]._id}`, {
                currentUnitCapacity: wh.currentUnitCapacity,
                inventory: array
            });
            await axios.delete(`http://localhost:${PORT}/items/${eID}`,{})
            navigate(`/items`);
        } catch (err) {
            console.error(err);
        };
    };

    const clearWarningDiv = () => {
        let warningDiv = document.getElementById("warning");
        warningDiv.innerText="";
    };

    return (<form onSubmit={handleSubmit} className="submissionForm" style={{marginLeft: "20px"}}>
        <h3 style={{marginBottom: "10px"}}>Update Item Information</h3>
        <div>
            <label htmlFor="entity-name">Item Name:</label>
            <input 
                style={{width: "190px"}}
                id="entity-name" 
                placeholder={entity?.name || ''}
                onChange={e => setEntityData({...entityData, name: e.target.value})}
                value={entityData.name}
            />
            &emsp;
            <label htmlFor="entity-brand">Brand:</label>
            <input 
                style={{width: "190px"}}
                id="brand-name" 
                placeholder={entity?.brand || ''} 
                onChange={e => setEntityData({...entityData, brand: e.target.value})}
                value={entityData.brand}
            />
        </div>
        <div>
        <label htmlFor="entity-description">Description:</label>
            <input 
                style={{width: "445px"}}
                id="entity-description"
                placeholder={entity?.description || ''}
                onChange={e => setEntityData({...entityData, description: e.target.value})}
                value={entityData.description}
            />
        </div>
        <div>
            <label htmlFor="entity-size">Size:</label>
            <input 
                style={{width: "60px"}}
                id="entity-size" 
                placeholder={entity?.size?.$numberDecimal || ''}
                type="number"
                onChange={e => setEntityData({...entityData, size: e.target.value})}
                value={entityData.size}
            />
            &emsp;
            <label htmlFor="entity-quantity">Quantity:</label>
            <input 
                style={{width: "60px"}}
                type="number"
                placeholder={entity?.quantity || ''}
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
                placeholder={entity?.weight || ''}
                onChange={e => setEntityData({...entityData, weight: e.target.value})}
                value={entityData.weight}
            />
            &emsp;
            <label htmlFor="entity-location">Current Location:</label>
            <select 
                id="entity-location" 
                onChange={e => setEntityData({...entityData, currentLocation: e.target.value})}
                value={ entityData.currentLocation?.name}
            >
                {Warehouses}
            </select>
        </div>
        <button>Update</button>
        &emsp; 
        <button type="reset" onClick={ClearFields}>Clear</button>
        &emsp;
        <button type="delete" onClick={() => toggleShouldDeleteRender(true)}>Delete</button>
        &emsp;
        {shouldDeleteRender && <label>Are you sure? :</label>}
        {shouldDeleteRender && <button type="delete" onClick={() => handleDelete()}>Yes</button>}
        &emsp;
        {shouldDeleteRender && <button type="delete" onClick={() => toggleShouldDeleteRender(false)}>No</button>}
        &emsp;
        <div id="warning"></div>
        <br/>
        <br/>
    </form>);
};