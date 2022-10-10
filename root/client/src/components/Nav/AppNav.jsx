import { Nav, NavItem, NavSection } from './index.js';
import { Link } from 'react-router-dom';

export const AppNav = ({loggedIn}) => {
    return (<Nav>
        <NavSection>
            <NavItem className='nav-logo'>
                {/* a tags refresh page, dont use */}
                <Link className='nav-link' to="/">Warehouse Warden</Link>
            </NavItem>
            <NavItem>
                {loggedIn && <Link className='nav-link' to="/about">About</Link>}
            </NavItem>
        </NavSection>
        <NavSection className='nav-section-reversed'>
            <NavItem>
                {loggedIn && <Link className='nav-link' to="/warehouses">Warehouses</Link>}
            </NavItem>
            <NavItem>
                {loggedIn && <Link className='nav-link' to="/items">Items</Link>}
            </NavItem>
        </NavSection>
    </Nav>);
};