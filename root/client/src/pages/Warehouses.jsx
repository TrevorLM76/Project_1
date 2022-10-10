import { WarehouseList } from "../components/Lists/WarehouseList";
import { useState } from 'react';
import { WarehouseForm } from '../components/Forms/WarehouseForm.jsx';


export const Warehouses = () => {
    const [warehouseList, setWarehouseList] = useState([]);

    return (<>
        <WarehouseForm setWarehouseList={setWarehouseList}/>
        <WarehouseList warehouseList={warehouseList} setWarehouseList={setWarehouseList}/>
    </>);
};