
import {BrowserRouter as Router} from 'react-router-dom';
import Styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar.component';
import MainContainer from '../components/MainContainer/MainContainer.component';

/**
 * Dashboard layout contains sidebar and pages.
 */
function DashboardLayout() {
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