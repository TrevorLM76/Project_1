import axios from 'axios';
import { useEffect } from 'react';
import { serverPort } from '../../serverPort.js';
import { EntityTable } from '../Tables/EntitiesStickyTable';

export const EntityList = ({ entityList, setEntityList }) => {

    const PORT = serverPort();
    useEffect(() => {
        axios.get(`http://localhost:${PORT}/items`)
            .then(res => {setEntityList(res.data)})
            .catch(err => console.error(err));
    }, [PORT, setEntityList]);

    return (<>
        <EntityTable entityList={entityList}/>
    </>);
};