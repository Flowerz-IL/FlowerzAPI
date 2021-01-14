
import {Dashboard} from 'styled-icons/material';
import {Users, Store} from 'styled-icons/fa-solid';
import {Flower} from 'styled-icons/entypo';
import {Flower as Flower2} from 'styled-icons/ionicons-sharp';
import {Detail} from 'styled-icons/boxicons-regular';

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
        itemName: 'providers',
        itemLogo: Store,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/providers'
    },
    {
        itemName: 'Flowers',
        itemLogo: Flower,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/flowers'
    },
    {
        itemName: 'FlowerBouquets',
        itemLogo: Flower2,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/flower-bouquets'
    },
    {
        itemName: 'orders',
        itemLogo: Detail,
        routePermissions: [PERMISSIONS.PROVIDER, PERMISSIONS.ADMIN],
        routeName: '/orders'
    }
];

export default sidebarItems;