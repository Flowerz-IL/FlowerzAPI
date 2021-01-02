
import Styled from 'styled-components';
import Fonts from './fonts.constant';
import Colors from './colors.constant';

export const centeredWithFlex = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Headline1 = Styled.h2`
    font-size: ${props => props.fontSize ?? '2rem'};
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 1.5px;
    font-family: ${Fonts.serif}, serif;
    margin: 5px;
    color: ${props => props.color ?? Colors.secondaryColor};
`;

export const Row = Styled(centeredWithFlex)`
    justify-content: space-between;
    width: ${props => props.fixedWidth ?? '90%'};
`;

export const Card = Styled(centeredWithFlex)`
    border-radius: 5px;
    flex-direction: column;
    padding: 1rem;
    background-color: ${props => props.backgroundColor ?? `${Colors.lighterColor}`};
    width: ${props => props.width ?? '35vw'};
    height: ${props => props.width ?? '25vw'};
    overflow-y: auto;
`;

export const Button = Styled.button`
    margin: 1rem;
    width: ${props => props.width ?? '10rem'};
    height: ${props => props.height ?? '3rem'};
    background-color: ${props => props.backgroundColor ?? Colors.primaryColor};
    color: ${props => props.textColor ?? Colors.thirdColor};
    transition: all .2s;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 10px ${props => props.backgroundColorHover ?? Colors.primaryColor}${Colors.opacity20};
    }

    &:focus {
        transform: translateY(0);
    }
`;