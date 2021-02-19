
import {useState, useEffect} from 'react';
import Styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import {Row, Card, CenteredWithFlex, Headline1, Button, ScrollFix} from '../../utils/constants/globalStyle.constant';
import OrderForm from '../../components/Form/OrderForm.component';
import OrderDataTable from '../../components/Table/OrderDataTable.component';
import BarGraph from '../../components/Graph/BarGraph.component';
import {SelectInput, AmountInput, TextInput} from '../../components/Form/DynamicForm.style';
import {DATA_TYPES} from '../../components/Table/StripedDataTable.component';
import StripedDataTable from '../../components/Table/StripedDataTable.component';
import {StripedDataTableWrapper, TableHead, TableBody} from '../../components/Table/StripedDataTable.style';
import Loader from '../../components/Loader/Loader.component';

function AdminDashboard() {
    const {userRole, providerId} = useSelector(({AuthReducer}) => AuthReducer);
    const totalSumPerProvider = useSelector(({OrdersReducer}) => OrdersReducer.totalSumPerProvider);
    const [, ordersArray] = useSelectorAsAnArray(({OrdersReducer}) => OrdersReducer.orders);
    const [, flowerBouquetsArray] = useSelectorAsAnArray(({FlowerBouquetsReducer}) => FlowerBouquetsReducer.flowerBouquets); 
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchFormState, setSearchFormState] = useState({});
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = ({target:{name,value}}) => setSearchFormState(prev => ({...prev, [name]:value}));

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const isColor = (color) => {
            const s = new Option().style;
            s.color = color;
            return s.color == color;
        };

        if(['bouquetSize','bouquetPrice','bouquetColor'].every(property => !searchFormState[property])){
            alert('All search inputs are required');
            return;
        }
        if(searchFormState['bouquetSize'].length < 1) {
            alert('please select bouquetSize');
            return;
        }
        if(!isColor(searchFormState['bouquetColor'])) {
            alert('please insert a valid color');
            return;
        }
        
        const newSearchRes = flowerBouquetsArray.filter(item => {
            if(item.bouquetSize !== searchFormState['bouquetSize']) return false;
            if(item.bouquetPrice >= searchFormState['bouquetPrice']) return false;
            if(!item.bouquetColors.includes(searchFormState['bouquetColor'])) return false;
            return true;
        });
        setSearchResults(newSearchRes);
        
    };
    const handleWindowsSizeChange = () => setWindowWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleWindowsSizeChange);
        return () => { window.removeEventListener('resize', handleWindowsSizeChange); }
    }, []);

    return (
        <DashboardWrapper>
            <Row fixedWidth='95%'>
                <Card width='100%' height='auto'>
                   {!totalSumPerProvider ? <Loader /> :
                        <ScrollFix>
                            <Headline1> {userRole === 'ADMIN' && 'Providers'} Earnings </Headline1>

                            {userRole === 'ADMIN' ? 
                                <StripedDataTableWrapper>
                                    <TableHead>
                                        <tr>
                                            <th> providerID </th>
                                            <th> Earnings </th>
                                        </tr>
                                    </TableHead>
                                    <TableBody>
                                        {totalSumPerProvider.map(({_id, value}) => 
                                            <tr>
                                                <td> {_id} </td>
                                                <td> {value}₪ </td>
                                            </tr>
                                        )}
                                        
                                    </TableBody>
                                </StripedDataTableWrapper> : 
                                <Headline1> {totalSumPerProvider.find(element => element._id === providerId)?.value}.0₪ </Headline1>
                            }
                            
                        </ScrollFix>
                    }
                </Card>
            </Row>
            <Row fixedWidth='95%'>
                {windowWidth > 800 && <Card width='38vw'>
                    <Headline1> Assign An Order </Headline1>
                    <DashboardTableWrapper>
                        <OrderDataTable dataKeys={dataKeysNonActive} providerId={userRole === 'PROVIDER' ? providerId : '-'}/>
                    </DashboardTableWrapper>
                </Card>}
                <Card width='38vw'>
                    <Headline1> Orders In Progress </Headline1>
                    <DashboardTableWrapper>
                        <OrderDataTable dataKeys={dataKeysActive} showInProgress/>
                    </DashboardTableWrapper>
                </Card>
            </Row>
            <Row fixedWidth='95%'>
                {windowWidth > 800 && <Card width='38vw'>
                    <Headline1> Place An Order </Headline1>
                    <OrderForm providerId={userRole === 'PROVIDER' ? providerId : '-'}/>
                </Card> }
                <Card width='38vw'>
                    <Headline1> Orders per month </Headline1>
                    <BarGraph dataToPresent={ordersArray ? createGraphOrdersData(ordersArray) : null}/>
                </Card>
            </Row>
            <Row fixedWidth='95%'>
                <Card width='100%' height='auto'>
                    <ScrollFix>
                        <Headline1> Easy Bouquets Search </Headline1>
                        <SearchForm onSubmit={handleSearchSubmit}>
                            <AmountInput style={{width: '10rem'}} value={searchFormState['bouquetPrice']} name='bouquetPrice' onChange={handleSearchChange} type='number' min='0' placeholder='Max Price' required/>
                            <SelectInput value={searchFormState['bouquetSize']} name='bouquetSize' onChange={handleSearchChange}>
                                <option value=''> Select size </option>
                                <option value='S'> S </option>
                                <option value='M'> M </option>
                                <option value='L'> L </option>
                                <option value='XL'> XL </option>
                                <option value='XXL'> XXL </option>
                            </SelectInput>
                            <TextInput value={searchFormState['bouquetColor']} name='bouquetColor' type="text" onChange={handleSearchChange} placeholder='Color' required />
                            <Button> Search </Button>
                        </SearchForm>
                        <StripedDataTable 
                            dataToPresent={searchResults}
                            dataType={flowerDataType}
                            windowWidth={windowWidth}
                        />
                    </ScrollFix>
                </Card>
            </Row>
        </DashboardWrapper>
    );
}

const createGraphOrdersData = orders => {
    const res = [];
    for(let i = 0; i <= 12; i++) res.push(0);
    orders.forEach(order => res[Number(order.orderCreationDate.split('/')[1])] += 1);
    return res;
}

const flowerDataType = {
    _id: DATA_TYPES.TEXT,
    bouquetImageUrl: DATA_TYPES.IMAGE,
    bouquetName: DATA_TYPES.TEXT,
    bouquetPrice: DATA_TYPES.TEXT,
    bouquetSize: DATA_TYPES.TEXT,
    bouquetColors:[DATA_TYPES.COLOR]
};

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

const SearchForm = Styled.form`
    margin: 1rem;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    align-items: center;
`;

export default AdminDashboard;