import {Dashboard} from 'styled-icons/material';
import {Users} from 'styled-icons/fa-solid';
import {AttachMoney} from 'styled-icons/material-outlined';
import {Flower} from 'styled-icons/entypo';


const PERMISSIONS = {PROVIDER: 'PROVIDER', ADMIN: 'ADMIN'}

const sidebarItems = [
    {
        itemName: 'Dashboard',
        itemLogo: Dashboard,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/'
    },
    {
        itemName: 'Users',
        itemLogo: Users,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/users'
    },
    {
        itemName: 'Flowers',
        itemLogo: Flower,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/flowers'
    },
    {
        itemName: 'Orders',
        itemLogo: AttachMoney,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/orders'
    }
];

export default sidebarItems;