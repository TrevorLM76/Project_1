import axios from "axios";
import { useState } from "react";

// This should handle the creation of a new Warehouse

export const WarehouseForm = ({setWarehouseList}) => {

    const [warehouseData, setWarehouseData] = useState({
        name: '',
        road: '',
        city: '',
        state: '',
        zipCode: '',
        currentUnitCapacity: 0,
        maxUnitCapacity: 1,
        inventory: []
    });

    const ClearFields = () => {
        setWarehouseData({
            name: '',
            road: '',
            city: '',
            state: '',
            zipCode: '',
            currentUnitCapacity: 0,
            maxUnitCapacity: 1,
            inventory: []
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
            const res = await axios.post('http://localhost:9000/warehouses', {
                name: warehouseData.name,
                address: {
                    road: warehouseData.road,
                    city: warehouseData.city,
                    state: warehouseData.state,
                    zipCode: warehouseData.zipCode
                },
                currentUnitCapacity: 0,
                maxUnitCapacity: warehouseData.maxUnitCapacity,
                inventory: []
            });
            setWarehouseList(warehouseList => [...warehouseList, res.data]);
            event.target.reset();
            ClearFields();
        } catch (err) {
            console.error(err);
        };
    };

    return (<form onSubmit={handleSubmit} className="submissionForm" style={{marginLeft: "20px"}}>
        <h3 style={{marginBottom: "10px"}}>Create New Warehouse</h3>
        <div>
            <label htmlFor="warehouse-name">Warehouse Name:</label>
            <input 
                style={{width: "190px"}}
                id="warehouse-name" 
                onChange={e => setWarehouseData({...warehouseData, name: e.target.value})}
                value={warehouseData.name}
            />
            &emsp;
            <label htmlFor="maxCap">Max Unit Capacity:</label>
            <input 
                id="maxCap" 
                type="number"
                onChange={e => setWarehouseData({...warehouseData, maxUnitCapacity: e.target.value})}
                value={warehouseData.maxUnitCapacity}
            />
        </div>
        <div>
            <label htmlFor="road">Road:</label>
            <input 
                style={{width: "250px"}}
                id="road" 
                onChange={e => setWarehouseData({...warehouseData, road: e.target.value})}
                value={warehouseData.road}
            />
            &emsp;
            <label htmlFor="city">City:</label>
            <input 
            style={{width: "130px"}}
                id="city" 
                onChange={e => setWarehouseData({...warehouseData, city: e.target.value})}
                value={warehouseData.city}
            />
            &emsp;
            <label htmlFor="state">State:</label>
            <select 
                id="state" 
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
                type="number"
                onChange={e => setWarehouseData({...warehouseData, zipCode: e.target.value})}
                value={warehouseData.zipCode}
            />
        </div>
        <button>Create New</button>
        &emsp; 
        <button type="reset" onClick={ClearFields}>Clear</button>
        <br/>
        <br/>
    </form>);
};