
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {ErrorMessage, Image, ImageWrapper, TextAreaInput, TextInput, CharacterCount, InputWrapper, SelectInput} from './DynamicForm.style';
import DynamicAddItem from './DynamicAddItem.component';

function FormInputs({inputs, inputsType, formState, setFormState, formErrorState, handleChange, isEdit}) {

    const flowerBouquetsObject = useSelector(({FlowerBouquetsReducer}) => FlowerBouquetsReducer.flowerBouquets); 
    const usersObject = useSelector(({UsersReducer}) => UsersReducer.users); 
    const flowersObject = useSelector(({FlowersReducer}) => FlowersReducer.flowers); 
    const providersObject = useSelector(({ProvidersReducer}) => ProvidersReducer.providers); 
    const data = useMemo( () => ({
        flowers: flowersObject,
        users: usersObject,
        flowerBouquets: flowerBouquetsObject,
        providers: providersObject
    }),[flowerBouquetsObject, usersObject, flowersObject, providersObject]);

    return (
        <>
            {inputs.map( currentKey => {
                const inputType = inputsType[currentKey].type;
                const placeHolder = formatText(currentKey);
                
                if(Array.isArray(inputsType[currentKey])){
                    return ( 
                        <DynamicAddItem 
                            formInputs={inputsType}
                            formName={currentKey}
                            formState={formState}
                            setFormState={setFormState}
                            data={data}
                        />
                    );
                }
                    
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
                                        min={inputsType[currentKey].min}
                                        max={inputsType[currentKey].max}
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

                    case INPUT_TYPES.SELECT:
                        return (
                            <>
                                <SelectInput
                                    value={formState[currentKey]} name={currentKey}
                                    onChange={event => handleChange(event, inputType)}
                                    style={{width: '32vw'}}
                                >
                                    <option value={''}> select {placeHolder} </option>
                                    {Array.isArray(inputsType[currentKey].data) ?
                                        inputsType[currentKey].data.map(item => <option value={item}> {item} </option> ):
                                        Object.keys(data[inputsType[currentKey].data]).map(itemKey =>(
                                            <option value={itemKey}> 
                                                {inputsType[currentKey].toDisplay.map(propertyToDisplay =>
                                                    `${data[inputsType[currentKey].data][itemKey][propertyToDisplay]} - `)}
                                            </option>
                                        ))
                                    }
                                </SelectInput>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </>
                        );

                    case INPUT_TYPES.PASSWORD:
                        return !isEdit && (
                            <>
                                <InputWrapper>
                                    <TextInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        placeholder={'Password'}
                                        type='password'
                                        name={currentKey}
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{40 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                            </>
                        )

                    case INPUT_TYPES.EMAIL:
                        return !isEdit && (
                            <>
                                <InputWrapper>
                                    <TextInput 
                                        onChange={event => handleChange(event, inputType)} 
                                        placeholder={placeHolder}
                                        type='email'
                                        name={currentKey}
                                        value={formState[currentKey]}
                                        required
                                    />
                                    <CharacterCount>{40 - formState[currentKey].length}</CharacterCount>
                                </InputWrapper>
                                <ErrorMessage>{formErrorState[currentKey] ?? ''}</ErrorMessage>
                            </>
                        )

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

export const formatText = string => typeof string !== 'string' ? string : string
        .split('')
        .map(char => (char >= 'A' && char <= 'Z') ? ` ${char}`: (char >= 'a' && char <= 'z') ? char : '')
        .join('');

export const updateErrorState = (setErrorState, inputType, currentInput, insertedValue) => {

    const deleteError = () => setErrorState(prev => {
        let current = {...prev};
        delete current[currentInput];
        return current;
    });
    

    switch(inputType){
        case INPUT_TYPES.IMAGE:
            {
                const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
                const regex = new RegExp(expression);
                if(!insertedValue.match(regex)) 
                    setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid url'}));
                else deleteError();
            }
            break;

        case INPUT_TYPES.COLOR:
            const isColor = (color) => {
                const s = new Option().style;
                s.color = color;
                return s.color == color;
            };

            if(!isColor(insertedValue)) 
                setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid color'}));
            else deleteError();
            break;

        case INPUT_TYPES.LONG_TEXT:
            {
                const valueLen = insertedValue.length;
                if(valueLen > 120 || valueLen < 4) 
                    setErrorState(prev => ({...prev, [currentInput]: `Text must be with the minimum of 4 characters and the maximum of 120` }));
                else deleteError();
            }
            break;
        
        case INPUT_TYPES.SELECT:
            if(insertedValue === '')
                setErrorState(prev => ({...prev, [currentInput]: `you must choose an option` }));
            else deleteError();
            break;
        
        case INPUT_TYPES.EMAIL:
            {
                const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                const regex = new RegExp(expression);
                if(!insertedValue.match(regex))
                    setErrorState(prev => ({...prev, [currentInput]: `please insert a valid email address` }));
                else deleteError();
            }
            break;
        
        case INPUT_TYPES.PHONE_NUMBER:
            {
                const expression = /\d{3}-\d{3}-\d{4}/;
                const regex = new RegExp(expression);
                if(!insertedValue.match(regex)) 
                    setErrorState(prev => ({...prev, [currentInput]: 'Must be a valid phone number xxx-xxx-xxxx'}));
                else deleteError();
            }
            break;

        case INPUT_TYPES.NUMBER:
            if(isNaN(insertedValue))
                setErrorState(prev => ({...prev, [currentInput]: `Must be a valid number` }));
            else deleteError();
            break;

        default:
            {
                const valueLen = insertedValue.length;
                if(valueLen > 40 || valueLen < 1) 
                    setErrorState(prev => ({...prev, [currentInput]: `Text must be with the minimum of 3 characters and the maximum of 40` }));
                else deleteError();
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
    PHONE_NUMBER: 'PHONE_NUMBER',
    SELECT: 'SELECT',
    PASSWORD: 'PASSWORD',
    EMAIL: 'EMAIL',
};