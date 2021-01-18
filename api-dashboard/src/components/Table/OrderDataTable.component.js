
import uniqid from 'uniqid';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {Link, Button, DeleteIcon, TruckIcon, PopUpWrapper, PopUp} from '../../utils/constants/globalStyle.constant';
import {formatText} from './StripedDataTable.component';
import {StripedDataTableWrapper as OrderDataTableWrapper, TableHead, TableBody} from './StripedDataTable.style';
import Loader from '../Loader/Loader.component';
import Colors from '../../utils/constants/colors.constant';
import {editOrder, removeOrder} from '../../redux/actions/orders.action';

function OrderDataTable({dataKeys, showActiveOrders=false, providerId}) {
    const dispatch = useDispatch();
    const currentUserRole = useSelector(({AuthReducer}) => AuthReducer.userRole);
    const [, ordersArray] = useSelectorAsAnArray(({OrdersReducer}) => OrdersReducer.orders);
    const [isPopUpOn, setIsPopUpOn] = useState(false);
    const [popUpContent, setPopUpContent] = useState({});

    const handleOpen = () => {setIsPopUpOn(true);};
    const handleClose = () => {setIsPopUpOn(false);};
    const handleLinkClick = item => { setPopUpContent(item); handleOpen(); };
    const deleteItem = id => { dispatch(removeOrder(id))};
    const assignItemToProvider = id => {dispatch(editOrder({isOrderActive: true, providerId},id))};

    if(!ordersArray) return <Loader />;

    return (
        <OrderDataTableWrapper>
            <TableHead>
                <tr>
                    {dataKeys.map( key => <th key={uniqid()}> {formatHeadline(key)} </th>)}
                    {!showActiveOrders && <th> Actions </th>}
                </tr>
            </TableHead>
            <TableBody>
                {ordersArray.map( order => order.isOrderActive === showActiveOrders &&
                    <tr>
                        {dataKeys.map( key => {
                            const item = order[key];

                            if(Array.isArray(item))
                                return ( 
                                    <td key={uniqid()}>
                                        {item.map((i,index) => {
                                            if(typeof i === 'object')
                                                return (
                                                    <Link key={uniqid()} onClick={() => handleLinkClick(i)}>
                                                        {`${formatHeadline(key)}${index + 1},`}
                                                    </Link>
                                                );
                                            return <p>{i}</p>;
                                        })}
                                    </td> 
                                );
                            
                            if(typeof item === 'object')
                                return (
                                    <td key={uniqid()}>
                                        <Link onClick={() => handleLinkClick(item)}>{formatHeadline(key)}</Link>
                                    </td> 
                                );
                            
                            if(typeof item === 'boolean')
                                return (<td key={uniqid()}> {item ? '✔' : '❌'} </td>);

                            return (<td key={uniqid()}> {formatText(item)} </td>);
                        })}
                        {!showActiveOrders && <td>
                            {currentUserRole === 'ADMIN' ? 
                                <span onClick={() => deleteItem(order._id)}> <DeleteIcon /> </span> :
                                <span onClick={() => assignItemToProvider(order._id)}> <TruckIcon /> </span> 
                            }
                        </td>}
                    </tr>
                )}
            </TableBody>
            <PopUpWrapper display={isPopUpOn}>
                <PopUp display={isPopUpOn}> 
                    <div>
                        {Object.keys(popUpContent).map( key => 
                            <p><b>{key}:</b> {JSON.stringify(popUpContent[key])}</p>
                        )}
                    </div>
                    <Button backgroundColor={Colors.thirdColor} textColor={Colors.primaryColor} onClick={handleClose}>close</Button>
                </PopUp>
            </PopUpWrapper>
        </OrderDataTableWrapper>
    );
}

const headerMap = {
    orderCreationDate: 'Date',
    orderAddress: 'Address',
    orderFlowerBouquetIds: 'Details',
    orderTotalSum: 'Price',
    providerId: 'provider',
    userId: 'user'
};
const formatHeadline = (text) => headerMap[text];

export default OrderDataTable;