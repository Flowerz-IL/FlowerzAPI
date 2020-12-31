import Logo from '../Logo/Logo.component';
import SidebarItems from './SidebarItems.component';
import {SidebarWrapper} from './Sidebar.style';

/**
 * Dashboard sidebar with logo and pages links
 */
function Sidebar() {
    return (
        <SidebarWrapper>
            <Logo />
            <SidebarItems />
        </SidebarWrapper>
    );
}

export default Sidebar;