
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from '../../pages/dashboardPages/AdminDashboard.page';
import Users from '../../pages/dashboardPages/Users.page';
import FlowersPage from '../../pages/dashboardPages/Flowers.page';
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
                <Users />
            </Route>
            <Route path='/flowers'>
                <FlowersPage />
            </Route>
            <Route path='/orders'>
                <OrdersPage />
            </Route>
        </Switch>
    );
}

export default MainContainerRoutes;