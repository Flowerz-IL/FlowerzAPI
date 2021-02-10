

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import uniqid from 'uniqid';
import SidebarItem from './SidebarItem.component';
import items from '../../utils/constants/sidebarItems.constant';
import {SideBarItemsWrapper} from './Sidebar.style';

/**
 * Dashboard Sidebar items
 */
function SidebarItems({toggleSidebar}) {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname ?? '');
    const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);

    return (
        <SideBarItemsWrapper>
            {items.map( item => {
                if(!item.routePermissions.includes(currentUserRole))
                    return null;
                return <SidebarItem
                    key={uniqid()}
                    text={item.itemName} 
                    logo={item.itemLogo} 
                    route={item.routeName} 
                    setActive={setActiveItem}
                    active={activeItem === item.routeName}
                    toggleSidebar={toggleSidebar}
                />
            })}
        </SideBarItemsWrapper>
    );
}

export default SidebarItems;