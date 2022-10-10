import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, PNF, Warehouses, WarehouseInventory, Items, ItemInfo, About } from './pages';
import { AppNav } from './components/Nav';
import { useState } from 'react';
import './styles/navbar.css';
import './styles/table&form.css';
import './styles/general.css';

// This app will be in chagre of client side routing

export const App = () => {
    const [loggedIn, toggleLoggedIn] = useState(false);
    // our app will use the BrowserRouter for everything
    return(<BrowserRouter>
        <AppNav loggedIn={loggedIn}/>
        <Routes>
            {/* each route will direct us to another "page" */}
            <Route path="/" element={<Home toggleLoggedIn={toggleLoggedIn}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/warehouses" element={<Warehouses/>}/>   
            <Route path="/warehouse/inventory/:id" element={<WarehouseInventory/>}/>        
            <Route path="/items" element={<Items/>} exact/>
            <Route path="/item/info/:id" element={<ItemInfo/>}/>
            <Route path="*" element={<PNF/>}/>
        </Routes>
    </BrowserRouter>);
};