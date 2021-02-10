
import Styled from 'styled-components';
import {CenteredWithFlex} from '../../utils/constants/globalStyle.constant';
import Colors from '../../utils/constants/colors.constant';

export const MessengerWrapper = Styled.div`
    position: fixed;
    right: 1rem;
    bottom: 1rem;

    @media screen and (max-width: 800px){
        width: 80vw;
        left: 50%;
        bottom: 0.2rem;
        transform: translateX(-50%);
    }
`;

export const MessengerHeader = Styled(CenteredWithFlex)`
    cursor: pointer;
    width: 20vw;
    height: 5vh;
    background-color: ${Colors.primaryColor};

    @media screen and (max-width: 800px){
        width: 80vw;
    }
`;

export const MessengerBody = Styled(CenteredWithFlex)`
    flex-direction: column;
    width: 20vw;
    height: ${ props => props.toDisplay ? '50vh' : '0' };
    opacity: ${ props => props.toDisplay ? '1' : '0' };
    border: 1px solid ${Colors.primaryColor};
    transition: all .7s linear;

    @media screen and (max-width: 800px){
        width: 80vw;
    }
`;

export const MessengerChat = Styled.div`
    height: 90%;
    width: 100%;
    padding: 1rem;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    background-color: ${Colors.thirdColor};
`;

const messageStyle = `
    min-width: 5rem;
    max-width: 20rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    box-shadow: 0 5px 10px 5px ${Colors.primaryColor}${Colors.opacity20};
    border-radius: 10px;
    color: ${Colors.thirdColor};
    overflow: hidden;
`;

export const ThisMessages = Styled.div`
    ${messageStyle}
    align-self: flex-end;
    background-color: ${Colors.forthColor}${Colors.opacity80};
    border-bottom-right-radius: 0;
`;

export const OtherMessages = Styled.div`
    ${messageStyle}
    align-self: flex-start;
    background-color: ${Colors.secondaryColor}${Colors.opacity80};
    border-bottom-left-radius: 0;
`;

export const MessengerInputWrapper = Styled.form`
    display: flex;
    opacity: ${ props => props.toDisplay ? '1' : '0' };
    cursor: pointer;
    width: 20vw;
    height: 10%;
    background-color: ${Colors.primaryColor};
    justify-content: space-around;
    align-items: center;
    transition: all .7s linear;

    @media screen and (max-width: 800px){
        width: 80vw;
    }
`;

export const MessengerInput = Styled.input`
    background-color: ${Colors.thirdColor};
    color: ${Colors.primaryColor};
    width: 60%;
    border: none;
    outline: none;
    padding: 0.5rem;
`;

export const Notification = Styled(CenteredWithFlex)`
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 1.5rem;
    background-color: red;
    top:-10px;
    right: 0;
`;