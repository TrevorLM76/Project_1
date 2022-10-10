import axios from "axios";
import { EntityList } from "../components/Lists/EntityList";
import { useState, useEffect } from 'react';
import { EntityForm } from '../components/Forms/EntityForm.jsx';
import { serverPort } from '../serverPort.js';

export const Items = () => {
    const [entityList, setEntityList] = useState([]);
    const [warehouseList, setWarehouseList] = useState([]);
    const PORT = serverPort();
    useEffect(() => {
        axios.get(`http://localhost:${PORT}/warehouses`)
            .then(res => {setWarehouseList(res.data)})
            .catch(err => console.error(err));
    }, [PORT, setWarehouseList]);

    return (<>
        <EntityForm warehouseList={warehouseList} setEntityList={setEntityList}/>
        <EntityList entityList={entityList} setEntityList={setEntityList}/>
    </>);
};