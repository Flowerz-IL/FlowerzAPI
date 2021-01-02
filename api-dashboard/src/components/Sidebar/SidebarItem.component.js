
import {SideBarItemWrapper, SideBarItemText} from './Sidebar.style';
import {useHistory} from 'react-router-dom';
import Colors from '../../utils/constants/colors.constant';

/**
 * Dashboard sidebar item. 
 * Component must be a children of a react-router-dom browser router.
 * 
 * @props logo -> logo to display (component)
 * @props text -> displayed text (string)
 * @props route -> connected page route (string)
 * @props setActive -> useState function to update (function)
 * @props active -> is current item is active (boolean) 
 */
function SidebarItem(props) {
    const history = useHistory();

    const handleClick = () => {
        props.setActive(props.route);
        history?.push(props.route);
    };        

    return (
        <SideBarItemWrapper active={props.active} onClick={handleClick}>
            <props.logo size='25' color={Colors.thirdColor} />
            <SideBarItemText> {props.text} </SideBarItemText>
        </SideBarItemWrapper>
    );
}

export default SidebarItem;