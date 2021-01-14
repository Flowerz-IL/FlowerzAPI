
import {useDispatch} from 'react-redux';
import {removeOrder} from '../../redux/actions/orders.action';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import {Row, Card, CenteredWithFlex} from '../../utils/constants/globalStyle.constant';
import StripedDataTable from '../../components/Table/StripedDataTable.component';

function OrdersPage() {

    const dispatch = useDispatch();
    const [, ordersArray] = useSelectorAsAnArray(({OrdersReducer}) => OrdersReducer.orders); 
    
    const handleItemDelete = itemId => { dispatch(removeOrder(itemId));};

    return (
        <CenteredWithFlex style={{height: '100%', alignItems: 'flex-start', margin: '5rem 0'}}>
            <Row fixedWidth='95%'>
                <Card width="100%" height="auto">
                    <StripedDataTable 
                        dataToPresent={ordersArray} 
                        dataType={ordersDataType}
                        onDelete={handleItemDelete}
                    />
                </Card>
            </Row>
        </CenteredWithFlex>
    );
}

const ordersDataType = {
    _id: DATA_TYPES.TEXT,
    userId: DATA_TYPES.TEXT,
    providerId: DATA_TYPES.TEXT,
    orderAddress:  {},
    orderFrequency: DATA_TYPES.TEXT,
    orderCreationDate: DATA_TYPES.TEXT,
    isOrderActive: DATA_TYPES.BOOLEAN,
    orderFlowerBouquetIds: [{}],
    orderTotalSum: DATA_TYPES.TEXT
};

export default OrdersPage;