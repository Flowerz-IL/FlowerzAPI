
import {useState, useEffect, useRef} from 'react';
import Styled from 'styled-components';
import {FormWrapper} from './DynamicForm.style';
import {Button} from '../../utils/constants/globalStyle.constant';
import {useSelectorAsAnArray} from '../../utils/helper/customHooks.util';
import FormInputs, {updateErrorState} from './FormInput.component';
import Loader from '../Loader/Loader.component';

function ProviderForm({handleSubmit, inputsType, dataToEdit}) {
    const inputs = useRef(Object.keys(inputsType)).current;
    const [usersObject,] = useSelectorAsAnArray(({UsersReducer}) => UsersReducer.users); 
    const [formState, setFormState] = useState({});
    const [formErrorState, setFormErrorState] = useState({});

    useEffect(() => {
        setFormState( () => {
            const state = inputs.reduce( (prev , currentKey) => {
                prev[currentKey] = dataToEdit ? dataToEdit[currentKey] ?? '' : '';
                return prev;
            }, {});
            state.userId = dataToEdit ? dataToEdit.userId ?? '' : '';
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
        
        if(formState.userId === '') {
            alert('you must choose a corresponding user');
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

    if(formState[inputs[0]] === undefined || !usersObject) return <Loader />;

    return (
        <FormWrapper onSubmit={handleFormSubmit}>
            <SelectInput 
                onChange={event => event.target.value !== '' && setFormState( prev => ({...prev, userId:event.target.value}))}
                value={formState.userId}
            >
                <option value={''}>Choose a user</option>
                {Object.keys(usersObject).map(userId => usersObject[userId].providerId ? 
                    <option value={userId}>
                        {`${usersObject[userId].userFirstName} - ${usersObject[userId].userLastName} - ${userId}`}
                    </option> : null
                )}
            </SelectInput>
            <FormInputs 
                inputs={inputs} 
                inputsType={inputsType}
                formState={formState}
                formErrorState={formErrorState}
                handleChange={handleChange}
            />
            <Button type='submit'>{!dataToEdit ? 'Add' : 'Edit'} Item</Button>
        </FormWrapper>
    );
};

const SelectInput = Styled.select`
    padding: 0.5rem;
    width: 32vw;
`;

export default ProviderForm;