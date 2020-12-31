
import {MainContainerWrapper} from './MainContainer.style';
import MainContainerHeader from './MainContainerHeader.component';
import MainContainerRoutes from './MainContainerRoutes.router';

/**
 * Dashboard page container
 */
function MainContainer() {
    return (
        <MainContainerWrapper>
            <MainContainerHeader />
            <MainContainerRoutes />
        </MainContainerWrapper>
    );
}

export default MainContainer;