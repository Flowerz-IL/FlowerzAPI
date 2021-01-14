
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from '../../pages/dashboardPages/AdminDashboard.page';
import UsersPage from '../../pages/dashboardPages/Users.page';
import FlowersPage from '../../pages/dashboardPages/Flowers.page';
import FlowersBouquetsPage from '../../pages/dashboardPages/FlowersBouquets.page';
import ProvidersPage from '../../pages/dashboardPages/Providers.page';
import OrdersPage from '../../pages/dashboardPages/Orders.page';

/**
 * Dashboard page routes manager
 */
function MainContainerRoutes() {
    return (
        <Switch>
            <Route path='/' exact>
                <AdminDashboard />
            </Route>
            <Route path='/users'>
                <UsersPage />
            </Route>
            <Route path='/flowers'>
                <FlowersPage />
            </Route>
            <Route path='/flower-bouquets'>
                <FlowersBouquetsPage />
            </Route>
            <Route path='/providers'>
                <ProvidersPage />
            </Route>
            <Route path='/orders'>
                <OrdersPage />
            </Route>
        </Switch>
    );
}

export default MainContainerRoutes;