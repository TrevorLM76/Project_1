import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WarehouseInventoryTable } from '../components/Tables/WarehouseInventoryStickyTable.jsx';
import { WarehouseInventoryForm } from '../components/Forms/WarehouseInventoryForm.jsx';
import { serverPort } from '../serverPort.js';

export const WarehouseInventory = () => {
    const [warehouse, setWarehouse] = useState({});

    const params = useParams();
    const wID = params.id;

    const PORT = serverPort();
    useEffect(() => {
        axios.get(`http://localhost:${PORT}/warehouses/${wID}`)
            .then(res => {setWarehouse(res.data)})
            .catch(err => console.error(err));
    }, [PORT, wID, setWarehouse]);

    return (<>
        <WarehouseInventoryForm PORT={PORT} wID={wID} warehouse={warehouse}/>
        <WarehouseInventoryTable warehouse={warehouse}/>
    </>);
};