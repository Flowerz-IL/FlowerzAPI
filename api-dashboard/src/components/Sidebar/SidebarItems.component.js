

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import SidebarItem from './SidebarItem.component';
import items from '../../utils/constants/sidebarItems.constant';
import {SideBarItemsWrapper} from './Sidebar.style';

/**
 * Dashboard Sidebar items
 */
function SidebarItems() {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname ?? '');

    return (
        <SideBarItemsWrapper>
            {items.map( item => 
                <SidebarItem
                    key={uniqid()}
                    text={item.itemName} 
                    logo={item.itemLogo} 
                    route={item.routeName} 
                    setActive={setActiveItem}
                    active={activeItem === item.routeName}
                />
            )}
        </SideBarItemsWrapper>
    );
}

export default SidebarItems;