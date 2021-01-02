
import Styled, {keyframes} from 'styled-components';
import Colors from '../../utils/constants/colors.constant';

function Loader({color}){
    return (
        <LoaderWrapper> <LoaderComp></LoaderComp> </LoaderWrapper>
    );
};

const LoaderWrapper = Styled.div`
    width: 5rem;
    height: 5rem;
    position: relative;
`;

const loadingAnimation = keyframes`
    0%{
        background-color: ${Colors.primaryColor};
        box-shadow: 0 0 10px 2px ${Colors.forthColor}${Colors.opacity20};
        width: 1rem;
        left: 0;
    }
    25%{
        background-color: ${Colors.primaryColor};
        box-shadow: 0 0 10px 2px ${Colors.forthColor}${Colors.opacity20};
        width: 4rem;
        left: 0;
    }
    50%{
        background-color: ${Colors.forthColor};
        box-shadow: 0 0 10px 2px ${Colors.primaryColor}${Colors.opacity20};
        width: 1rem;
        left: 3rem;
    }
    75%{
        background-color: ${Colors.forthColor};
        box-shadow: 0 0 10px 2px ${Colors.primaryColor}${Colors.opacity20};
        width: 4rem;
        left: 0;
    }
    100%{
        background-color: ${Colors.primaryColor};
        box-shadow: 0 0 10px 2px ${Colors.forthColor}${Colors.opacity20};
        width: 1rem;
        left: 0;
    }
`;

const LoaderComp = Styled.div`
    position: absolute;
    top: 40%;
    width: 1rem;
    height: 1rem;
    border-radius: 0.75rem;
    box-shadow: 0 0 10px 2px ${Colors.forthColor}${Colors.opacity20};
    background-color: ${Colors.primaryColor};
    animation: ${loadingAnimation} 2s ease infinite;

`;

export default Loader;
