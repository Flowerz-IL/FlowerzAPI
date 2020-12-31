
import Styled from 'styled-components';
import {LogOut} from 'styled-icons/ionicons-outline';
import Colors from '../../utils/colors.constant';
import {centeredWithFlex} from '../../utils/globalStyle.constant';

export const MainContainerWrapper = Styled.div`
    margin: 0;
    flex 1;
    height: 100vh;
    background-color: ${Colors.thirdColor};
    overflow-y: scroll;
`;

export const MainContainerHeaderWrapper = Styled(centeredWithFlex)`
    padding: 0 2rem;
    height: 6rem;
    background-color: ${Colors.lighterColor};
    border-bottom: 1px solid ${Colors.thirdColor}${Colors.opacity20};
    justify-content: space-between;
`;

export const LogOutIcon = Styled(LogOut)`
    width: 2rem;
    cursor: pointer;

    &:hover {
        color: ${Colors.forthColor};
    }
`;