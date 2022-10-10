import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// This should handle the update and delete of a Warehouse

export const WarehouseInventoryForm = ({ PORT, wID, warehouse}) => {

    const [shouldDeleteRender, toggleShouldDeleteRender] = useState(false);

    const [warehouseData, setWarehouseData] = useState({
        name: '',
        road: '',
        city: '',
        state: '',
        zipCode: '',
        maxUnitCapacity: ''
    });

    const ClearFields = () => {
        setWarehouseData({
            name: '',
            road: '',
            city: '',
            state: '',
            zipCode: '',
            maxUnitCapacity: ''
        });
    };

    const States = [
        <option key="blank" hidden></option>,
        <option key="AL">AL</option>,
        <option key="AK">AK</option>,
        <option key="AZ">AZ</option>,
        <option key="AR">AR</option>,
        <option key="CA">CA</option>,
        <option key="CO">CO</option>,
        <option key="CT">CT</option>,
        <option key="DE">DE</option>,
        <option key="FL">FL</option>,
        <option key="GA">GA</option>,
        <option key="HI">HI</option>,
        <option key="ID">ID</option>,
        <option key="IL">IL</option>,
        <option key="IN">IN</option>,
        <option key="IA">IA</option>,
        <option key="KS">KS</option>,
        <option key="KY">KY</option>,
        <option key="LA">LA</option>,
        <option key="ME">ME</option>,
        <option key="MD">MD</option>,
        <option key="MA">MA</option>,
        <option key="MI">MI</option>,
        <option key="MN">MN</option>,
        <option key="MS">MS</option>,
        <option key="MO">MO</option>,
        <option key="MT">MT</option>,
        <option key="NE">NE</option>,
        <option key="NV">NV</option>,
        <option key="NH">NH</option>,
        <option key="NJ">NJ</option>,
        <option key="NM">NM</option>,
        <option key="NY">NY</option>,
        <option key="NC">NC</option>,
        <option key="ND">ND</option>,
        <option key="OH">OH</option>,
        <option key="OK">OK</option>,
        <option key="OR">OR</option>,
        <option key="PA">PA</option>,
        <option key="RI">RI</option>,
        <option key="SC">SC</option>,
        <option key="SD">SD</option>,
        <option key="TN">TN</option>,
        <option key="TX">TX</option>,
        <option key="UT">UT</option>,
        <option key="VT">VT</option>,
        <option key="VA">VA</option>,
        <option key="WA">WA</option>,
        <option key="WV">WV</option>,
        <option key="WI">WI</option>,
        <option key="WY">WY</option>
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:${PORT}/warehouses/${wID}`, {
                name: (warehouseData.name !== '' ? warehouseData.name : warehouse.name),
                address: {
                    road: (warehouseData.road !== '' ? warehouseData.road : warehouse.address.road),
                    city: (warehouseData.city !== '' ? warehouseData.city : warehouse.address.city),
                    state: (warehouseData.state !== '' ? warehouseData.state : warehouse.address.state),
                    zipCode: (warehouseData.zipCode !== '' ? warehouseData.zipCode : warehouse.address.zipCode)
                },
                maxUnitCapacity: (warehouseData.maxUnitCapacity !== '' ? warehouseData.maxUnitCapacity : warehouse.maxUnitCapacity)
            });
            warehouse.name = (warehouseData.name !== '' ? warehouseData.name : warehouse.name);
            warehouse.road = (warehouseData.road !== '' ? warehouseData.road : warehouse.address.road);
            warehouse.city = (warehouseData.city !== '' ? warehouseData.city : warehouse.address.city);
            warehouse.state = (warehouseData.state !== '' ? warehouseData.state : warehouse.address.state);
            warehouse.zipCode = (warehouseData.zipCode !== '' ? warehouseData.zipCode : warehouse.address.zipCode);
            warehouse.maxUnitCapacity = (warehouseData.maxUnitCapacity !== '' ? warehouseData.maxUnitCapacity : warehouse.maxUnitCapacity);
            event.target.reset();
            ClearFields();
        } catch (err) {
            console.error(err);
        };
    };

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            warehouse.inventory.forEach(async (element) => {
                await axios.delete(`http://localhost:${PORT}/items/${element._id}`)
            })
            await axios.delete(`http://localhost:${PORT}/warehouses/${wID}`,{})
            navigate(`/warehouses`);
        } catch (err) {
            console.error(err);
        };
    };

    return (<form onSubmit={handleSubmit} className="submissionForm" style={{marginLeft: "20px"}}>
        <h3 style={{marginBottom: "10px"}}>Update Warehouse Information</h3>
        <div>
            <label htmlFor="warehouse-name">Warehouse Name:</label>
            <input 
                
                style={{width: "190px"}}
                placeholder={warehouse?.name || ''}
                id="warehouse-name" 
                onChange={e => setWarehouseData({...warehouseData, name: e.target.value})}
                value={warehouseData.name}
            />
            &emsp;
            <label htmlFor="maxCap">Max Unit Capacity:</label>
            <input 
                id="maxCap" 
                placeholder={warehouse?.maxUnitCapacity || ''}
                type="number"
                onChange={e => setWarehouseData({...warehouseData, maxUnitCapacity: e.target.value})}
                value={warehouseData.maxUnitCapacity}
            />
        </div>
        <div>
            <label htmlFor="road">Road:</label>
            <input 
                style={{width: "250px"}}
                placeholder={warehouse?.address?.road || ''}
                id="road" 
                onChange={e => setWarehouseData({...warehouseData, road: e.target.value})}
                value={warehouseData.road}
            />
            &emsp;
            <label htmlFor="city">City:</label>
            <input 
            style={{width: "130px"}}
                id="city" 
                placeholder={warehouse?.address?.city || ''}
                onChange={e => setWarehouseData({...warehouseData, city: e.target.value})}
                value={warehouseData.city}
            />
            &emsp;
            <label htmlFor="state">State:</label>
            <select 
                id="state" 
                placeholder={warehouse?.address?.state || ''}
                onChange={e => setWarehouseData({...warehouseData, state: e.target.value})}
                value={warehouseData.state}
            >
                {States}
            </select>
            &emsp;
            <label htmlFor="zipCode">Zip Code:</label>
            <input 
                style={{width: "60px"}}
                id="zipCode" 
                placeholder={warehouse?.address?.zipCode || ''}
                type="number"
                onChange={e => setWarehouseData({...warehouseData, zipCode: e.target.value})}
                value={warehouseData.zipCode}
            />
        </div>
        <button>Update</button>
        &emsp; 
        <button type="reset" onClick={ClearFields}>Clear</button>
        &emsp;
        <button type="delete" onClick={() => toggleShouldDeleteRender(true)}>Delete</button>
        &emsp;
        {shouldDeleteRender && <label>Are you sure? This will delete all items in the warehouse as well:</label>}
        {shouldDeleteRender && <button type="delete" onClick={() => handleDelete()}>Yes</button>}
        &emsp;
        {shouldDeleteRender && <button type="delete" onClick={() => toggleShouldDeleteRender(false)}>No</button>}
        <br/>
        <br/>
    </form>);
};