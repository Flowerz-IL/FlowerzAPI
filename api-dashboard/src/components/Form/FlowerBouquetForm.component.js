
import {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components';
import {FormWrapper} from './DynamicForm.style';
import {Button, DeleteIcon} from '../../utils/constants/globalStyle.constant';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import FormInputs, {updateErrorState} from './FormInput.component';
import Loader from '../Loader/Loader.component';

function FlowerBouquetForm({handleSubmit, inputsType, dataToEdit}) {
    const inputs = useRef(Object.keys(inputsType)).current;
    const [addFlowerState, setAddFlowerState] = useState({flowerId: '', flowerAmount: 0});
    const [flowersObject,] = useSelectorAsAnArray(({FlowersReducer}) => FlowersReducer.flowers); 
    const [formState, setFormState] = useState({});
    const [formErrorState, setFormErrorState] = useState({});

    useEffect(() => {
        setFormState( () => {
            const state = inputs.reduce( (prev , currentKey) => {
                prev[currentKey] = dataToEdit ? dataToEdit[currentKey] ?? '' : '';
                return prev;
            }, {});
            state.bouquetFlowers = dataToEdit ? dataToEdit.bouquetFlowers ?? [] : [];
            return state;
        });
    },[dataToEdit]);

    const handleChange = (event, type) => {
        const {value, name} = event.target;
        setFormState(prev => ({...prev, [name]:value}));
        updateErrorState(setFormErrorState, type, name, value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        
        if(formState.bouquetFlowers.length < 1) {
            alert('you must add at least one bouquet');
            return;
        }

        if(Object.keys(formErrorState).filter(item => item !== 'formError').length > 0){
            setFormErrorState(prev => ({...prev, formError: 'Fix errors before Submitting'}));
        }

        if(!dataToEdit){
            handleSubmit(formState);
        } else {
            const change = Object.keys(formState).reduce((prev, current) => {
                    if(dataToEdit[current] !== formState[current]) prev[current] = formState[current];
                    return prev;
            },{});
            handleSubmit(change, dataToEdit._id);
        }
    };

    const handleAddFlowerSubmit = () => {
        if(addFlowerState.flowerId === '' || addFlowerState.flowerAmount === 0 || isNaN(Number(addFlowerState.flowerAmount))) return;

        setFormState(prev => {
            const currentIndex = prev.bouquetFlowers.findIndex(item => item.flowerId === addFlowerState.flowerId);
            const temp = [...prev.bouquetFlowers];
            if(currentIndex !== -1) 
                temp[currentIndex].flowerAmount = Number(addFlowerState.flowerAmount);
            else 
                temp.push(addFlowerState);
            return {...prev, bouquetFlowers: temp};
        });
        setAddFlowerState({flowerId: '', flowerAmount: 0});
    };

    if(formState[inputs[0]] === undefined || !flowersObject) return <Loader />;

    return (
        <FormWrapper onSubmit={handleFormSubmit}>
            <FormInputs 
                inputs={inputs} 
                inputsType={inputsType}
                formState={formState}
                formErrorState={formErrorState}
                handleChange={handleChange}
            />
            <FlowerInBouquetsWrapper>
                {formState.bouquetFlowers.map(item => 
                    <div>
                        {item.flowerId} - {item.flowerAmount} - 
                        <span onClick={() => setFormState(prev => ({
                            ...prev,
                            bouquetFlowers: prev.bouquetFlowers.filter(i => i.flowerId !== item.flowerId)
                        }))}>
                            <DeleteIcon /> 
                        </span>
                    </div>
                )}
            </FlowerInBouquetsWrapper>
            <AddFlowerWrapper>
                <SelectInput 
                    onChange={event => setAddFlowerState(prev => ({...prev, flowerId: event.target.value}))} 
                    name='flower'
                    value={addFlowerState.flowerId}
                >
                    <option value={''}> Add a flower to the bouquet </option>
                    {Object.keys(flowersObject).map(key => (
                        <option key value={key}> {`${flowersObject[key].flowerName} - ${flowersObject[key].flowerColor} - id:${key}`} </option>
                    ))}
                </SelectInput>
                <AmountInput 
                    onChange={event => setAddFlowerState(prev => ({...prev, flowerAmount: event.target.value}))} 
                    type="number" 
                    name="amount" 
                    min="0" 
                    max="100"
                    value={addFlowerState.flowerAmount}
                />
                <Button type="button" onClick={handleAddFlowerSubmit}> Add Flower </Button>
            </AddFlowerWrapper>
            <Button type='submit'>{!dataToEdit ? 'Add' : 'Edit'} Item</Button>
        </FormWrapper>
    );
};

const FlowerInBouquetsWrapper = Styled.div`
    margin: 5px 0 0;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

const SelectInput = Styled.select`
    padding: 0.5rem;
    width: 20vw;
`;

const AmountInput = Styled.input`
    padding: 0.5rem;
    width: 5vw;
`;

const AddFlowerWrapper = Styled.div`
    margin: 5px 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default FlowerBouquetForm;