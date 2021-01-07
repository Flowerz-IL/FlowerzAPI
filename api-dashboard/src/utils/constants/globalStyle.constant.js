
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

export const PopUpWrapper = Styled.div`
    position: fixed;
    top: 0;
    bottom:0;
    left: 0;
    right: 0;
    display: ${props => props.display ? 'block' : 'none'};
    background-color: ${props => props.backgroundColor ?? Colors.primaryColor + Colors.opacity50};
`;

export const PopUp = Styled.div`
    position: fixed;
    background-color: ${props => props.backgroundColor ?? Colors.primaryColor};
    width: 30vw;
    height: 30vh;
    color: ${props => props.textColor ?? Colors.thirdColor};
    display: ${props => props.display ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: auto; 
    gap: 1rem;
    font-size: 1.2rem;
    box-shadow: 0 10px 20px 10px ${Colors.forthColor}${Colors.opacity20};
    padding: 1rem;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const Link = Styled.div`
    display: inline-block;
    color: ${Colors.forthColor};
    text-decoration: underline;
    cursor: pointer;
    margin: 0 3px;

    &:hover {
        transform: translateY(-3px);
    }   
`;