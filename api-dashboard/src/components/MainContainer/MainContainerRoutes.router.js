
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from '../../pages/dashboardPages/AdminDashboard.page';
import Users from '../../pages/dashboardPages/Users.page';
import FlowersPage from '../../pages/dashboardPages/Flowers.page';

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
        </Switch>
    );
}

export default MainContainerRoutes;