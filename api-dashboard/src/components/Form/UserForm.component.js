
import {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components';
import {FormWrapper, InputWrapper, TextInput, CharacterCount } from './DynamicForm.style';
import {Button, DeleteIcon} from '../../utils/constants/globalStyle.constant';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import FormInputs, {updateErrorState} from './FormInput.component';
import Loader from '../Loader/Loader.component';

function UserForm({handleSubmit, inputsType, dataToEdit}) {
    const inputs = useRef(Object.keys(inputsType)).current;
    const [addAddressState, setAddAddressState] = useState({
        name: '',
        city: '',
        street: '',
        houseNumber: '0',
        floorNumber: '0',
        aptNumber: '0',
    });
    const [formState, setFormState] = useState({});
    const [formErrorState, setFormErrorState] = useState({});

    useEffect(() => {
        setFormState( () => {
            const state = inputs.reduce( (prev , currentKey) => {
                prev[currentKey] = dataToEdit ? dataToEdit[currentKey] ?? '' : '';
                return prev;
            }, {});
            if(!dataToEdit) state.userPassword = '';
            state.userAddresses = dataToEdit ? dataToEdit.userAddresses ?? [] : [];
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
        
        if(formState.userAddresses.length < 1) {
            alert('you must add at least one address');
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

    const handleAddAddressSubmit = () => {
        const {name, city, street, houseNumber} = addAddressState;
        if(![name, city, street, houseNumber].every(item => item !== '')) return;
        if(formState.userAddresses.findIndex(item => item.name === name) !== -1) {
            alert('you already have an address with the same name');
            return;
        }
        setFormState(prev => ({...prev, userAddresses: [...prev.userAddresses, addAddressState]}));
        setAddAddressState({name: '', city: '', street: '', houseNumber: '', floorNumber: '-', aptNumber: '-',});
    };

    if(formState[inputs[0]] === undefined) return <Loader />;

    return (
        <FormWrapper onSubmit={handleFormSubmit}>
            {!dataToEdit && 
                <InputWrapper>
                    <TextInput 
                        onChange={event => setFormState(prev => ({...prev, userPassword: event.target.value}))} 
                        placeholder={'Password'}
                        type='password'
                        value={formState.userPassword}
                        required
                    />
                    <CharacterCount>{40 - formState.userPassword.length}</CharacterCount>
                </InputWrapper>
            }
            <FormInputs 
                inputs={inputs} 
                inputsType={inputsType}
                formState={formState}
                formErrorState={formErrorState}
                handleChange={handleChange}
            />
            <AddressWrapper>
                {formState.userAddresses.map(address => (
                    <div>
                        {address.name} 
                        <span onClick={() => setFormState(prev => ({
                            ...prev,
                            userAddresses: prev.userAddresses.filter(i => i.name !== address.name)
                        }))}>
                            <DeleteIcon /> 
                        </span>
                    </div>
                ))}
            </AddressWrapper>
            <AddAddressWrapper>
                {Object.keys(addAddressState).map( key => 
                    <SmallInput 
                        onChange={event => setAddAddressState(prev => ({...prev, [key]: event.target.value}))}
                        value={addAddressState[key]}
                        placeholder={key} 
                    /> 
                )}
                <Button type="button" onClick={handleAddAddressSubmit}> Add Address </Button>
            </AddAddressWrapper>
            <Button type='submit'>{!dataToEdit ? 'Add' : 'Edit'} Item</Button>
        </FormWrapper>
    );
};

const AddressWrapper = Styled.div`
    margin: 5px 0 0;
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
`;

const SmallInput = Styled.input`
    padding: 0.5rem;
    margin: 0.5rem;
    width: 7vw;
`;

const AddAddressWrapper = Styled.div`
    margin: 5px 1rem 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
`;

export default UserForm;