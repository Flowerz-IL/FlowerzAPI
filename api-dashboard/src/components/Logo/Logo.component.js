
import Styled from 'styled-components';
import Colors from '../../utils/colors.constant';
import {centeredWithFlex, Headline1} from '../../utils/globalStyle.constant';

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
const LogoWrapper = Styled(centeredWithFlex)`
    height: 6rem;
    text-align: center;
    border-bottom: 1px solid ${Colors.thirdColor}${Colors.opacity20};
`;

const ColoredText = Styled.span`
    color: ${Colors.skyBlue};
`;

export default Logo;