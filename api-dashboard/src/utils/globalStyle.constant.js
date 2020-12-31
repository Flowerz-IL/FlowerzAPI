
import Styled from 'styled-components';
import Fonts from './fonts.constant';
import Colors from './colors.constant';

export const centeredWithFlex = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Headline1 = Styled.h2`
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 1.5px;
    font-family: ${Fonts.serif}, serif;
    margin: 5px;
    color: ${props => props.color ?? Colors.secondaryColor};
`;