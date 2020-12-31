import {Dashboard} from 'styled-icons/material';
import {Users} from 'styled-icons/fa-solid';

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
];

export default sidebarItems;