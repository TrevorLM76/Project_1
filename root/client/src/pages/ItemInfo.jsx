import axios from "axios";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { EntityInfoForm } from '../components/Forms/EntityInfoForm.jsx';
import { serverPort } from '../serverPort.js';

export const ItemInfo = () => {
    const [entity, setEntity] = useState({});
    const [warehouseList, setWarehouseList] = useState([]);

    const PORT = serverPort();
    const params = useParams();
    const eID = params.id;

    useEffect(() => {
        axios.get(`http://localhost:${PORT}/items/${eID}`)
            .then(res => {setEntity(res.data)})
            .catch(err => console.error(err));
    }, [PORT, eID, setEntity]);

    useEffect(() => {
        axios.get(`http://localhost:${PORT}/warehouses`)
            .then(res => {setWarehouseList(res.data)})
            .catch(err => console.error(err));
    }, [PORT, setWarehouseList]);
    
    return (<>
        <EntityInfoForm PORT={PORT} eID={eID} entity={entity} warehouseList={warehouseList} setEntity={setEntity}/>
    </>);
};