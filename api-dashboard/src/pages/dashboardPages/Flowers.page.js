
import Styled from 'styled-components';
import {Headline1, centeredWithFlex, Row, Card} from '../../utils/globalStyle.constant';
import StripedDataTable from '../../components/Table/StripedDataTable.component';
import Flowers from '../../Dummy_Data/flower.dummy.data';

function FlowersPage() {
    return (
        <FlowersPageWrapper>
            <Row>
                <Card>
                    <Headline1> Add Flower </Headline1>
                </Card>
                <Card>
                    <Headline1> Edit Flower </Headline1>
                </Card>
            </Row>
            <Row>
                <Card width="100%" height="auto">
                    <StripedDataTable dataToPresent={Flowers} />
                </Card>
            </Row>
        </FlowersPageWrapper>
    );
}

const FlowersPageWrapper = Styled(centeredWithFlex)`
    padding: 3rem;
    flex-direction: column;
    gap: 3rem;
`;



export default FlowersPage;