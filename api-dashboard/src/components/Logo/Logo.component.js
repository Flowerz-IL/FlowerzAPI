
import Styled from 'styled-components';
import Colors from '../../utils/constants/colors.constant';
import {CenteredWithFlex, Headline1} from '../../utils/constants/globalStyle.constant';

/**
 * FlowerZIL Logo
 */
function Logo() {
    return (
        <LogoWrapper>
            <Headline1 color={Colors.thirdColor}>🌺 FlowerZ<ColoredText>IL</ColoredText> 🌺</Headline1>
        </LogoWrapper>
    );
}

// Style
const LogoWrapper = Styled(CenteredWithFlex)`
    height: 6rem;
    text-align: center;
    border-bottom: 1px solid ${Colors.thirdColor}${Colors.opacity20};

    @media screen and (max-width: 600px){
        display: none;
    }
`;

const ColoredText = Styled.span`
    color: ${Colors.skyBlue};
`;

export default Logo;