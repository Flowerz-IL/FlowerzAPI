
import Styled from 'styled-components';
import Colors from '../../utils/constants/colors.constant';
import {CenteredWithFlex} from '../../utils/constants/globalStyle.constant';

export const SidebarWrapper = Styled.div`
    margin: 0;
    box-sizing: border-box;
    width: 17vw;
    height: 100vh;
    background-color: ${Colors.primaryColor};
`;

export const SideBarItemsWrapper = Styled(CenteredWithFlex)`
    margin-top: 2.5rem;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
`;

export const SideBarItemWrapper = Styled(CenteredWithFlex)`
    padding: 1rem 1.5rem;
    width: 15vw;
    border-radius: 4px;
    justify-content: flex-start;
    gap: 2rem;
    cursor: pointer;
    background-color: ${props => props.active ? `${Colors.thirdColor}${Colors.opacity30}` : `transparent`};
    transition: all .4s;

    &:hover {
        background-color: ${Colors.thirdColor}${Colors.opacity20};
    }
`;

export const SideBarItemText = Styled.p`
    margin: 0;
    font-family: sans-serif;
    font-size: 1.3rem;
    text-transform: uppercase;
    color: ${Colors.thirdColor};
`;