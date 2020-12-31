import { centeredWithFlex,Headline1,Card,Row } from "../../utils/globalStyle.constant";
import Styled from 'styled-components';
import StripedDataTable from '../../components/Table/StripedDataTable.component';
import Orders from '../../Dummy_Data/order.dummy.data';

function OrdersPage() {
    return (
        <OrdersPageWrapper>
            <Row>
                <Card>
                    <Headline1>
                    Add Order
                    </Headline1>
                </Card>
                <Card>
                    <Headline1>
                    Edit Order
                    </Headline1>
                </Card>
            </Row>
        
        </OrdersPageWrapper>
    );
}

const OrdersPageWrapper = Styled(centeredWithFlex)`
padding: 3rem;
flex-direction: column;
gap: 3rem;
`;

export default OrdersPage;