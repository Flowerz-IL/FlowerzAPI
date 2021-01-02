
import {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import {DynamicFormWrapper, ErrorMessage, Image, ImageWrapper, TextAreaInput, TextInput, CharacterCount, InputWrapper} from './DynamicForm.style';
import {Button} from '../../utils/constants/globalStyle.constant';
import Loader from '../Loader/Loader.component';

function DynamicForm({ dataToEdit, inputsType, handleSubmit }){
    const inputs = Object.keys(inputsType);
    const [formState, setFormState] = useState({});
    const [formErrorState, setFormErrorState] = useState({});

    useEffect(() => setFormState(buildInitialState(dataToEdit, inputs, inputsType)),[dataToEdit]);

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
        } else handleSubmit(formState, dataToEdit._id);
    };

    if(formState[inputs[0]] === undefined ) return ( <Loader /> );

    return (
        <DynamicFormWrapper onSubmit={handleFormSubmit}>
            {inputs.map( currentKey => {
                const type = inputsType[currentKey];
                const placeHolder = formatText(currentKey);
                switch(type){
                    case INPUT_TYPES.IMAGE:
                        return(
                            <InputWrapper>
                                <ImageWrapper>
                                    <Image src={formState[currentKey]}/>
                                    <TextInput 
                                        onChange={event => handleChange(event, type)} 
                                        placeholder={placeHolder} 
                                        name={currentKey} 
                                        value={formState[currentKey]}
                                        required
                                    />
                                </ImageWrapper>
                                <ErrorMessage> {formErrorState[currentKey] ?? ''} </ErrorMessage>
                            </InputWrapper>
                        );

                    case INPUT_TYPES.LONG_TEXT:
                        return(
                            <div>
                                <InputWrapper>
                                    <TextAreaInput 
                                        onChange={event => handleChange(event, type)} 
                                        rows="4" 
                                        placeholder={placeHolder} 
                                        name={currentKey} 
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{120 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </div>
                        );

                    default: 
                        return ( 
                            <div>
                                <InputWrapper>
                                    <TextInput 
                                        onChange={event => handleChange(event, type)} 
                                        placeholder={placeHolder} 
                                        name={currentKey}  
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{40 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </div>
                        );
                }
            })}
            <Button type='submit'>{!dataToEdit ? 'Add' : 'Edit'} Item</Button>
        </DynamicFormWrapper>
    );
};

const buildInitialState = (data = {}, inputs, inputsType) => {
    return inputs.reduce( (prev , currentKey) => {
        const type = inputsType[currentKey];
        switch(type){
            default: 
                return {...prev, [currentKey]: data[currentKey] ?? ''};
        }
    },{});
};

const updateErrorState = (setErrorState, inputType, currentInput, insertedValue) => {
    switch(inputType){
        case INPUT_TYPES.IMAGE:
            const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
            const regex = new RegExp(expression);
            if(!insertedValue.match(regex)) 
                setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid url'}));
            else setErrorState(prev => {
                let current = {...prev};
                delete current[currentInput];
                return current;
            });
            break;

        case INPUT_TYPES.LONG_TEXT:
            {
                const valueLen = insertedValue.length;
                if(valueLen > 120 || valueLen < 4) 
                    setErrorState(prev => ({...prev, [currentInput]: `Text must be with the minimum of 4 characters and the maximum of 120` }));
                else setErrorState(prev => {
                    let current = {...prev};
                    delete current[currentInput];
                    return current;
                });
            }
            break;
            
        default:
            {
                const valueLen = insertedValue.length;
                if(valueLen > 40 || valueLen < 3) 
                    setErrorState(prev => ({...prev, [currentInput]: `Text must be with the minimum of 3 characters and the maximum of 40` }));
                else setErrorState(prev => {
                    let current = {...prev};
                    delete current[currentInput];
                    return current;
                });
            }
            break;
    }
};

const formatText = string => typeof string !== 'string' ? string : string
        .split('')
        .map(char => (char >= 'A' && char <= 'Z') ? ` ${char}`: (char >= 'a' && char <= 'z') ? char : '')
        .join('');

export default DynamicForm;
export const INPUT_TYPES = {
    IMAGE: 'IMAGE',
    TEXT: 'TEXT',
    LONG_TEXT: 'LONG_TEXT', 
    OBJECT: 'OBJECT',
    ARRAY: 'ARRAY',
};