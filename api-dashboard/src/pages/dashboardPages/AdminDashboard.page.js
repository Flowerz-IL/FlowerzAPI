
import Styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {Row, Card, CenteredWithFlex, Headline1} from '../../utils/constants/globalStyle.constant';
import OrderForm from '../../components/Form/OrderForm.component';
import OrderDataTable from '../../components/Table/OrderDataTable.component';
import BarGraph from '../../components/Graph/BarGraph.component';

function AdminDashboard() {
    const {userRole, providerId} = useSelector(({AuthReducer}) => AuthReducer);
    const [, ordersArray] = useSelectorAsAnArray(({OrdersReducer}) => OrdersReducer.orders);

    return (
        <DashboardWrapper>
            <Row fixedWidth='95%'>
                <Card width="38vw">
                    <Headline1> Choose An Order </Headline1>
                    <DashboardTableWrapper>
                        <OrderDataTable dataKeys={dataKeysNonActive} providerId={userRole === 'PROVIDER' ? providerId : '-'}/>
                    </DashboardTableWrapper>
                </Card>
                <Card width="38vw">
                    <Headline1> Active Orders </Headline1>
                    <DashboardTableWrapper>
                        <OrderDataTable dataKeys={dataKeysActive} showActiveOrders/>
                    </DashboardTableWrapper>
                </Card>
            </Row>
            <Row fixedWidth='95%'>
                <Card width="38vw">
                    <Headline1> Place An Order </Headline1>
                    <OrderForm providerId={userRole === 'PROVIDER' ? providerId : '-'}/>
                </Card>
                <Card width="38vw">
                    <Headline1> Orders per month </Headline1>
                    <BarGraph dataToPresent={ordersArray ? createGraphOrdersData(ordersArray) : null}/>
                </Card>
            </Row>
        </DashboardWrapper>
    );
}

const createGraphOrdersData = orders => {
    const res = [];
    for(let i = 0; i < 12; i++) res.push(0);
    orders.forEach(order => res[Number(order.orderCreationDate.split('/')[1])] += 1);
    return res;
}

const dataKeysNonActive = ['orderCreationDate', 'orderAddress', 'orderFlowerBouquetIds', 'orderTotalSum'];
const dataKeysActive = ['providerId', 'userId', 'orderAddress', 'orderFlowerBouquetIds', 'orderTotalSum'];

const DashboardWrapper = Styled(CenteredWithFlex)`
    padding: 1rem 0 5rem;
    flex-direction: column;
    gap: 2rem;
`;

const DashboardTableWrapper = Styled.div`
    margin-top: 1rem;
    width: 100%;
    height: 80%;
    overflow: auto;
`;

export default AdminDashboard;