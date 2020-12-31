

import { useState } from 'react';
import uniqid from 'uniqid';
import SidebarItem from './SidebarItem.component';
import items from '../../utils/sidebarItems.constant';
import {SideBarItemsWrapper} from './Sidebar.style';

/**
 * Dashboard Sidebar items
 */
function SidebarItems() {
    const [activeItem, setActiveItem] = useState(items[0]?.itemName ?? '');

    return (
        <SideBarItemsWrapper>
            {items.map( item => 
                <SidebarItem
                    key={uniqid()}
                    text={item.itemName} 
                    logo={item.itemLogo} 
                    route={item.routeName} 
                    setActive={setActiveItem}
                    active={activeItem === item.itemName}
                />
            )}
        </SideBarItemsWrapper>
    );
}

export default SidebarItems;