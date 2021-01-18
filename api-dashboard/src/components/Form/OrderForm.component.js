
import uniqid from 'uniqid';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Styled from 'styled-components';
import {FormWrapper, TextInput} from './DynamicForm.style';
import {Button, Headline1, DeleteIcon} from '../../utils/constants/globalStyle.constant';
import Loader from '../Loader/Loader.component';
import {addOrder} from '../../redux/actions/orders.action';

function OrderFrom({providerId}) {

    const dispatch = useDispatch();
    const [formState, setFormState] = useState({...formInitialState, providerId: providerId ?? '-'});
    const users = useSelector(({UsersReducer}) => UsersReducer.users);
    const providers = useSelector(({ProvidersReducer}) => ProvidersReducer.providers);
    const flowerBouquets = useSelector(({FlowerBouquetsReducer}) => FlowerBouquetsReducer.flowerBouquets);

    const handleChange = event => {
        const {value, name} = event.target;
        if(value === '') return;
        if(name === 'providerId') {
            setFormState(prev => ({...prev, [name]: value, isOrderActive: true}));
        } else if(name === 'orderAddress') {
            setFormState(prev => ({...prev, [name]: JSON.parse(value)}));
        } else setFormState(prev => ({...prev, [name]: value}));
    };

    const handleBouquetChosen = event => {
        const {value} = event.target;
        if(value === '') return;

        const newArr = formState.orderFlowerBouquetIds;
        let index = -1;
        for(let i = 0; i < newArr.length; i++)
            if(newArr[i].flowerBouquetId === value){index = i; break;}

        if(index !== -1) newArr[index].bouquetAmount += 1;
        else newArr.push({flowerBouquetId: value, bouquetAmount: 1});
        
        setFormState(prev => ({
            ...prev,
            orderFlowerBouquetIds: newArr,
            orderTotalSum: Number(prev.orderTotalSum) + Number(flowerBouquets[value].bouquetPrice)
        }));
    };

    const handleBouquetDelete = id => {
        let newArr = formState.orderFlowerBouquetIds;
        let index;
        for(let i = 0; i < newArr.length; i++)
            if(newArr[i].flowerBouquetId === id){index = i; break;}

        if(newArr[index].bouquetAmount === 1) newArr = newArr.filter(item => item.flowerBouquetId !== id);
        else newArr[index].bouquetAmount -= 1;
        
        setFormState(prev => ({
            ...prev,
            orderFlowerBouquetIds: newArr,
            orderTotalSum: Number(prev.orderTotalSum) - Number(flowerBouquets[id].bouquetPrice)
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const validationRes = ['userId', 'orderFrequency']
            .every( property => formState[property] !== '');
        if(!validationRes || formState.orderTotalSum === 0 || Object.keys(formState.orderAddress).length < 1){
            alert('All field are required.');
            return;
        }
        dispatch(addOrder(formState));
        setFormState({...formInitialState,orderFlowerBouquetIds:[] , providerId: providerId ?? '-'});
    };
    
    if(!users || !providers || !flowerBouquets) return <Loader />;

    return(
        <FormWrapper onSubmit={handleSubmit}>
            <SelectInput onChange={handleChange} value={formState.userId} name='userId'>
                <option value=''> Select ordering User </option>
                {Object.keys(users).map( userId => users[userId].userRole === 'USER' ? 
                    <option key={uniqid()} value={userId}>
                        {`${users[userId].userFirstName} - ${users[userId].userLastName} - ${userId}`}
                    </option> : null
                )}
            </SelectInput>
            {providerId === '-' && 
                <SelectInput onChange={handleChange} value={formState.providerId} name='providerId'>
                    <option value=''> Select provider </option>
                    {Object.keys(providers).map( providerId => 
                        <option key={uniqid()} value={providerId}>
                            {`${providers[providerId].businessName} - ${providerId}`}
                        </option>
                    )}
                </SelectInput>
            }
            <SelectInput onChange={handleChange} value={JSON.stringify(formState.orderAddress)} name='orderAddress' disabled={formState.userId === ''}>
                <option value=''> Select User Address (You must choose a user first) </option>
                {formState.userId !== '' && users[formState.userId].userAddresses.map( address => 
                    <option key={uniqid()} value={JSON.stringify(address)}>
                        {`${address.name} - ${address.city} - ${address.street}`}
                    </option>
                )}
            </SelectInput>
            <TextInput min={0} max={2} onChange={handleChange} value={formState.orderFrequency} name='orderFrequency' placeholder='Order Frequency' type='number'/>
            <FlowerBouquetsWrapper>
                {formState.orderFlowerBouquetIds.map(flowerBouquetId => 
                    <div key={uniqid()}>
                        {flowerBouquetId.flowerBouquetId} - {flowerBouquetId.bouquetAmount}
                        <span onClick={() => handleBouquetDelete(flowerBouquetId.flowerBouquetId)}> <DeleteIcon /> </span>
                    </div>
                )}
            </FlowerBouquetsWrapper>
            <SelectInput onChange={handleBouquetChosen} value=''>
                <option value=''> Add a flower bouquet </option>
                {Object.keys(flowerBouquets).map( flowerBouquetId => 
                    <option key={uniqid()} value={flowerBouquetId}>
                        {`${flowerBouquets[flowerBouquetId].bouquetName} - ${flowerBouquets[flowerBouquetId].bouquetPrice} 
                        - ${flowerBouquets[flowerBouquetId].bouquetSize} - ${flowerBouquetId}`}
                    </option>
                )}
            </SelectInput>
            <Headline1 fontSize='1.5rem'>Total Sum {formState.orderTotalSum}</Headline1>
            <Button> Submit order</Button>
        </FormWrapper>
    );
}

const formInitialState = {
    userId: '',
    providerId: '-',
    orderAddress:  {},
    orderFrequency: '',
    isOrderActive: false,
    orderFlowerBouquetIds: [],
    orderTotalSum: 0
}

const SelectInput = Styled.select`
    margin: 1rem 0;
    padding: 0.5rem;
    width: 32vw;
`;

const FlowerBouquetsWrapper = Styled.div`
    margin: 5px 0 0;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

export default OrderFrom;