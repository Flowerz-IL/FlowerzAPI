
import {MainContainerHeaderWrapper, LogOutIcon} from './MainContainer.style';
import {Headline1} from '../../utils/globalStyle.constant';

/**
 * Dashboard page container top bar
 */
function MainContainerHeader() {
    return (
        <MainContainerHeaderWrapper>
            <Headline1>DashBoard</Headline1>
            <LogOutIcon />
        </MainContainerHeaderWrapper>
    );
}

export default MainContainerHeader;