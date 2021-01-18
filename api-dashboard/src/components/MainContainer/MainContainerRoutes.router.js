
import {Switch, Route} from 'react-router-dom';
import AdminDashboard from '../../pages/dashboardPages/AdminDashboard.page';
import UsersPage from '../../pages/dashboardPages/Users.page';
import FlowersPage from '../../pages/dashboardPages/Flowers.page';
import FlowersBouquetsPage from '../../pages/dashboardPages/FlowersBouquets.page';
import ProvidersPage from '../../pages/dashboardPages/Providers.page';
import {AdminRoute, ProviderRoute} from '../../utils/helper/customRoutes.util';

/**
 * Dashboard page routes manager
 */
function MainContainerRoutes() {
    return (
        <Switch>
            <Route path='/' exact>
                <AdminDashboard />
            </Route>
            <AdminRoute path='/users'>
                <UsersPage />
            </AdminRoute>
            <AdminRoute path='/flowers'>
                <FlowersPage />
            </AdminRoute>
            <ProviderRoute path='/flower-bouquets'>
                <FlowersBouquetsPage />
            </ProviderRoute>
            <AdminRoute path='/providers'>
                <ProvidersPage />
            </AdminRoute>
        </Switch>
    );
}

export default MainContainerRoutes;