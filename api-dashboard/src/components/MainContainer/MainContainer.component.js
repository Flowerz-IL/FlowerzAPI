
import {MainContainerWrapper} from './MainContainer.style';
import MainContainerHeader from './MainContainerHeader.component';
import MainContainerRoutes from './MainContainerRoutes.router';

/**
 * Dashboard page container
 */
function MainContainer({toggleSidebar}) {
    return (
        <MainContainerWrapper>
            <MainContainerHeader toggleSidebar={toggleSidebar}/>
            <MainContainerRoutes />
        </MainContainerWrapper>
    );
}

export default MainContainer;