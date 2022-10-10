import axios from 'axios';
import { useEffect } from 'react';
import { serverPort } from '../../serverPort.js';
import { WarehouseTable } from '../Tables/WarehouseStickyTable';

export const WarehouseList = ({ warehouseList, setWarehouseList }) => {

    const PORT = serverPort();
    useEffect(() => {
        axios.get(`http://localhost:${PORT}/warehouses`)
            .then(res => {setWarehouseList(res.data)})
            .catch(err => console.error(err));
    }, [PORT, setWarehouseList]);

    return (<>
        <WarehouseTable warehouseList={warehouseList}/>
    </>);
};