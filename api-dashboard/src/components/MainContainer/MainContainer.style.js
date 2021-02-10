
import Styled from 'styled-components';
import {LogOut} from 'styled-icons/ionicons-outline';
import Colors from '../../utils/constants/colors.constant';
import {CenteredWithFlex} from '../../utils/constants/globalStyle.constant';
import {Menu} from 'styled-icons//boxicons-regular';

export const HamburgerIcon = Styled(Menu)`
    display: none;

    @media screen and (max-width: 800px){
        display: inline-block;
        width: 2.5rem;
    }
`;

export const MainContainerWrapper = Styled.div`
    margin: 0;
    flex 1;
    height: 100vh;
    background-color: ${Colors.thirdColor};
    overflow-y: scroll;
`;

export const MainContainerHeaderWrapper = Styled(CenteredWithFlex)`
    padding: 0 2rem;
    height: 6rem;
    background-color: ${Colors.lighterColor};
    border-bottom: 1px solid ${Colors.thirdColor}${Colors.opacity20};
    justify-content: space-between;
    z-index:2;
`;

export const LogOutIcon = Styled(LogOut)`
    width: 2rem;
    cursor: pointer;

    &:hover {
        color: ${Colors.forthColor};
    }
`;