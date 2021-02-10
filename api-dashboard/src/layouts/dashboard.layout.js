
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar.component';
import MainContainer from '../components/MainContainer/MainContainer.component';
import {fetchFlowers} from '../redux/actions/flowers.action';
import {fetchFlowerBouquets} from '../redux/actions/flowerBouquets.action';
import {fetchUsers} from '../redux/actions/users.action';
import {fetchProviders} from '../redux/actions/providers.action';
import {fetchOrders} from '../redux/actions/orders.action';
import Messenger from '../components/Messenger/Messenger.component';


/**
 * Dashboard layout contains sidebar and pages.
 */
function DashboardLayout() {
    const dispatch = useDispatch();
    const [isSideBarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProviders());
        dispatch(fetchFlowers());
        dispatch(fetchFlowerBouquets());
        dispatch(fetchOrders());
    } ,[dispatch]);

    return (
        <Router basename='/dashboard'>
            <DashboardLayoutWrapper>
                <Sidebar isSideBarOpen={isSideBarOpen} toggleSidebar={setIsSidebarOpen}/>
                <MainContainer toggleSidebar={setIsSidebarOpen}/>
                <Messenger />
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