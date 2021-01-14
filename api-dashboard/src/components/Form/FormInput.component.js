
import {ErrorMessage, Image, ImageWrapper, TextAreaInput, TextInput, CharacterCount, InputWrapper} from './DynamicForm.style';

function FormInputs({inputs, inputsType, formState, formErrorState, handleChange}) {

    return (
        <>
            {inputs.map( currentKey => {
                const inputType = inputsType[currentKey];
                const placeHolder = formatText(currentKey);
                switch(inputType){
                    case INPUT_TYPES.IMAGE:
                        return(
                            <InputWrapper>
                                <ImageWrapper>
                                    <Image src={formState[currentKey]}/>
                                    <TextInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        placeholder={placeHolder} 
                                        name={currentKey} 
                                        value={formState[currentKey]}
                                        required
                                    />
                                </ImageWrapper>
                                <ErrorMessage> {formErrorState[currentKey] ?? ''} </ErrorMessage>
                            </InputWrapper>
                        );
                    
                    case INPUT_TYPES.NUMBER:
                        return(
                            <>
                                <InputWrapper>
                                    <TextInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        placeholder={placeHolder} 
                                        name={currentKey}  
                                        value={formState[currentKey]}
                                        type="number" 
                                        min="0"
                                        required
                                    />
                                    <CharacterCount>{40 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </>
                        );

                    case INPUT_TYPES.LONG_TEXT:
                        return(
                            <>
                                <InputWrapper>
                                    <TextAreaInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        rows="4" 
                                        placeholder={placeHolder} 
                                        name={currentKey} 
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{120 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </>
                        );

                    default: 
                        return ( 
                            <>
                                <InputWrapper>
                                    <TextInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        placeholder={placeHolder} 
                                        name={currentKey}  
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{40 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </>
                        );
                }
            })}
        </>
    );
}

const formatText = string => typeof string !== 'string' ? string : string
        .split('')
        .map(char => (char >= 'A' && char <= 'Z') ? ` ${char}`: (char >= 'a' && char <= 'z') ? char : '')
        .join('');

export const updateErrorState = (setErrorState, inputType, currentInput, insertedValue) => {
    switch(inputType){
        case INPUT_TYPES.IMAGE:
            {
                const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
                const regex = new RegExp(expression);
                if(!insertedValue.match(regex)) 
                    setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid url'}));
                else setErrorState(prev => {
                    let current = {...prev};
                    delete current[currentInput];
                    return current;
                });
            }
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
        
        case INPUT_TYPES.PHONE_NUMBER:
            {
                const expression = /\d{3}-\d{3}-\d{4}/;
                const regex = new RegExp(expression);
                if(!insertedValue.match(regex)) 
                    setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid phone number xxx-xxx-xxxx'}));
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
                if(valueLen > 40 || valueLen < 1) 
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

export default FormInputs;
export const INPUT_TYPES = {
    IMAGE: 'IMAGE',
    TEXT: 'TEXT',
    LONG_TEXT: 'LONG_TEXT', 
    COLOR:'COLOR',
    NUMBER: 'NUMBER',
    PHONE_NUMBER: 'PHONE_NUMBER'
};