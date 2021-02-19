
import {useState, useEffect, useRef} from 'react';
import {FormWrapper} from './DynamicForm.style';
import {Button} from '../../utils/constants/globalStyle.constant';
import Loader from '../Loader/Loader.component';
import FormInputs, {updateErrorState} from './FormInput.component';

function DynamicForm({ dataToEdit, inputsType, handleSubmit }){
    const inputs = useRef(Object.keys(inputsType)).current;
    const [formState, setFormState] = useState({});
    const [formErrorState, setFormErrorState] = useState({});

    const setInitialState = () => {
        setFormState(
            inputs.reduce( (prev , currentKey) => {
                if(Array.isArray(inputsType[currentKey]))
                    prev[currentKey] = dataToEdit ? dataToEdit[currentKey] ?? [] : [];
                else prev[currentKey] = dataToEdit ? dataToEdit[currentKey] ?? '' : '';
                return prev;
            }, {})
        );
    };
    
    useEffect(setInitialState, [dataToEdit, inputs, inputsType]);
    
    const handleChange = (event, type) => {
        const {value, name} = event.target;
        setFormState(prev => ({...prev, [name]:value}));
        updateErrorState(setFormErrorState, type, name, value);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        
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

        setInitialState();
    };

    if(formState[inputs[0]] === undefined ) return ( <Loader /> );

    return (
        <FormWrapper onSubmit={handleFormSubmit}>
            <FormInputs 
                inputs={inputs} 
                inputsType={inputsType}
                formState={formState}
                setFormState={setFormState}
                formErrorState={formErrorState}
                handleChange={handleChange}
                isEdit={!(!dataToEdit)}
            />
            <Button type='submit'>{!dataToEdit ? 'Add' : 'Edit'} Item</Button>
        </FormWrapper>
    );
};

export default DynamicForm;