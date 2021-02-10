import Logo from '../Logo/Logo.component';
import SidebarItems from './SidebarItems.component';
import {SidebarWrapper} from './Sidebar.style';

/**
 * Dashboard sidebar with logo and pages links
 */
function Sidebar({toggleSidebar, isSideBarOpen}) {
    return (
        <SidebarWrapper isOpen={isSideBarOpen}>
            <Logo />
            <SidebarItems toggleSidebar={toggleSidebar}/>
        </SidebarWrapper>
    );
}

export default Sidebar;