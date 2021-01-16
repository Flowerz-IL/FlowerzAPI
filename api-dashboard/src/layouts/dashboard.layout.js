
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar.component';
import MainContainer from '../components/MainContainer/MainContainer.component';
import {fetchFlowers} from '../redux/actions/flowers.action';
import {fetchFlowerBouquets} from '../redux/actions/flowerBouquets.action';
import {fetchUsers} from '../redux/actions/users.action';
import {fetchProviders} from '../redux/actions/providers.action';
import {fetchOrders} from '../redux/actions/orders.action';


/**
 * Dashboard layout contains sidebar and pages.
 */
function DashboardLayout() {
    const dispatch = useDispatch();
    const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);
    
    useEffect(() => {
        if(currentUserRole === 'ADMIN') {
            dispatch(fetchUsers());
            dispatch(fetchProviders());
            dispatch(fetchFlowers());
        }
        dispatch(fetchFlowerBouquets());
        dispatch(fetchOrders());
    } ,[dispatch]);

    return (
        <Router basename='/dashboard'>
            <DashboardLayoutWrapper>
                <Sidebar />
                <MainContainer />
            </DashboardLayoutWrapper>
        </Router>
    );
}

const DashboardLayoutWrapper = Styled.div`
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
`;

export default DashboardLayout;