
import {useDispatch} from 'react-redux';
import {MainContainerHeaderWrapper, LogOutIcon, HamburgerIcon} from './MainContainer.style';
import {Headline1} from '../../utils/constants/globalStyle.constant';
import {logOut} from '../../redux/actions/auth.action';

/**
 * Dashboard page container top bar
 */
function MainContainerHeader({toggleSidebar}) {
    const dispatch = useDispatch();

    const handleLogOut = () => {dispatch(logOut());};

    return (
        <MainContainerHeaderWrapper>
            <HamburgerIcon onClick={() => toggleSidebar(prev => !prev)}/>
            <Headline1>DashBoard</Headline1>
            <LogOutIcon onClick={handleLogOut}/>
        </MainContainerHeaderWrapper>
    );
}

export default MainContainerHeader;